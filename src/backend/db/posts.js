import { v4 as uuid } from "uuid";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "tanaypratap",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_400x400.jpg",
    content:
      "Learn JavaScript in 60 minutes and then spend 9 months finding job. Better to spend time on basics, build core and then find a job. 12 months is the least you should spend from your first program to job.",
    createdAt: "2022-05-15T12:26:03+05:30",
    updatedAt: "2022-05-15T12:26:03+05:30",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },

    comments: [
      {
        _id: uuid(),
        firstName: "Aman",
        lastName: "Singh",
        username: "aman11s",
        avatarURL: "https://amansingh.vercel.app/assets/images/aman.jpg",
        text: "Damn! I love this mentality.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        firstName: "Soham",
        lastName: "Shah",
        username: "sohamshah",
        avatarURL:
          "https://pbs.twimg.com/profile_images/1481869646018265088/SgTPHx3S_400x400.jpg",
        text: "True 💯",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Akanksha",
    lastName: "Choudhary",
    username: "ch_akanksha",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1085823173419880448/oDNqP1T3_400x400.jpg",
    content:
      "Don't hate errors and bugs. They're not your enemies. It's a part of your programming journey. See errors and bugs as a sign that you're pushing your boundaries. It shows growth.",
    createdAt: "2022-08-10T14:45:03+05:30",
    updatedAt: "2022-08-10T14:45:03+05:30",
    likes: {
      likeCount: 15,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        firstName: "Sourabh",
        lastName: "Kheraliya",
        username: "sk02k1",
        avatarURL: "https://avatars.githubusercontent.com/u/55895224?v=4",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        firstName: "Aman",
        lastName: "Singh",
        username: "aman11s",
        avatarURL: "https://amansingh.vercel.app/assets/images/aman.jpg",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Aman",
    lastName: "Singh",
    username: "aman11s",
    avatarURL: "https://amansingh.vercel.app/assets/images/aman.jpg",
    content:
      "Hey everyone, I'm Aman a Frontend Developer from Bangalore, India. My portfolio Link : https://amansingh.vercel.app",
    createdAt: "2022-09-22T09:30:03+05:30",
    updatedAt: "2022-09-22T09:30:03+05:30",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        firstName: "Sourabh",
        lastName: "Kheraliya",
        username: "sk02k1",
        avatarURL: "https://avatars.githubusercontent.com/u/55895224?v=4",
        text: "Let's Connect!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        firstName: "Chirag",
        lastName: "Gupta",
        username: "hardiegogo",
        avatarURL:
          "https://res.cloudinary.com/dqqehaaqo/image/upload/v1656880084/mircle/profile_pic_clyjaw.jpg",
        text: "Hey Aman, nice to know about you.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Aman",
    lastName: "Singh",
    username: "aman11s",
    avatarURL: "https://amansingh.vercel.app/assets/images/aman.jpg",
    content: "Nothing can beat the joy of seeing live users on your website.",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    createdAt: "2022-09-20T10:00:03+05:30",
    updatedAt: "2022-09-20T10:00:03+05:30",
    comments: [
      {
        _id: uuid(),
        firstName: "Chirag",
        lastName: "Gupta",
        username: "hardiegogo",
        avatarURL:
          "https://res.cloudinary.com/dqqehaaqo/image/upload/v1656880084/mircle/profile_pic_clyjaw.jpg",
        text: "Yeah you are right!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
];
