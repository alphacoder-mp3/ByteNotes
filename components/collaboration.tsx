'use client';

import React, { FormEvent, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleUser } from 'lucide-react';
import { Collaborator, User } from '@prisma/client';
import { Button } from './ui/button';
import {
  addCollaborator,
  removeCollaborator,
} from '@/app/actions/collaborate-actions';
import { useToast } from '@/components/ui/use-toast';

type CollaboratorWithUser = Collaborator & { user: User };

interface CollaborationProps {
  collabs: CollaboratorWithUser[];
  userId: string;
  todoId: string;
}

export const Collaboration: React.FC<CollaborationProps> = ({
  collabs,
  userId,
  todoId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const collaborator = formData.get('collaborator') as string;
    if (collaborator) {
      try {
        const result = await addCollaborator(todoId, collaborator);
        if (!result.success) {
          toast({
            title: 'success',
            description: result.message,
          });
        } else {
          toast({
            title: 'error',
            description: result.message,
            variant: 'destructive',
          });
          setIsOpen(false); // Optionally close the dialog or show a success message
        }
      } catch (error) {
        toast({
          title: 'error',
          description: 'something went wrong',
          variant: 'destructive',
        });
      }
    }
  };

  const handleRemove = async (collaboratorId: string) => {
    try {
      const result = await removeCollaborator(todoId, collaboratorId);
      if (!result.success) {
        toast({
          title: 'success',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: 'error',
        description: 'An error occurred while removing the collaborator.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CircleUser
          size={16}
          onClick={e => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Manage Collaborators</DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="collaborator"
            id="collaborator"
            placeholder="Add collaborator by username"
            className="w-full p-2 border rounded"
          />
          <Button type="submit">Add Collaborator</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {collabs.map(item => (
            <li
              key={item.user.id}
              className="flex justify-between items-center"
            >
              <span>{item.user.username}</span>
              <Button
                onClick={() => handleRemove(item.user.id)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
