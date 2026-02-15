import { motion } from 'framer-motion';
import './IntroOverlay.scss';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.35, delayChildren: 0.6 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const lineExpand = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function IntroOverlay({ guestName, onOpen }) {
  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-8%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="intro-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="intro-line" variants={lineExpand} />

        <motion.p className="intro-subtitle" variants={fadeUp}>
          Vous êtes cordialement invité{guestName.includes('&') || guestName.includes('Famille') ? '(e)s' : '(e)'} au mariage de
        </motion.p>

        <motion.h1 className="intro-names" variants={fadeUp}>
          Mouna <span className="amp">&amp;</span> Amine
        </motion.h1>

        <motion.p className="intro-date" variants={fadeUp}>
          21 Mars 2026
        </motion.p>

        <motion.div className="intro-line" variants={lineExpand} />

        <motion.p className="intro-guest" variants={fadeUp}>
          {guestName}
        </motion.p>

        <motion.button
          className="intro-btn"
          variants={fadeUp}
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Ouvrir l'invitation"
        >
          Ouvrir l'invitation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
