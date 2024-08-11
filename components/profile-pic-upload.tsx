'use client';

import { useState } from 'react';
import { updateProfilePic } from '@/app/actions/update-profile-pic';
import { useToast } from '@/components/ui/use-toast';

export default function ProfilePicUpload({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log('File uploaded successfully:', data.filename);
        const result = await updateProfilePic(userId, data.filename);
        console.log('Update profile pic result:', result);
        if (result.success) {
          toast({
            title: 'Profile picture updated successfully!',
          });
        } else {
          throw new Error(result.error || 'Failed to update profile picture');
        }
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="cursor-pointer rounded  border border-sky-600"
      />
      <button type="submit" disabled={!file}>
        Upload Profile Picture
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
