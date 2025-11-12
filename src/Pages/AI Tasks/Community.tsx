import { useState, useEffect } from "react";
import { dummyPublishedCreationData } from "../../assets/assets";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Community = () => {
  type Creation = {
    id: number;
    user_id: string;
    prompt: string;
    content: string;
    type: string;
    publish: boolean;
    likes: never[];
    created_at: string;
    updated_at: string;
  };
  const creationsType: Creation[] = [];
  const [creations, setCreations] = useState(creationsType);
  const { user } = useUser();

  const getData = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    getData();
  }, [creations]);

  return (
    <div className="flex-1 flex flex-col gap-4 p-6 h-full ">
      <h2 className="text-lg font-semibold">Creations</h2>
      <div className="flex flex-wrap w-full bg-white h-full rounded-xl overflow-y-scroll">
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
                <Heart
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${item.likes.includes(user?.id) ? "bg-red-500" : "text-white"}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
