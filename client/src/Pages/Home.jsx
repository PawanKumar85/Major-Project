import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import HighlightText from "../components/core/Home/HighlightText";
import CTAButton from "../components/core/Home/CTAButton";
import CodeBlocks from "../components/core/Home/CodeBlocks";

import Banner from "../assets/Images/banner.mp4";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to="/signup">
          <div className="group mt-16 p-1 mx-auto rounded-full font-bold transition-all duration-200 hover:scale-95 w-fit bg-[var(--richblack-800)]">
            <div className="flex flex-row items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200 text-[var(--richblack-200)] group-hover:bg-[var(--richblack-900)]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Equsphere"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-[var(--richblack-300)]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-[var(--blue-200)]">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section-01 */}
        <div className="">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html> 
                <html lang="en"> 
                <head>
                    <title>Edusphere</title>
                </head>
                <body>
                    <h1><a href="/">header</a></h1>
                    <nav>
                        <a href="/one">one</a>
                        <a href="/two">two</a>
                        <a href="/three">three</a>
                    </nav>
                </body>
                </html>
              `}
            codeColor={"text-[var(--yellow-25)]"}
          />
        </div>

        {/* Section 2 */}
        <div className="">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html> 
                <html lang="en"> 
                <head>
                    <title>Edusphere</title>
                </head>
                <body>
                    <h1><a href="/">header</a></h1>
                    <nav>
                        <a href="/one">one</a>
                        <a href="/two">two</a>
                        <a href="/three">three</a>
                    </nav>
                </body>
                </html>
              `}
            codeColor={"text-[var(--yellow-25)]"}
          />
        </div>
      </div>

      {/* Section 3 */}
      {/* Section 4 */}
    </div>
  );
};

export default Home;
