import { createContext, useContext, useState } from "react";

// Create a context
const SlideContext = createContext();

// Provider component
export const SlideProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [page, setPage] = useState("home");

  const [isLoading, setIsLoading] = useState(0);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     sessionStorage.setItem("hasVisited", "true");
  //   }, 2000);
  // }, []);

  // Function to handle changing the slide
  const handleChangeSlide = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  return (
    <SlideContext.Provider
      value={{
        currentSlide,
        handleChangeSlide,
        isLoading,
        setIsLoading,
        page,
        setPage,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};

// Custom hook to use the slide context
export const useSlide = () => useContext(SlideContext);
