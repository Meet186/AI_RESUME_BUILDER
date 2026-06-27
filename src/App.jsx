import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import Header from "./components/ui/Custom/Header";
import { Toaster } from "@/components/ui/sonner";
import { LoaderCircle } from "lucide-react";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // Wait for Clerk to initialize
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Redirect only after Clerk has loaded
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster richColors
        position="top-right" />
    </>
  );
}

export default App;