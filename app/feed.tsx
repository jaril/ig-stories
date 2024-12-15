"use client";

import { useGetUsers, User } from "./useGetUsers";

export default function Feed() {
  return (
    <div className="flex flex-row h-screen">
      <Header />
      <Stories />
    </div>
  );
}

function Header() {
  return (
    <div className="p-4 py-6 border-r">
      <div
        className="h-12 w-12"
        style={{
          backgroundImage: `url("/instagram.svg")`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}

function Stories() {
  const users = useGetUsers();

  return (
    <div className="flex flex-col">
      <div className="p-4 flex flex-row gap-4">
        {users.map((u) => (
          <Story user={u} key={u.id} />
        ))}
      </div>
    </div>
  );
}

function Story({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={`/stories/${user.name}`}
        className="relative w-16 h-16 rounded-full"
      >
        <div className="absolute inset-0 rounded-full border-2 border-red-500"></div>
        <div
          className="absolute inset-1 rounded-full border-1 border-white bg-black"
          style={{
            backgroundImage: `url("/profile-pictures/${user.photo}")`,
            backgroundSize: "cover",
          }}
        ></div>
      </a>
      <div className="text-xs">{user.name}</div>
    </div>
  );
}
