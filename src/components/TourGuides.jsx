import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./shared/Loading";

const TourGuides = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["random-guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/guide?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto pt-5 pb-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="rounded-xl border border-green-200 p-6 shadow-md transition hover:shadow-xl bg-green-50"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={guide.image}
                alt={guide.name}
                className="mb-4 h-20 w-20 rounded-full object-cover ring-2 ring-accent ring-offset-2"
              />
              <h3 className="text-lg font-semibold">{guide.name}</h3>
              <p className="text-sm text-gray-500">{guide.email}</p>

              <button
                onClick={() => navigate(`/guide/${guide._id}`)}
                className="btn btn-sm btn-primary mt-4 cursor-pointer hover:text-accent duration-300"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuides;
