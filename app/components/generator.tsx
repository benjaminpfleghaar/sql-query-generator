"use client";

import { z } from "zod";
import { toast } from "sonner";
import { languages } from "@/app/config";
import { Copy, Loader2 } from "lucide-react";
import React, { useActionState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { fetchTranslations } from "@/app/lib/actions";
import { Textarea } from "@/app/components/ui/textarea";

const QueryFormSchema = z.object({
  key: z.string().min(2).trim(),
  translation: z.string().min(2).trim(),
});

export default function Generator() {
  const [state, formAction, pending] = useActionState(getQuery, null);

  async function getQuery(_: unknown, formData: FormData) {
    try {
      const formFields = {
        key: formData.get("key") as string,
        translation: formData.get("translation") as string,
      };

      const validatedFields = QueryFormSchema.safeParse(formFields);
      if (!validatedFields.success) {
        return {
          error: "Invalid format or missing fields",
          values: formFields,
        };
      }

      const translations = await fetchTranslations(formFields.translation);

      if (typeof translations !== "string") {
        return {
          error: translations.error,
          values: formFields,
        };
      }

      return { query: buildQuery(formFields.key, translations) };
    } catch (err) {
      console.error("Translation Error:", err);
      return {
        error: "An unexpected error occurred. Please try again later",
      };
    }
  }

  function buildQuery(key: string, translations: string) {
    const rows = translations
      .split(",")
      .map(
        (translation, index) =>
          `(N'${key}', ${Object.keys(languages)[index]}, N'${translation.trim()}')`,
      )
      .join(",\n");

    // @formatter:off
    return `MERGE INTO parfumdreams.dbo.Translations AS target
USING (VALUES
${rows}
) AS source (Translation_Field, Language, Translation)
ON target.Translation_Field = source.Translation_Field AND target.Language = source.Language
WHEN MATCHED THEN
UPDATE SET target.Translation = source.Translation
WHEN NOT MATCHED THEN
INSERT (Translation_Field, Language, Translation)
VALUES (source.Translation_Field, source.Language, source.Translation);`;
    // @formatter:on
  }

  function handleSelect(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.select();
  }

  return (
    <>
      <form action={formAction} className="space-y-6">
        <fieldset className="space-y-2">
          <Label htmlFor="key">Translation Key</Label>
          <Input
            id="key"
            name="key"
            type="text"
            placeholder="welcome_message"
            defaultValue={state?.values?.key ?? ""}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="translation">Translation</Label>
          <Textarea
            id="translation"
            name="translation"
            placeholder="Herzlich willkommen"
            defaultValue={state?.values?.translation ?? ""}
          />
        </fieldset>
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
              Generating...
            </>
          ) : (
            "Generate SQL Query"
          )}
        </Button>
      </form>
      {state?.query && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="query">Generated SQL Query</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(state.query);
                toast.info("Copied to clipboard");
              }}
            >
              <Copy />
              Copy
            </Button>
          </div>
          <Textarea
            id="query"
            value={state.query}
            className="font-mono h-64"
            onFocus={handleSelect}
            readOnly
          />
        </div>
      )}
    </>
  );
}
