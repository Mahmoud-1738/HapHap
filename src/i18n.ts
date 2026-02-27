export type LanguageCode = "nl" | "en" | "de" | "fr" | "es";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
  flagClass: string;
};

export const DEFAULT_LANGUAGE: LanguageCode = "nl";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "nl", label: "Nederlands", flagClass: "language-flag--nl" },
  { code: "en", label: "English", flagClass: "language-flag--us" },
  { code: "de", label: "Deutsch", flagClass: "language-flag--de" },
  { code: "fr", label: "Français", flagClass: "language-flag--fr" },
  { code: "es", label: "Español", flagClass: "language-flag--es" },
];

type UiText = {
  idle: {
    chooseLanguagePrimary: string;
    chooseLanguageSecondary: string;
    touchToStart: string;
    tapToSkip: string;
    skipAnimationAria: string;
  };
  products: {
    healthyMenu: string;
    continueButton: string;
    cartButton: string;
    backToStartAria: string;
    brandIconAria: string;
    categoryLabels: Record<"Ontbijt" | "Lunch & Dinner" | "Handhelds" | "Drinken", string>;
  };
  pay: {
    title: string;
    back: string;
    cancel: string;
    pay: string;
    quickAddTitle: string;
    removeAria: (itemName: string) => string;
    decreaseAria: (itemName: string) => string;
    increaseAria: (itemName: string) => string;
  };
  order: {
    thankYou: string;
    orderNumberLabel: string;
    preparing: string;
    returnToStartIn: string;
    seconds: string;
  };
};

