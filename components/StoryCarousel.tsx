"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryCard } from "./StoryCard";
import { useGetUsers } from "@/app/useGetUsers";
import { useParams, useRouter } from "next/navigation";

export function StoryCarousel() {
  const router = useRouter();
  const users = useGetUsers();
  const params = useParams();

  const [activeIndex, setActiveIndex] = useState(
    users.findIndex((u) => u.name === params.id)
  );

  const handlePrev = () => {
    const prevUser = activeIndex > 0 ? activeIndex - 1 : users.length - 1;
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1));
    router.push(`/stories/${prevUser}`);
  };

  const handleNext = () => {
    const nextUser =
      users[activeIndex < users.length - 1 ? activeIndex + 1 : 0].name;
    setActiveIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0));
    router.push(`/stories/${nextUser}`);
  };

  const validId = users.find((u) => u.name === params.id);

  if (!validId) {
    return <div className="text-white">Invalid ID</div>;
  }

  return (
    <div className="relative flex items-center justify-center w-full h-[calc(100vh-4rem)]">
      <div className="flex items-center space-x-4">
        {users.map((user, index) => {
          const position = index - activeIndex;
          const isActive = index === activeIndex;
          return (
            <div
              key={user.id}
              className={`
                transition-all duration-300 ease-in-out flex items-center
                ${Math.abs(position) >= 2 ? "hidden" : ""}
                ${position === -1 ? "-translate-x-1/4" : ""}
                ${position === 1 ? "translate-x-1/4" : ""}
                ${!isActive ? "-mx-12" : ""}
              `}
            >
              {isActive && (
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-12 bg-black/50 hover:bg-black/70 text-white border-white/20 z-10"
                  onClick={handlePrev}
                  aria-label="Previous story"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <StoryCard
                imageUrl={`/stories/${user.stories[0].url}`}
                username={user.name}
                isActive={isActive}
                onClick={() => setActiveIndex(index)}
              />
              {isActive && (
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-12 bg-black/50 hover:bg-black/70 text-white border-white/20 z-10"
                  onClick={handleNext}
                  aria-label="Next story"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
