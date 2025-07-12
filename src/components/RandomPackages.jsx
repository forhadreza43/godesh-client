import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PackageSkeleton from "./shared/PackageSkeleton";
import PackageCard from "./Card/PackageCard";


const RandomPackages = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["random-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/random-packages");
      return res.data;
    },
  });

  return (
    <div className="mx-auto pt-5 pb-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? [...Array(3)].map((_, i) => <PackageSkeleton key={i} />)
          : packages.map((pack) => <PackageCard key={pack._id} pack={pack} />)}
      </div>
    </div>
  );
};

export default RandomPackages;
