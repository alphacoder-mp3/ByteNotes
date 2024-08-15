import GetTodos from '@/components/get-todos';
import { useServerSession } from '@/hooks/useServerSession';

export default async function TodoHomePage({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  const userId = await useServerSession();
  if (!userId) return;

  return (
    <div className="container mx-auto p-4 m-12 max-h-screen w-full">
      <GetTodos userId={userId} page={todoId} />
    </div>
  );
}
