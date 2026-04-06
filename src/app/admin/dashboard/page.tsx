import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RosterTable from "./RosterTable";
import MediaManager from "./MediaManager";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/admin/login");
  }

  // Get Admin Role
  const { data: roleData, error: roleError } = await supabase
    .from("admin_roles")
    .select("role, district_id")
    .eq("user_id", user.id)
    .single();

  if (roleError || !roleData) {
    console.error("Failed to fetch admin role", roleError);
    // Not an admin
    redirect("/admin/login");
  }

  const isGlobalAdmin = roleData.role === 'global';

  let profiles: any[] = [];
  let districts: any[] = [];
  
  try {
    const districtsQuery = supabase.from("districts").select("*").order("name");
    const profilesQuery = supabase
      .from("profiles")
      .select(`
        id, first_name, last_name, arrived_status, created_at, gender, age, district_id,
        districts (name)
      `)
      .order("created_at", { ascending: false });
      
    const [districtsRes, profilesRes] = await Promise.all([districtsQuery, profilesQuery]);
      
    if (districtsRes.data) {
      districts = districtsRes.data;
    }
    
    if (profilesRes.data) {
      profiles = profilesRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch attendees", error);
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-secondary font-bold tracking-widest text-sm uppercase font-label block mb-2">
              Management Portal {isGlobalAdmin ? "(Global)" : "(District)"}
            </span>
            <h1 className="font-headline text-4xl font-bold text-on-surface">
              Attendee Roster
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-medium">
              Total Checked-in: <span className="font-bold text-primary">{profiles.filter(p => p.arrived_status).length}</span>
            </div>
            <div className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-medium">
              Total Registered: <span className="font-bold">{profiles.length}</span>
            </div>
          </div>
        </header>

        {isGlobalAdmin && (
          <section className="mb-8">
            <MediaManager />
          </section>
        )}

        <section className="bg-surface-container-lowest editorial-shadow rounded-2xl border border-outline-variant/20 overflow-hidden">
          <RosterTable 
            initialProfiles={profiles} 
            districts={districts} 
            adminRole={roleData.role}
            adminDistrictId={roleData.district_id}
          />
        </section>
      </div>
    </div>
  );
}
