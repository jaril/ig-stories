import Image from "next/image";
import { useState } from "react";

interface StoryCardProps {
  imageUrl: string;
  username: string;
  isActive: boolean;
  onClick: () => void;
}

export function StoryCard({
  imageUrl,
  username,
  isActive,
  onClick,
}: StoryCardProps) {
  return (
    <div
      className={`
        relative flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer
        ${isActive ? "scale-125" : "scale-75"}
      `}
      onClick={onClick}
    >
      <div
        className={`
        w-64 h-96 rounded-lg overflow-hidden shadow-lg
        ${isActive ? "ring-2 ring-white" : ""}
      `}
      >
        <Image
          src={imageUrl}
          alt={`${username}'s story`}
          width={256}
          height={384}
          className={`object-cover w-full h-full ${
            isActive ? "" : "opacity-50"
          }`}
        />
      </div>
      {isActive ? (
        <ActiveOverlay username={username} />
      ) : (
        <InactiveOverlay username={username} />
      )}
    </div>
  );
}

function ActiveOverlay({ username }: { username: string }) {
  return (
    <>
      <div className="text-white absolute flex flex-col text-xs w-full p-4">
        <div className="h-px bg-white mb-2" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <div className="bg-gray-500 rounded-full h-4 w-4" />
            <div>{username}</div>
            <div className="text-gray-300">2m</div>
          </div>
          <div className="flex flex-row gap-1">
            <div>play</div>
            <div>mute</div>
            <div>menu</div>
          </div>
        </div>
      </div>
      <Footer username={username} />
    </>
  );
}

function Footer({ username }: { username: string }) {
  const [val, setVal] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setVal("");
  };

  return (
    <div className="flex flex-row absolute mb-0 text-white bottom-0 text-xs w-full p-4 items-center gap-2">
      <form onSubmit={onSubmit} className="flex-grow">
        <input
          type="text"
          placeholder={`Reply to ${username}…`}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full border border-white bg-transparent rounded-xl p-2"
        />
      </form>
      <div>Heart</div>
      <div>Send</div>
    </div>
  );
}

function InactiveOverlay({ username }: { username: string }) {
  return (
    <div className="text-white absolute flex flex-col text-sm w-full p-4 h-full items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="bg-gray-500 rounded-full h-16 w-16" />
        <div className="flex flex-col gap-0.5 items-center">
          <div>{username}</div>
          <div>2m</div>
        </div>
      </div>
    </div>
  );
}
