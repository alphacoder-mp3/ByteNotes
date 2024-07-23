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

const GetTodos = async () => {
  const mytodo = await prisma.todo.findMany({
    // where: {
    //   userId: 'clyx64o9y0000wyma4kaekrmk',
    // },
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {mytodo.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.done ? 'Done' : 'Pending'}</TableCell>
            <TableCell>{item.user.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GetTodos;
