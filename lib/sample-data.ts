export interface Story {
  id: string;
  imageUrl: string;
  timestamp: number;
  viewed: boolean;
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  stories: Story[];
}

export const sampleUsers: User[] = [
  {
    id: "1",
    username: "anton",
    avatarUrl: "/profile-pictures/anton.jpeg?height=60&width=60",
    stories: [
      {
        id: "7f1e2c74-3f98-4aeb-8fb7-a1f2a7f1e1a1",
        imageUrl: "/stories/autumn-road.jpeg?height=600&width=400",
        timestamp: Date.now() - 120000,
        viewed: false,
      },
      {
        id: "d43c295e-9b6b-4b9a-bd2d-6e8c1f776b31",
        imageUrl: "/stories/chroma-migrated.jpeg?height=600&width=400",
        timestamp: Date.now() - 60000,
        viewed: false,
      },
    ],
  },
  {
    id: "2",
    username: "ben",
    avatarUrl: "/profile-pictures/ben.jpeg?height=60&width=60",
    stories: [
      {
        id: "8f4e3c64-5f98-4b2e-9fa8-d1a7e7d4c8b9",
        imageUrl: "/stories/leaves.jpeg?height=600&width=400",
        timestamp: Date.now() - 180000,
        viewed: false,
      },
    ],
  },
  {
    id: "3",
    username: "hammad",
    avatarUrl: "/profile-pictures/hammad.jpeg?height=60&width=60",
    stories: [
      {
        id: "1c5e4b78-6f9d-42d3-bc2d-e7a8f3e7d8f4",
        imageUrl: "/stories/moon.jpeg?height=600&width=400",
        timestamp: Date.now() - 300000,
        viewed: false,
      },
      {
        id: "3f5a6c78-2f9b-41d4-ad2e-f4b7e9c2d7e6",
        imageUrl: "/stories/mountains-and-lake.jpeg?height=600&width=400",
        timestamp: Date.now() - 240000,
        viewed: false,
      },
    ],
  },
  {
    id: "4",
    username: "jeff",
    avatarUrl: "/profile-pictures/jeff.jpeg?height=60&width=60",
    stories: [
      {
        id: "2e8c1f7d-4b2a-4f9a-a7e6-b1c7f4d8e9a3",
        imageUrl: "/stories/river-rocks.jpeg?height=600&width=400",
        timestamp: Date.now() - 360000,
        viewed: false,
      },
    ],
  },
  {
    id: "5",
    username: "liquan",
    avatarUrl: "/profile-pictures/liquan.jpeg?height=60&width=60",
    stories: [
      {
        id: "3a7f2c8b-9b6f-4d2e-ad7e-f1a4c8e9d2b3",
        imageUrl: "/stories/road-through-trees.jpeg?height=600&width=400",
        timestamp: Date.now() - 420000,
        viewed: true,
      },
      {
        id: "8b2c5a7f-4f9d-42d3-b7a6-f3e8c1d7a4e2",
        imageUrl: "/stories/sun-through-tree.jpeg?height=600&width=400",
        timestamp: Date.now() - 380000,
        viewed: true,
      },
      {
        id: "3026ba6a-d418-42f7-80e6-5e243a1377c2",
        imageUrl: "/stories/sutro-tower.jpeg?height=600&width=400",
        timestamp: Date.now() - 380000,
        viewed: true,
      },
    ],
  },
];
