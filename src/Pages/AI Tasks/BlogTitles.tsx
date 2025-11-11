import { Hash, Sparkles } from "lucide-react";
import { useState } from "react";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Education",
    "Travel",
    "Food",
    "Lifestyle",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [topic, setTopic] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="container h-full flex flex-wrap gap-4 overflow-y-scroll items-start text-slate-700">
      {/* Left Col */}
      <form
        onSubmit={handleSubmit}
        className="card w-full bg-white p-4 max-w-lg"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-purple-700" />
          <h1 className="text-xl font-bold">AI Title Generator</h1>
        </div>
        <p className="text-sm font-medium mt-6">Keyword</p>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input mt-6 p-2"
          placeholder="A title for..."
          required
        />

        <p className="text-sm font-medium mt-6">Category</p>
        <div className="container mt-3 flex gap-3 flex-wrap">
          {blogCategories.map((item, index) => (
            <span
              className={`text-md px-4 py-1 border rounded-full cursor-pointer  ${selectedCategory === item ? "bg-purple-50 text-purple-700" : "text-gray-500 border-gray-300"}`}
              key={index}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-purple-700 to-sky-300"
        >
          <Hash className="w-5" />
          Generate Title
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-lg min-h-[24rem] max-h-[600px]">
        <div className="flex items-center gap-3">
          <Hash className="w-6 text-purple-700" />
          <h1 className="text-xl font-bold">Generated Titles</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="size-9" />
            <p>Enter a topic and click "Generate Titles" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
