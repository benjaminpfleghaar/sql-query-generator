"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { handleLogout } from "@/app/lib/actions";
import { Button } from "@/app/components/ui/button";

export default function Logout() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="submit"
      variant="outline"
      onClick={() => {
        startTransition(async () => {
          await handleLogout();
        });
      }}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
