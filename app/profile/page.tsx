import prisma from '@/lib/db';
import ProfilePicUpload from '@/components/profile-pic-upload';
import Image from 'next/image';

export default async function ProfilePage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user.profilePic && (
        <Image
          src={`/uploads/${user.profilePic}`}
          alt="Profile Picture"
          width={200}
          height={200}
        />
      )}
      <ProfilePicUpload userId={user.id} />
      <p>Username: {user.username}</p>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Created At: {user.createdAt?.toLocaleString()}</p>
      <p>Last Updated: {user.updatedAt?.toLocaleString()}</p>
    </div>
  );
}
