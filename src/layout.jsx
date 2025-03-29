import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      {/* <footer
        style={{
          position: "absolute",
        }}
      >
        <p>&copy; 2024 Total Studio</p>
      </footer> */}
    </>
  );
}

export default Layout;
