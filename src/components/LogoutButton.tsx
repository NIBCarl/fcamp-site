"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center gap-2"
    >
      <span className="material-symbols-outlined text-[20px]">
        {isLoggingOut ? "refresh" : "logout"}
      </span>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
