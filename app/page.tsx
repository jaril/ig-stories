"use client";

import React from "react";
import Image from "next/image";
import StoryAvatar from "@/components/StoryAvatar";
import SkeletonAvatar from "@/components/SkeletonAvatar";
import ErrorScreen from "@/components/ErrorScreen";
import { useUsers } from "@/hooks/useUsers";
import AnimatedStoryAvatar from "@/components/AnimatedStoryAvatar";

const SKELETON_COUNT = 5; // Adjust this number based on the expected number of avatars

export default function Home() {
  const { users, loading, error } = useUsers();

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <main className="flex min-h-screen">
      <div className="w-16 border-r border-gray-200 flex flex-col items-center pt-4">
        <Image
          src="/instagram.svg?height=32&width=32"
          alt="Instagram"
          width={32}
          height={32}
          className="rounded-md"
        />
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="max-w-screen-xl px-4 py-2">
          <div className="flex space-x-4">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <SkeletonAvatar key={index} />
                ))
              : users.map((user) => (
                  <AnimatedStoryAvatar
                    key={user.id}
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                    firstStoryId={user.stories[0].id}
                    stories={user.stories}
                  />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
