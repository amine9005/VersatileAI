import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";

const WriteArticle = () => {
  const articleLength = [
    {
      length: 800,
      text: "short (500-800) words",
    },
    {
      length: 1200,
      text: "medium (800-1200) words",
    },
    {
      length: 1600,
      text: "long (1200+) words",
    },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
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
          <Sparkles className="w-6 text-blue-700" />
          <h1 className="text-xl font-bold">Article Configurations</h1>
        </div>
        <p className="text-sm font-medium mt-6">Article Topic</p>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input mt-6 p-2"
          placeholder="the future of content creation is..."
          required
        />

        <p className="text-sm font-medium mt-6">Article Length</p>
        <div className="container mt-3 flex gap-3 flex-wrap">
          {articleLength.map((item, index) => (
            <span
              className={`text-md px-4 py-1 border rounded-full cursor-pointer ${selectedLength.length === item.length ? "bg-blue-50 text-blue-700" : "text-gray-500 border-gray-300"}`}
              key={index}
              onClick={() => setSelectedLength(item)}
            >
              {item.text}
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-sky-700 to-sky-400"
        >
          <Edit className="w-5" />
          Generate Article
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-lg min-h-[24rem] max-h-[800px]">
        <div className="flex items-center gap-3">
          <Edit className="w-6 text-blue-700" />
          <h1 className="text-xl font-bold">Generated Article</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="size-9" />
            <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
