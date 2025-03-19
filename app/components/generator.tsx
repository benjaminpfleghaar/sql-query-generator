"use client";

import { useActionState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { getQuery } from "@/app/lib/actions";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

export default function Generator() {
  const [state, formAction, pending] = useActionState(getQuery, null);

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
                // TODO implement toast message
                navigator.clipboard.writeText(state.query);
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
            readOnly
          />
        </div>
      )}
    </>
  );
}
