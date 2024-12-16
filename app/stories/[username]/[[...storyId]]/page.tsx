import StoriesCarousel from "@/components/StoriesCarousel";
import ErrorScreen from "@/components/ErrorScreen";
import { sampleUsers } from "@/lib/sample-data";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ username: string; storyId?: string[] }>;
}) {
  const { username, storyId } = await params;

  // Check if the username exists
  const user = sampleUsers.find((u) => u.username === username);
  if (!user) {
    return <ErrorScreen error={{ name: "", message: "Invalid username" }} />;
  }

  let targetStoryId: string;

  // If storyId is not provided, use the first story of the user
  if (!storyId || storyId.length === 0) {
    targetStoryId = user.stories[0].id;
  } else {
    targetStoryId = storyId[0];
    // Check if the storyId exists for the user
    const storyExists = user.stories.some((s) => s.id === targetStoryId);
    if (!storyExists) {
      return <ErrorScreen error={{ name: "", message: "Invalid story ID" }} />;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <StoriesCarousel
        users={sampleUsers}
        initialUsername={username}
        initialStoryId={targetStoryId}
      />
    </main>
  );
}
