import morningBoostImage from "../../assets/images/Breakfast/Morning_Boost.webp";
import overnightOatsImage from "../../assets/images/Breakfast/Overnight_Oats.webp";
import peanutToastImage from "../../assets/images/Breakfast/Peanut_Butter&Cacao_Toast.webp";
import gardenWrapImage from "../../assets/images/Breakfast/the_Garden_Breakfast_Warp.webp";
import avocadoToastieImage from "../../assets/images/Handhelds/Avocado&Halloumi_Toastie.webp";
import jackfruitSliderImage from "../../assets/images/Handhelds/Smoky_BBQ_Jackfruit_Slider.webp";
import hummusWrapImage from "../../assets/images/Handhelds/Zesty_Chickpea_Hummus_Wrap.webp";
import falafelBowlImage from "../../assets/images/Lunch&Dinner/Mediterranean_Falafel_Bowl.webp";
import supergreenImage from "../../assets/images/Lunch&Dinner/The_Supergreen_Harvest.webp";
import tofuPowerImage from "../../assets/images/Lunch&Dinner/Tofu_Power_Tahini_Bowl.webp";
import tempehBowlImage from "../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp";

export type Category = "Ontbijt" | "Lunch & Dinner" | "Handhelds" | "Drinken";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "morning-boost",
    name: "Morning Boost Acai Bowl (VG)",
    category: "Ontbijt",
    description: "A chilled blend of acai and banana topped with crunchy granola.",
    price: 7.5,
    image: morningBoostImage,
  },
  {
    id: "garden-wrap",
    name: "The Garden Breakfast Wrap (V)",
    category: "Ontbijt",
    description: "Whole-grain wrap with tofu scramble, baby spinach and herby yogurt.",
    price: 6.5,
    image: gardenWrapImage,
  },
  {
    id: "peanut-toast",
    name: "Peanut Butter & Cacao Toast (V)",
    category: "Ontbijt",
    description: "Sourdough toast with banana, peanut butter and cacao nibs.",
    price: 6.5,
    image: peanutToastImage,
  },
  {
    id: "overnight-oats",
    name: "Overnight Oats: Apple Pie (V)",
    category: "Ontbijt",
    description: "Oats soaked in almond milk with spiced apple and crushed walnuts.",
    price: 5.5,
    image: overnightOatsImage,
  },
  {
    id: "tempeh-bowl",
    name: "Warm Teriyaki Tempeh Bowl",
    category: "Lunch & Dinner",
    description: "Brown rice, glazed tempeh, cucumber, and sesame greens.",
    price: 12.95,
    image: tempehBowlImage,
  },
  {
    id: "falafel-bowl",
    name: "Mediterranean Falafel Bowl",
    category: "Lunch & Dinner",
    description: "Falafel, tabbouleh, hummus, pickled onion, and tahini.",
    price: 11.75,
    image: falafelBowlImage,
  },
  {
    id: "supergreen-bowl",
    name: "The Supergreen Harvest",
    category: "Lunch & Dinner",
    description: "Kale, quinoa, edamame, avocado, and lemon dressing.",
    price: 11.25,
    image: supergreenImage,
  },
  {
    id: "tofu-power",
    name: "Tofu Power Tahini Bowl",
    category: "Lunch & Dinner",
    description: "Roasted tofu, grains, and sesame tahini dressing.",
    price: 11.95,
    image: tofuPowerImage,
  },
  {
    id: "bbq-slider",
    name: "Smoky BBQ Jackfruit Slider",
    category: "Handhelds",
    description: "Braised jackfruit, slaw, and chipotle mayo in brioche.",
    price: 7.8,
    image: jackfruitSliderImage,
  },
  {
    id: "hummus-wrap",
    name: "Zesty Chickpea Hummus Wrap",
    category: "Handhelds",
    description: "Roasted peppers, hummus, cucumber ribbons, and rocket.",
    price: 8.9,
    image: hummusWrapImage,
  },
  {
    id: "avocado-toastie",
    name: "Avocado & Halloumi Toastie",
    category: "Handhelds",
    description: "Grilled toastie with avocado smash and halloumi.",
    price: 8.6,
    image: avocadoToastieImage,
  },
  {
    id: "cold-brew",
    name: "House Cold Brew",
    category: "Drinken",
    description: "Slow-brewed coffee, served over ice.",
    price: 3.9,
    image: morningBoostImage,
  },
  {
    id: "green-juice",
    name: "Morning Boost Juice",
    category: "Drinken",
    description: "Apple, kale, cucumber, lemon, and mint.",
    price: 4.75,
    image: morningBoostImage,
  },
];

export const CATEGORIES: Category[] = [
  "Ontbijt",
  "Lunch & Dinner",
  "Handhelds",
  "Drinken",
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
