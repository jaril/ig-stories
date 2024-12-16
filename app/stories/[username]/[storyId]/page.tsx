import StoriesCarousel from "@/components/StoriesCarousel";
import ErrorScreen from "@/components/ErrorScreen";
import { sampleUsers } from "@/lib/sample-data";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ username: string; storyId: string }>;
}) {
  const { username, storyId } = await params;

  // Check if the username exists
  const user = sampleUsers.find((u) => u.username === username);
  if (!user) {
    return <ErrorScreen error={{ name: "", message: "Invalid username" }} />;
  }

  // Check if the storyId exists for the user
  const storyExists = user.stories.some((s) => s.id === storyId);
  if (!storyExists) {
    return <ErrorScreen error={{ name: "", message: "Invalid story ID" }} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <StoriesCarousel
        users={sampleUsers}
        initialUsername={username}
        initialUserIndex={sampleUsers.findIndex((u) => u.username === username)}
        initialStoryIndex={user.stories.findIndex((s) => s.id === storyId)}
        initialStoryId={storyId}
      />
    </main>
  );
}
