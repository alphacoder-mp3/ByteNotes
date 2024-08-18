'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleUser } from 'lucide-react';
import { Collaborator } from '@prisma/client';
import { Button } from './ui/button';
import {
  addCollaborator,
  removeCollaborator,
} from '@/app/actions/collaborate-actions';
import { FormEvent } from 'react';

export const Collaboration = ({ collabs, userId, todoId }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleUser
          size={16}
          onClick={e => e.stopPropagation()}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget);
            if (formData.get('collaborator')) {
              await addCollaborator(
                todoId,
                formData.get('collaborator') as string
              );
            }
          }}
        >
          <input
            type="text"
            name="collaborator"
            id="collaborator"
            placeholder="Add collaborator"
          />
          <Button type="submit">Add Collaborator</Button>
        </form>

        <ul>
          {collabs.map((item: any) => (
            <li key={item.user.id}>
              {item.user.username}
              {item.user.id !== item.id && (
                <Button
                  onClick={async () => await removeCollaborator(todoId, userId)}
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
