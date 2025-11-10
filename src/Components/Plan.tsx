import { PricingTable } from "@clerk/clerk-react";
const Plan = () => {
  return (
    <div className="container min-h-screen mx-auto max-w-2xl ">
      <div className="text-center">
        <h2 className="text-semibold text-slate-700 text-[42px]">
          Chose your plan
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for you
          content creation needs
        </p>
      </div>
      <div className="mt-4 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
