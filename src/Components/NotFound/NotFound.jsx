import AnimatedLink from "../Animation/AnimatedLink";
import { motion } from "framer-motion";
import "./style.scss";

const NotFound = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.8 }}
      >
        <section className="not-found">
          <div className="container">
            <div className="not-found__wrapper">
              <h2>The world of design has paused</h2>
              <p>Perhaps the page got lost in the creative search</p>
              <h3>Try starting again </h3>
              <AnimatedLink text="return home" to="/" />
            </div>
          </div>
        </section>
      </motion.div>
      <motion.div
        className="slide-page-transition"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 1.3, ease: [0.79, 0.08, 0.35, 0.96] }}
      />
    </>
  );
};

export default NotFound;
