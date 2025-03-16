"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const LoginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(20).trim(),
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

    revalidatePath("/generator", "layout");
    redirect("/generator");
  } catch (err) {
    console.error("Login Error:", err);
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error);
      return;
    }

    revalidatePath("/", "layout");
    redirect("/");
  } catch (err) {
    console.error("Unexpected Logout Error:", err);
  }
}
