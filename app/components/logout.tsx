"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { logout } from "@/app/lib/actions";
import { Button } from "@/app/components/ui/button";

export default function Logout() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => startTransition(logout)}
      variant="outline"
      disabled={isPending}
    >
      {isPending ? (
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