const UI_TEXT: Record<LanguageCode, UiText> = {
  nl: {
    idle: {
      chooseLanguagePrimary: "Kies uw taal",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Raak het scherm aan om te beginnen",
      tapToSkip: "Tik om over te slaan",
      skipAnimationAria: "Sla animatie over",
    },
    products: {
      healthyMenu: "Gezond menu",
      continueButton: "DOOR",
      cartButton: "Winkelwagen",
      backToStartAria: "Terug naar start",
      brandIconAria: "Merkicoon",
      categoryLabels: {
        Ontbijt: "ONTBIJT",
        "Lunch & Dinner": "LUNCH",
        Handhelds: "HANDHELDS",
        Drinken: "DRINKEN",
      },
    },
    pay: {
      title: "UW WINKELWAGEN",
      back: "Terug",
      cancel: "ANNULEREN",
      pay: "BETALEN",
      quickAddTitle: "Snelle extra's",
      removeAria: (itemName) => `${itemName} verwijderen`,
      decreaseAria: (itemName) => `Eén ${itemName} minder`,
      increaseAria: (itemName) => `Eén ${itemName} extra`,
    },
    order: {
      thankYou: "BEDANKT VOOR UW BESTELLING!",
      orderNumberLabel: "UW ORDERNUMMER",
      preparing: "Uw bestelling wordt nu bereid",
      returnToStartIn: "Terugkeren naar startscherm in",
      seconds: "seconden",
    },
  },
  en: {
    idle: {
      chooseLanguagePrimary: "Choose your language",
      chooseLanguageSecondary: "Kies uw taal",
      touchToStart: "Touch the screen to begin",
      tapToSkip: "Tap to skip",
      skipAnimationAria: "Skip animation",
    },
    products: {
      healthyMenu: "Healthy menu",
      continueButton: "CONTINUE",
      cartButton: "Cart",
      backToStartAria: "Back to start",
      brandIconAria: "Brand icon",
      categoryLabels: {
        Ontbijt: "BREAKFAST",
        "Lunch & Dinner": "LUNCH",
        Handhelds: "HANDHELDS",
        Drinken: "DRINKS",
      },
    },
    pay: {
      title: "YOUR CART",
      back: "Back",
      cancel: "CANCEL",
      pay: "PAY",
      quickAddTitle: "Quick add-ons",
      removeAria: (itemName) => `Remove ${itemName}`,
      decreaseAria: (itemName) => `Remove one ${itemName}`,
      increaseAria: (itemName) => `Add one ${itemName}`,
    },
    order: {
      thankYou: "THANK YOU FOR YOUR ORDER!",
      orderNumberLabel: "YOUR ORDER NUMBER",
      preparing: "Your order is being prepared",
      returnToStartIn: "Returning to start screen in",
      seconds: "seconds",
    },
  },
  de: {
    idle: {
      chooseLanguagePrimary: "Sprache wählen",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Bildschirm berühren, um zu starten",
      tapToSkip: "Tippen zum Überspringen",
      skipAnimationAria: "Animation überspringen",
    },
    products: {
      healthyMenu: "Gesundes Menü",
      continueButton: "WEITER",
      cartButton: "Warenkorb",
      backToStartAria: "Zurück zum Start",
      brandIconAria: "Markensymbol",
      categoryLabels: {
        Ontbijt: "FRÜHSTÜCK",
        "Lunch & Dinner": "MITTAG",
        Handhelds: "HANDHELDS",
        Drinken: "GETRÄNKE",
      },
    },
    pay: {
      title: "IHR WARENKORB",
      back: "Zurück",
      cancel: "ABBRECHEN",
      pay: "BEZAHLEN",
      quickAddTitle: "Schnelle Extras",
      removeAria: (itemName) => `${itemName} entfernen`,
      decreaseAria: (itemName) => `Ein ${itemName} weniger`,
      increaseAria: (itemName) => `Ein ${itemName} mehr`,
    },
    order: {
      thankYou: "DANKE FÜR IHRE BESTELLUNG!",
      orderNumberLabel: "IHRE BESTELLNUMMER",
      preparing: "Ihre Bestellung wird zubereitet",
      returnToStartIn: "Zurück zum Startbildschirm in",
      seconds: "Sekunden",
    },
  },
  fr: {
    idle: {
      chooseLanguagePrimary: "Choisissez votre langue",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Touchez l'écran pour commencer",
      tapToSkip: "Touchez pour passer",
      skipAnimationAria: "Passer l'animation",
    },
    products: {
      healthyMenu: "Menu sain",
      continueButton: "CONTINUER",
      cartButton: "Panier",
      backToStartAria: "Retour à l'accueil",
      brandIconAria: "Icône de marque",
      categoryLabels: {
        Ontbijt: "PETIT DÉJ.",
        "Lunch & Dinner": "DÉJEUNER",
        Handhelds: "SNACKS",
        Drinken: "BOISSONS",
      },
    },
    pay: {
      title: "VOTRE PANIER",
      back: "Retour",
      cancel: "ANNULER",
      pay: "PAYER",
      quickAddTitle: "Extras rapides",
      removeAria: (itemName) => `Supprimer ${itemName}`,
      decreaseAria: (itemName) => `Retirer un ${itemName}`,
      increaseAria: (itemName) => `Ajouter un ${itemName}`,
    },
    order: {
      thankYou: "MERCI POUR VOTRE COMMANDE !",
      orderNumberLabel: "VOTRE NUMÉRO DE COMMANDE",
      preparing: "Votre commande est en préparation",
      returnToStartIn: "Retour à l'écran d'accueil dans",
      seconds: "secondes",
    },
  },
  es: {
    idle: {
      chooseLanguagePrimary: "Elige tu idioma",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Toca la pantalla para empezar",
      tapToSkip: "Toca para omitir",
      skipAnimationAria: "Omitir animación",
    },
    products: {
      healthyMenu: "Menú saludable",
      continueButton: "CONTINUAR",
      cartButton: "Carrito",
      backToStartAria: "Volver al inicio",
      brandIconAria: "Icono de marca",
      categoryLabels: {
        Ontbijt: "DESAYUNO",
        "Lunch & Dinner": "ALMUERZO",
        Handhelds: "SNACKS",
        Drinken: "BEBIDAS",
      },
    },
    pay: {
      title: "TU CARRITO",
      back: "Atrás",
      cancel: "CANCELAR",
      pay: "PAGAR",
      quickAddTitle: "Extras rápidos",
      removeAria: (itemName) => `Quitar ${itemName}`,
      decreaseAria: (itemName) => `Quitar uno de ${itemName}`,
      increaseAria: (itemName) => `Agregar uno de ${itemName}`,
    },
    order: {
      thankYou: "¡GRACIAS POR TU PEDIDO!",
      orderNumberLabel: "TU NÚMERO DE PEDIDO",
      preparing: "Tu pedido se está preparando",
      returnToStartIn: "Volviendo a la pantalla inicial en",
      seconds: "segundos",
    },
  },
};

export function isLanguageCode(value: string): value is LanguageCode {
  return value === "nl" || value === "en" || value === "de" || value === "fr" || value === "es";
}

export function getUiText(languageCode: string): UiText {
  return isLanguageCode(languageCode) ? UI_TEXT[languageCode] : UI_TEXT[DEFAULT_LANGUAGE];
}

export function getLocaleForLanguage(languageCode: string): string {
  if (languageCode === "en") return "en-GB";
  if (languageCode === "de") return "de-DE";
  if (languageCode === "fr") return "fr-FR";
  if (languageCode === "es") return "es-ES";
  return "nl-NL";
}
