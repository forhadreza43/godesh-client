import { TabItem, Tabs } from "flowbite-react";
import { LuPackageOpen } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import RandomPackages from "./RandomPackages";
import { Link } from "react-router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import TourGuides from "./TourGuides";

const TourismAndTravelGuide = () => {
  return (
    <div className="mx-auto w-11/12 pb-10">
      <Tabs aria-label="Tabs with icons" variant="underline">
        <TabItem active title="Our Packages" icon={LuPackageOpen}>
          <RandomPackages />
          <div className="flex justify-between">
            <div></div>
            <Link
              to="/all-packages"
              className="group flex items-center gap-1 pr-3 font-semibold text-green-600 duration-300 hover:text-blue-500"
            >
              View All
              <span className="duration-300 group-hover:translate-x-3">
                <MdKeyboardDoubleArrowRight size={20} />
              </span>
            </Link>
          </div>
        </TabItem>
        <TabItem title="Meet Our Tour Guides" icon={HiMiniUserGroup}>
          <TourGuides/>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default TourismAndTravelGuide;
