import { AiOutlineHome } from "solid-icons/ai";
import { BsBookmark, BsHeart } from "solid-icons/bs";
import { CgProfile } from "solid-icons/cg";
import { IoSettingsOutline } from "solid-icons/io";
const SIZE = 24;

export const links = [
  {
    name: "Home",
    href: "/",
    icon: () => <AiOutlineHome size={SIZE} />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: () => <CgProfile size={SIZE} />,
  },

  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: () => <BsBookmark size={SIZE} />,
  },
  {
    name: "Likes",
    href: "/likes",
    icon: () => <BsHeart size={SIZE} />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: () => <IoSettingsOutline  size={SIZE} />,
  },
];
