import { StoryCarousel } from "@/components/StoryCarousel";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black relative">
      <a href="/" className="text-white absolute top-0 right-0 p-4">
        X
      </a>
      <div className="w-full max-w-4xl">
        <StoryCarousel />
      </div>
    </main>
  );
}
