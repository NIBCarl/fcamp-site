"use client";

import { useState } from "react";

export default function MediaManager() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      // 1. Get signature from our secure API
      const signRes = await fetch("/api/upload", { method: "POST", body: JSON.stringify({ folder: "fcamp_media" }) });
      if (!signRes.ok) {
        throw new Error(await signRes.text() || "Failed to get upload signature");
      }
      
      const { signature, timestamp, api_key, cloud_name, error } = await signRes.json();
      if (error) throw new Error(error);

      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "fcamp_media");

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const data = await uploadRes.json();
      setMessage({ type: 'success', text: `Uploaded successfully: ${data.secure_url}` });
      setFile(null);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Upload failed" });
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest editorial-shadow rounded-2xl border border-outline-variant/20 p-6">
      <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
        Media Manager
      </h2>
      <p className="text-on-surface-variant mb-6 text-sm">
        Upload promotional images or videos directly to Cloudinary. These will be displayed on the public landing page.
      </p>

      <form onSubmit={handleUpload} className="flex flex-col gap-4 max-w-lg">
        <input 
          type="file" 
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-container file:text-on-primary-container file:font-semibold hover:file:bg-primary-container/80 text-sm text-on-surface"
        />
        
        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          disabled={!file || uploading}
          className="bg-primary text-on-primary font-bold px-6 py-2 rounded-xl transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed self-start flex items-center gap-2"
        >
          {uploading ? (
            <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
          )}
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </form>
    </div>
  );
}
