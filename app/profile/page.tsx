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
      <h1>Profile</h1>
      {UserDetails?.profilePic && (
        <Image
          src={`/uploads/${UserDetails.profilePic}`}
          alt="Profile Picture"
          width={200}
          height={200}
        />
      )}
      <ProfilePicUpload userId={user.id} />
      <p>Username: {user.username}</p>
      <p>
        Name: {UserDetails?.firstName} {UserDetails?.lastName}
      </p>
      <p>Created At: {UserDetails?.createdAt?.toLocaleString()}</p>
      <p>Last Updated: {UserDetails?.updatedAt?.toLocaleString()}</p>
    </div>
  );
}
