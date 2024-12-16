import React from 'react'

export default function SkeletonAvatar() {
  return (
    <div className="flex flex-col items-center space-y-1 animate-pulse">
      <div className="w-[56px] h-[56px] bg-gray-200 rounded-full"></div>
      <div className="w-14 h-3 bg-gray-200 rounded"></div>
    </div>
  )
}

