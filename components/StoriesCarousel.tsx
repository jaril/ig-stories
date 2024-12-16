"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StoryCard from "./StoryCard";
import ErrorScreen from "./ErrorScreen";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const STORY_DURATION = 5000; // 5 seconds

interface StoriesCarouselProps {
  users: User[];
  initialUsername: string;
  initialStoryId: string;
  initialUserIndex: number;
  initialStoryIndex: number;
}

export default function StoriesCarousel({
  users,
  initialUsername,
  initialStoryId,
  initialUserIndex,
  initialStoryIndex,
}: StoriesCarouselProps) {
  const router = useRouter();
  const [activeUserIndex, setActiveUserIndex] = useState(initialUserIndex);
  const [activeStoryIndex, setActiveStoryIndex] = useState(initialStoryIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userIndex = users.findIndex(
      (user) => user.username === initialUsername
    );
    if (userIndex !== -1) {
      setActiveUserIndex(userIndex);
      const storyIndex = users[userIndex].stories.findIndex(
        (story) => story.id === initialStoryId
      );
      if (storyIndex !== -1) {
        setActiveStoryIndex(storyIndex);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [initialUsername, initialStoryId, users]);

  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            handleNext();
            return 0;
          }
          return prevProgress + (100 / STORY_DURATION) * 100; // Update every 100ms
        });
      }, 100);
    } else if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, activeUserIndex, activeStoryIndex]);

  useEffect(() => {
    // Focus the container when the component mounts
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const updateURL = (userIndex: number, storyIndex: number) => {
    const user = users[userIndex];
    const story = user.stories[storyIndex];
    router.push(`/stories/${user.username}/${story.id}`);
  };

  const handlePrevious = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      updateURL(activeUserIndex, activeStoryIndex - 1);
    } else if (activeUserIndex > 0) {
      const newUserIndex = activeUserIndex - 1;
      const newStoryIndex = users[newUserIndex].stories.length - 1;
      setActiveUserIndex(newUserIndex);
      setActiveStoryIndex(newStoryIndex);
      updateURL(newUserIndex, newStoryIndex);
    }
    setProgress(0);
  };

  const handleNext = () => {
    const currentUser = users[activeUserIndex];
    if (activeStoryIndex < currentUser.stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      updateURL(activeUserIndex, activeStoryIndex + 1);
    } else if (activeUserIndex < users.length - 1) {
      const newUserIndex = activeUserIndex + 1;
      setActiveUserIndex(newUserIndex);
      setActiveStoryIndex(0);
      updateURL(newUserIndex, 0);
    } else {
      // Reset to the first user and story when reaching the end
      setActiveUserIndex(0);
      setActiveStoryIndex(0);
      updateURL(0, 0);
    }
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const navigateToPreviousUser = () => {
    if (previousUser) {
      setActiveUserIndex(activeUserIndex - 1);
      setActiveStoryIndex(0);
      updateURL(activeUserIndex - 1, 0);
      setProgress(0);
    }
  };

  const navigateToNextUser = () => {
    if (nextUser) {
      setActiveUserIndex(activeUserIndex + 1);
      setActiveStoryIndex(0);
      updateURL(activeUserIndex + 1, 0);
      setProgress(0);
    }
  };

  const navigateToHomepage = () => {
    router.push("/");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case " ":
        e.preventDefault();
        togglePlayPause();
        break;
      case "Escape":
        navigateToHomepage();
        break;
    }
  };

  if (error) {
    return (
      <ErrorScreen error={{ name: "", message: "An error has happened" }} />
    );
  }

  const activeUser = users[activeUserIndex];
  const activeStory = activeUser.stories[activeStoryIndex];

  const previousUser = users[activeUserIndex - 1];
  const nextUser = users[activeUserIndex + 1];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full max-w-7xl mx-auto flex justify-center items-center h-[80vh] focus:outline-none"
    >
      <Link
        href="/"
        className="absolute top-4 left-4 z-50"
        aria-label="Return to homepage"
      >
        <Image
          src="/instagram.svg?height=32&width=32"
          alt="Instagram"
          width={32}
          height={32}
        />
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 bg-black/20 text-white"
        onClick={navigateToHomepage}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close stories and return to homepage</span>
      </Button>
      <div className="flex items-center justify-center w-full">
        <div
          className="w-24 md:w-32 lg:w-40 opacity-50 transition-opacity duration-300 ease-in-out cursor-pointer relative"
          onClick={navigateToPreviousUser}
          tabIndex={0}
          role="button"
          aria-label="View previous user's stories"
          onKeyDown={(e) => e.key === "Enter" && navigateToPreviousUser()}
        >
          {previousUser && (
            <>
              <StoryCard
                user={previousUser}
                story={previousUser.stories[previousUser.stories.length - 1]}
                storyIndex={previousUser.stories.length - 1}
                totalStories={previousUser.stories.length}
                isPlaying={false}
                onTogglePlayPause={() => {}}
                isActive={false}
                progress={0}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <Image
                  src={previousUser.avatarUrl}
                  alt={previousUser.username}
                  width={40}
                  height={40}
                  className="rounded-full mb-2"
                />
                <span className="text-sm font-semibold">
                  {previousUser.username}
                </span>
                <span className="text-xs">
                  {formatTimestamp(
                    previousUser.stories[previousUser.stories.length - 1]
                      .timestamp
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="bg-white/10 hover:bg-white/20 text-white z-10 mx-4"
          onClick={handlePrevious}
          disabled={!previousUser && activeStoryIndex === 0}
          aria-label="Previous story"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="w-64 md:w-80 lg:w-96 z-20">
          <StoryCard
            user={activeUser}
            story={activeStory}
            storyIndex={activeStoryIndex}
            totalStories={activeUser.stories.length}
            isPlaying={isPlaying}
            onTogglePlayPause={togglePlayPause}
            isActive={true}
            progress={progress}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="bg-white/10 hover:bg-white/20 text-white z-10 mx-4"
          onClick={handleNext}
          disabled={
            !nextUser && activeStoryIndex === activeUser.stories.length - 1
          }
          aria-label="Next story"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div
          className="w-24 md:w-32 lg:w-40 opacity-50 transition-opacity duration-300 ease-in-out cursor-pointer relative"
          onClick={navigateToNextUser}
          tabIndex={0}
          role="button"
          aria-label="View next user's stories"
          onKeyDown={(e) => e.key === "Enter" && navigateToNextUser()}
        >
          {nextUser && (
            <>
              <StoryCard
                user={nextUser}
                story={nextUser.stories[0]}
                storyIndex={0}
                totalStories={nextUser.stories.length}
                isPlaying={false}
                onTogglePlayPause={() => {}}
                isActive={false}
                progress={0}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <Image
                  src={nextUser.avatarUrl}
                  alt={nextUser.username}
                  width={40}
                  height={40}
                  className="rounded-full mb-2"
                />
                <span className="text-sm font-semibold">
                  {nextUser.username}
                </span>
                <span className="text-xs">
                  {formatTimestamp(nextUser.stories[0].timestamp)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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
