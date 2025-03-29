import { useState } from "react";
import { useSlide } from "../context/slideContext";
import styles from "./contact.module.css";
import { toast } from "react-toastify";
import { contact } from "../constants";

function Contact({ isMobile }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { setPage } = useSlide();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("https://totalstudio-backend.vercel.app/contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // if (true) {
        // console.log("Email sent successfully:", data);
        setSubmitted(true);
      } else {
        console.error("Error sending email:", data.error || "Unknown error");
      }
      setSubmitted(true);
    } catch (e) {
      toast.error("Something went wrong while sending your Email. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='video-background'>
      <video autoPlay muted loop playsInline id='bg-video' poster={isMobile ? "/contact-mobile.jpg" : "/contact.jpg"}>
        <source src={isMobile ? contact.mobile : contact.desktop} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className={styles["contact"]}>
        <div className={styles["container"]}>
          <h1>CONTACT DANIEL</h1>
          {submitted ? (
            <>
              <h2>THANK YOU</h2>
              <p>Your message has been sent and I’ll get back to you very soon!</p>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className={styles["input"]}>
                  <label htmlFor='name'>NAME</label>
                  <input
                    // style={{ fontSize: "80px" }}
                    disabled={loading}
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    id='name'
                  />
                </div>
                <div className={styles["input"]}>
                  <label htmlFor='email'>EMAIL</label>
                  <input
                    // style={{ fontSize: "80px" }}
                    disabled={loading}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    id='email'
                  />
                </div>

                <div className={styles["input"]}>
                  <label htmlFor='message'>MESSAGE</label>
                  <textarea
                    // style={{ fontSize: "40px" }}
                    disabled={loading}
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    type='text'
                    id='message'
                    maxLength='1000'
                    rows={5}
                  />
                </div>

                {loading ? (
                  <>
                    <span className={styles["loader"]}></span>
                  </>
                ) : (
                  <button type='submit' className={styles["submit"]}>
                    SEND
                  </button>
                )}
              </form>
            </>
          )}

          <button className={styles["button-back"]} onClick={() => setPage("home")} disabled={loading}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
