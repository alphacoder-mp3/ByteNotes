import prisma from '@/lib/db';
import { User } from '@prisma/client';
import ProfilePicUpload from '@/components/profile-pic-upload';
import Image from 'next/image';
import { useServerSession } from '@/lib/useServerSession';

export default async function ProfilePage() {
  const { user } = await useServerSession();
  const UserDetails: User | null = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="m-4">Profile</h1>
      {UserDetails?.profilePic && (
        <div className="rounded-full border-violet-600 border-8 overflow-hidden w-40 h-40 mb-4">
          <Image
            src={UserDetails.profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            layout="lazy"
            height={200}
            width={200}
          />
        </div>
      )}

      <ProfilePicUpload userId={user.id} />
      <p className="p-4">Username: {user.username}</p>
      <p>
        Name: {UserDetails?.firstName} {UserDetails?.lastName}
      </p>
      <p>Created At: {UserDetails?.createdAt?.toLocaleString()}</p>
      <p>Last Updated: {UserDetails?.updatedAt?.toLocaleString()}</p>
    </div>
  );
}
