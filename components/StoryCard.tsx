import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Heart,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProgressBar from "./ProgressBar";

interface Story {
  id: string;
  imageUrl: string;
  timestamp: number;
  viewed: boolean;
}

interface User {
  id: string;
  username: string;
  avatarUrl: string;
  stories: Story[];
}

interface StoryCardProps {
  user: User;
  story: Story;
  storyIndex: number;
  totalStories: number;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  isActive: boolean;
  progress: number;
}

export default function StoryCard({
  user,
  story,
  storyIndex,
  totalStories,
  isPlaying,
  onTogglePlayPause,
  isActive,
  progress,
}: StoryCardProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [replyText, setReplyText] = useState("");

  const toggleMute = () => setIsMuted(!isMuted);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reply sent:", replyText);
    setReplyText("");
  };

  return (
    <div
      className={`relative w-full aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden ${
        isActive ? "" : "pointer-events-none"
      }`}
    >
      <Image
        src={story.imageUrl}
        alt={`Story by ${user.username}`}
        layout="fill"
        objectFit="cover"
      />

      {isActive && (
        <>
          <div className="absolute top-0 left-0 right-0">
            <ProgressBar
              current={storyIndex}
              total={totalStories}
              progress={progress}
            />
          </div>

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center space-x-2">
              <Image
                src={user.avatarUrl}
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-xs text-gray-300">
                  {formatTimestamp(story.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onTogglePlayPause}
                className="bg-black/20 text-white"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="bg-black/20 text-white"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <form onSubmit={handleReply} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Send a message"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-grow bg-white/20 text-white placeholder-gray-300"
              />
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20  text-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="submit"
                className="bg-black/20  text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
