import styles from "./loading.module.css";

function Loading() {
  // const [isFading, setIsFading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsFading(true);
  //   }, 1500);
  // }, []);

  return (
    <div className={styles.loading}>
      <div className={styles.logo}>
        <img src='/logo-clay.png' alt='' />
      </div>
      <span className={styles["loader"]}>
        <div className={styles["loader-bar"]}></div>
      </span>
    </div>
  );
}

export default Loading;
