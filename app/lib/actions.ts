"use server";

import { z } from "zod";
import { languages } from "@/app/config";
import { openai } from "@/app/lib/openai";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

const LoginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
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

export async function fetchTranslations(translation: string) {
  try {
    // @formatter:off
    const prompt = `Translate the German word/text '${translation}' into the following languages:
${Object.values(languages)
  .map((lang) => `- ${lang}`)
  .join("\n")}
Provide the translations in the same order.`;
    // @formatter:on

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional translator. Translate the given German word/text exactly into several languages with upper and lower case. Return the translations as a comma-separated list.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const translations = response.choices?.[0]?.message?.content;

    if (!translations) {
      return {
        error: "No response received. Please try again",
      };
    }

    return translations;
  } catch (err) {
    console.error("Translation Error:", err);
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
}
