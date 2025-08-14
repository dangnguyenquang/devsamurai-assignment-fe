import { Outlet } from "react-router-dom";

export default function AuthLayout () {
  return (
    <main className="h-screen dark:bg-background bg-gray-50 px-4">
      <Outlet />
    </main>
  );
};
