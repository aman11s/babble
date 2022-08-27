import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Aman",
    lastName: "Singh",
    username: "aman11s",
    password: "12345678",
    avatarURL: "https://amansingh.vercel.app/assets/images/aman.jpg",
    bio: "Front End Developer | ReactJS | Redux | JavaScript",
    websiteLink: "https://amansingh.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sourabh",
    lastName: "Kheraliya",
    username: "sk02k1",
    password: "12345678",
    avatarURL: "https://avatars.githubusercontent.com/u/55895224?v=4",
    bio: "Learning fullstack development",
    websiteLink: "https://peerlist.io/sk02k1",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Chirag",
    lastName: "Gupta",
    username: "hardiegogo",
    password: "12345678",
    avatarURL:
      "https://res.cloudinary.com/dqqehaaqo/image/upload/v1656880084/mircle/profile_pic_clyjaw.jpg",
    bio: "Web Developer | React | Redux | Tailwind CSS | Chakra UI",
    websiteLink:
      "https://wholesale-fern-729.notion.site/Portfolio-dbc92458e49e40a18bc792abfaae0325",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "tanaypratap",
    password: "12345678",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_400x400.jpg",
    bio: "Fixing education | Mentored 100+ students to first tech job | Tweets: Tech, Education, Career, Metaverse and Startups.",
    websiteLink: "https://tanaypratap.com/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Akanksha",
    lastName: "Choudhary",
    username: "ch_akanksha",
    password: "12345678",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1085823173419880448/oDNqP1T3_400x400.jpg",
    bio: "Curates JS interview qs on IG 👇👇",
    websiteLink: "https://t.co/bKyqnQq3oo",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tanvi",
    lastName: "Priya",
    username: "tanviprya",
    password: "12345678",
    avatarURL:
      "https://pbs.twimg.com/media/FJ9PSppagAMgXRa?format=jpg&name=large",
    bio: "Lawyer ➡️ Entrepreneur | Building India’s  #1 CBCs @neogcamp | Tweets about startups and journey",
    websiteLink: "https://neog.camp/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Soham",
    lastName: "Shah",
    username: "sohamshah",
    password: "12345678",
    avatarURL:
      "https://pbs.twimg.com/profile_images/1481869646018265088/SgTPHx3S_400x400.jpg",
    bio: "Open Source ❤ @chakra_ui",
    siteLink: "https://sohamsshah.vercel.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
