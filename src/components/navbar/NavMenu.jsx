import styles from "./navbar.module.css";

import { useSlide } from "../../context/slideContext.jsx";

function NavMenu() {
  const { setPage } = useSlide();

  return (
    <div
      className={styles["navbar-mobile"]}
      style={{
        zIndex: "19 !important",
      }}
    >
      <div className={styles.logo} onClick={() => setPage("home")}>
        <img src="/logo-clay.png" alt="" />
      </div>
    </div>
  );
}

export default NavMenu;
