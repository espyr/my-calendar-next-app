"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`block py-2 px-3 cursor-pointer text-purple text-nowrap text-lg hover:underline ${path.endsWith(
        href) ? 'underline' : ''} `}
    >
      {children}{" "}
    </Link>
  );
};
export default NavLink;
