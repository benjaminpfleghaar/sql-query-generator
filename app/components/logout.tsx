"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/ui/button";

export default function Logout() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" disabled={pending}>
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
