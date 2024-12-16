import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StoryAvatarProps {
  username: string
  avatarUrl: string
  viewed: boolean
  firstStoryId: string
}

export default function StoryAvatar({ username, avatarUrl, viewed, firstStoryId }: StoryAvatarProps) {
  return (
    <Link href={`/stories/${username}/${firstStoryId}`} className="flex flex-col items-center space-y-1">
      <div className={`rounded-full p-[2px] ${viewed ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
        <div className="bg-white rounded-full p-[1px]">
          <Image
            src={avatarUrl}
            alt={`${username}'s avatar`}
            width={52}
            height={52}
            className="rounded-full"
          />
        </div>
      </div>
      <span className="text-xs text-gray-600 truncate w-14 text-center">{username}</span>
    </Link>
  )
}

