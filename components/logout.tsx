"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
