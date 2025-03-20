import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { redirect } from "next/navigation";
import { logout } from "@/app/lib/actions";
import Logout from "@/app/components/logout";
import Generator from "@/app/components/generator";
import { createClient } from "@/app/lib/supabase/server";
import { ThemeToggle } from "@/app/components/theme-toggle";
import React from "react";

export default async function Home() {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            SQL Query Generator
            <form action={logout} className="flex gap-2">
              <Logout />
              <ThemeToggle />
            </form>
          </CardTitle>
          <CardDescription>
            Enter a translation key and German text to generate a SQL query
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Generator />
        </CardContent>
      </Card>
    </div>
  );
}
