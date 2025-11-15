import { useAuth } from "@clerk/clerk-react";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [path, setPath] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");

  const { getToken } = useAuth();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", path!);
      const { data } = await api.post("/ai/review-resume", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      // console.log({ data });
      if (data.success) {
        setContent(data.content);
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
          <Sparkles className="w-6 text-emerald-600" />

          <h1 className="text-xl font-bold">Resume Review</h1>
        </div>
        <p className="text-sm font-medium mt-6">Upload Resume</p>

        <input
          className="file-input file-input-bordered file-input-success w-full mt-6"
          type="file"
          accept="application/pdf"
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

        <p className="text-sm mt-4">Support PDF Files Only</p>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-300"
        >
          {!loading ? (
            <FileText className="w-5" />
          ) : (
            <Loader2 className="size-5 animate-spin" />
          )}
          Review Resume
        </button>
      </form>
      {/* Right Col */}
      <div className="card w-full bg-white p-4 max-w-xl min-h-[24rem] max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="w-6 text-emerald-600" />
          <h1 className="text-xl font-bold">Resume Review</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="size-9" />
              <p>Upload your resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-black font-medium ">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
