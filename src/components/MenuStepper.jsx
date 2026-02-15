import { motion } from 'framer-motion';
import './MenuStepper.scss';

/**
 * Stepper dots for multi-seat selection.
 * A seat is "done" when main, side AND dessert are all selected.
 */
export default function MenuStepper({
  totalSeats,
  currentSeat,
  onChangeSeat,
  seatComplete,
}) {
  return (
    <div className="menu-stepper" role="tablist" aria-label="Sélection par invité">
      <button
        className="menu-stepper__arrow"
        onClick={() => onChangeSeat(Math.max(0, currentSeat - 1))}
        disabled={currentSeat === 0}
        aria-label="Invité précédent"
      >
        ‹
      </button>

      <div className="menu-stepper__dots">
        {Array.from({ length: totalSeats }, (_, i) => {
          const done = seatComplete(i);
          return (
            <motion.button
              key={i}
              role="tab"
              aria-selected={i === currentSeat}
              aria-label={`Invité ${i + 1}${done ? ' — complet' : ''}`}
              className={`menu-stepper__dot ${
                i === currentSeat ? 'menu-stepper__dot--active' : ''
              } ${done ? 'menu-stepper__dot--done' : ''}`}
              onClick={() => onChangeSeat(i)}
              whileTap={{ scale: 0.85 }}
            >
              <span className="menu-stepper__dot-label">
                {done ? '✓' : i + 1}
              </span>
            </motion.button>
          );
        })}
      </div>

      <button
        className="menu-stepper__arrow"
        onClick={() => onChangeSeat(Math.min(totalSeats - 1, currentSeat + 1))}
        disabled={currentSeat === totalSeats - 1}
        aria-label="Invité suivant"
      >
        ›
      </button>
    </div>
  );
}
