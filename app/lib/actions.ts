"use server";

import { z } from "zod";
import { openai } from "@/app/lib/openai";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

const LoginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const GeneratorFormSchema = z.object({
  key: z.string().min(2).trim(),
  translation: z.string().min(2).trim(),
});

export async function handleLogin(_: unknown, formData: FormData) {
  try {
    const formFields = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedFields = LoginFormSchema.safeParse(formFields);
    if (!validatedFields.success) {
      return {
        error: "Invalid email format or missing fields",
        values: formFields,
      };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(formFields);

    if (error) {
      return {
        error: error.message || "Login failed. Please try again",
        values: formFields,
      };
    }
  } catch (err) {
    console.error("Login Error:", err);
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleLogout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error);
      return;
    }
  } catch (err) {
    console.error("Unexpected Logout Error:", err);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getQuery(_: unknown, formData: FormData) {
  try {
    const formFields = {
      key: formData.get("key") as string,
      translation: formData.get("translation") as string,
    };

    const validatedFields = GeneratorFormSchema.safeParse(formFields);
    if (!validatedFields.success) {
      return {
        error: "Invalid format or missing fields",
        values: formFields,
      };
    }

    const languages = {
      1: "German",
      2: "English",
      8: "Swedish",
      32: "Danish",
      128: "Italian",
      256: "French",
      512: "Spanish",
      1024: "Dutch",
      8192: "Finnish",
      16384: "Polish",
      32768: "Portuguese",
      65536: "Czech",
    };

    const prompt =
      `Translate the German word '${formFields.translation}' into the following languages:\n` +
      Object.values(languages)
        .map((lang) => `- ${lang}`)
        .join("\n") +
      "\n" +
      "Provide the translations in the same order.";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional translator. Translate the given German text exactly into several languages, each beginning with a capital letter. Only return the translated text separated by commas.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (!response || !response.choices || response.choices.length === 0) {
      return {
        error: "No response received. Please try again",
        values: formFields,
      };
    }

    const content = response.choices[0].message.content ?? "";

    const translations =
      content
        .split(",")
        .map(
          (translation, index) =>
            `(N'${formFields.key}', ${Object.keys(languages)[index]}, N'${translation.trim()}')`,
        )
        .join(",\n") ?? "";

    // @formatter:off
    const query = `MERGE INTO parfumdreams.dbo.Translations AS target
USING (VALUES
${translations}
) AS source (Translation_Field, Language, Translation)
ON target.Translation_Field = source.Translation_Field AND target.Language = source.Language
WHEN MATCHED THEN
UPDATE SET target.Translation = source.Translation
WHEN NOT MATCHED THEN
INSERT (Translation_Field, Language, Translation)
VALUES (source.Translation_Field, source.Language, source.Translation);`;
    // @formatter:on

    return { query: query };
  } catch (err) {
    console.error("Translation Error:", err);
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
}
