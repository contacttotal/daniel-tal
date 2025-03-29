import { memo, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "./textslider.css";
import { useSlide } from "../../context/slideContext";
import { sentences } from "../../constants";

const VerticalTextSlider = ({
  currentSlide,
  handleNextSlide,
  handlePrevSlide,
}) => {
  const swiperRef = useRef(null);
  const countRef = useRef(currentSlide);
  const { handleChangeSlide } = useSlide();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    let debounceTimeout;

    const handleResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(debounceTimeout);
    };
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;
    // if (currentSlide === countRef.current + 1) {
    //   swiperRef.current.swiper?.slideNext();
    // } else if (currentSlide === countRef.current - 1) {
    //   swiperRef.current.swiper?.slidePrev();
    // } else if (
    //   currentSlide === sentences.length - 1 &&
    //   countRef.current === 0
    // ) {
    //   swiperRef.current.swiper?.slidePrev();
    // } else if (
    //   currentSlide === 0 &&
    //   countRef.current === sentences.length - 1
    // ) {
    //   swiperRef.current.swiper?.slideNext();
    // }

    swiperRef.current.swiper.slideToLoop(currentSlide);

    // swiperRef.current.swiper?.slidePrev();

    countRef.current = currentSlide;
    handleChangeSlide(currentSlide);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);
  // });

  const onSlideChange = (swiper) => {
    const currentSlide = swiper.realIndex;
    // const previousSlide = swiper.previousRealIndex;
    // if (currentSlide === sentences.length - 1 && previousSlide === 0) {
    //   handlePrevSlide();
    // } else if (currentSlide === 0 && previousSlide === sentences.length - 1) {
    //   handleNextSlide();
    // } else if (currentSlide > previousSlide) {
    //   handleNextSlide && handleNextSlide();
    // } else if (currentSlide < previousSlide) {
    //   handlePrevSlide && handlePrevSlide();
    // }
    swiperRef.current.swiper.slideToLoop(currentSlide);
  };

  const onSlideClick = (swiper) => {
    const currentSlide = swiper.clickedSlide.swiperSlideIndex;
    const previousSlide = swiper.realIndex;

    if (currentSlide === sentences.length - 1 && previousSlide === 0) {
      handlePrevSlide();
    } else if (currentSlide === 0 && previousSlide === sentences.length - 1) {
      handleNextSlide();
    } else if (currentSlide > previousSlide) {
      handleNextSlide && handleNextSlide();
    } else if (currentSlide < previousSlide) {
      handlePrevSlide && handlePrevSlide();
    }

    // swiperRef.current.swiper.slideToLoop(currentSlide);
  };

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        ref={swiperRef}
        direction="vertical"
        loop={true}
        spaceBetween={10}
        slidesPerView={isMobile ? 3 : 5}
        centeredSlides={true}
        mousewheel={{ forceToAxis: true }}
        speed={1000}
        style={{ height: isMobile ? "185px" : "135px" }}
        slideToClickedSlide={false}
        modules={[Mousewheel]}
        onSlideChange={onSlideChange}
        onClick={onSlideClick}
        allowTouchMove={false}
      >
        {sentences.map((sentence, index) => (
          <SwiperSlide key={index}>
            {({ isActive, isNext, isPrev }) => {
              let classes = "text no-click";
              if (isActive) classes = "text text-active";
              if (isNext || isPrev) classes = "text text-fade";

              return (
                <div className={classes}>
                  <strong>{sentence.title.toUpperCase()}</strong>{" "}
                  <span>{sentence.author.toUpperCase()}</span>
                </div>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(VerticalTextSlider, (prevProps, nextProps) => {
  return (
    prevProps.currentSlide === nextProps.currentSlide &&
    prevProps.sentences === nextProps.sentences
  );
});
