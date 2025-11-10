import React from "react";
import { AiToolsData } from "../assets/assets";
import { Link } from "react-router";

const AiTools = () => {
  return (
    <div className="container min-h-screen">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] text-semiBold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance and optimize your content with
          cutting edge technology.{" "}
        </p>
      </div>

      <div className="flex  flex-wrap justify-center mt-10">
        {AiToolsData.map((tool, index) => (
          <Link
            to={tool.path}
            className="w-96 bg-base-100 shadow-xl m-3 hover:-translate-y-2 transition cursor-pointer border-[2px] rounded-2xl"
            key={index}
          >
            <div className="card-body">
              <tool.Icon
                className="w-12 h-12 p-3 text-white rounded-xl"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />
              <h2 className="card-title">{tool.title}</h2>
              <p>{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
