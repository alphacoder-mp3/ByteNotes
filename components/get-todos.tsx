import prisma from '@/lib/db';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteTodo } from './delete-todo';
import { UpdateTodo } from './update-todo';

const GetTodos = async ({
  user,
}: {
  user: { id: string; username: string };
}) => {
  const mytodo = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
    select: {
      title: true,
      description: true,
      done: true,
      id: true,
      user: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return (
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Username</TableHead>
          {/* <TableHead>Delete</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {mytodo.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.done ? 'Done' : 'Pending'}</TableCell>
            <TableCell>{item.user.username}</TableCell>
            <TableCell>
              <DeleteTodo id={item.id} userId={user.id} />
            </TableCell>
            <TableCell>
              <UpdateTodo item={item} userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GetTodos;
