import { AiOutlineHome } from "solid-icons/ai";
import { BsBookmark, BsHeart } from "solid-icons/bs";
import { CgMoreO, CgProfile } from "solid-icons/cg";

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
    name: "Saved",
    href: "/saved",
    icon: () => <BsBookmark size={SIZE} />,
  },
  {
    name: "Liked",
    href: "/liked",
    icon: () => <BsHeart size={SIZE} />,
  },
  {
    name: "More",
    href: "/more",
    icon: () => <CgMoreO size={SIZE} />,
  },
];
