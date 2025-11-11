import { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu, X, Bot } from "lucide-react";
import SideBar from "../Components/SideBar";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="navbar py-3 items-center justify-between bg-base-100  top z-50">
        <Link to="/" className="btn btn-ghost hover:bg-transparent">
          <Bot className="size-10 text-primary" />
          <span className="text-2xl font-bold ">Versatile.AI</span>
        </Link>
        {sidebar ? (
          <X className="size-10 sm:hidden" onClick={() => setSidebar(false)} />
        ) : (
          <Menu
            className="size-10 sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
