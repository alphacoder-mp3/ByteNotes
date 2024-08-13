'use client';

import { useState, FormEvent } from 'react';
import { uploadImages } from '@/app/actions/upload-images'; // Adjust the path based on your directory structure
import { useToast } from '@/components/ui/use-toast';
import { ImageIcon } from 'lucide-react';

export default function TodoImageUpload({ todoId }: { todoId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const result = await uploadImages(formData, todoId);

      if (result.success) {
        toast({ title: 'Images uploaded successfully!' });
        // Optionally, update the UI with the new images
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        <ImageIcon size={16} />
      </button>
    </form>
  );
}
