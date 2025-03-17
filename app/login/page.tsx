import LoginForm from "@/app/components/login-form";

export default async function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
