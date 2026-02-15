import { motion } from 'framer-motion';
import './MenuCard.scss';

export default function MenuCard({ item, selected, onSelect }) {
  return (
    <motion.button
      className={`menu-card ${selected ? 'menu-card--selected' : ''}`}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={selected}
      aria-label={`${item.label}${selected ? ' — sélectionné' : ''}`}
      layout
    >
      <span className="menu-card__icon" aria-hidden="true">{item.icon}</span>
      <h4 className="menu-card__title">{item.label}</h4>
      <p className="menu-card__desc">{item.description}</p>

      {selected && (
        <motion.div
          className="menu-card__check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          aria-hidden="true"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}
