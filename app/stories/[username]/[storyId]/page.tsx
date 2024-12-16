import StoriesCarousel from "@/components/StoriesCarousel";
import ErrorScreen from "@/components/ErrorScreen";
import { sampleUsers } from "@/lib/sample-data";

export default function StoryPage({
  params,
}: {
  params: { username: string; storyId: string };
}) {
  const { username, storyId } = params;

  // Check if the username exists
  const user = sampleUsers.find((u) => u.username === username);
  if (!user) {
    console.log("test");
    return <ErrorScreen error={{ name: "", message: "Invalid username" }} />;
  }

  // Check if the storyId exists for the user
  const storyExists = user.stories.some((s) => s.id === storyId);
  console.log({ stories: user.stories, storyId });
  if (!storyExists) {
    return <ErrorScreen error={{ name: "", message: "Invalid story ID" }} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <StoriesCarousel
        users={sampleUsers}
        initialUsername={username}
        initialStoryId={storyId}
      />
    </main>
  );
}
