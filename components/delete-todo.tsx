'use client';
import { LucideTrash2 } from 'lucide-react';
import { deleteTodo } from '@/app/actions/todoactions';

export const DeleteTodo = ({ id }: { id: string }) => {
  return (
    <LucideTrash2 className="cursor-pointer" onClick={() => deleteTodo(id)} />
  );
};
