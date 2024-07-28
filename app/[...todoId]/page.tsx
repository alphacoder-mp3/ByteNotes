import GetTodos from '@/components/get-todos';
import { useServerSession } from '@/lib/useServerSession';

export default async function TodoHomePage({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  const { user } = await useServerSession();

  return (
    <div className="container mx-auto p-4 m-12 max-h-screen w-full">
      <GetTodos user={user} page={todoId} />
    </div>
  );
}
