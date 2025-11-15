import { useAuth } from "@clerk/clerk-react";
import { Eraser, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/api";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [path, setPath] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const { getToken } = useAuth();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("image", path!);
      const { data } = await api.post("/ai/remove-image-background", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setImgUrl(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Too many requests try again later");
      console.log({ error });
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
          <Sparkles className="w-6 text-yellow-500" />

          <h1 className="text-xl font-bold">Background Remover</h1>
        </div>
        <p className="text-sm font-medium mt-6">Upload Image</p>

        <input
          className="file-input file-input-bordered file-input-warning w-full mt-6"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            if (e.target.files) setPath(e.target.files[0]);
          }}
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
          disabled={loading}
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500"
        >
          {!loading ? (
            <Eraser className="w-5" />
          ) : (
            <Loader2 className="animate-spin w-5" />
          )}
          Remove Background
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-xl min-h-[24rem] max-h-[600px]">
        <div className="flex items-center gap-3">
          <Eraser className="w-6 text-yellow-500" />
          <h1 className="text-xl font-bold">Processed Image</h1>
        </div>

        {!imgUrl ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="size-9" />
              <p>
                Upload an image and click "Remove Background" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img
              src={imgUrl}
              alt="generate image"
              className="w-full h-full object-cover"
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
