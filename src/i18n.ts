import ukFlagImage from "../assets/vlaggen/Uk.png";
import spainFlagImage from "../assets/vlaggen/spain.png";

export type LanguageCode = "nl" | "en" | "de" | "fr" | "es";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
  flagClass: string;
  flagImage?: string;
};

export const DEFAULT_LANGUAGE: LanguageCode = "nl";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "nl", label: "Nederlands", flagClass: "language-flag--nl" },
  { code: "en", label: "English", flagClass: "language-flag--uk", flagImage: ukFlagImage },
  { code: "de", label: "Deutsch", flagClass: "language-flag--de" },
  { code: "fr", label: "Francais", flagClass: "language-flag--fr" },
  { code: "es", label: "Espanol", flagClass: "language-flag--es", flagImage: spainFlagImage },
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
    categoryLabels: Record<
      "Breakfast" | "Lunch&Dinner" | "Handhelds" | "Sides&Small Plates" | "Signature Dips" | "Drinks",
      string
    >;
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
    printReceipt: string;
    receiptTitle: string;
    receiptDateLabel: string;
    receiptOrderLabel: string;
    receiptItemsLabel: string;
    receiptTotalLabel: string;
    receiptQtyShort: string;
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
        Breakfast: "ONTBIJT",
        "Lunch&Dinner": "LUNCH",
        Handhelds: "HANDHELDS",
        "Sides&Small Plates": "SIDES",
        "Signature Dips": "DIPS",
        Drinks: "DRINKEN",
      },
    },
    pay: {
      title: "UW WINKELWAGEN",
      back: "Terug",
      cancel: "ANNULEREN",
      pay: "BETALEN",
      quickAddTitle: "Snelle extra's",
      removeAria: (itemName) => `${itemName} verwijderen`,
      decreaseAria: (itemName) => `Een ${itemName} minder`,
      increaseAria: (itemName) => `Een ${itemName} extra`,
    },
    order: {
      thankYou: "BEDANKT VOOR UW BESTELLING!",
      orderNumberLabel: "UW ORDERNUMMER",
      preparing: "Uw bestelling wordt nu bereid",
      returnToStartIn: "Terugkeren naar startscherm in",
      seconds: "seconden",
      printReceipt: "BON PRINTEN",
      receiptTitle: "KASSABON",
      receiptDateLabel: "Datum",
      receiptOrderLabel: "Ordernummer",
      receiptItemsLabel: "Items",
      receiptTotalLabel: "Totaal",
      receiptQtyShort: "aantal",
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
        Breakfast: "BREAKFAST",
        "Lunch&Dinner": "LUNCH",
        Handhelds: "HANDHELDS",
        "Sides&Small Plates": "SIDES",
        "Signature Dips": "DIPS",
        Drinks: "DRINKS",
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
      printReceipt: "PRINT RECEIPT",
      receiptTitle: "RECEIPT",
      receiptDateLabel: "Date",
      receiptOrderLabel: "Order number",
      receiptItemsLabel: "Items",
      receiptTotalLabel: "Total",
      receiptQtyShort: "qty",
    },
  },
  de: {
    idle: {
      chooseLanguagePrimary: "Sprache waehlen",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Bildschirm beruehren, um zu starten",
      tapToSkip: "Tippen zum Ueberspringen",
      skipAnimationAria: "Animation ueberspringen",
    },
    products: {
      healthyMenu: "Gesundes Menue",
      continueButton: "WEITER",
      cartButton: "Warenkorb",
      backToStartAria: "Zurueck zum Start",
      brandIconAria: "Markensymbol",
      categoryLabels: {
        Breakfast: "FRUEHSTUECK",
        "Lunch&Dinner": "MITTAG",
        Handhelds: "HANDHELDS",
        "Sides&Small Plates": "BEILAGEN",
        "Signature Dips": "DIPS",
        Drinks: "GETRAENKE",
      },
    },
    pay: {
      title: "IHR WARENKORB",
      back: "Zurueck",
      cancel: "ABBRECHEN",
      pay: "BEZAHLEN",
      quickAddTitle: "Schnelle Extras",
      removeAria: (itemName) => `${itemName} entfernen`,
      decreaseAria: (itemName) => `Ein ${itemName} weniger`,
      increaseAria: (itemName) => `Ein ${itemName} mehr`,
    },
    order: {
      thankYou: "DANKE FUER IHRE BESTELLUNG!",
      orderNumberLabel: "IHRE BESTELLNUMMER",
      preparing: "Ihre Bestellung wird zubereitet",
      returnToStartIn: "Zurueck zum Startbildschirm in",
      seconds: "Sekunden",
      printReceipt: "BON DRUCKEN",
      receiptTitle: "BELEG",
      receiptDateLabel: "Datum",
      receiptOrderLabel: "Bestellnummer",
      receiptItemsLabel: "Artikel",
      receiptTotalLabel: "Gesamt",
      receiptQtyShort: "Anz.",
    },
  },
  fr: {
    idle: {
      chooseLanguagePrimary: "Choisissez votre langue",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Touchez l'ecran pour commencer",
      tapToSkip: "Touchez pour passer",
      skipAnimationAria: "Passer l'animation",
    },
    products: {
      healthyMenu: "Menu sain",
      continueButton: "CONTINUER",
      cartButton: "Panier",
      backToStartAria: "Retour a l'accueil",
      brandIconAria: "Icone de marque",
      categoryLabels: {
        Breakfast: "PETIT DEJ.",
        "Lunch&Dinner": "DEJEUNER",
        Handhelds: "SNACKS",
        "Sides&Small Plates": "ACCOMP.",
        "Signature Dips": "DIPS",
        Drinks: "BOISSONS",
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
      orderNumberLabel: "VOTRE NUMERO DE COMMANDE",
      preparing: "Votre commande est en preparation",
      returnToStartIn: "Retour a l'ecran d'accueil dans",
      seconds: "secondes",
      printReceipt: "IMPRIMER LE TICKET",
      receiptTitle: "TICKET",
      receiptDateLabel: "Date",
      receiptOrderLabel: "Numero de commande",
      receiptItemsLabel: "Articles",
      receiptTotalLabel: "Total",
      receiptQtyShort: "qte",
    },
  },
  es: {
    idle: {
      chooseLanguagePrimary: "Elige tu idioma",
      chooseLanguageSecondary: "Choose your language",
      touchToStart: "Toca la pantalla para empezar",
      tapToSkip: "Toca para omitir",
      skipAnimationAria: "Omitir animacion",
    },
    products: {
      healthyMenu: "Menu saludable",
      continueButton: "CONTINUAR",
      cartButton: "Carrito",
      backToStartAria: "Volver al inicio",
      brandIconAria: "Icono de marca",
      categoryLabels: {
        Breakfast: "DESAYUNO",
        "Lunch&Dinner": "ALMUERZO",
        Handhelds: "SNACKS",
        "Sides&Small Plates": "SIDES",
        "Signature Dips": "DIPS",
        Drinks: "BEBIDAS",
      },
    },
    pay: {
      title: "TU CARRITO",
      back: "Atras",
      cancel: "CANCELAR",
      pay: "PAGAR",
      quickAddTitle: "Extras rapidos",
      removeAria: (itemName) => `Quitar ${itemName}`,
      decreaseAria: (itemName) => `Quitar uno de ${itemName}`,
      increaseAria: (itemName) => `Agregar uno de ${itemName}`,
    },
    order: {
      thankYou: "GRACIAS POR TU PEDIDO!",
      orderNumberLabel: "TU NUMERO DE PEDIDO",
      preparing: "Tu pedido se esta preparando",
      returnToStartIn: "Volviendo a la pantalla inicial en",
      seconds: "segundos",
      printReceipt: "IMPRIMIR TICKET",
      receiptTitle: "TICKET",
      receiptDateLabel: "Fecha",
      receiptOrderLabel: "Numero de pedido",
      receiptItemsLabel: "Articulos",
      receiptTotalLabel: "Total",
      receiptQtyShort: "cant.",
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
