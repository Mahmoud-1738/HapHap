import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUiText, LANGUAGE_OPTIONS } from "../i18n";
import type { LanguageCode } from "../i18n";

type IdlePageProps = {
  languageCode: LanguageCode;
  onStartOrder: (languageCode: LanguageCode) => void;
};

const LOGO_SLIDES = [
  new URL("../../assets/images/Lunch&Dinner/The_Supergreen_Harvest.webp", import.meta.url).href,
  new URL("../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp", import.meta.url).href,
  new URL("../../assets/images/Breakfast/Morning_Boost.webp", import.meta.url).href,
];
const LOGO_ANIMATION_VIDEO =
  new URL("../../assets/Logo animation/Logo animation.mp4", import.meta.url).href;

function IdlePage({ languageCode, onStartOrder }: IdlePageProps) {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const text = getUiText(languageCode);

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

  const startOrder = (nextLanguageCode: LanguageCode) => {
    setShowAnimation(false);
    onStartOrder(nextLanguageCode);
    navigate("/products");
  };

  return (
    <main className="language-screen" style={backgroundStyle}>
      {showAnimation ? (
        <button
          type="button"
          className="idle-animation"
          onClick={() => setShowAnimation(false)}
          aria-label={text.idle.skipAnimationAria}
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
          <span className="idle-animation__skip">{text.idle.tapToSkip}</span>
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
            <span>{text.idle.chooseLanguagePrimary}</span>
            <span>{text.idle.chooseLanguageSecondary}</span>
          </h1>
          <div className="language-grid">
            {LANGUAGE_OPTIONS.map((language) => (
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
          <p className="language-screen__hint">{text.idle.touchToStart}</p>
        </section>
      )}
    </main>
  );
}

export default IdlePage;
