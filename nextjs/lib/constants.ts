import { IoHomeOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";// Outline version of FaBrain doesn't exist; this is the closest
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg"; // This is already an outline-style icon

export const navigationLinks = [
  {
    label: "Home",
    icon: IoHomeOutline,
    path: "/",
  },
  {
    label: "AI",
    icon: LuBrain, // Closest to an outline version; FaBrain is solid
    path: "/ai-generate",
  },
  {
    label: "Saved",
    icon: BsBookmark,
    path: "/saved",
  },
  {
    label: "Profile",
    icon: CgProfile,
    path: "/profile",
  },
];
