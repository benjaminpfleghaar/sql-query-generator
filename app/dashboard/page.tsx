import Logout from "@/components/logout";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 bg-muted">
      <div className="w-full max-w-md">
        <p>Hello {data.user.email}</p>
        <Logout />
      </div>
    </div>
  );
}
