import { motion } from 'framer-motion';
import './GoldDivider.scss';

export default function GoldDivider() {
  return (
    <motion.div
      className="gold-divider"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="gold-divider__diamond">◆</span>
    </motion.div>
  );
}
