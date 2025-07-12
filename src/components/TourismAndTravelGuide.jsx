import { TabItem, Tabs } from "flowbite-react";
import { LuPackageOpen } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import RandomPackages from "./RandomPackages";
import { Link } from "react-router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const TourismAndTravelGuide = () => {
  return (
    <div className="mx-auto w-11/12 pb-10">
      <Tabs aria-label="Tabs with icons" variant="underline">
        <TabItem active title="Our Packages" icon={LuPackageOpen}>
          <RandomPackages />
          <div className="flex justify-between ">
            <div></div>
            <Link
              to="/all-packages"
              className="flex items-center gap-1 text-accent duration-300 hover:gap-2 hover:text-blue-500"
            >
              View All
              <MdKeyboardDoubleArrowRight size={20} />
            </Link>
          </div>
        </TabItem>
        <TabItem title="Meet Our Tour Guides" icon={HiMiniUserGroup}>
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </TabItem>
      </Tabs>
    </div>
  );
};

export default TourismAndTravelGuide;
