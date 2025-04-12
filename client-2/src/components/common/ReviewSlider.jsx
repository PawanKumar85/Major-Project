import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

import "../../App.css";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const TRUNCATE_WORDS = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="text-white">
      <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, index) => {
            const { user, course, review: comment, rating } = review;
            const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
            const userImage =
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`;
            const truncatedReview =
              comment?.split(" ").length > TRUNCATE_WORDS
                ? comment.split(" ").slice(0, TRUNCATE_WORDS).join(" ") + " ..."
                : comment;

            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-md shadow-md text-sm text-richblack-25">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={userImage}
                      alt={fullName}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {fullName}
                      </h1>
                      <h2 className="text-xs font-medium text-richblack-500">
                        {course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="font-medium">{truncatedReview}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
