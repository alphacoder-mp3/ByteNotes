'use client';
import Image from 'next/image';
import { useRef } from 'react';

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
import { getLightModeColor, getDarkModeColor } from '@/common/common';

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

  useOutsideClick(colorPaletteRef, () => {
    setIsOpened(false);
  });

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

  const handleDelete = async (
    imageId: string,
    e: React.SyntheticEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
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
        className={`mb-4 border border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column ${getLightModeColor(
          item.todoColor
        )} ${getDarkModeColor(item.todoColor)}`}
        ref={dialogContentRef}
      >
        <DialogHeader>
          {item.images?.map((item: ImageProps) => (
            <div className="relative group" key={item.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={item.url}
                    key={item.id}
                    alt="Notes Images"
                    width={400}
                    height={400}
                    className="h-full w-full rounded"
                  />
                </DialogTrigger>
                <DialogContent className="w-screen">
                  <div className="fixed bg-black bg-opacity-75 z-[100] w-screen sm:w-[500] md:w-[600] lg:w-[1000] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <div className="relative">
                      <Image
                        src={item.url}
                        alt="Notes Image Preview"
                        width={2000}
                        height={2000}
                        className="rounded h-full w-full"
                      />
                      <DialogClose asChild>
                        <CircleX
                          size={24}
                          className="absolute top-2 right-2 bg-opacity-50 cursor-pointer"
                        />
                      </DialogClose>
                    </div>
                  </div>
                  <DialogTitle className="sr-only">
                    {' '}
                    Notes image preview
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Notes image preview with full display
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <div
                className="opacity-0 absolute right-2 bottom-2 bg-slate-400 p-2 rounded overflow-hidden transition-opacity duration-700 ease-in-out group-hover:opacity-70 cursor-pointer"
                onClick={e => handleDelete(item.id, e)}
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
                className={`w-full p-2 border-b border-slate-700 mb-2 outline-none ${getLightModeColor(
                  item.todoColor
                )} ${getDarkModeColor(item.todoColor)}`}
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
              className={`w-full p-2 border-b border-slate-700 mb-2 outline-none resize-none ${getLightModeColor(
                item.todoColor
              )} ${getDarkModeColor(item.todoColor)}`}
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
            <Dialog>
              <DialogTrigger asChild>
                <Palette size={16} className="cursor-pointer" />
              </DialogTrigger>

              <DialogContent className="w-screen">
                <DialogTitle className="sr-only">Color Palette</DialogTitle>
                <DialogDescription className="sr-only">
                  Color Palette inside the card
                </DialogDescription>
                <div
                  className="fixed inset-0 h-24 md:w-[600] lg:w-[1000] lg:h-12 px-2 py-4 lg:py-0 bg-zinc-900 flex items-center justify-center gap-2 rounded-xl z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex-wrap"
                  ref={colorPaletteRef}
                >
                  {bgColors.map(color => (
                    <div
                      className={`${color} h-6 w-6 rounded-full hover:border border-white cursor-pointer`}
                      key={color}
                      onClick={() => setBgColor(color)}
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
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
          className="fixed inset-0 max-w-full h-12 px-2 py-4 md:py-0 bg-zinc-900 flex items-center justify-center flex-wrap gap-2 rounded-xl z-50"
          ref={colorPaletteRef}
        >
          {bgColors.map(color => (
            <div
              className={`${color} h-6 w-6 rounded-full hover:border border-white cursor-pointer`}
              key={color}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>
      )}
    </Dialog>
  );
};
