import { info } from "../constants";
import { useSlide } from "../context/slideContext";
import styles from "./about.module.css";

function About({ isMobile }) {
  const { setPage } = useSlide();

  return (
    <div className='video-background'>
      <video autoPlay muted loop playsInline id='bg-video' poster={isMobile ? "/info-mobile.jpg" : "/info.jpg"}>
        <source src={isMobile ? info.mobile : info.desktop} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className={styles["about"]}>
        <div className={styles["logo"]}>
          <img src='/logo-clay.png' alt='' onClick={() => setPage("home")} />
        </div>
        <div className={styles["content"]}>
          <div className={styles["container"]}>
            <div className={`${styles["subtitle"]} ${styles["subtitle--desktop"]}`}>
              <span>DANIEL TAL IS A DIRECTOR AND PRODUCER WHO</span>
              <span>SPECIALIZES IN COMMERCIALS, MUSIC VIDEOS</span>
              <span>AND FILMS</span>
              <span>
                <br />
              </span>
              <span>HIS FILMIC EYE AND INSTINCT FOR NATURALISM</span>
              <span> COME TOGETHER TO CREATE A BALANCE OF</span>
              <span> STORY, STYLE AND SUBSTANCE.</span>
              <span>
                <br />
              </span>
              <span>INSPIRED BY CINEMA, EVERY CHOICE PRIORITIZES</span>
              <span>THE PROJECT.</span>
              <span>
                <br />
              </span>
              <span>SOPHISTICATED AND MODERN.</span>
              <span>FLOWING AND PRECISE.</span>
              <span>NOSTALGIC AND NOW.</span>
            </div>
            <div className={`${styles["subtitle"]} ${styles["subtitle--mobile"]}`}>
              <span>DANIEL TAL IS A DIRECTOR AND PRODUCER WHO SPECIALIZES IN COMMERCIALS, MUSIC VIDEOS AND FILMS</span>
              <span>
                <br />
              </span>
              <span>HIS FILMIC EYE AND INSTINCT FOR NATURALISM COME TOGETHER TO CREATE A BALANCE OF STORY, STYLE AND SUBSTANCE.</span>

              <span>
                <br />
              </span>
              <span>SOPHISTICATED AND MODERN.</span>
              <span>FLOWING AND PRECISE.</span>
              <span>NOSTALGIC AND NOW.</span>
            </div>
          </div>
          <div className={styles["actions"]}>
            <a href='https://www.instagram.com/daniel__total/' target='_blank'>
              @DANIEL__TOTAL
            </a>
            <button onClick={() => setPage("home")} className={styles["btn-back"]}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
