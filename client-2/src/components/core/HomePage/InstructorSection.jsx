import React from "react";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <section className="my-20 px-4">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        {/* Image Section */}
        <div className="lg:w-[50%]">
          <img
            src="https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg"
            alt="Instructor teaching online"
            className="shadow-[0px_0px_0px_8px_#fff] rounded-md"
            loading="lazy"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-[50%] flex flex-col gap-6">
          <h2 className="text-4xl font-semibold">
            Become an <HighlightText text="instructor" />
          </h2>

          <p className="font-medium text-[16px] text-justify text-richblack-300 w-[90%]">
            Instructors from around the world teach millions of students on EduSphere. We equip you with the tools and support you need to share your passion and teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
