import { motion } from "framer-motion";
import "./ScrollArea.css";
import { useLocation } from "react-router-dom";
import { pageEffects } from "../Frames/PageFrames/pageEffects";


export default function ScrollArea({
  children,
  className = "",
  horizontal = false,
  effect=""
}) {
  const location = useLocation();

  return (
    <motion.div
      className={`scrollArea ${horizontal ? "scrollArea--x" : "scrollArea--y"} ${className}`}
      key={location.pathname}
      { ...pageEffects[effect] }
    >
      {children}
    </motion.div>
  );
}
