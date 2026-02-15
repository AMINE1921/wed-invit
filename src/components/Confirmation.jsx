import { motion } from 'framer-motion';
import './Confirmation.scss';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.6, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
  },
};

export default function Confirmation({ guestName }) {
  return (
    <motion.section
      className="confirmation"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.svg
        className="confirmation__check"
        viewBox="0 0 80 80"
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2.5"
          variants={draw}
        />
        <motion.path
          d="M24 42 L35 53 L56 28"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          transition={{ pathLength: { delay: 0.4, duration: 0.5, ease: 'easeInOut' } }}
        />
      </motion.svg>

      <h2 className="confirmation__title">Merci !</h2>
      <p className="confirmation__name">{guestName}</p>
      <p className="confirmation__text">
        Votre réponse a bien été enregistrée.
        <br />
        Nous avons hâte de partager ce moment avec vous.
      </p>

      <motion.p
        className="confirmation__footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Mouna &amp; Amine
      </motion.p>
    </motion.section>
  );
}
