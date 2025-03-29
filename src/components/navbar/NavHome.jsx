import { useSlide } from "../../context/slideContext.jsx";
import styles from "./navbar.module.css";

function NavHome() {
  const { currentSlide, setPage } = useSlide();
  const isMobile = window.innerWidth <= 768;
  return isMobile ? (
    <div className={styles["navbar-mobile"]}>
      <div className={styles.menu} onClick={() => setPage("menu")}>
        <img src="/menu.png" alt="" />
      </div>

      <div className={styles.logo} onClick={() => setPage("home")}>
        <img src="/logo-clay.png" alt="" />
      </div>
    </div>
  ) : (
    <div className={`${styles.navbar} header`}>
      <div className={styles.count}>
        <span>{currentSlide + 1} / 8</span>
      </div>

      <div className={styles.logo}>
        <img src="/logo-clay.png" alt="" />
      </div>

      <ul className={styles["footer__nav"]}>
        <li>
          <span to="/info" onClick={() => setPage("info")}>
            Info
          </span>
        </li>
        <li>
          <span to="/contact" onClick={() => setPage("contact")}>
            Contact
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NavHome;
