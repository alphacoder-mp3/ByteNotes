'use client';
import { Edit3Icon } from 'lucide-react';
import { updateTodo } from '@/app/actions/todoactions';

import { FormEvent, useRef } from 'react';
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
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type updateTodoProps = {
  title: string;
  description: string;
  done: boolean;
  id: string;
  user: {
    username: string;
  };
};

export const UpdateTodo = ({
  item,
  userId,
}: {
  item: updateTodoProps;
  userId: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  async function action(formData: FormData) {
    const res = await updateTodo(item.id, formData, userId);
    formRef.current?.reset();
    toast({
      title: res.error ? 'Uh oh! Something went wrong.' : 'success',
      description: res.message,
      variant: res.error ? 'destructive' : 'default',
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Convert checkbox value to boolean
    const done = formData.get('done') === 'on';
    formData.set('done', done.toString());

    action(formData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Edit3Icon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              defaultValue={item.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium ">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              defaultValue={item.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="done"
              id="done"
              defaultChecked={item.done}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="done" className="ml-2 block text-sm font-medium">
              Done
            </label>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Todo
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
