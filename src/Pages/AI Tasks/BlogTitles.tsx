import { Hash, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/api";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

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
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        "/ai/generate-blog-titles",
        {
          prompt: `general blog title for ${topic} in the category ${selectedCategory}`,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Too many requests try again later");
      console.log("cant write article", error);
    }
    setLoading(false);
  };

  return (
    <div className="container h-full flex flex-wrap gap-4 overflow-y-scroll items-start text-slate-700">
      {/* Left Col */}
      <form
        onSubmit={handleSubmit}
        className="card w-full bg-white p-4 max-w-xl"
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
          disabled={loading}
          type="submit"
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-purple-700 to-sky-300"
        >
          {loading ? (
            <Loader2 className="loading loading-spinner text-white"></Loader2>
          ) : (
            <Hash className="w-5" />
          )}
          Generate Title
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-xl min-h-[24rem] max-h-[600px]">
        <div className="flex items-center gap-3">
          <Hash className="w-6 text-purple-700" />
          <h1 className="text-xl font-bold">Generated Titles</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="size-9" />
              <p>Enter a topic and click "Generate Titles" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-black font-medium">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
