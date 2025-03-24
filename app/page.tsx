import { redirect } from "next/navigation";
import Dashboard from "@/app/components/dashboard";
import { createClient } from "@/app/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    error,
    data: { user },
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <Dashboard />
    </div>
  );
}
