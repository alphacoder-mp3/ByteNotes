'use client';
import { LucideTrash2 } from 'lucide-react';
import { deleteTodo } from '@/app/actions/todo-actions';
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

export const DeleteTodo = ({ id, userId }: { id: string; userId: string }) => {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger>
        <LucideTrash2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={async () => {
                const res = await deleteTodo(id, userId);
                toast({
                  title: res.error ? 'Uh oh! Something went wrong.' : 'success',
                  description: res.message,
                  variant: res.error ? 'destructive' : 'default',
                });
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
