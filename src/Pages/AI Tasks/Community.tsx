import { useState, useEffect } from "react";
import { HeartIcon, Loader2 } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { publishCreationDataType } from "../../lib/types";
import { api } from "../../api/api";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState<publishCreationDataType[]>();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const toggleLike = async (item_id: number) => {
    try {
      const response = await api.put(
        "/user/toggle-liked-creations",
        { id: item_id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setRefresh(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get("/user/get-published-creations", {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });

        if (data.success) {
          setCreations(data.content);
        } else {
          toast.error(data.message);
          console.log({ data });
        }
      } catch (error) {
        toast.error("Too many requests try again later");
        console.log({ error });
      }
      setRefresh(false);
      setLoading(1);
    };

    getData();
  }, [getToken, refresh]);

  return (
    <div className="flex-1 flex flex-col gap-4 p-6 h-full max-h-[700px] ">
      <h2 className="text-lg font-semibold">Creations</h2>
      <div className="flex flex-wrap w-full bg-white h-full rounded-xl overflow-y-scroll">
        {loading === 0 ? (
          <>
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="animate-spin size-16 text-blue-700"></Loader2>
            </div>
          </>
        ) : creations && creations.length ? (
          <>
            {creations.map((item, index) => (
              <div
                key={index}
                className="relative group inline-block pl-3 pt-3 w-full sm:max-w-[calc(100vw/3)] lg:max-w-[calc(100vw/4)] "
              >
                <img
                  src={item.content}
                  alt="generated Image"
                  className="w-full h-full object-cover rounded-lg"
                ></img>
                <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                  <p className="p-2 text-sm hidden group-hover:block">
                    {item.prompt}
                  </p>
                  <div className="p-2 flex gap-1 items-center">
                    <p className="text-sm hidden group-hover:block">
                      {item.likes.length}
                    </p>
                    <HeartIcon
                      onClick={() => toggleLike(item.id)}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${item.likes.includes(user!.id) ? "text-red-600 fill-red-500" : "text-white"}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-full flex items-left justify-left p-4">
            <p className="font-semibold text-black">
              Unable to load creations try again...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
