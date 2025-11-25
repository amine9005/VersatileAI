import { ArrowRight, Bot, User2Icon } from "lucide-react";
import { Link } from "react-router";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

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
        <>
          <User2Icon
            onClick={() => openSignIn()}
            className="size-10 md:hidden border-2 border-black p-1 rounded-full"
          />{" "}
          <button
            className="hidden btn btn-outline md:flex btn-primary rounded-full px-10 "
            onClick={() => openSignIn()}
          >
            <span className=" text-blue-950 text-md">Get Started</span>{" "}
            <ArrowRight className="size-5 text-blue-950" />
          </button>
        </>
      )}
    </div>
  );
};

export default NavBar;
