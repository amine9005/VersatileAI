import { ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router";
import { useClerk, useAuth, useUser, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="navbar px-4 py-3 sm:px-20 xl:px-32 items-center justify-between bg-base-100 fixed top z-50">
      <Link to="/" className="btn btn-ghost hover:bg-transparent">
        <Bot className="size-10 text-primary" />
        <span className="text-2xl font-bold ">Versatile.AI</span>
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <button
          className="btn btn-outline btn-primary rounded-full px-10 "
          onClick={() => openSignIn}
        >
          <span className=" text-blue-950 size-lg">Get Started</span>{" "}
          <ArrowRight className="size-5 text-blue-950" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
