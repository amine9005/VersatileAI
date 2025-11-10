import React from "react";
import { useNavigate } from "react-router";
import user_group from "../assets/user_group.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col items-center w-full
        bg-[url(/gradientBackground.png)] justify-center bg-cover bg-no-repeat min-h-screen z-6"
    >
      <div className="text-center mb-6">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold mx-auto
        leading-[1.2]"
        >
          Create Amazing Content <br />
          <span className="text-primary">With AI Tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto max-sm:text-xs text-grey-600">
          Transform your ideas into captivating stories, Images , and more with
          our premium AI tools
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button onClick={() => navigate("/ai")} className="btn btn-primary">
          Start Creating Now
        </button>
        <button className="btn btn-outline">Watch Demo</button>
      </div>

      <div className="container p-6 flex justify-center items-center mx-auto text-gray-600">
        <img
          className="h-8"
          src={user_group}
          alt="Unable to find image: user_group"
        />
        Trusted By 10K+ peoples
      </div>
    </div>
  );
};

export default Hero;
