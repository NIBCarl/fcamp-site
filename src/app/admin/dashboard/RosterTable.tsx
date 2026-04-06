"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  district_id: number;
  gender: string;
  age: number;
  arrived_status: boolean;
  created_at: string;
  districts: { name: string } | null;
};

export default function RosterTable({ 
  initialProfiles,
  districts,
  adminRole,
  adminDistrictId
}: { 
  initialProfiles: Profile[];
  districts: { id: number; name: string }[];
  adminRole: 'global' | 'district';
  adminDistrictId: number | null;
}) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistrict, setFilterDistrict] = useState<string>("All");
  const [filterGender, setFilterGender] = useState<string>("All");
  const [filterAge, setFilterAge] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Admin Management State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminSaving, setIsAdminSaving] = useState(false);

  const filteredProfiles = profiles.filter((p) => {
    // Search
    const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
    const matchSearch = fullName.includes(searchQuery.toLowerCase());

    // District
    const matchDistrict = filterDistrict === "All" || p.district_id.toString() === filterDistrict;

    // Gender
    const matchGender = filterGender === "All" || p.gender === filterGender;

    // Age
    let matchAge = true;
    if (filterAge !== "All") {
      if (filterAge === "Under 18") matchAge = p.age < 18;
      else if (filterAge === "18-24") matchAge = p.age >= 18 && p.age <= 24;
      else if (filterAge === "25-35") matchAge = p.age >= 25 && p.age <= 35;
      else if (filterAge === "36+") matchAge = p.age >= 36;
    }

    return matchSearch && matchDistrict && matchGender && matchAge;
  });

  const hasActiveFilters = searchQuery !== "" || filterDistrict !== "All" || filterGender !== "All" || filterAge !== "All";

  function clearFilters() {
    setSearchQuery("");
    setFilterDistrict("All");
    setFilterGender("All");
    setFilterAge("All");
  }

  async function toggleStatus(id: string, currentStatus: boolean) {
    setUpdatingId(id);
    const newStatus = !currentStatus;
    const supabase = createClient();

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { error } = await supabase
          .from("profiles")
          .update({ arrived_status: newStatus })
          .eq("id", id);
          
        if (error) throw error;
      }
      
      // Update local state
      setProfiles((prev) =>
        prev.map((p) => (p.id === id ? { ...p, arrived_status: newStatus } : p))
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedProfile(null);
    setIsModalOpen(true);
  }

  function openEditModal(profile: Profile) {
    setModalMode("edit");
    setSelectedProfile(profile);
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this attendee?")) return;
    setUpdatingId(id);
    const supabase = createClient();
    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id);
      if (error) throw error;
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Check your permissions.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const district_id = parseInt(formData.get("district_id") as string, 10);
    const gender = formData.get("gender") as string;
    const age = parseInt(formData.get("age") as string, 10);

    const payload = { first_name, last_name, district_id, gender, age };
    const supabase = createClient();

    try {
      if (modalMode === "add") {
        const { data, error } = await supabase.from("profiles").insert([payload]).select().single();
        if (error) throw error;
        
        // Attach district name for UI
        const districtName = districts.find(d => d.id === district_id)?.name || "N/A";
        setProfiles([{ ...data, districts: { name: districtName } }, ...profiles]);
      } else if (modalMode === "edit" && selectedProfile) {
        const { data, error } = await supabase.from("profiles").update(payload).eq("id", selectedProfile.id).select().single();
        if (error) throw error;
        
        const districtName = districts.find(d => d.id === district_id)?.name || "N/A";
        setProfiles(profiles.map(p => p.id === selectedProfile.id ? { ...data, districts: { name: districtName } } : p));
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save attendee.");
    } finally {
      setIsSaving(false);
    }
  }

  function openAdminModal() {
    setIsAdminModalOpen(true);
  }

  async function handleAdminModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdminSaving(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const district_id = parseInt(formData.get("district_id") as string, 10);

    try {
      const resp = await fetch("/api/admin/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, district_id })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error);
      alert("District Admin account created successfully!");
      setIsAdminModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(`Failed: ${err.message}`);
    } finally {
      setIsAdminSaving(false);
    }
  }

  return (
    <div>
      <div className="p-6 border-b border-outline-variant/20 bg-surface-bright">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Manage Roster</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {adminRole === 'global' && (
              <button 
                onClick={openAdminModal}
                className="flex-1 sm:flex-none justify-center bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                Manage Admins
              </button>
            )}
            <button 
              onClick={openAddModal}
              className="flex-1 sm:flex-none justify-center bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Attendee
            </button>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
          <div className="relative w-full xl:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Search attendees by name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-4 py-2 rounded-lg border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
            >
              <option value="All">All Districts</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id.toString()}>{d.name}</option>
              ))}
            </select>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-4 py-2 rounded-lg border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
              className="px-4 py-2 rounded-lg border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
            >
              <option value="All">All Ages</option>
              <option value="Under 18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-35">25-35</option>
              <option value="36+">36+</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 flex items-center gap-1 transition-all text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">clear_all</span>
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Total counts readout */}
        <div className="flex gap-4 border-t border-outline-variant/10 pt-4 text-sm">
          <div className="bg-surface-container-high px-3 py-1.5 rounded text-on-surface-variant font-medium">
            Showing matching filters: <span className="font-bold text-on-surface">{filteredProfiles.length}</span>
          </div>
          {(filterDistrict !== "All" || filterGender !== "All" || filterAge !== "All" || searchQuery) && (
             <div className="bg-surface-container-low px-3 py-1.5 rounded text-on-surface-variant font-medium opacity-70">
               Out of <span className="font-bold text-on-surface">{profiles.length}</span> total
             </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm border-b border-outline-variant/20">
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">District</th>
              <th className="px-6 py-4 font-bold">Gender</th>
              <th className="px-6 py-4 font-bold">Age</th>
              <th className="px-6 py-4 font-bold">Registered</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-on-surface">
                    {p.last_name}, {p.first_name}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {p.districts ? p.districts.name : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {p.gender}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {p.age}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(p.id, p.arrived_status)}
                      disabled={updatingId === p.id}
                      className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                        p.arrived_status
                          ? "bg-primary-container text-on-primary-container border border-primary/20"
                          : "bg-surface-container-highest text-on-surface-variant border border-outline-variant hover:bg-surface-variant"
                      }`}
                    >
                      {updatingId === p.id ? (
                        <span className="material-symbols-outlined animate-spin text-[18px]">
                          refresh
                        </span>
                      ) : p.arrived_status ? (
                        <span className="material-symbols-outlined text-[18px]">
                          check
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">
                          close
                        </span>
                      )}
                      {p.arrived_status ? "Arrived" : "Pending"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-on-surface-variant">
                      <button 
                        onClick={() => openEditModal(p)}
                        className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={updatingId === p.id}
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-1 hover:text-error transition-colors disabled:opacity-50"
                        disabled={updatingId === p.id}
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No attendees found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="animate-in fade-in zoom-in duration-200 ease-out z-10 w-full max-w-2xl">
            <div className="bg-surface-container-lowest w-full rounded-2xl p-5 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">
                {modalMode === "add" ? "Add New Attendee" : "Edit Attendee"}
              </h3>
            
              <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="first_name">First Name</label>
                  <input required defaultValue={selectedProfile?.first_name || ""} id="first_name" name="first_name" className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="last_name">Last Name</label>
                  <input required defaultValue={selectedProfile?.last_name || ""} id="last_name" name="last_name" className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="district_id">District</label>
                <select 
                  required 
                  defaultValue={selectedProfile?.district_id || ""} 
                  id="district_id" 
                  name="district_id" 
                  className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Select District</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id} disabled={adminRole === 'district' && adminDistrictId !== d.id}>
                      {d.name} {adminRole === 'district' && adminDistrictId !== d.id ? '(Locked)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="gender">Gender</label>
                  <select required defaultValue={selectedProfile?.gender || ""} id="gender" name="gender" className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary">
                    <option value="" disabled>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="age">Age</label>
                  <input required defaultValue={selectedProfile?.age || ""} id="age" name="age" type="number" min="1" max="120" className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-container transition-all flex justify-center items-center gap-2"
              >
                {isSaving ? <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span> : null}
                {modalMode === "add" ? "Add Attendee" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
      )}

      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAdminModalOpen(false)}></div>
          <div className="animate-in fade-in zoom-in duration-200 ease-out z-10 w-full max-w-md">
            <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 sm:p-8 shadow-2xl relative">
              <button 
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <h3 className="font-headline text-xl font-bold mb-4 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                Add District Admin
              </h3>
              
              <form onSubmit={handleAdminModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="email">Email</label>
                  <input required type="email" id="email" name="email" className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="password">Password (min 6 chars)</label>
                  <input required type="password" id="password" name="password" minLength={6} className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1" htmlFor="admin_district_id">Assigned District</label>
                  <select 
                    required 
                    defaultValue="" 
                    id="admin_district_id" 
                    name="district_id" 
                    className="w-full px-3 py-2 rounded-lg border-outline-variant bg-surface-bright outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="" disabled>Select District</option>
                    {districts.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isAdminSaving}
                  className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-container transition-all flex justify-center items-center gap-2"
                >
                  {isAdminSaving ? <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span> : null}
                  Create Admin Account
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
