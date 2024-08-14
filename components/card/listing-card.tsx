'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToast } from '@/components/ui/use-toast';
import { handleKeyDown, autoResizeTextarea } from '@/common/utility';
import { ImageUploadButton } from '@/components/upload-image';
import { deleteImage } from '@/app/actions/delete-todo-image';
import { updateTodo } from '@/app/actions/todo-actions';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useColorPalette } from '@/hooks/useColorPalette';
import {
  EllipsisVertical,
  CircleCheck,
  CircleUser,
  Palette,
  Pin,
  Trash2,
  CircleX,
} from 'lucide-react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type ImageProps = {
  url: string;
  id: string;
};

export const ListingCard = ({
  item,
  children,
  className,
  userId,
}: {
  item: {
    id: string;
    todoColor: string;
    title: string;
    description: string;
    images: ImageProps[];
  };
  children: React.ReactNode;
  className: string;
  userId: string;
}) => {
  const {
    isOpened,
    setIsOpened,
    bgColors,
    bgColor,
    setBgColor,
    colorPaletteRef,
  } = useColorPalette();

  const dialogContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  useOutsideClick(colorPaletteRef, () => {
    setIsOpened(false);
  });
  const handleDelete = async (imageId: string) => {
    const result = await deleteImage(imageId);
    if (result.success) {
      toast({ title: 'Image deleted successfully' });
    } else {
      toast({
        title: 'Something went wrong! Please try again',
        variant: 'destructive',
      });
    }
  };

  useOutsideClick(dialogContentRef, () => {
    const formData = new FormData(formRef.current!);

    // Normalize the input values by trimming and removing extra spaces and newlines
    const normalize = (value: string | null) =>
      value ? value.trim().replace(/\s+/g, ' ') : '';

    const currentTitle = normalize(formData.get('title')?.toString() || '');
    const currentDescription = normalize(
      formData.get('description')?.toString() || ''
    );

    const originalTitle = normalize(item.title);
    const originalDescription = normalize(item.description);

    if (
      currentTitle !== originalTitle ||
      currentDescription !== originalDescription ||
      bgColor
    ) {
      action(formData);
    }
  });
  async function action(formData: FormData) {
    const res = await updateTodo(
      item.id,
      formData,
      userId,
      bgColor ? bgColor : item.todoColor
    );
    formRef.current?.reset();
    toast({
      title: res.error ? 'Uh oh! Something went wrong.' : 'success',
      description: res.message,
      variant: res.error ? 'destructive' : 'default',
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (bgColor && item.todoColor !== bgColor) {
      const formData = new FormData();
      formData.append('title', item.title);
      formData.append('description', item.description);
      action(formData);
      setBgColor('');
    }
  }, [bgColor]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card key={item.id} className={className + ' group'}>
          {children}
          <div className="flex items-center gap-6 absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Palette
              size={16}
              onClick={e => {
                e.preventDefault();
                setIsOpened(true);
              }}
            />
            <ImageUploadButton todoId={item.id} />
            <CircleUser size={16} />
            <EllipsisVertical size={16} />
          </div>
          <div className="absolute top-[-10] left-[-10] opacity-0 group-hover:opacity-100 transition-opacity">
            <CircleCheck size={24} fill="#ffffff" stroke="#000000" />
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pin size={24} />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent
        className={`mb-4 border border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column ${
          item.todoColor ? item.todoColor : bgColor ? bgColor : ''
        }`}
        ref={dialogContentRef}
      >
        <DialogHeader>
          {item.images?.map((item: ImageProps) => (
            <div
              className="relative group"
              key={item.id}
              onClick={() => setSelectedImage(item.url)}
            >
              <Image
                src={item.url}
                key={item.id}
                alt="Notes Images"
                width={400}
                height={400}
                className="h-full w-full rounded"
              />
              <div
                className="opacity-0 absolute right-2 bottom-2 bg-slate-400 p-2 rounded overflow-hidden transition-opacity duration-700 ease-in-out group-hover:opacity-70 cursor-pointer"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 size={16} />
              </div>
            </div>
          ))}
          <DialogDescription className="sr-only">
            Make changes to your notes here.
          </DialogDescription>
          <form ref={formRef}>
            <DialogTitle>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
                defaultValue={item.title}
                className={`w-full p-2 border-b border-slate-700 mb-2 outline-none ${
                  item.todoColor ? item.todoColor : bgColor ? bgColor : ''
                }`}
              />
            </DialogTitle>

            <textarea
              name="description"
              placeholder="Take a note..."
              id="description"
              rows={1}
              required
              autoFocus
              defaultValue={item.description}
              className={`w-full p-2 border-b border-slate-700 mb-2 outline-none resize-none ${
                item.todoColor ? item.todoColor : bgColor ? bgColor : ''
              }`}
              onKeyDown={handleKeyDown}
              onFocus={e =>
                autoResizeTextarea(e.currentTarget as HTMLTextAreaElement)
              }
              onInput={e =>
                autoResizeTextarea(e.currentTarget as HTMLTextAreaElement)
              }
            />
          </form>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-6 absolute bottom-4 left-4">
            <Palette
              size={16}
              onClick={e => {
                e.preventDefault();
                setIsOpened(true);
              }}
              className="cursor-pointer"
            />
            <ImageUploadButton todoId={item.id} />
            <CircleUser size={16} className="cursor-pointer" />
            <EllipsisVertical size={16} className="cursor-pointer" />
          </div>
          <div className="absolute top-2 right-2">
            <Pin size={24} />
          </div>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
      {isOpened && (
        <div
          className="fixed inset-0 max-w-full h-12 px-2 bg-zinc-900 flex items-center gap-2 rounded-xl z-10 justify-center"
          ref={colorPaletteRef}
        >
          {bgColors.map(color => (
            <div
              className={`${color} h-3 w-3 lg:h-6 lg:w-6 rounded-full hover:border border-white cursor-pointer`}
              key={color}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={selectedImage}
              alt="Full Image"
              layout="intrinsic"
              width={1000}
              height={1000}
              className="rounded h-full w-full"
            />
            <CircleX
              size={24}
              className="absolute top-2 right-2 bg-opacity-50 cursor-pointer"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};
