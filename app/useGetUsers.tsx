"use client";

interface Story {
  id: number;
  url: string;
  seen: boolean;
}
export interface User {
  id: number;
  name: string;
  photo: string;
  stories: Story[];
}

const USERS: User[] = [
  {
    id: 1,
    name: "Anton",
    photo: "anton.jpeg",
    stories: [
      {
        id: 1,
        url: "autumn-road.jpeg",
        seen: false,
      },
      {
        id: 2,
        url: "chroma-migrated.jpeg",
        seen: false,
      },
    ],
  },
  {
    id: 2,
    name: "Ben",
    photo: "ben.jpeg",
    stories: [
      {
        id: 3,
        url: "leaves.jpeg",
        seen: false,
      },
    ],
  },
  {
    id: 3,
    name: "Hammad",
    photo: "hammad.jpeg",
    stories: [
      {
        id: 4,
        url: "moon.jpeg",
        seen: false,
      },
      {
        id: 5,
        url: "mountains-and-lake.jpeg",
        seen: false,
      },
    ],
  },
  {
    id: 4,
    name: "Jeff",
    photo: "jeff.jpeg",
    stories: [
      {
        id: 6,
        url: "river-rocks.jpeg",
        seen: false,
      },
    ],
  },
  {
    id: 5,
    name: "Liquan",
    photo: "liquan.jpeg",
    stories: [
      {
        id: 7,
        url: "road-through-trees.jpeg",
        seen: false,
      },
      {
        id: 8,
        url: "sun-through-tree.jpeg",
        seen: false,
      },
      {
        id: 9,
        url: "sutro-tower.jpeg",
        seen: false,
      },
    ],
  },
];

// this should sort the users by most recently posted (unseen) story
export function useGetUsers() {
  return USERS;
}
