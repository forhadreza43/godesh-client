import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({tourPlan}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl space-y-3">
      {tourPlan?.map((item, index) => (
        <div key={index} className="rounded border border-green-200">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between rounded bg-green-50 px-4 py-2 text-left transition hover:bg-green-100"
          >
            <div className="flex items-center gap-3">
              <span className="rounded bg-accent px-2 py-1 text-sm font-semibold text-white">
                Day {item.day}
              </span>
              <span className="text-sm text-primary md:text-base">
                {item.title}
              </span>
            </div>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && item.description && (
            <div className="bg-white px-6 py-4 text-sm whitespace-pre-line text-gray-700">
              {item.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
