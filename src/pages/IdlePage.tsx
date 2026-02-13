import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type IdlePageProps = {
  onStartOrder: (languageCode: string) => void;
};

const LANGUAGES = [
  { code: "nl", label: "Nederlands", flagClass: "language-flag--nl" },
  { code: "en", label: "English", flagClass: "language-flag--us" },
  { code: "de", label: "Deutsch", flagClass: "language-flag--de" },
  { code: "fr", label: "Francais", flagClass: "language-flag--fr" },
  { code: "es", label: "Espanol", flagClass: "language-flag--es" },
];

const LOGO_SLIDES = [
  new URL("../../assets/images/Lunch&Dinner/The_Supergreen_Harvest.webp", import.meta.url).href,
  new URL("../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp", import.meta.url).href,
  new URL("../../assets/images/Breakfast/Morning_Boost.webp", import.meta.url).href,
];
const LOGO_ANIMATION_VIDEO =
  new URL("../../assets/Logo animation/Logo animation.mp4", import.meta.url).href;

function IdlePage({ onStartOrder }: IdlePageProps) {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (showAnimation) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % LOGO_SLIDES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [showAnimation]);

  useEffect(() => {
    if (showAnimation) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowAnimation(true);
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [showAnimation]);

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(#0000004d, #0000004d), url(${LOGO_SLIDES[slideIndex]})`,
    }),
    [slideIndex],
  );

  const startOrder = (languageCode: string) => {
    onStartOrder(languageCode);
    navigate("/products");
  };

  return (
    <main className="language-screen" style={backgroundStyle}>
      {showAnimation ? (
        <button
          type="button"
          className="idle-animation"
          onClick={() => setShowAnimation(false)}
          aria-label="Sla animatie over"
        >
          <video
            className="idle-animation__video"
            src={LOGO_ANIMATION_VIDEO}
            autoPlay
            muted
            playsInline
            onEnded={() => setShowAnimation(false)}
            onError={() => setShowAnimation(false)}
          />
          <span className="idle-animation__skip">Tik om over te slaan</span>
        </button>
      ) : (
        <section className="language-screen__panel">
          <div className="language-screen__dots" aria-hidden="true">
            {LOGO_SLIDES.map((slideImage, index) => (
              <span
                key={slideImage}
                className={index === slideIndex ? "slider-dot slider-dot--active" : "slider-dot"}
              />
            ))}
          </div>
          <h1 className="idle-title">
            <span>Kies uw taal</span>
            <span>Choose your language</span>
          </h1>
          <div className="language-grid">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                className="language-btn"
                onClick={() => startOrder(language.code)}
              >
                <span className={`language-btn__flag language-flag ${language.flagClass}`} />
                <span>{language.label}</span>
              </button>
            ))}
          </div>
          <p className="language-screen__hint">Raak het scherm aan om te beginnen</p>
        </section>
      )}
    </main>
  );
}

export default IdlePage;
