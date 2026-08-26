// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Coffee",
    title2: "Extract",
    subtitle:
      "La protéine brésilienne à l'extrait de café et de cupuaçu. Elle aide à renforcer, à nourrir et à raviver l'éclat des cheveux fatigués — sans formol.",
    cta: (price: string) => `Commander — ${price}`,
    badge1: "0 % de formol",
    badge2: "1 L — format professionnel",
    badge3: "Café et cupuaçu",
    scroll: "Découvrir",
  },
  marquee: [
    "Protéine brésilienne",
    "Extrait de café",
    "Beurre de cupuaçu",
    "Sans formol",
    "Brillance intense",
    "Format professionnel 1 L",
  ],
  problem: {
    title: "Des cheveux ternes ne manquent pas de soin. Ils manquent de force.",
    subtitle:
      "Colorations, chaleur, eau calcaire : la fibre se vide de ses protéines. On multiplie les masques, mais rien ne tient — parce qu'on nourrit une fibre qui a perdu sa structure.",
    points: [
      "Cheveux ternes, sans reflets ni vitalité",
      "Fibre fine et molle, qui manque de corps",
      "Pointes sèches qui cassent au brossage",
      "Masques et huiles dont l'effet disparaît au premier lavage",
    ],
    promiseTitle: "La promesse Coffee Extract",
    promise:
      "D'abord la protéine, ensuite la nutrition. La protéine brésilienne hydrolysée contribue à améliorer l'apparence de la fibre, la caféine stimule le cuir chevelu, et le beurre de cupuaçu aide à maintenir l'hydratation. Un soin qui redonne du corps, pas seulement de la douceur.",
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
    title: "Le café, le cupuaçu et la protéine",
    subtitle: "Six actifs venus du Brésil pour agir au cœur de la fibre au lieu de la couvrir.",
    items: [
      {
        name: "Extrait de café",
        desc: "Riche en caféine, il stimule le cuir chevelu et ravive les reflets.",
      },
      {
        name: "Beurre de cupuaçu",
        desc: "Le trésor de l'Amazonie, reconnu pour sa capacité à retenir l'hydratation.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et contribuer à améliorer son apparence.",
      },
      {
        name: "Kératine",
        desc: "La protéine qui compose le cheveu : elle lisse la fibre et lui redonne du corps.",
      },
      {
        name: "Panthénol",
        desc: "Provitamine B5 : elle aide à maintenir l'hydratation au cœur du cheveu.",
      },
      {
        name: "Huiles végétales",
        desc: "Elles gainent la fibre et protègent les longueurs de la chaleur du fer.",
      },
    ],
  },
  benefits: {
    title: "Ce qui fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Cheveux lisses et disciplinés",
        desc: "Les frisottis se calment et le brushing tient plus longtemps, même par temps humide.",
      },
      {
        title: "Brillance et vitalité",
        desc: "L'extrait de café ravive les reflets : la lumière accroche dès la première application.",
      },
      {
        title: "Nutrition profonde",
        desc: "Le beurre de cupuaçu nourrit là où les masques classiques restent en surface.",
      },
      {
        title: "Format professionnel 1 L",
        desc: "Le vrai format de salon : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Origine Brésil",
    title: "Inspiré de l'Amazonie, pensé pour le salon",
    subtitle:
      "Le café et le cupuaçu sont deux piliers de la beauté brésilienne. Vitasilk les réunit dans un soin protéiné professionnel, à la texture et au parfum haut de gamme.",
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
        desc: "Appliquez le Coffee Extract mèche par mèche — environ 50 à 80 ml selon la longueur — puis laissez poser 20 à 40 minutes.",
      },
      {
        title: "Rincez et coiffez",
        desc: "Rincez, séchez, puis passez le fer à lisser pour sceller la protéine. Admirez la brillance.",
      },
    ],
  },
  testimonials: {
    title: "Comment l’intégrer à votre routine",
    subtitle: "Exemples d’utilisation — pas des avis clients vérifiés",
    items: [
      {
        name: "Zineb — Beni Mellal",
        text: "Mes cheveux étaient mous et sans reflets après des années de coloration. En suivant les instructions, je les ai trouvés plus épais au toucher et bien plus lumineux.",
      },
      {
        name: "Chaimae — Khouribga",
        text: "L'odeur de café est un vrai plus, et l'application est confortable. Je l'ai fait à la maison en aérant simplement la pièce.",
      },
      {
        name: "Rajae — Settat",
        text: "Je suis coiffeuse et je l'utilise en cabine. Mes clientes repartent avec une brillance qu'elles remarquent tout de suite.",
      },
      {
        name: "Oumaima — Nador",
        text: "Six semaines après, mes pointes cassent beaucoup moins au brossage. Le litre vaut vraiment son prix.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Profitez du prix actuel ; la disponibilité est confirmée par téléphone",
    unit: "Coffee Extract — protéine brésilienne 1 L",
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
        a: "Le Coffee Extract ne contient aucune de ces deux substances. C'est un soin protéiné : il aide à discipliner et à améliorer l'apparence de la fibre sans elles et sans vapeurs irritantes. La liste complète des ingrédients figure sur l'étiquette du flacon.",
      },
      {
        q: "Est-ce un lissage ou un soin ?",
        a: "C'est un soin protéiné. Il aide nettement à réduire les frisottis et à faciliter le coiffage, mais son rôle premier est d'apporter des protéines à la fibre — pas de transformer une chevelure bouclée en cheveux raides.",
      },
      {
        q: "Convient-il à tous les types de cheveux ?",
        a: "Il convient aux cheveux colorés, méchés, bouclés ou naturels, et il est particulièrement utile sur cheveux colorés : la coloration appauvrit la fibre en protéines, exactement ce que cette formule vient recharger. Il ravive aussi les reflets des bases foncées. Sur cheveux décolorés ou très fragilisés, réduisez le temps de pose et testez d'abord sur une mèche.",
      },
      {
        q: "Faut-il faire un test avant la première utilisation ?",
        a: "Oui. Appliquez une petite quantité derrière l'oreille et sur une mèche discrète 48 h avant, et vérifiez qu'aucune réaction n'apparaît. Ce test est recommandé pour tout soin capillaire professionnel.",
      },
      {
        q: "Quelle quantité utiliser, et à quelle fréquence ?",
        a: "Environ 50 à 80 ml par application sur cheveux mi-longs, davantage sur cheveux longs ou épais. Une application toutes les 4 à 6 semaines suffit. Sur cheveux très abîmés, deux applications à quinze jours d'intervalle pour démarrer, puis on espace.",
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
    tagline: "La protéine brésilienne au café, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
