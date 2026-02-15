import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AccessDenied.scss';

export default function AccessDenied() {
  return (
    <div className="access-denied">
      <motion.div
        className="access-denied__card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="access-denied__icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          aria-hidden="true"
        >
          ✉
        </motion.div>

        <h1 className="access-denied__title">Invitation introuvable</h1>

        <p className="access-denied__text">
          Le code d'invitation utilisé n'est pas valide.
          <br />
          Veuillez vérifier le lien que vous avez reçu.
        </p>

        <p className="access-denied__hint">
          Si le problème persiste, contactez les mariés directement.
        </p>
      </motion.div>
    </div>
  );
}
