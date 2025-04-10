import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className="text-white">
      <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent">
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
          {reviews.map((review, i) => {
            const userImage = review?.user?.image
              ? review.user.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`;

            const truncatedReview =
              review?.review?.split(" ").length > truncateWords
                ? review.review.split(" ").slice(0, truncateWords).join(" ") +
                  " ..."
                : review?.review;

            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-md shadow-md text-[14px] text-richblack-25">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={userImage}
                      alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-xs font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="font-medium text-richblack-25">
                    {truncatedReview}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
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
