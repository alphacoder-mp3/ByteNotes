import CreateNotes from '@/components/create-notes';
// import CreateTodo from '@/components/create-todo';
import GetNotes from '@/components/get-notes';
import { useServerSession } from '@/hooks/useServerSession';
import type { Metadata } from 'next';

export default async function Home() {
  const userId = await useServerSession();
  if (!userId) return;
  return (
    <div className="container mx-auto p-4 m-12 max-h-screen w-full">
      <div className={'flex items-center justify-center mb-6'}>
        <div className="sm:hidden text-2xl md:text-4xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-4 py-2 rounded-md w-fit italic text-white">
          ByteNotes.
        </div>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4 mt-8">Create a New Note</h1> */}
      {/* <CreateTodo user={user} /> */}
      <CreateNotes userId={userId} />
      <GetNotes userId={userId} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ByteNotes.`,
    description: 'Customize your notes and collaborate ',
  };
}
