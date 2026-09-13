import { Chapter } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Chemical Reactions and Equations",
    shortDescription: "Chemical changes, writing and balancing chemical equations, types of chemical reactions, corrosion, and rancidity.",
    description: "Learn how to represent chemical changes with balanced equations, identify combination, decomposition, displacement, and redox reactions, and understand real-world corrosion and rancidity.",
    weightage: "6-7 Marks in CBSE Boards",
    color: "from-blue-600 to-indigo-700",
    iconName: "Flame",
    topics: [
      "Chemical Equations & Balancing",
      "Combination Reactions",
      "Decomposition Reactions",
      "Displacement Reactions",
      "Double Displacement & Precipitation",
      "Oxidation, Reduction & Redox Reactions",
      "Corrosion & Rancidity"
    ],
    reactionCount: 18,
    experimentCount: 14
  },
  {
    id: "ch2",
    number: 2,
    title: "Acids, Bases and Salts",
    shortDescription: "Chemical properties of acids and bases, pH scale, importance of pH in everyday life, and chemicals from common salt.",
    description: "Understand indicators, neutralization reactions, the universal pH scale, tooth decay prevention, and industrial manufacturing of chlor-alkali products, bleaching powder, and baking soda.",
    weightage: "7-8 Marks in CBSE Boards",
    color: "from-emerald-600 to-teal-700",
    iconName: "FlaskConical",
    topics: [
      "Reaction with Metals & Metal Carbonates",
      "Neutralisation Reactions",
      "Metallic & Non-metallic Oxides",
      "Ionization & pH Scale",
      "Chemicals from Common Salt (Chlor-Alkali, Bleaching Powder)",
      "Baking Soda & Washing Soda",
      "Plaster of Paris & Water of Crystallisation"
    ],
    reactionCount: 16,
    experimentCount: 12
  },
  {
    id: "ch3",
    number: 3,
    title: "Metals and Non-metals",
    shortDescription: "Physical and chemical properties of metals, reactivity series, formation of ionic compounds, metallurgy, and corrosion prevention.",
    description: "Explore the metal reactivity series, displacement reactions, electron-dot ionic structures, extraction of metals via roasting and calcination, thermite welding, and corrosion prevention.",
    weightage: "6-7 Marks in CBSE Boards",
    color: "from-amber-600 to-orange-700",
    iconName: "Sparkles",
    topics: [
      "Reaction of Metals with Oxygen & Water",
      "Reaction of Metals with Acids & Salt Solutions",
      "The Reactivity Series",
      "Ionic Bond Formation",
      "Extraction of Metals (Roasting, Calcination, Reduction)",
      "Thermite Reaction & Electrolytic Refining",
      "Corrosion & Alloys"
    ],
    reactionCount: 12,
    experimentCount: 10
  },
  {
    id: "ch4",
    number: 4,
    title: "Carbon and its Compounds",
    shortDescription: "Covalent bonding in carbon, versatile nature, homologous series, nomenclature, chemical properties of ethanol & ethanoic acid, soaps.",
    description: "Delve into the versatile quadrivalent nature of carbon, catenation, functional groups, reactions of ethanol, esterification, saponification, soap micelle formation, and cleansing action.",
    weightage: "7-8 Marks in CBSE Boards",
    color: "from-purple-600 to-violet-800",
    iconName: "Atom",
    topics: [
      "Covalent Bonding & Tetravalency",
      "Saturated & Unsaturated Hydrocarbons",
      "Combustion & Oxidation of Carbon Compounds",
      "Addition & Substitution Reactions",
      "Properties of Ethanol (Dehydration & Na reaction)",
      "Properties of Ethanoic Acid (Esterification & Saponification)",
      "Action of Soaps & Detergents"
    ],
    reactionCount: 11,
    experimentCount: 9
  }
];
