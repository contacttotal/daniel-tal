import NavMenu from "../components/navbar/NavMenu";
import { menu } from "../constants";
import { useSlide } from "../context/slideContext";
import styles from "./menu.module.css";

function Menu() {
  const { setPage } = useSlide();
  return (
    <div className="video-background">
      <video
        autoPlay
        muted
        loop
        playsInline
        id="bg-video"
        poster="/menu.jpg"
      >
        <source src={menu} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <NavMenu />
      <div className={styles["menu"]}>
        <ul>
          <li>
            <span onClick={() => setPage("info")}>Info</span>
          </li>
          <li>
            <span onClick={() => setPage("contact")}>Contact</span>
          </li>
          <button
            style={{
              color: "#eeeee7",
            }}
            onClick={() => setPage("home")}
          >
            BACK
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
