import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-400 text-sm">
      <div className="w-11/12 max-w-maxContent mx-auto py-14 flex flex-col gap-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-richblack-700 pb-10">
          {/* Left Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-[50%]">
            <div className="flex flex-col gap-4">
              <span className="text-3xl font-semibold text-richblack-5">
                EduSphere
              </span>
              <div>
                <h2 className="text-richblack-50 font-semibold">Company</h2>
                <div className="flex flex-col gap-2 mt-2">
                  {["About", "Careers", "Affiliates"].map((ele, i) => (
                    <Link
                      key={i}
                      to={`/${ele.toLowerCase()}`}
                      className="hover:text-richblack-50 transition"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-lg mt-4 text-richblack-400">
                {[FaFacebook, FaGoogle, FaTwitter, FaYoutube].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="hover:text-richblack-50 transition cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-richblack-50 font-semibold">Resources</h2>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, i) => (
                  <Link
                    key={i}
                    to={`/${ele.split(" ").join("-").toLowerCase()}`}
                    className="hover:text-richblack-50 transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <h2 className="text-richblack-50 font-semibold mt-6">Support</h2>
              <Link
                to="/help-center"
                className="hover:text-richblack-50 transition mt-2 inline-block"
              >
                Help Center
              </Link>
            </div>

            <div>
              <h2 className="text-richblack-50 font-semibold">Plans</h2>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, i) => (
                  <Link
                    key={i}
                    to={`/${ele.split(" ").join("-").toLowerCase()}`}
                    className="hover:text-richblack-50 transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <h2 className="text-richblack-50 font-semibold mt-6">
                Community
              </h2>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, i) => (
                  <Link
                    key={i}
                    to={`/${ele.split(" ").join("-").toLowerCase()}`}
                    className="hover:text-richblack-50 transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-[50%]">
            {FooterLink2.map((section, i) => (
              <div key={i}>
                <h2 className="text-richblack-50 font-semibold">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-2 mt-2">
                  {section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.link}
                      className="hover:text-richblack-50 transition"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-xs">
          <div className="flex flex-wrap justify-center gap-4">
            {BottomFooter.map((item, i) => (
              <Link
                key={i}
                to={`/${item.split(" ").join("-").toLowerCase()}`}
                className={`px-3 hover:text-richblack-50 transition ${
                  i < BottomFooter.length - 1
                    ? "border-r border-richblack-700"
                    : ""
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
