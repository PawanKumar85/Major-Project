import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <section className="flex flex-col items-center text-center my-10 px-4">
      {/* Heading */}
      <h2 className="text-4xl font-semibold">
        All-in-one, just like a Swiss knife—learn
        <HighlightText text=" any language with ease." />
      </h2>

      {/* Subheading */}
      <p className="text-richblack-700 font-medium text-base leading-6 lg:w-[75%] mx-auto mt-3">
        Spin transforms the way you learn languages—10+ authentic voice-overs,
        smart progress tracking, and a schedule that fits your life.
      </p>

      {/* Images */}
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-6 lg:gap-0">
        <img
          src={Know_your_progress}
          alt="Know your progress"
          className="object-contain lg:-mr-32 max-w-[250px] lg:max-w-none"
        />
        <img
          src={Compare_with_others}
          alt="Compare with others"
          className="object-contain lg:-mb-10 -mt-12 max-w-[250px] lg:max-w-none"
        />
        <img
          src={Plan_your_lessons}
          alt="Plan your lessons"
          className="object-contain lg:-ml-36 lg:-mt-5 -mt-16 max-w-[250px] lg:max-w-none"
        />
      </div>

      {/* CTA */}
      <div className="mt-10 lg:mt-16">
        <CTAButton active={true} linkto="/signup">
          Learn More
        </CTAButton>
      </div>
    </section>
  );
};

export default LearningLanguageSection;
