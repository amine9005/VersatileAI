import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";

const RemoveBackground = () => {
  const [path, setPath] = useState("");
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
          <Sparkles className="w-6 text-yellow-500" />

          <h1 className="text-xl font-bold">Background Remover</h1>
        </div>
        <p className="text-sm font-medium mt-6">Upload Image</p>

        <input
          className="file-input file-input-bordered file-input-warning w-full mt-6"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setPath(e.target.files[0])}
        />
        {/* <input
          type="file"
          accept="image/*"
          required
          className="px-3 py-2 w-full outline-none border border-gray-300 rounded-md text-sm text-gray-600"
          onChange={(e) => setPath(e.target.files[0])}
          // onChange={(e) => {
          //   if (e.target && e.target.files) {
          //     setPath(URL.createObjectURL(e.target.files[0]));
          //   }
          // }}
        /> */}

        <p className="text-sm mt-4">
          Supports JPG, PNG, and other image formats
        </p>

        <button
          type="submit"
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500"
        >
          <Eraser className="w-5" />
          Remove Background
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-lg min-h-[24rem] max-h-[600px]">
        <div className="flex items-center gap-3">
          <Eraser className="w-6 text-yellow-500" />
          <h1 className="text-xl font-bold">Processed Image</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className="size-9" />
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
