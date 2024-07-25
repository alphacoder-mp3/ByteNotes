'use client';
import { LucideTrash2 } from 'lucide-react';
import { deleteTodo } from '@/app/actions/todoactions';
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
                if (res.error) {
                  toast({
                    title: 'Uh oh! Something went wrong.',
                    description: res.error,
                    variant: 'destructive',
                  });
                } else {
                  toast({
                    title: 'success',
                    description: res.message,
                  });
                }
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
