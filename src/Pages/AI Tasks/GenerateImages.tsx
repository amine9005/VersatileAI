import { Image, Sparkles } from "lucide-react";
import { useState } from "react";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic Style",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait Style",
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyle[0]);
  const [style, setStyle] = useState("");
  const [publish, setPublish] = useState(false);

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
          <Sparkles className="w-6 text-green-700" />
          <h1 className="text-xl font-bold">Image Configurations</h1>
        </div>
        <p className="text-sm font-medium mt-6">Image Topic</p>
        <textarea
          value={style}
          rows={4}
          onChange={(e) => setStyle(e.target.value)}
          className="textarea mt-6 p-2"
          placeholder="A man riding a horse to the moon..."
          required
        />

        <p className="text-sm font-medium mt-6">Image Style</p>
        <div className="container mt-3 flex gap-3 flex-wrap">
          {imageStyle.map((item, index) => (
            <span
              className={`text-md px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? "bg-green-50 text-green-700" : "text-gray-500 border-gray-300"}`}
              key={index}
              onClick={() => setSelectedStyle(item)}
            >
              {item}
            </span>
          ))}
        </div>
        {/* <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Make This Image Public</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
          </label>
        </div> */}

        {/* <div className="flex flex-wrap my-6 items-start justify-start gap-2">
          <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
            />
            <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-green-700 peer-focus:ring-2 peer-focus:ring-green-500"></div>
            <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            Make This Image Public
          </label>
        </div> */}

        <div className="flex my-6 items-center gap-2">
          <label className="relative cursor-pointer ">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
            />
            <div className="peer h-5 w-9 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-500"></div>
            <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make This Image Public</p>
        </div>

        <button
          type="submit"
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-green-700 to-green-400"
        >
          <Image className="w-5" />
          Generate Image
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-lg min-h-[24rem] max-h-[800px]">
        <div className="flex items-center gap-3">
          <Image className="w-6 text-green-700" />
          <h1 className="text-xl font-bold">Generated Image</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Image className="size-9" />
            <p>Enter a topic and click "Generate Image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
