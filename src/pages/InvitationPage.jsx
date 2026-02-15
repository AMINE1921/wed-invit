import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGuest } from "../hooks/useGuest";
import IntroOverlay from "../components/IntroOverlay";
import SectionReveal from "../components/SectionReveal";
import GoldDivider from "../components/GoldDivider";
import RSVPForm from "../components/RSVPForm";
import Confirmation from "../components/Confirmation";
import "./InvitationPage.scss";

export default function InvitationPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const guest = useGuest(code);
  const [showIntro, setShowIntro] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!guest) navigate("/access-denied", { replace: true });
  }, [guest, navigate]);

  if (!guest) return null;

  return (
    <div className="invitation-page">
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay
            guestName={guest.name}
            onOpen={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.main
          className="invitation-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* ── Hero ── */}
          <SectionReveal>
            <section className="hero-section">
              <p className="hero-section__overline">
                Together with their families
              </p>
              <h1 className="hero-section__names">
                Mouna <span className="amp">&amp;</span> Amine
              </h1>
              <p className="hero-section__date">21 Mars 2026</p>
              <GoldDivider />
              <p className="hero-section__venue">Hôtel de ville</p>
              <p className="hero-section__address">Reims, France</p>
            </section>
          </SectionReveal>

          {/* ── Details ── */}
          <SectionReveal delay={0.15}>
            <section className="details-section">
              <h2 className="details-section__title">
                Programme de la journée
              </h2>
              <div className="details-section__grid">
                <div className="detail-card">
                  <span className="detail-card__icon">🏛️</span>
                  <h3>Cérémonie</h3>
                  <p>11h</p>
                  <p className="detail-card__venue">Hôtel de ville de Reims</p>
                  <p className="detail-card__address">
                    9 Pl. de l'Hôtel de ville, 51100 Reims
                  </p>
                  <a
                    className="detail-card__map-link"
                    href="https://maps.app.goo.gl/nr6ijrLVMJdSiT8t6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Voir sur Google Maps
                  </a>
                </div>
                <div className="detail-card">
                  <span className="detail-card__icon">🍽️</span>
                  <h3>Déjeuner</h3>
                  <p>12h30</p>
                  <p className="detail-card__venue">Roast Café</p>
                  <p className="detail-card__address">
                    19 Rue de Neufchâtel, 51100 Reims
                  </p>
                  <a
                    className="detail-card__map-link"
                    href="https://maps.app.goo.gl/GY51FBdTFRqSJAYE7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Voir sur Google Maps
                  </a>
                </div>
              </div>
            </section>
          </SectionReveal>

          <GoldDivider />

          {/* ── Personal greeting ── */}
          <SectionReveal delay={0.1}>
            <section className="greeting-section">
              <p className="greeting-section__label">
                {guest.name.includes("&") || guest.name.includes("Famille")
                  ? "Chers"
                  : "Cher(e)"}
              </p>
              <h2 className="greeting-section__name">{guest.name}</h2>
              <p className="greeting-section__seats">
                {guest.seats > 1
                  ? `${guest.seats} places réservées à votre nom`
                  : "1 place réservée à votre nom"}
              </p>
            </section>
          </SectionReveal>

          {/* ── RSVP ── */}
          <SectionReveal delay={0.15}>
            {submitted ? (
              <Confirmation guestName={guest.name} />
            ) : (
              <RSVPForm guest={guest} onSuccess={() => setSubmitted(true)} />
            )}
          </SectionReveal>

          {/* ── Footer ── */}
          <footer className="invitation-footer">
            <GoldDivider />
            <p className="invitation-footer__text">Avec tout notre amour</p>
            <p className="invitation-footer__names">M &amp; A</p>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
