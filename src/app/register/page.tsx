import { supabase } from "@/lib/supabase";
import RegistrationForm from "./RegistrationForm";

export default async function RegisterPage() {
  let districts: any[] = [];

  try {
    const { data, error } = await supabase.from("districts").select("*").order("name");
    if (error) throw error;
    if (data) districts = data;
  } catch (error) {
    console.error("Failed to fetch districts", error);
  }

  return (
    <main className="min-h-screen pt-28 pb-16 px-6 bg-surface-container-low flex flex-col justify-center items-center">
      <div className="max-w-xl w-full bg-surface-container-lowest rounded-2xl editorial-shadow p-8 md:p-12 border border-outline-variant/20 relative overflow-hidden">

        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

        <div className="mb-8 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">app_registration</span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-2">
            Join the Journey
          </h1>
          <p className="font-body text-on-surface-variant">
            Register for the upcoming FCAMP experience.
          </p>
        </div>

        <RegistrationForm districts={districts} />

      </div>
    </main>
  );
}
