import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from './MenuCard';
import MenuStepper from './MenuStepper';
import { MAINS, SIDES, DESSERTS } from '../data/menu';
import { submitRSVP } from '../helpers/submitRSVP';
import './RSVPForm.scss';

const sectionVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible',
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ── Helper: build empty selections array ── */
function emptySelections(seats) {
  return Array.from({ length: seats }, (_, i) => ({
    seatIndex: i,
    main: null,
    side: null,
    dessert: null,
  }));
}

export default function RSVPForm({ guest, onSuccess }) {
  const [attending, setAttending] = useState(null);
  const [selections, setSelections] = useState(emptySelections(guest.seats));
  const [currentSeat, setCurrentSeat] = useState(0);
  const [dietary, setDietary] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  /* ── Seat-level helpers ── */
  const isSeatComplete = (i) =>
    selections[i].main !== null && selections[i].side !== null && selections[i].dessert !== null;

  const allSeatsComplete = selections.every(
    (s) => s.main !== null && s.side !== null && s.dessert !== null,
  );

  const handleSelect = (field, value) => {
    setSelections((prev) => {
      const next = prev.map((s) => ({ ...s }));
      next[currentSeat][field] = value;
      return next;
    });
  };

  const canSubmit =
    attending === false || (attending === true && allSeatsComplete);

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!canSubmit || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    const payload = {
      code: guest.code,
      guestName: guest.name,
      seats: guest.seats,
      attending,
      mealSelections: attending ? selections : [],
      dietary: attending ? dietary : '',
      timestamp: new Date().toISOString(),
    };

    try {
      await submitRSVP(payload);
      setStatus('success');
      onSuccess();
    } catch {
      setStatus('error');
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section className="rsvp-section">
      <h2 className="rsvp-section__title">Répondez s'il vous plaît</h2>

      {/* ── Attending toggle ── */}
      <div className="attending-toggle">
        <p className="attending-toggle__label">Serez-vous des nôtres ?</p>
        <div className="attending-toggle__buttons">
          <motion.button
            className={`toggle-btn ${attending === true ? 'toggle-btn--active' : ''}`}
            onClick={() => setAttending(true)}
            whileTap={{ scale: 0.95 }}
          >
            Avec joie
          </motion.button>
          <motion.button
            className={`toggle-btn toggle-btn--decline ${
              attending === false ? 'toggle-btn--active' : ''
            }`}
            onClick={() => setAttending(false)}
            whileTap={{ scale: 0.95 }}
          >
            Avec regret
          </motion.button>
        </div>
      </div>

      {/* ── Conditional sections ── */}
      <AnimatePresence mode="wait">
        {attending === true && (
          <motion.div
            key="menu-section"
            className="menu-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ─── Multi-seat stepper ─── */}
            {guest.seats > 1 && (
              <MenuStepper
                totalSeats={guest.seats}
                currentSeat={currentSeat}
                onChangeSeat={setCurrentSeat}
                seatComplete={isSeatComplete}
              />
            )}

            <p className="menu-section__instruction">
              {guest.seats > 1
                ? `Invité ${currentSeat + 1} — choisissez un plat, un accompagnement et un dessert`
                : 'Choisissez votre plat, votre accompagnement et votre dessert'}
            </p>

            {/* ─── Choix du plat (Assiette) ─── */}
            <div className="menu-category" role="radiogroup" aria-label="Choix du plat">
              <h3 className="menu-category__heading">
                <span className="menu-category__badge">Plat</span>
              </h3>
              <div className="menu-category__cards">
                {MAINS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={idx}
                  >
                    <MenuCard
                      item={item}
                      selected={selections[currentSeat].main === item.id}
                      onSelect={() => handleSelect('main', item.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── Choix de l'accompagnement ─── */}
            <div className="menu-category menu-category--compact" role="radiogroup" aria-label="Choix de l'accompagnement">
              <h3 className="menu-category__heading">
                <span className="menu-category__badge">Accompagnement</span>
              </h3>
              <div className="menu-category__cards">
                {SIDES.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={idx}
                  >
                    <MenuCard
                      item={item}
                      selected={selections[currentSeat].side === item.id}
                      onSelect={() => handleSelect('side', item.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── Choix du dessert ─── */}
            <div className="menu-category" role="radiogroup" aria-label="Choix du dessert">
              <h3 className="menu-category__heading">
                <span className="menu-category__badge">Dessert</span>
              </h3>
              <div className="menu-category__cards">
                {DESSERTS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={idx}
                  >
                    <MenuCard
                      item={item}
                      selected={selections[currentSeat].dessert === item.id}
                      onSelect={() => handleSelect('dessert', item.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── Dietary ─── */}
            <div className="dietary-field">
              <label htmlFor="dietary">
                Restrictions alimentaires ou allergies
              </label>
              <textarea
                id="dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Veuillez nous informer de toute allergie ou restriction…"
                rows={3}
              />
            </div>
          </motion.div>
        )}

        {attending === false && (
          <motion.div
            key="decline-section"
            className="decline-message"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p>
              Nous sommes navrés que vous ne puissiez être présent(e).
              <br />
              Vous nous manquerez.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit ── */}
      {attending !== null && (
        <motion.div
          className="submit-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!canSubmit || status === 'loading'}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {status === 'loading' ? (
              <span className="submit-btn__spinner" aria-label="Envoi en cours" />
            ) : (
              'Confirmer'
            )}
          </motion.button>

          {status === 'error' && (
            <motion.p
              className="submit-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMsg}
            </motion.p>
          )}
        </motion.div>
      )}
    </section>
  );
}
