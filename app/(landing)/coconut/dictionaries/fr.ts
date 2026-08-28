// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.
//
// POSITIONING FOR THIS SKU IS COCONUT-FIRST, AND THE ARGUMENT IS PENETRATION.
// Each Vitasilk page needs a spine of its own or the four cannibalise each
// other: 24K leads on luxury, Blue Silk on Moroccan argan, Coffee Extract on
// Amazon sourcing. This one leads on the one thing coconut oil does that other
// oils do not — its lauric acid has a small enough molecule to enter the hair
// shaft rather than sit on it. Sweet almond layers softness on top, the
// Brazilian protein rebuilds, and frizz control is the visible result.
//
// Keep that order everywhere: coconut penetrates → almond softens → protein
// rebuilds → frizz stops. The `problem` section's whole argument depends on it.
// The copy review kept this argument and sharpened its wording, so it stays —
// it is the safety absolutes ("pas de vapeurs irritantes") that were hedged,
// not the penetration story.
//
// The product name stays in Latin letters in both languages — "Coconut
// Smooth" is what is printed on the bottle the customer receives.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Coconut",
    title2: "Smooth",
    subtitle:
      "L'huile de coco pénètre la fibre au lieu de la couvrir. L'huile d'amande douce l'adoucit, la protéine brésilienne comble les brèches — et les frisottis n'ont plus de prise. Sans formol.",
    cta: (price: string) => `Commander — ${price}`,
    badge1: "0 % de formol",
    badge2: "1 L — format professionnel",
    badge3: "Coco et amande douce",
    scroll: "Découvrir",
  },
  marquee: [
    "Huile de coco",
    "Huile d'amande douce",
    "Protéine brésilienne",
    "Complexe anti-frizz",
    "Sans formol",
    "Format professionnel 1 L",
  ],
  problem: {
    title: "La plupart des huiles ne pénètrent jamais dans le cheveu. Elles restent en surface.",
    subtitle:
      "C'est pourquoi on peut enchaîner les bains d'huile sans rien changer en profondeur : le fer, le soleil, l'eau calcaire et la coloration vident la fibre, et une huile qui reste en surface ne la remplit pas.",
    points: [
      "Frisottis qui repartent dès la première humidité",
      "Cheveux secs et rêches malgré les masques",
      "Longueurs ternes qui gonflent au lieu de tomber",
      "Pointes cassantes et démêlage difficile",
    ],
    promiseTitle: "La promesse Coconut Smooth",
    promise:
      "L'huile de coco est l'exception : grâce à sa teneur en acide laurique, elle possède une petite molécule capable de franchir l'écaille et de nourrir la fibre de l'intérieur. L'huile d'amande douce vient assouplir la fibre, la protéine brésilienne comble les brèches, et le complexe anti-frizz referme l'ensemble. On nourrit d'abord en profondeur — la brillance suit toute seule.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin nourrissant professionnel à utiliser en respectant les instructions et les précautions indiquées.",
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
        desc: "Colorés, méchés, bouclés ou naturels — la coco nourrit sans alourdir.",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "La coco nourrit en profondeur, l'amande adoucit en surface",
    subtitle:
      "Six actifs qui travaillent dans l'ordre : nourrir le cœur de la fibre, puis la reconstruire, et refermer par-dessus.",
    items: [
      {
        name: "Huile de coco",
        desc: "Sa molécule d'acide laurique franchit l'écaille et nourrit la fibre de l'intérieur — là où les autres huiles s'arrêtent.",
      },
      {
        name: "Huile d'amande douce",
        desc: "Riche en vitamine E : elle assouplit la longueur et laisse un toucher velouté, sans effet gras.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et en combler les brèches, au lieu de la couvrir.",
      },
      {
        name: "Complexe anti-frizz",
        desc: "Il lisse la surface de la fibre : l'humidité a beaucoup moins de prise sur le cheveu.",
      },
      {
        name: "Kératine",
        desc: "La protéine qui compose le cheveu : elle lui redonne du corps et de la résistance.",
      },
      {
        name: "Panthénol",
        desc: "Provitamine B5 : elle retient l'hydratation au cœur du cheveu, lavage après lavage.",
      },
    ],
  },
  benefits: {
    title: "Ce qui fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Action anti-frisottis durable",
        desc: "Les frisottis se calment et le brushing tient bien plus longtemps, même par temps humide.",
      },
      {
        title: "Nutrition en profondeur",
        desc: "La coco nourrit le cœur de la fibre, là où les huiles classiques restent en surface.",
      },
      {
        title: "Douceur d'amande",
        desc: "Un toucher velouté dès le premier rinçage et un démêlage facilité.",
      },
      {
        title: "Format professionnel 1 L",
        desc: "Le vrai format de salon : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Coco et amande",
    title: "Deux huiles, deux rôles",
    subtitle:
      "La coco travaille à l'intérieur de la fibre, l'amande douce à l'extérieur. C'est cette division du travail qui fait la différence avec un bain d'huile ordinaire — et c'est pour cela que le résultat tient après le rinçage au lieu de partir avec.",
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
        desc: "Appliquez le Coconut Smooth mèche par mèche — environ 50 à 80 ml selon la longueur — puis laissez poser 20 à 40 minutes.",
      },
      {
        title: "Rincez et coiffez",
        desc: "Rincez, séchez, puis passez le fer à lisser pour sceller la fibre.",
      },
    ],
  },
  testimonials: {
    title: "Comment l’intégrer à votre routine",
    subtitle: "Exemples d’utilisation — pas des avis clients vérifiés",
    items: [
      {
        name: "Nawal — El Jadida",
        text: "J'ai fait des bains d'huile de coco pendant des années sans grand résultat. En suivant les instructions, j'ai trouvé mes cheveux plus doux et plus faciles à coiffer, pas seulement brillants en surface.",
      },
      {
        name: "Kenza — Mohammedia",
        text: "Ce qui m'a convaincue, c'est qu'il ne graisse pas. J'ai les cheveux fins et j'avais peur que ça les alourdisse — au contraire, ils ont plus de mouvement.",
      },
      {
        name: "Siham — Safi",
        text: "Je suis coiffeuse et je l'utilise en cabine. L'application est confortable, et l'odeur de coco fait que mes clientes le réclament.",
      },
      {
        name: "Loubna — Larache",
        text: "Avec l'humidité de Larache, mes cheveux gonflaient à peine sortie de chez moi. Depuis le Coconut Smooth, ils restent bien plus disciplinés toute la journée.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Profitez du prix actuel ; la disponibilité est confirmée par téléphone",
    unit: "Coconut Smooth — coco et amande douce, 1 L",
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
        a: "Le Coconut Smooth ne contient aucune de ces deux substances. C'est un soin nourrissant et anti-frizz : il aide à discipliner et à améliorer l'apparence de la fibre sans elles et sans vapeurs irritantes. La liste complète des ingrédients figure sur l'étiquette du flacon.",
      },
      {
        q: "Est-ce que ça alourdit les cheveux fins ?",
        a: "Non. C'est justement l'intérêt de l'huile de coco : elle entre dans la fibre au lieu de s'accumuler dessus, donc elle nourrit sans laisser de film gras. Sur cheveux fins, appliquez à partir des mi-longueurs et allégez la quantité.",
      },
      {
        q: "Est-ce un lissage ou un soin ?",
        a: "C'est un soin nourrissant à effet anti-frizz. Il aide nettement à réduire les frisottis et à faciliter le coiffage, mais son rôle premier est de nourrir la fibre — pas de transformer une chevelure bouclée en cheveux raides.",
      },
      {
        q: "Convient-il à tous les types de cheveux ?",
        a: "Il convient aux cheveux colorés, méchés, bouclés ou naturels, et il est particulièrement utile sur cheveux colorés ou secs. Sur cheveux décolorés ou très fragilisés, réduisez le temps de pose et testez d'abord sur une mèche.",
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
  video: {
    eyebrow: "Le résultat en vidéo",
    title: "Regardez la transformation",
  },
  footer: {
    tagline: "La nutrition de la coco et la douceur de l'amande, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
