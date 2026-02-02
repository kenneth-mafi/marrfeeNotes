export const pageEffects = {
  /* =========================
     SLIDE TRANSITIONS
  ========================= */

  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  slideInUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  slideInDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  /* =========================
     FADE TRANSITIONS
  ========================= */

  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  fadeFast: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.12, ease: "linear" }
  },

  /* =========================
     SCALE / ZOOM
  ========================= */

  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  zoomIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  zoomOut: {
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: 0.25, ease: "easeInOut" }
  },

  /* =========================
     ROTATION
  ========================= */

  rotateIn: {
    initial: { rotate: -5, opacity: 0, scale: 0.95 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 5, opacity: 0, scale: 0.95 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  /* =========================
     OS / APP-LIKE TRANSITIONS
  ========================= */

  appOpen: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.18, ease: "easeOut" }
  },

  appClose: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0.9, opacity: 0 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.18, ease: "easeIn" }
  },

  /* =========================
     MOBILE / CARD FEEL
  ========================= */

  cardPush: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.18, ease: "easeOut" }
  },

  cardPop: {
    initial: { scale: 0.98, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.98, opacity: 0 },
    transition: { duration: 0.15, ease: "easeOut" }
  }
};
