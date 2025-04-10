// Icons Import
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Image and Video Import
import Banner from "../assets/Images/banner2.mp4";
// Component Imports
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightText from "../components/core/HomePage/HighlightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import { TypeAnimation } from "react-type-animation";

const title =
  "Our online coding courses offer flexible learning designed for your lifestyle. Study at your own pace, access comprehensive learning materials, engage in hands-on projects, and receive personalized feedback from experienced instructors.";

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Heading */}

        <div className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            {/* Heading */}
            <div className="mt-10 text-center text-4xl font-semibold lg:text-left">
              Empower Your Future with <HighlightText text={"Coding Skills"} />
            </div>

            {/* Sub Heading */}
            <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 lg:text-left">
              {title}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-row gap-7">
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Schedule Demo
              </CTAButton>
            </div>
          </div>

          {/* Video */}
          <div className="mx-3 my-7 w-full max-w-[500px] shadow-[10px_-5px_50px_-5px] shadow-blue-200">
            <video
              className="w-full rounded-md shadow-[20px_20px_rgba(255,255,255)]"
              muted
              loop
              autoPlay
              playsInline
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Code Section 1  */}
        <div className="mt-10">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={" coding journey today "} />
                with our flexible,
                <HighlightText text={" online courses."} />
              </div>
            }
            subheading={
              "Gain insider knowledge from experienced developers who know what it takes to succeed and are excited to share it with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={
              "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text"
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Edusphere | E-Learning</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n    <a href="/three">Three</a>\n  </nav>\n</body>\n</html>`}
            backgroundGradient={<div className="codeblock1 absolute" />}
          />
        </div>

        {/* Code Section 2 */}
        <div className="relative w-full">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold lg:w-[50%] w-full">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Dive into hands-on coding from day one. Our platform is designed to get you building real-world projects as you learn, with step-by-step guidance and expert support. Whether you're a beginner or looking to sharpen your skills, we make the journey engaging, practical, and focused on real results."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={
              "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text"
            }
            codeblock={`import React from "react";\nimport Education from "./Education";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>EduSphere</div>\n  );\n};\n\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute" />}
          />
        </div>

        {/* Explore Section */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-richblack-900 text-richblack-200">
        <div className=" h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-50px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:items-center lg:gap-0">
            {/* Left Text Section */}
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            {/* Right Description + Button */}
            <div className="flex flex-col gap-6 lg:w-[45%]">
              <p className="text-base text-richblack-300">
                The modern learner writes their own rules. With{" "}
                <span className="font-semibold text-white">EduSphere</span>,
                you’ll go beyond skill-building — you’ll unlock your full
                potential.
              </p>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
