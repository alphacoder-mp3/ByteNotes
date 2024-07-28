'use client';

import { FormEvent, useRef, useState } from 'react';
import { createTodo } from '@/app/actions/todoactions';
import { useToast } from '@/components/ui/use-toast';
import { ImageIcon, SquareCheckBig } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export default function CreateNotes({
  user,
}: {
  user: { id: string; username: string };
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  async function action(formData: FormData) {
    const res = await createTodo(formData, user.id);
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

  useOutsideClick(expandRef, () => {
    if (isExpanded) {
      const formData = new FormData(formRef.current!);
      if (formData.get('title') && formData.get('description')) {
        // will keep this condition check until we have both these fields required, will change the schema later, to have these optional and make either of these mandatory
        action(formData);
      }
    }
    setIsExpanded(false);
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="w-full flex justify-center">
        <div
          className={`w-2/5 border border-slate-500 rounded-lg ${
            isExpanded ? 'h-auto p-4' : 'h-11'
          }`}
          onClick={() => setIsExpanded(true)}
          ref={expandRef}
        >
          {!isExpanded && (
            <div className="flex justify-between items-center h-full px-4 text-neutral-400">
              <div>Take a note...</div>
              <div className="flex items-center gap-4">
                <SquareCheckBig />
                <ImageIcon />
              </div>
            </div>
          )}
          {isExpanded && (
            <div className="mt-4">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
                className="w-full p-2 border-b border-slate-700 mb-2 outline-none"
              />
              <textarea
                name="description"
                placeholder="Take a note..."
                id="description"
                rows={3}
                required
                className="w-full p-2 border-b border-slate-700 mb-2 outline-none resize-none"
              />
              <div className="flex items-center my-4">
                <input
                  type="checkbox"
                  name="done"
                  id="done"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="done"
                  className="ml-2 block text-sm font-medium text-neutral-400"
                >
                  Done
                </label>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-neutral-400">
                  <SquareCheckBig />
                  <ImageIcon />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-neutral-200 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
