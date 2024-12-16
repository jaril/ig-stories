import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default function ProgressBar({
  current,
  total,
  progress,
}: ProgressBarProps) {
  return (
    <div className="flex h-0.5 bg-gray-300 mt-2 mx-2 rounded-full">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="flex-1 px-0.5">
          <div
            className={`h-full ${
              index === current
                ? "bg-white"
                : index < current
                ? "bg-white"
                : "bg-white/50"
            }`}
            style={{
              width:
                index === current
                  ? `${progress}%`
                  : index < current
                  ? "100%"
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
