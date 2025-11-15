import { useEffect, useState } from "react";
import { Gem, Loader2, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../Components/CreationItem";
import type { creationDataType } from "../lib/types";
import { api } from "../api/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const creationsType: creationDataType[] = [];
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();

  const { getToken } = useAuth();
  const [creations, setCreations] = useState(creationsType);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          "/user/get-user-creations",

          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          setCreations(data.content);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Too many requests try again later");
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [userId, getToken]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3 h-full w-full max-h-[500px] overflow-y-scroll">
        <p className="mt-6 mb-4">Recent Creations</p>
        <></>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="animate-spin size-16 text-blue-700"></Loader2>
          </div>
        ) : (
          <>
            {!creations ? (
              <>
                <div className="w-full h-full flex items-center justify-left">
                  <p className="font-semibold text-black">
                    Welcome to your dashboard. anything you create will appear
                    here
                  </p>
                </div>
              </>
            ) : (
              creations.map((item, index) => (
                <CreationItem key={index} item={item} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
