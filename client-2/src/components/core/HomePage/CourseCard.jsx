import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        isActive ? "bg-white shadow-[12px_12px_0_0] shadow-blue-200" : "bg-richblack-800"
      } text-richblack-25 h-[300px] box-border cursor-pointer transition-all duration-200`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Section */}
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <h3
          className={`text-[20px] font-semibold ${
            isActive ? "text-richblack-800" : "text-richblack-25"
          }`}
        >
          {cardData?.heading}
        </h3>

        <p className="text-richblack-400">{cardData?.description}</p>
      </div>

      {/* Bottom Info Row */}
      <div
        className={`flex justify-between px-6 py-3 font-medium ${
          isActive ? "text-blue-300" : "text-richblack-300"
        }`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessonNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
