import { useQuery } from "@tanstack/react-query";
import { Link} from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./shared/Loading";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import StoryList from "./Card/StoryList";

const TouristStories = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["random-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stories?status=approved&random=4");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto w-11/12 py-10">
      <h2 className="pb-5 text-3xl font-bold">Tourist Stories</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stories.map((story) => (
          <StoryList key={story._id} story={story} />
        ))}
      </div>

      <div className="flex justify-between">
        <div></div>
        <Link
          to="/all-stories"
          className="group flex items-center gap-1 pr-3 font-semibold text-green-600 duration-300 hover:text-blue-500 mt-10"
        >
          All Stories
          <span className="duration-300 group-hover:translate-x-3">
            <MdKeyboardDoubleArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TouristStories;
