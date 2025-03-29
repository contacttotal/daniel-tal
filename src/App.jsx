import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Menu from "./pages/Menu";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          {/* <Route element={<Layout />}> */}
            <Route path="/" element={<Home />} />
          {/* </Route> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<About />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
