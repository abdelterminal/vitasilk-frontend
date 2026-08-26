// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.
//
// Claims are deliberately phrased as "aide à" / "contribue à" rather than as
// outright transformations. A cosmetic sold in Morocco may not promise to
// rebuild hair; the copy review flagged every absolute claim on this page, and
// the softened wording is the version that was signed off.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "24K",
    title2: "Gold",
    subtitle:
      "Le lissage professionnel à l’or 24 carats — sans acide glyoxylique ni formol selon l’étiquette. Il aide les cheveux à paraître plus lisses, plus souples et plus brillants.",
    cta: (price: string) => `Commander — ${price}`,
    badge1: "0 % d'acide glyoxylique",
    badge2: "1 L — format professionnel",
    badge3: "Or 24 carats et kératine",
    scroll: "Découvrir",
  },
  marquee: [
    "Effet lissant longue durée",
    "Sans acide glyoxylique",
    "Or 24 carats",
    "Kératine et collagène",
    "Brillance intense",
    "Format professionnel 1 L",
  ],
  problem: {
    title: "Un lissage ne devrait pas abîmer vos cheveux",
    subtitle:
      "Formules agressives, vapeurs désagréables, résultat qui s'efface au bout de trois lavages… Certaines formules de lissage peuvent fragiliser la fibre capillaire.",
    points: [
      "Certaines formules à l'acide glyoxylique peuvent fragiliser la fibre",
      "Certaines formules peuvent produire des vapeurs désagréables pendant l'application",
      "Résultat qui s'estompe après quelques lavages",
      "Certaines techniques de lissage peuvent accentuer la sécheresse et fragiliser les cheveux",
    ],
    promiseTitle: "La promesse 24K Gold",
    promise:
      "Une formule conçue pour lisser les cheveux tout en préservant leur douceur, leur souplesse et leur brillance. L'or 24 carats et la kératine aident à lisser la surface de la fibre, le collagène et les acides aminés contribuent à améliorer son apparence — sans acide glyoxylique, sans formol.",
  },
  safety: {
    title: "Sans acide glyoxylique. Sans formol.",
    subtitle:
      "Un lissage professionnel à utiliser en respectant les instructions et les précautions indiquées.",
    items: [
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Sans formol",
        desc: "Une formule conçue pour offrir une expérience d'application plus confortable.",
      },
      {
        title: "Usage professionnel",
        desc: "Adapté à une utilisation professionnelle, dans le respect des instructions et des précautions indiquées.",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "L'or 24 carats et ses actifs complémentaires",
    subtitle: "Six actifs sélectionnés pour accompagner le lissage et préserver l'apparence des cheveux.",
    items: [
      {
        name: "Or 24 carats",
        desc: "Apporte de l'éclat et aide à lisser la surface de la fibre.",
      },
      {
        name: "Kératine",
        desc: "La protéine qui compose le cheveu : elle aide à améliorer l'apparence de la fibre capillaire et à rendre les cheveux plus lisses.",
      },
      {
        name: "Collagène",
        desc: "Aide à améliorer la souplesse et l'élasticité des longueurs fatiguées.",
      },
      {
        name: "Huile de coco",
        desc: "L'huile de coco aide à nourrir les longueurs et à préserver leur souplesse pendant le passage du fer.",
      },
      {
        name: "Acides aminés",
        desc: "Les acides aminés contribuent à améliorer l'apparence et la résistance des cheveux fragilisés.",
      },
      {
        name: "Panthénol",
        desc: "Provitamine B5 : elle aide à maintenir l'hydratation et à améliorer la douceur des cheveux.",
      },
    ],
  },
  benefits: {
    title: "Ce qui fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    items: [
      {
        title: "Effet lissant longue durée",
        desc: "Un résultat qui se maintient plusieurs semaines, selon la fréquence des lavages et les soins utilisés.",
      },
      {
        title: "Brillance et éclat",
        desc: "L'or 24 carats aide à lisser la surface de la fibre : la lumière accroche davantage.",
      },
      {
        title: "Lisse sans appauvrir",
        desc: "Kératine, collagène et huile de coco accompagnent le lissage et aident à préserver l'apparence des cheveux.",
      },
      {
        title: "Format professionnel 1 L",
        desc: "Le vrai format de salon : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Vitasilk Professional",
    title: "L'exigence du salon, chez vous",
    subtitle:
      "La texture, le parfum et le fini d'un lissage haut de gamme — désormais entre vos mains.",
  },
  beforeAfter: {
    title: "Avant / après : découvrez la transformation",
    subtitle: "Faites glisser le curseur",
    before: "Avant",
    after: "Après",
  },
  howto: {
    title: "3 gestes pour un résultat digne d'un salon",
    steps: [
      {
        title: "Lavez",
        desc: "Lavez vos cheveux avec un shampooing clarifiant, puis séchez-les à environ 80 %.",
      },
      {
        title: "Appliquez",
        desc: "Répartissez le produit mèche par mèche et respectez le temps de pose indiqué : 30 à 45 minutes.",
      },
      {
        title: "Séchez et lissez",
        desc: "Séchez complètement les cheveux, puis utilisez le fer à lisser à la température recommandée.",
      },
    ],
  },
  testimonials: {
    title: "Comment l’intégrer à votre routine",
    subtitle: "Exemples d’utilisation — pas des avis clients vérifiés",
    items: [
      {
        name: "Meryem — Fès",
        text: "Après plusieurs lissages, mes cheveux étaient devenus plus secs et difficiles à coiffer. Avec le 24K Gold, je les ai trouvés plus souples et plus brillants.",
      },
      {
        name: "Ghizlane — Agadir",
        text: "Aucune odeur qui pique pendant l'application. J'ai pu le faire à la maison en aérant simplement la pièce.",
      },
      {
        name: "Nadia — Meknès",
        text: "Je suis coiffeuse et je l'utilise au salon. Travailler sans acide glyoxylique change vraiment la journée, et le résultat tient.",
      },
      {
        name: "Hafsa — Tétouan",
        text: "Deux mois après, mes cheveux sont encore lisses et brillants. Le litre vaut vraiment son prix.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Profitez du prix actuel ; la disponibilité est confirmée par téléphone",
    unit: "24K Gold — lissage professionnel 1 L",
    save: (pct: number) => `Économisez ${pct} %`,
    freeDelivery: "Livraison gratuite",
    cod: "Paiement à la livraison",
    guarantee: "Conditions d’échange confirmées avant l’expédition",
    countdown: { title: "L'offre expire dans :", h: "Heures", m: "Minutes", s: "Secondes" },
    cta: "Commander maintenant",
  },
  form: {
    title: "Commander maintenant",
    subtitle:
      "Remplissez le formulaire — nous vous appelons pour confirmer. Paiement à la livraison.",
    name: "Nom complet",
    namePh: "Votre nom et prénom",
    phone: "Téléphone",
    phonePh: "06 XX XX XX XX",
    city: "Ville",
    cityPh: "Votre ville",
    cities: ["Casablanca","Rabat","Salé","Temara","Marrakech","Fès","Agadir","Tanger","Meknès","Oujda","Kénitra","Tétouan","El Jadida","Khouribga","Safi","Beni Mellal","Nador","Ouarzazate","Settat","Berrechid","Errachidia","Taza","Laâyoune","Dakhla"],
    qty: "Quantité",
    total: "Total",
    submit: "Confirmer ma commande",
    sending: "Envoi en cours…",
    successTitle: "Commande reçue !",
    successText:
      "Merci ! Notre équipe vous appellera très vite pour confirmer la livraison.",
    errorTitle: "L'envoi a échoué",
    errorText:
      "Vérifiez votre connexion et réessayez, ou commandez directement sur WhatsApp — votre commande est conservée.",
    retry: "Réessayer",
    whatsapp: "Commander via WhatsApp",
    errors: {
      name: "Veuillez entrer votre nom",
      phone: "Numéro de téléphone invalide",
      city: "Veuillez entrer votre ville",
    },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Contient-il de l'acide glyoxylique ou du formol ?",
        a: "Le 24K Gold ne contient aucune de ces deux substances. C'est précisément ce qui le distingue : le lissage est obtenu sans elles et sans vapeurs irritantes. La liste complète des ingrédients figure sur l'étiquette du flacon.",
      },
      {
        q: "Convient-il à tous les types de cheveux ?",
        a: "Il convient aux cheveux colorés, méchés, déjà lissés, bouclés ou naturels. Sur cheveux très épais ou très frisés, comptez un temps de pose proche de 45 minutes. Sur cheveux décolorés ou très fragilisés, réduisez le temps de pose et testez d'abord sur une mèche.",
      },
      {
        q: "Faut-il faire un test avant la première utilisation ?",
        a: "Oui. Appliquez une petite quantité derrière l'oreille et sur une mèche discrète 48 h avant, et vérifiez qu'aucune réaction n'apparaît. Ce test est recommandé pour tout soin capillaire professionnel.",
      },
      {
        q: "Combien de temps dure le lissage ?",
        a: "En moyenne 2 à 3 mois, selon la fréquence des lavages et le type de shampooing utilisé. Un shampooing sans sulfates prolonge nettement le résultat.",
      },
      {
        q: "Quelle quantité utiliser, et à quelle fréquence ?",
        a: "Environ 50 à 100 ml par application selon la longueur et l'épaisseur des cheveux. Une application tous les 2 à 3 mois suffit ; il est inutile de renouveler plus souvent.",
      },
      {
        q: "Combien d'applications le format de 1 L permet-il ?",
        a: "Selon la longueur et l'épaisseur des cheveux, comptez 10 à 20 applications — plusieurs mois d'utilisation, ou une saison complète en salon.",
      },
      {
        q: "Quelles précautions faut-il prendre ?",
        a: "Réservé à un usage externe. Évitez le contact avec les yeux, aérez la pièce pendant le passage du fer, portez des gants pour l'application, et n'utilisez pas le produit sur un cuir chevelu irrité ou lésé. Tenir hors de portée des enfants.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48 h. Vous payez uniquement à la réception de votre commande.",
      },
    ],
  },
  footer: {
    tagline: "Le lissage professionnel à l'or 24 carats, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
