import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Story } from '@/lib/sample-data'

interface AnimatedStoryAvatarProps {
  username: string
  avatarUrl: string
  firstStoryId: string
  stories: Story[]
}

export default function AnimatedStoryAvatar({ username, avatarUrl, firstStoryId, stories }: AnimatedStoryAvatarProps) {
  const hasUnviewedStories = stories.some(story => !story.viewed)

  return (
    <Link href={`/stories/${username}/${firstStoryId}`} className="flex flex-col items-center space-y-1 group">
      <div className={`rounded-full p-[2px] relative overflow-hidden ${hasUnviewedStories ? 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600' : 'bg-gray-300'}`}>
        <div className="bg-white rounded-full p-[1px] relative z-10">
          <Image
            src={avatarUrl}
            alt={`${username}'s avatar`}
            width={52}
            height={52}
            className="rounded-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine" />
      </div>
      <span className="text-xs text-gray-600 truncate w-14 text-center">{username}</span>
    </Link>
  )
}

