import { OFFERS } from "./config";

const offer = OFFERS[0];
const saved = offer.oldPrice - offer.price;

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      benefits: "Résultats",
      ingredients: "Ingrédients",
      usage: "Utilisation",
      reviews: "Avis",
      orderBtn: "COMMANDER"
    },
    hero: {
      badge: "SOIN CAPILLAIRE D'EXCEPTION",
      headline: "Des cheveux plus forts,\nplus beaux,\nnaturellement",
      promises: ["Répare", "Hydrate", "Protège"],
      description: "Le soin 10 en 1 enrichi en +20 vitamines et extraits botaniques pour une chevelure éclatante de santé dès la première application.",
      cta: "Découvrir le soin",
      pillars: [
        { title: "100% Ingrédients\nNaturels" },
        { title: "Sans Sulfate\nni Silicone" },
        { title: "Tous types\nde cheveux" }
      ],
      cursiveQuote: "“Parce que de beaux cheveux\nchangent tout”"
    },
    results: {
      tag: "RÉSULTATS VISIBLES",
      title: "Tout ce dont vos cheveux ont besoin",
      subtitle: "Un soin global pour restaurer la force, la vitalité et l'éclat de vos cheveux.",
      benefits: [
        {
          id: 'hydrate',
          title: 'Hydratation intense',
          description: 'Restaure la souplesse et retient l\'hydratation au cœur de la fibre.'
        },
        {
          id: 'repare',
          title: 'Réparation ciblée',
          description: 'Régénère la fibre abîmée et prévient l\'apparition des fourches.'
        },
        {
          id: 'eclat',
          title: 'Éclat & brillance',
          description: 'Sublime la chevelure d\'un voile soyeux et d\'une brillance miroir.'
        },
        {
          id: 'lisse',
          title: 'Action anti-frisottis',
          description: 'Discipline les mèches rebelles et facilite le coiffage au quotidien.'
        },
        {
          id: 'protege',
          title: 'Bouclier protecteur',
          description: 'Protège contre la chaleur, la pollution et les agressions extérieures.'
        }
      ]
    },
    ingredients: {
      eyebrow: "DES ACTIFS D'EXCEPTION",
      title: "Des ingrédients précieux\net naturels",
      description: "Une synergie d'actifs botaniques purs et de vitamines pour une réparation immédiate et durable.",
      cta: "Découvrir la formule",
      items: [
        {
          id: 'neem',
          name: 'Extrait de Neem',
          role: 'Purifiant & Équilibrant',
          desc: 'Actif ayurvédique réputé pour assainir et apaiser le cuir chevelu en douceur.'
        },
        {
          id: 'rose',
          name: 'Rose de Damas',
          role: 'Régénérant & Douceur',
          desc: 'Hydrate intensément et apporte une brillance sublime aux longueurs ternes.'
        },
        {
          id: 'coco',
          name: 'Huile de Coco',
          role: 'Nourrissant & Fortifiant',
          desc: 'Pénètre la fibre capillaire en profondeur pour combler les brèches et fortifier.'
        },
        {
          id: 'argan',
          name: 'Huile d\'Argan',
          role: 'Protecteur & Anti-casse',
          desc: 'L\'or liquide marocain aux vertus antioxydantes pour protéger de la casse.'
        },
        {
          id: 'soie',
          name: 'Protéines de Soie',
          role: 'Lissant & Éclat',
          desc: 'Enveloppe la fibre d\'un film soyeux pour un toucher d\'une douceur incomparable.'
        },
        {
          id: 'vitamines',
          name: '+20 Vitamines',
          role: 'Complexe Revitalisant',
          desc: 'Un concentré vitaminique (E, B5) pour booster la vitalité et la densité du cheveu.'
        }
      ]
    },
    naturalBeauty: {
      eyebrow: "SUBLIMEZ VOTRE NATURE",
      title: "Des cheveux de rêve,\nau naturel",
      desc: "Une chevelure plus douce, plus forte et éclatante de santé grâce à une formule experte inspirée des rituels de beauté ancestraux.",
      bullets: [
        "Des cheveux plus forts et résistants à la casse",
        "Une brillance éclatante et un toucher soyeux",
        "Une sensation de légèreté et de douceur absolue"
      ],
      quoteLine1: "“Parce que de beaux cheveux",
      quoteLine2: "changent tout”"
    },
    usage: {
      eyebrow: "LE RITUEL BEAUTÉ",
      title: "Conseils d'utilisation",
      subtitle: "Un rituel simple et rapide pour des résultats professionnels à la maison.",
      steps: [
        {
          step: 1,
          title: "Appliquez",
          description: "Sur cheveux propres et essorés après votre shampooing habituel."
        },
        {
          step: 2,
          title: "Massez",
          description: "Répartissez uniformément sur les longueurs et les pointes."
        },
        {
          step: 3,
          title: "Laissez poser",
          description: "Laissez agir 5 à 10 minutes pour une pénétration optimale des actifs."
        },
        {
          step: 4,
          title: "Rincez",
          description: "Rincez abondamment à l'eau tiède pour révéler une douceur soyeuse."
        }
      ]
    },
    testimonials: {
      eyebrow: "ELLES L'ONT ADOPTÉ",
      title: "Des résultats qui parlent d'eux-mêmes",
      items: [
        {
          id: 1,
          name: "Sofia R.",
          city: "Casablanca",
          quote: "“Mes cheveux sont devenus doux et soyeux dès la première utilisation. Le soin sent divinement bon et mes pointes ne fourchent plus !”"
        },
        {
          id: 2,
          name: "Nadia K.",
          city: "Rabat",
          quote: "“Un véritable miracle pour mes cheveux bouclés très secs. Plus de frisottis et un démêlage d'une facilité déconcertante.”"
        },
        {
          id: 3,
          name: "Leila M.",
          city: "Marrakech",
          quote: "“Après des mois d'agressions thermiques, ce masque a littéralement sauvé mes cheveux. Je ne peux plus m'en passer !”"
        }
      ]
    },
    order: {
      eyebrow: "OFFRE EXCLUSIVE DU JOUR",
      title: "Commandez votre soin SOS Hair Therapy",
      subtitle: "Remplissez vos informations de livraison ci-dessous. Livraison rapide et paiement en espèces à la réception.",
      badgePill: "🔥 OFFRE SPÉCIALE • STOCK LIMITÉ",
      productName: "SOS Hair Therapy 400g",
      productSub: "Soin capillaire 10 en 1 aux extraits botaniques et +20 vitamines",
      highlights: [
        "Format généreux 400g (2 à 3 mois d'utilisation)",
        "100% naturel, sans sulfate ni paraben",
        "Convient à tous types de cheveux (secs, abîmés, colorés)",
        "Résultats visibles et toucher soyeux dès la 1ère pose"
      ],
      trustFreeShipping: "Livraison Gratuite & Rapide",
      trustFreeShippingSub: "24h à 48h partout au Maroc",
      trustCod: "Paiement à la livraison",
      trustCodSub: "Après vérification de votre colis",
      step1Label: "1. Choisissez votre formule :",
      step2Label: "2. Informations de livraison :",
      namePlaceholder: "Nom et Prénom complet",
      phonePlaceholder: "Numéro de téléphone (ex: 0612345678)",
      addressPlaceholder: "Adresse complète de livraison (Quartier, Rue, N°)",
      summaryChosen: "Formule choisie :",
      summaryShipping: "Frais de livraison :",
      freeTag: "GRATUIT (0 DH)",
      summaryTotal: "Total à payer à la livraison :",
      submitBtn: "Confirmer ma commande (Paiement à la livraison)",
      submittingBtn: "Traitement de votre commande...",
      securityNote: "🔒 Paiement en espèces à la livraison après vérification du colis",
      successTitle: "Commande validée avec succès !",
      successSubtitle: "Merci pour votre confiance ! Votre commande a bien été enregistrée.",
      recapPack: "Offre commandée :",
      recapTotal: "Montant total :",
      recapCity: "Ville :",
      recapPhone: "Téléphone :",
      calloutNote: "📞 Notre service client vous contactera dans les prochaines heures pour confirmer votre adresse.",
      newOrderBtn: "Passer une autre commande",
      packs: [
        {
          id: offer.id,
          title: "1 Sachet SOS (400g)",
          tag: "Cure Découverte (2 mois)",
          price: offer.price,
          oldPrice: offer.oldPrice,
          savings: `Économisez ${saved} DH`,
          badge: null as string | null,
          gift: null as string | null
        }
      ]
    },
    footer: {
      slogan: "La vraie beauté commence par des cheveux sains et forts.",
      quickBenefits: "Résultats",
      quickIngredients: "Ingrédients",
      quickUsage: "Utilisation",
      quickOrder: "Commander",
      rights: "Tous droits réservés.",
      motto: "Beauté naturelle & confiance retrouvée chaque jour."
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      benefits: "الفوائد",
      ingredients: "المكونات",
      usage: "طريقة الاستخدام",
      reviews: "آراء الزبونات",
      orderBtn: "اطلبي الآن"
    },
    hero: {
      badge: "عناية استثنائية بالشعر",
      headline: "شعر أكثر قوة،\nجمالاً ونعومة\nبطريقة طبيعية",
      promises: ["يرمم", "يرطب", "يحمي"],
      description: "علاج مكثف 10 في 1، غني بالخلاصات النباتية و+20 فيتامين لشعر صحي، ناعم كالحرير ومفعم بالحيوية من أول استخدام.",
      cta: "اطلبي الآن (الدفع عند الاستلام)",
      pillars: [
        { title: "مكونات\nطبيعية 100%" },
        { title: "بدون سلفات\nأو سيليكون" },
        { title: "مناسب لجميع\nأنواع الشعر" }
      ],
      cursiveQuote: "“لأن الشعر الجميل\nيغير كل شيء”"
    },
    results: {
      tag: "نتائج حقيقية وملموسة",
      title: "كل ما يحتاجه شعرك في تركيبة واحدة",
      subtitle: "عناية متكاملة تمنح شعرك القوة والصحة واللمعان من الجذور حتى الأطراف.",
      benefits: [
        {
          id: 'hydrate',
          title: 'ترطيب عميق ومكثف',
          description: 'يستعيد ليونة الشعر ويحبس الرطوبة داخل الألياف.'
        },
        {
          id: 'repare',
          title: 'ترميم وتقوية الألياف',
          description: 'يعالج التلف ويقلل من تقصف الأطراف والتساقط.'
        },
        {
          id: 'eclat',
          title: 'لمعان وبريق طبيعي',
          description: 'يمنح الشعر مظهراً مشرقاً وملمساً حريرياً رائعاً.'
        },
        {
          id: 'lisse',
          title: 'تنعيم ومحاربة النفشة',
          description: 'يتحكم في تطاير الشعر ويسهل التمشيط والتسريح.'
        },
        {
          id: 'protege',
          title: 'حماية يومية شاملة',
          description: 'يحمي من حرارة السيشوار والتلوث والعوامل الخارجية.'
        }
      ]
    },
    ingredients: {
      eyebrow: "قوة الطبيعة الفعالة",
      title: "مكونات طبيعية ثمينة\nومختارة بعناية",
      description: "تركيبة غنية بالخلاصات النباتية النقية و+20 فيتامين لترميم فوري، لمعان مبهر وتغذية عميقة تدوم طويلاً.",
      cta: "اطلبي المنتج الآن",
      items: [
        {
          id: 'neem',
          name: 'خلاصة النيم',
          role: 'منقي ومطهر',
          desc: 'مكون أيورفيدي فعال يطهر فروة الرأس ويهدئها بلطف لنمو شعر صحي وقوي.'
        },
        {
          id: 'rose',
          name: 'ورد دمشق',
          role: 'مرمم ومجدد',
          desc: 'مستخلص زهري فاخر يجدد ألياف الشعر التالفة ويمنحها نعومة فائقة ورائحة ساحرة.'
        },
        {
          id: 'coco',
          name: 'زيت جوز الهند',
          role: 'مغذي ومرطب',
          desc: 'غني بالأحماض الدهنية الأساسية التي تخترق ألياف الشعر لتغذيتها وترطيبها من الداخل.'
        },
        {
          id: 'argan',
          name: 'زيت الأركان',
          role: 'مقوي ومغذي',
          desc: 'الذهب السائل المغربي الذي يعزز مرونة الشعر ويحميه من التقصف والتكسر.'
        },
        {
          id: 'soie',
          name: 'بروتينات الحرير',
          role: 'حماية ولمعان',
          desc: 'تغلف كل خصلة بغلاف واقٍ طبيعي يمنح الشعر لمعاناً مضيئاً ونعومة كالحرير.'
        },
        {
          id: 'vitamines',
          name: 'الفيتامينات',
          role: '+20 عنصر نشط',
          desc: 'مركب فيتاميني نباتي مركز (E, B5) يعزز كثافة وحيوية ألياف الشعر.'
        }
      ]
    },
    naturalBeauty: {
      eyebrow: "أبرزي جمالك الطبيعي",
      title: "شعر الأحلام..\nبلمسة طبيعية",
      desc: "شعر أكثر نعومة، قوة ولمعاناً بفضل تركيبة متطورة ومستوحاة من أسرار الجمال والعناية المغربية الأصيلة.",
      bullets: [
        "شعر أكثر صحة ومقاومة للتقصف والتساقط",
        "لمعان طبيعي ومبهر يدوم طويلاً",
        "إحساس فائق بالنعومة والانسيابية"
      ],
      quoteLine1: "“لأن الشعر الجميل",
      quoteLine2: "يغير كل شيء”"
    },
    usage: {
      eyebrow: "روتين العناية السهل",
      title: "طريقة الاستخدام",
      subtitle: "خطوات بسيطة وفعالة لنتائج مبهرة واحترافية في المنزل.",
      steps: [
        {
          step: 1,
          title: "ضعي الماسك",
          description: "على شعر نظيف ومبلل قليلاً بعد الغسيل بالشامبو."
        },
        {
          step: 2,
          title: "دلكي بلطف",
          description: "وزعي الكريم بالتساوي على كامل خصلات الشعر والأطراف."
        },
        {
          step: 3,
          title: "اتركيه ليعمل",
          description: "اتركيه من 5 إلى 10 دقائق ليتغلغل بعمق داخل ألياف الشعر."
        },
        {
          step: 4,
          title: "اشطفي بالماء",
          description: "اشطفي جيداً بالماء الفاتر وتمتعي بنعومة ولمعان حريري مذهل."
        }
      ]
    },
    testimonials: {
      eyebrow: "تجارب وآراء زبوناتنا",
      title: "نتائج حقيقية تصنع الفرق",
      items: [
        {
          id: 1,
          name: "صوفيا ر.",
          city: "الدار البيضاء",
          quote: "“شعري ولا رطب وكيلمع من أول استعمال.. صراحة ماسك واعر ومغذي بزاف، تبدل ملمس شعري 180 درجة !”"
        },
        {
          id: 2,
          name: "نادية ك.",
          city: "الرباط",
          quote: "“علاج رائع ومبهر ! شعري نقص منو التقصف وولا قوي ورطب بزاف وساهل فالمشيط، أفضل منتج جربتو.”"
        },
        {
          id: 3,
          name: "ليلى م.",
          city: "مراكش",
          quote: "“أحسن روتين للشعر جربتو فحياتي. شعري كان متضرر ورجعات ليه الحيوية واللمعان الطبيعي اللي كنت كنقلب عليه !”"
        }
      ]
    },
    order: {
      eyebrow: "عرض حصري وخاص باليوم",
      title: "اطلبي الآن ماسك SOS Hair Therapy",
      subtitle: "املئي معلومات التوصيل أسفله لتأكيد طلبك. التوصيل مجاني وسريع في جميع مدن المغرب، والدفع نقداً عند الاستلام.",
      badgePill: "🔥 عرض خاص • الكمية المتبقية محدودة",
      productName: "SOS Hair Therapy 400g",
      productSub: "علاج وماسك الشعر 10 في 1 بالخلاصات الطبيعية و+20 فيتامين",
      highlights: [
        "حجم كبير 400 غرام اقتصادي (يكفي 2 إلى 3 أشهر)",
        "طبيعي 100%، خالٍ من السلفات والبارابين",
        "يناسب جميع أنواع الشعر (الجاف، التالف، المصبوغ)",
        "نتائج ملحوظة ونعومة فائقة من أول استعمال"
      ],
      trustFreeShipping: "توصيل مجاني وسريع",
      trustFreeShippingSub: "24 إلى 48 ساعة بجميع المدن",
      trustCod: "الدفع عند الاستلام",
      trustCodSub: "بعد فحص ومعاينة طلبك",
      step1Label: "1. اختاري العرض المناسب لكِ :",
      step2Label: "2. معلومات التوصيل والاستلام :",
      namePlaceholder: "الاسم والنسب الكامل",
      phonePlaceholder: "رقم الهاتف (مثال: 0612345678)",
      addressPlaceholder: "العنوان الكامل (الحي، الشارع، رقم المنزل)",
      summaryChosen: "العرض المختار :",
      summaryShipping: "مصاريف التوصيل :",
      freeTag: "مجاني (0 درهم)",
      summaryTotal: "المجموع الصافي للدفع :",
      submitBtn: "تأكيد الطلب الآن (الدفع عند الاستلام)",
      submittingBtn: "جاري تسجيل طلبك...",
      securityNote: "🔒 الدفع نقداً عند استلام طلبك بعد التأكد من سلامة الطرد",
      successTitle: "تم تسجيل طلبك بنجاح !",
      successSubtitle: "شكراً لكِ ! لقد تم تسجيل طلبك بنجاح وسيتصل بكِ فريقنا قريباً.",
      recapPack: "العرض المطلوب :",
      recapTotal: "المبلغ الإجمالي :",
      recapCity: "المدينة :",
      recapPhone: "رقم الهاتف :",
      calloutNote: "📞 سيتصل بكِ فريق خدمة العملاء هاتفياً خلال الساعات القادمة لتأكيد العنوان وشحن الطرد فوراً.",
      newOrderBtn: "تسجيل طلب آخر",
      packs: [
        {
          id: offer.id,
          title: "1 ساشي SOS (400g)",
          tag: "عرض تجربة (تكفي شهرين)",
          price: offer.price,
          oldPrice: offer.oldPrice,
          savings: `توفير ${saved} درهم`,
          badge: null as string | null,
          gift: null as string | null
        }
      ]
    },
    footer: {
      slogan: "الجمال الحقيقي يبدأ من شعر صحي وقوي.",
      quickBenefits: "الفوائد",
      quickIngredients: "المكونات",
      quickUsage: "طريقة الاستخدام",
      quickOrder: "اطلبي الآن",
      rights: "جميع الحقوق محفوظة.",
      motto: "جمال طبيعي.. وثقة متجددة كل يوم."
    }
  }
};

export type Translation = (typeof translations)["fr"];
