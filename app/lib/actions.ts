"use server";

import { z } from "zod";
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

export async function login(_: unknown, formData: FormData) {
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

export async function logout() {
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

    // TODO send request to ChatGPT

    const query =
      `INSERT INTO translations (key, de) VALUES ('${formFields.key}', '${formFields.translation}');`.replace(
        /\s+/g,
        " ",
      );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { query: query };
  } catch (err) {
    console.error("Translation Error:", err);
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
}
