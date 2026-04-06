"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type District = {
  id: number;
  name: string;
};

export default function RegistrationForm({ districts }: { districts: District[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const district_id = parseInt(formData.get("district_id") as string, 10);
    const gender = formData.get("gender") as string;
    const age = parseInt(formData.get("age") as string, 10);

    if (!first_name || !last_name || isNaN(district_id) || !gender || isNaN(age)) {
      setErrorMsg("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("profiles").insert([
        { first_name, last_name, district_id, gender, age }
      ]);
      
      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong during registration.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">check</span>
        </div>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Registration Complete!</h2>
        <p className="font-body text-on-surface-variant mb-8">
          We look forward to seeing you at the horizon.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary font-bold hover:underline"
        >
          Register another person
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {errorMsg && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg flex items-center gap-3 text-sm">
          <span className="material-symbols-outlined">error</span>
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="first_name" className="block text-sm font-bold text-on-surface">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            placeholder="John"
            className="w-full px-4 py-3 rounded-lg border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="last_name" className="block text-sm font-bold text-on-surface">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            placeholder="Doe"
            className="w-full px-4 py-3 rounded-lg border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="district_id" className="block text-sm font-bold text-on-surface">
            District
          </label>
          <div className="relative">
            <select
              id="district_id"
              name="district_id"
              required
              defaultValue=""
              className="w-full px-4 py-3 rounded-lg border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none"
            >
              <option value="" disabled>Select your district</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-bold text-on-surface">
            Gender
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              required
              defaultValue=""
              className="w-full px-4 py-3 rounded-lg border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none"
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="age" className="block text-sm font-bold text-on-surface">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min="1"
          max="120"
          required
          placeholder="e.g. 21"
          className="w-full px-4 py-3 rounded-lg border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-container hover:bg-primary text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-8"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined animate-spin">refresh</span>
            Registering...
          </>
        ) : (
          "Submit Registration"
        )}
      </button>
    </form>
  );
}
