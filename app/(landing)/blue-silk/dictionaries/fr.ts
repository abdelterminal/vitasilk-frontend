// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.
//
// Positioning for this SKU is ARGAN-FIRST. The sibling Coffee Extract page
// leads on Amazon/Brazil sourcing; Blue Silk leads on Moroccan argan, with the
// Brazilian protein as the carrier. That is deliberate — argan is a local
// trust signal for this audience, and it is what separates the two SKUs.
//
// Claims are phrased as "aide à" / "contribue à" rather than as mechanisms the
// product performs on the hair ("referme l'écaille", "fait entrer l'eau"). The
// copy review flagged every such formulation as an unverifiable technical
// promise; the hedged wording is the version that was signed off.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Blue",
    title2: "Silk",
    subtitle:
      "Une formule associant l'huile d'argan marocaine, l'aloe vera et la protéine brésilienne. Elle aide à réduire les frisottis et à améliorer la douceur et la brillance des cheveux — sans formol.",
    cta: (price: string) => `Commander — ${price}`,
    badge1: "0 % de formol",
    badge2: "1 L — format professionnel",
    badge3: "Argan et aloe vera",
    scroll: "Découvrir",
  },
  marquee: [
    "Huile d'argan",
    "Aloe vera",
    "Protéine brésilienne",
    "Sans formol",
    "Brillance intense",
    "Format professionnel 1 L",
  ],
  problem: {
    title: "Des cheveux secs ne manquent pas d'huile. Ils manquent d'eau et de protéines.",
    subtitle:
      "Le fer, le soleil, la coloration, l'eau calcaire : les écailles se soulèvent, l'hydratation s'échappe, et la fibre devient rêche. Les huiles peuvent améliorer l'apparence de la surface, sans répondre à tous les besoins des cheveux fragilisés.",
    points: [
      "Frisottis qui reviennent dès qu'il y a de l'humidité",
      "Cheveux rêches et secs, difficiles à démêler",
      "Longueurs ternes, sans reflet ni douceur",
      "Pointes fourchues qui cassent au brossage",
    ],
    promiseTitle: "La promesse Blue Silk",
    promise:
      "Hydrater, apporter des protéines, puis lisser la surface. L'aloe vera aide à maintenir l'hydratation, la protéine brésilienne hydrolysée contribue à améliorer l'apparence de la fibre, et l'huile d'argan aide à nourrir les longueurs et à leur donner un aspect plus lisse. C'est cet ordre-là qui compte — pas la quantité d'huile.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin protéiné professionnel à utiliser en respectant les instructions et les précautions indiquées.",
    items: [
      {
        title: "Sans formol",
        desc: "Une formule conçue pour offrir une expérience d'application plus confortable.",
      },
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Tous types de cheveux",
        desc: "Colorés, méchés, bouclés ou naturels — la formule est conçue pour accompagner les besoins de différents types de cheveux.",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "L'argan marocain rencontre la protéine brésilienne",
    subtitle:
      "Six actifs qui travaillent dans l'ordre : d'abord l'eau, ensuite la protéine, l'huile en dernier.",
    items: [
      {
        name: "Huile d'argan",
        desc: "L'or liquide du Souss : riche en huile d'argan marocaine, la formule aide à nourrir les longueurs et à améliorer leur brillance.",
      },
      {
        name: "Aloe vera",
        desc: "L'aloe vera aide à maintenir l'hydratation et à améliorer la douceur des cheveux.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et contribuer à améliorer son apparence, au lieu de la couvrir.",
      },
      {
        name: "Kératine",
        desc: "La protéine qui compose le cheveu : elle aide à lisser la fibre et à lui redonner du corps.",
      },
      {
        name: "Panthénol",
        desc: "Provitamine B5 : elle aide à maintenir l'hydratation et à améliorer la douceur des cheveux, lavage après lavage.",
      },
      {
        name: "Acides aminés de soie",
        desc: "Ils gainent la fibre et lui donnent ce glissé sous les doigts qui a donné son nom au soin.",
      },
    ],
  },
  benefits: {
    title: "Ce qui fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Douceur soyeuse, anti-frisottis",
        desc: "La formule aide à réduire les frisottis : les cheveux sont plus faciles à discipliner et le brushing tient plus longtemps.",
      },
      {
        title: "Brillance et éclat",
        desc: "L'argan donne un fini lumineux qui accroche la lumière dès la première application.",
      },
      {
        title: "Hydratation",
        desc: "L'aloe vera aide à maintenir l'hydratation, là où les huiles seules restent en surface.",
      },
      {
        title: "Format professionnel 1 L",
        desc: "Le vrai format de salon : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Argan du Maroc",
    title: "L'or du Souss, la science du Brésil",
    subtitle:
      "L'huile d'argan est notre trésor : les Marocaines l'utilisent depuis des générations pour nourrir leurs cheveux. Vitasilk la marie à la protéine brésilienne, pour un résultat qui se maintient dans la durée.",
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
        desc: "Lavez les cheveux avec un shampooing clarifiant, puis essorez-les délicatement sans les sécher complètement.",
      },
      {
        title: "Appliquez",
        desc: "Répartissez le produit mèche par mèche — environ 50 à 80 ml selon la longueur — et respectez le temps de pose : 20 à 40 minutes.",
      },
      {
        title: "Rincez et coiffez",
        desc: "Rincez abondamment selon les instructions, puis séchez et coiffez les cheveux.",
      },
    ],
  },
  testimonials: {
    title: "Comment l’intégrer à votre routine",
    subtitle: "Exemples d’utilisation — pas des avis clients vérifiés",
    items: [
      {
        name: "Asmae — Kénitra",
        text: "J'ai les cheveux bouclés et secs, et le démêlage était une bataille tous les matins. Depuis, le peigne passe beaucoup plus facilement — c'est ça qui a changé mes matins, pas seulement la brillance.",
      },
      {
        name: "Soukaina — Oujda",
        text: "Ce qui m'a convaincue, c'est l'argan. On connaît toutes son effet, et là il tient vraiment : mes cheveux sont encore doux au troisième lavage.",
      },
      {
        name: "Btissam — Salé",
        text: "Je suis coiffeuse et je l'utilise en cabine. L'application est confortable, et mes clientes remarquent la douceur avant même que je sorte le fer.",
      },
      {
        name: "Hanane — Essaouira",
        text: "Avec l'humidité d'Essaouira, mes cheveux gonflaient à peine sortie de chez moi. Depuis le Blue Silk, ils restent bien plus disciplinés toute la journée.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Profitez du prix actuel ; la disponibilité est confirmée par téléphone",
    unit: "Blue Silk — protéine brésilienne à l'argan 1 L",
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
        q: "Contient-il du formol ou de l'acide glyoxylique ?",
        a: "Le Blue Silk ne contient aucune de ces deux substances. C'est un soin protéiné : il aide à discipliner et à améliorer l'apparence de la fibre sans elles et sans vapeurs irritantes. La liste complète des ingrédients figure sur l'étiquette du flacon.",
      },
      {
        q: "Est-ce un lissage ou un soin ?",
        a: "C'est un soin protéiné. Il aide nettement à réduire les frisottis et à faciliter le coiffage, mais son rôle premier est d'hydrater et d'améliorer l'apparence de la fibre — pas de transformer une chevelure bouclée en cheveux raides.",
      },
      {
        q: "Convient-il à tous les types de cheveux ?",
        a: "Il convient aux cheveux colorés, méchés, bouclés ou naturels, et il est particulièrement utile sur cheveux colorés ou poreux. Sur cheveux décolorés ou très fragilisés, réduisez le temps de pose et testez d'abord sur une mèche.",
      },
      {
        q: "Faut-il faire un test avant la première utilisation ?",
        a: "Oui. Appliquez une petite quantité derrière l'oreille et sur une mèche discrète 48 h avant, et vérifiez qu'aucune réaction n'apparaît. Ce test est recommandé pour tout soin capillaire professionnel.",
      },
      {
        q: "Quelle quantité utiliser, et à quelle fréquence ?",
        a: "Environ 50 à 80 ml par application sur cheveux mi-longs, davantage sur cheveux longs ou épais. Une application toutes les 4 à 6 semaines suffit. Sur cheveux très secs, deux applications à quinze jours d'intervalle pour démarrer, puis on espace.",
      },
      {
        q: "Combien d'applications le format de 1 L permet-il ?",
        a: "Selon la longueur et l'épaisseur des cheveux, comptez 12 à 20 applications — plusieurs mois d'utilisation.",
      },
      {
        q: "Quelles précautions faut-il prendre ?",
        a: "Réservé à un usage externe. Évitez le contact avec les yeux, aérez la pièce pendant le passage du fer, et n'utilisez pas le produit sur un cuir chevelu irrité ou lésé. Tenir hors de portée des enfants.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48 h. Vous payez uniquement à la réception de votre commande.",
      },
    ],
  },
  footer: {
    tagline: "L'argan marocain et la protéine brésilienne, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
