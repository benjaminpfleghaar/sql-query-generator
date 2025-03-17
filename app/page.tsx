import { redirect } from "next/navigation";
import Logout from "@/app/components/logout";
import { createClient } from "@/app/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  // TODO use card component

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <p>Hello {data.user.email}</p>
        <Logout />
      </div>
    </div>
  );
}
