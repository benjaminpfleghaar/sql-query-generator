"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Loader2 } from "lucide-react";
import { login } from "@/app/lib/actions";
import React, { useActionState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/theme-toggle";

export default function LoginForm({ className }: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between items-center">
          Welcome
          <ThemeToggle />
        </CardTitle>
        <CardDescription>
          Enter your details to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} id="loginForm" className="space-y-6">
          <fieldset className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              defaultValue={state?.values?.email ?? ""}
            />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              defaultValue={state?.values?.password ?? ""}
            />
          </fieldset>
          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          form="loginForm"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
