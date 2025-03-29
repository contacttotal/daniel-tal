import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sentences, videos } from "../../constants";
import { useSlide } from "../../context/slideContext";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Loading from "../../pages/Loading";
import Menu from "../../pages/Menu";
import SlidePage from "../../pages/SlidePage";
import NavHome from "../navbar/NavHome";
import VerticalTextSlider from "../textslider/VerticalTextSlider";
import "./swiper.css";

export default function SwiperSlider() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showCustomPointer, setShowCustomPointer] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoading, setIsLoading, page } = useSlide();
  const swiperRef = useRef(null);
  const videoRef = useRef(null);
  const slideDivRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

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

  const modules = isMobile ? [] : [Mousewheel];
  useEffect(() => {
    if (!isMobile) {
      const mousemove = (e) => {
        if (
          e.target.closest(".header") ||
          e.target.closest(".text") ||
          e.target.closest(".button-cancel")
        ) {
          setShowCustomPointer(false);
        } else if (e.target.closest("#video-player")) {
          const bounds = event.target.getBoundingClientRect();
          const controlAreaHeight = 70;
          if (event.clientY > bounds.bottom - controlAreaHeight) {
            setShowCustomPointer(false);
            videoRef.current.style.cursor = "pointer";
          } else {
            setShowCustomPointer(true);
            videoRef.current.style.cursor = "unset";
          }
        } else {
          setShowCustomPointer(true);
        }

        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      };
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          handleReturn();
        }
      };
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("keydown", handleEsc);

      return () => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    slideDivRef.current.scrollIntoView();
  }, [page]);

  const handleNextSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper?.slideNext();
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper?.slidePrev();
  };

  const handleVideoClick = (src) => {
    setActiveVideo(src);
  };

  const handleReturn = () => {
    setActiveVideo(null);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPaused(!videoRef.current.paused);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const showLoading = isLoading < 8;

  return (
    <div
     ref={slideDivRef}
  
    >
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loading"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {page !== "home" && (
          <motion.div
            key={page}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={page === "menu" ? { y: "-100%" } : { y: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              backgroundColor: "white",
            }}
          >
            {page === "info" && <About isMobile={isMobile} />}
            {page === "contact" && <Contact isMobile={isMobile} />}
            {page === "menu" && <Menu />}
          </motion.div>
        )}
      </AnimatePresence>

      {page === "home" && showCustomPointer && !isMobile && !showLoading && (
        <div
          className="my-cursor"
          style={{
            position: "absolute",
            zIndex: 9999,
            left: mousePosition.x + 5,
            top: mousePosition.y + 5,
          }}
        >
          {!activeVideo || isPaused ? (
            <>
              <IoPlay size={30} />
            </>
          ) : (
            <>
              <IoPause size={30} />
            </>
          )}
        </div>
      )}
      <SlidePage zIndex={9}>
        <div>
          <NavHome page={page} />
          <Swiper
            ref={swiperRef}
            direction="vertical"
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            speed={1000}
            freeMode={false}
            slidesPerView={1}
            modules={modules}
            loop={true}
            className="mySwiper"
            onSlideChange={handleSlideChange}
          >
            {videos.map((slide, i) => (
              <SwiperSlide key={i} onClick={() => handleVideoClick(slide.vid)}>
                <div className="video-container">
                  <video
                    autoPlay={true}
                    playsInline={true}
                    loop
                    muted
                    onLoadedData={() => {
                      setIsLoading((idx) => idx + 1);
                    }}
                  >
                    <source
                      src={isMobile ? slide.mobile : slide.trailer}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-navigation" >
            <VerticalTextSlider
              currentSlide={currentSlide}
              handleNextSlide={handleNextSlide}
              handlePrevSlide={handlePrevSlide}
            />
          </div>

          <div className={"count-mobile"}>
            <span>{currentSlide + 1} / 8</span>
          </div>
        </div>
      </SlidePage>

      {activeVideo && (
        <div className={`fullscreen-video ${activeVideo ? "active" : ""}`}>
          <div className="button-cancel" onClick={handleReturn}>
            Back
          </div>

          <div className="title">
            <span>{sentences[currentSlide].title}</span>
            <span>{sentences[currentSlide].author}</span>
          </div>
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            id="video-player"
            style={{
              objectFit: isMobile ? "contain" : "cover",
            }}
            controls
            autoPlay={true}
            playsInline
            loop
            onClick={handlePlayPause}
          >
            <source src={activeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
