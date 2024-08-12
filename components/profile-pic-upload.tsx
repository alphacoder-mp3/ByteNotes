'use client';

import { useState } from 'react';
import { updateProfilePic } from '@/app/actions/update-profile-pic';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function ProfilePicUpload({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

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
        setFile(null);
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
      toast({
        title: err instanceof Error ? err.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="cursor-pointer block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
      />
      <Button
        type="submit"
        disabled={!file || loading}
        className="w-full bg-violet-600 text-white py-4 rounded-lg
                   hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload Profile Picture'}
      </Button>
    </form>
  );
}
