import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../data/menu";
import { DEFAULT_LANGUAGE, getUiText, LANGUAGE_OPTIONS } from "../i18n";
import type { LanguageCode } from "../i18n";
import breakfastIcon from "../../assets/images/Breakfast/Morning_Boost.webp";
import drinkIcon from "../../assets/images/Breakfast/Overnight_Oats.webp";
import etenIcon from "../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp";
import gebakIcon from "../../assets/images/Breakfast/Peanut_Butter&Cacao_Toast.webp";
import brandLogo from "../../assets/disgen/logo.webp";

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
const IDLE_VIDEO_AUTO_SKIP_MS = 12000;
const START_SCREEN_TIMEOUT_MS = 20000;
const PRODUCTS_PRELOAD_IMAGES = Array.from(
  new Set([brandLogo, breakfastIcon, drinkIcon, etenIcon, gebakIcon, ...MENU_ITEMS.map((item) => item.image)]),
);

function IdlePage({ languageCode, onStartOrder }: IdlePageProps) {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const startTimeoutRef = useRef<number | null>(null);
  const hasPreloadedProductsRef = useRef(false);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);
  const text = getUiText(languageCode);

  useEffect(() => {
    if (showAnimation) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((current) => {
        setPreviousSlideIndex(current);
        return (current + 1) % LOGO_SLIDES.length;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [showAnimation]);

  useEffect(() => {
    if (previousSlideIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPreviousSlideIndex(null);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [previousSlideIndex]);

  useEffect(() => {
    if (showAnimation || isStarting) {
      return;
    }

    continueButtonRef.current?.focus();
  }, [showAnimation, isStarting]);

  useEffect(() => {
    if (showAnimation || hasPreloadedProductsRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      PRODUCTS_PRELOAD_IMAGES.forEach((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });
      hasPreloadedProductsRef.current = true;
    }, 120);

    return () => window.clearTimeout(timer);
  }, [showAnimation]);

  useEffect(() => {
    if (!showAnimation) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowAnimation(false);
    }, IDLE_VIDEO_AUTO_SKIP_MS);

    return () => window.clearTimeout(timer);
  }, [showAnimation]);

  useEffect(() => {
    return () => {
      if (startTimeoutRef.current !== null) {
        window.clearTimeout(startTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showAnimation) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowAnimation(true);
    }, START_SCREEN_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [showAnimation]);

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(#0000004d, #0000004d), url(${LOGO_SLIDES[slideIndex]})`,
    }),
    [slideIndex],
  );
  const previousBackgroundStyle = useMemo(
    () =>
      previousSlideIndex === null
        ? null
        : {
            backgroundImage: `linear-gradient(#0000004d, #0000004d), url(${LOGO_SLIDES[previousSlideIndex]})`,
          },
    [previousSlideIndex],
  );

  const startOrder = (nextLanguageCode: LanguageCode) => {
    if (isStarting) {
      return;
    }

    setIsStarting(true);
    startTimeoutRef.current = window.setTimeout(() => {
      setShowAnimation(false);
      onStartOrder(nextLanguageCode);
      navigate("/products");
    }, 260);
  };

  return (
    <main className="language-screen">
      <div className="language-screen__bg language-screen__bg--current" style={backgroundStyle} />
      {previousBackgroundStyle ? (
        <div className="language-screen__bg language-screen__bg--previous" style={previousBackgroundStyle} />
      ) : null}
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
        </button>
      ) : (
        <section
          className={
            isStarting ? "language-screen__panel language-screen__panel--fade-out" : "language-screen__panel"
          }
        >
          <h1 className="sr-only">{text.idle.chooseLanguagePrimary}</h1>
          <div className="language-screen__dots" aria-hidden="true">
            {LOGO_SLIDES.map((slideImage, index) => (
              <span
                key={slideImage}
                className={index === slideIndex ? "slider-dot slider-dot--active" : "slider-dot"}
              />
            ))}
          </div>
          <div className="language-screen__center-action">
            <button
              type="button"
              className="start-continue-btn"
              ref={continueButtonRef}
              aria-label="Doorgaan in Nederlands"
              disabled={isStarting}
              onClick={() => startOrder(DEFAULT_LANGUAGE)}
            >
              DOOR
            </button>
          </div>
          <div className="language-grid" role="group" aria-label={text.idle.chooseLanguagePrimary}>
            {LANGUAGE_OPTIONS.map((language) => (
              <button
                key={language.code}
                type="button"
                className="language-btn"
                disabled={isStarting}
                aria-label={`Start in ${language.label}`}
                title={language.label}
                onClick={() => startOrder(language.code)}
              >
                {language.flagImage ? (
                  <img src={language.flagImage} alt="" className="language-btn__flag" />
                ) : (
                  <span className={`language-btn__flag language-flag ${language.flagClass}`} />
                )}
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default IdlePage;
