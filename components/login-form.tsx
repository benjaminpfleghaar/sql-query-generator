"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>
          Enter your details to sign in to your account
        </CardDescription>
      </CardHeader>
      <form action={formAction} id="loginForm">
        <CardContent className="space-y-6">
          <fieldset className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              defaultValue={state?.values?.email ?? ""}
              required
            />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              defaultValue={state?.values?.password ?? ""}
              required
            />
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </fieldset>
        </CardContent>
      </form>
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
