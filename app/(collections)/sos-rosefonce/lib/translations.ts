import { OFFERS, PRICE_DH, OLD_PRICE_DH } from "./config";

export const translations = {
  fr: {
    // Announcement Bar
    announcement: {
      text: "Offre de Lancement Spéciale :",
      discount: "-20%",
      onCure: "sur votre cure +",
      freeShipping: "Livraison Gratuite",
      limitedStock: "Stock Limité"
    },

    // Navigation
    nav: {
      home: "Accueil",
      whyVitaPlex: "Pourquoi VitaPlex",
      ingredients: "Ingrédients",
      results: "Résultats",
      routine: "Mode d'Emploi",
      reviews: "Avis Clients",
      orderBtn: "Commander",
      switchLang: "العربية",
      switchLangShort: "AR"
    },

    // Hero Section
    hero: {
      brand: "VITAPLEX",
      mainTitle: "SOS",
      subTitle: "Soin Capillaire",
      hairType: "CHEVEUX ABÎMÉS | DAMAGED HAIR",
      hairTypeAr: "للشعر المتضرر",
      tagline: "Des cheveux plus forts, plus beaux, jour après jour.",
      orderNow: "Commander maintenant",
      cod: "Paiement à la Livraison (COD)",
      repairTitle: "Répare",
      repairSub: "Fibres & Pointes",
      hydrateTitle: "Hydrate",
      hydrateSub: "Nutrition Intense",
      protectTitle: "Protège",
      protectSub: "Bouclier Chaleur/UV",
      highlights: {
        sulfateFree: "Sans Sulfate",
        colorSafe: "Color Safe",
        generousSize: "Format Généreux 600 g"
      },
      badges: {
        reviews: "4.9 / 5.0",
        reviewsCount: "+1,480 avis clientes",
        generousTitle: "Format Généreux",
        generousWeight: "600 Grammes",
        proQuality: "Qualité Professionnelle"
      }
    },

    // Why Choose Section
    whyChoose: {
      title: "Pourquoi choisir VitaPlex ?",
      subtitle: "Une formule experte pour des cheveux visiblement plus sains.",
      items: [
        {
          title: "Répare",
          desc: "les cheveux abîmés et fourchus"
        },
        {
          title: "Hydrate",
          desc: "en profondeur"
        },
        {
          title: "Protège",
          desc: "la fibre capillaire"
        },
        {
          title: "Redonne",
          desc: "brillance et douceur"
        }
      ]
    },

    // Ingredients Section
    ingredients: {
      eyebrow: "LA PUISSANCE DE LA NATURE",
      title: "Des ingrédients précieux et naturels",
      desc: "Une formule enrichie en actifs botaniques et en vitamines pour une réparation intense et une beauté durable.",
      btn: "Nos ingrédients",
      items: [
        {
          id: "neem",
          title: "Neem",
          desc: "purifiant"
        },
        {
          id: "rose",
          title: "Rose de Damas",
          desc: "réparatrice"
        },
        {
          id: "coco",
          title: "Huile de coco",
          desc: "nourrissante"
        },
        {
          id: "argan",
          title: "Huile d'argan",
          desc: "fortifiante"
        },
        {
          id: "soie",
          title: "Protéines de soie",
          desc: "protectrices"
        },
        {
          id: "vitamines",
          title: "Vitamines",
          desc: "+20 actifs"
        }
      ]
    },

    // Results Section
    results: {
      titleLine1: "Des cheveux visiblement",
      titleLine2: "plus forts et plus brillants",
      bullets: [
        "Réduit la casse",
        "Répare les pointes fourchues",
        "Apporte douceur et souplesse",
        "Protège la couleur"
      ],
      tagline1: "Parce que vos cheveux",
      tagline2: "méritent le meilleur"
    },

    // Product Details Section
    details: {
      titleLine1: "La puissance du soin",
      titleLine2: "dans chaque détail",
      items: [
        {
          title: "Texture onctueuse",
          desc: "facile à appliquer"
        },
        {
          title: "Résultats visibles",
          desc: "dès les premières utilisations"
        },
        {
          title: "Sans sulfate",
          desc: "color safe"
        }
      ]
    },

    // Adopted Reviews Section
    adoptedReviews: {
      title: "Ils l'ont adopté",
      subtitleHighlight: "98%",
      subtitleText: "de nos clientes constatent des cheveux plus forts et plus brillants.",
      items: [
        {
          text: "« Mes cheveux sont beaucoup plus doux et moins cassants. Je recommande à 100% ! »",
          author: "— Sara, Rabat"
        },
        {
          text: "« Un vrai coup de cœur ! Mes cheveux sont plus forts et brillants dès la première utilisation. »",
          author: "— Imane, Casablanca"
        },
        {
          text: "« Enfin un soin qui tient ses promesses ! Mes cheveux sont réparés et beaucoup plus souples. »",
          author: "— Laila, Fès"
        }
      ]
    },

    // How To Use Routine Section
    howToUse: {
      titleLine1: "Votre routine soin,",
      titleLine2: "facile et efficace",
      steps: [
        {
          num: 1,
          title: "Appliquez",
          desc: "sur cheveux propres et humides"
        },
        {
          num: 2,
          title: "Laissez poser",
          desc: "quelques minutes"
        },
        {
          num: 3,
          title: "Rincez",
          desc: "abondamment"
        }
      ]
    },

    // Order Form & Order Drawer
    order: {
      eyebrow: "Prenez soin de vos cheveux dès aujourd'hui !",
      mainTitle: "Commandez maintenant",
      subtitle: "et offrez à vos cheveux le soin qu'ils méritent.",
      step1: "1. Votre offre produit :",
      step1Drawer: "1. Votre Offre Spéciale :",
      step2: "2. Vos informations de livraison :",
      step2Drawer: "2. Vos Coordonnées de Livraison :",
      packs: [
        {
          id: "pack1",
          name: "1 Sachet SOS Soin Capillaire (600g)",
          drawerTitle: "1 Sachet SOS (600g)",
          drawerSub: "Format Généreux 600g • Soin Réparateur",
          price: OFFERS.pack1.price,
          oldPrice: OFFERS.pack1.oldPrice,
          badge: "✨ OFFRE SPÉCIALE (-20%)",
          drawerBadge: "✨ OFFRE SPÉCIALE • LIVRAISON GRATUITE",
          pouches: 1
        }
      ],
      placeholders: {
        name: "Nom & Prénom *",
        phone: "Téléphone (WhatsApp) *",
        city: "Ville *",
        address: "Adresse de livraison *"
      },
      submitBtn: "Commander maintenant",
      drawerSubmitBtn: "Confirmer ma Commande",
      submitting: "Validation en cours...",
      currency: "DH",
      
      // Trust Guarantees
      fastDelivery: "Livraison rapide",
      cod: "Paiement à la livraison",
      satisfaction: "Satisfaction garantie",
      freeShippingTag: "Livraison Gratuite",
      payOnDeliveryTag: "Paiement à la réception",
      deliveryTimeTag: "24h/48h",

      // Success
      successTitle: "Commande Reçue avec Succès !",
      successMessage: "Merci {name} ! Notre conseillère vous contactera au {phone} pour valider l'expédition vers {city}.",
      anotherOrder: "Passer une autre commande",
      backToShop: "Retour à la boutique",
      orderSummary: "RÉCAPITULATIF :",
      productLabel: "Produit :",
      shippingLabel: "Livraison :",
      freeShippingValue: "GRATUITE (24-48h)",
      totalLabel: "Total à payer :",
      phoneError: "Veuillez saisir un numéro marocain valide (ex : 06 12 34 56 78).",
      errorTitle: "L'envoi a échoué",
      errorText: "Votre commande n'a pas pu être enregistrée. Réessayez ou commandez directement sur WhatsApp :",
      whatsapp: "Commander via WhatsApp",
      retry: "Réessayer"
    },

    // Sticky Bottom CTA
    stickyCta: {
      tag: "Offre Spéciale (-20%)",
      price: `${PRICE_DH} DH`,
      oldPrice: `${OLD_PRICE_DH} DH`,
      orderBtn: "Commander"
    },

    // Brand Footer & Footer
    footer: {
      slogan: "Beauté • Soin • Confiance",
      followUs: "Suivez-nous pour plus de conseils et de nouveautés !",
      allRights: "Tous droits réservés.",
      madeWith: "Fait avec",
      forHair: "pour des cheveux resplendissants."
    }
  },

  ar: {
    // Announcement Bar
    announcement: {
      text: "عرض إطلاق حصري :",
      discount: "خصم 20%",
      onCure: "على باقتك +",
      freeShipping: "توصيل مجاني لجميع المدن",
      limitedStock: "الكمية محدودة"
    },

    // Navigation
    nav: {
      home: "الرئيسية",
      whyVitaPlex: "لماذا فيتابليكس",
      ingredients: "المكونات",
      results: "النتائج",
      routine: "طريقة الاستعمال",
      reviews: "آراء الزبائن",
      orderBtn: "اطلبي الآن",
      switchLang: "Français",
      switchLangShort: "FR"
    },

    // Hero Section
    hero: {
      brand: "VITAPLEX",
      mainTitle: "SOS",
      subTitle: "علاج مكثف للشعر",
      hairType: "للشعر المتضرر والتالف | DAMAGED HAIR",
      hairTypeAr: "عناية وترميم فوري",
      tagline: "شعر أقوى، أكثر لمعاناً وجاذبية يوماً بعد يوم.",
      orderNow: "اطلبي الآن والدفع عند الاستلام",
      cod: "الدفع عند الاستلام (COD)",
      repairTitle: "يرمم",
      repairSub: "الألياف والأطراف",
      hydrateTitle: "يرطب",
      hydrateSub: "تغذية عميقة ومكثفة",
      protectTitle: "يحمي",
      protectSub: "حاجز واقٍ من الحرارة",
      highlights: {
        sulfateFree: "خالي من السلفات",
        colorSafe: "آمن للصبغة والكيراتين",
        generousSize: "حجم كبير واقتصادي 600غ"
      },
      badges: {
        reviews: "4.9 / 5.0",
        reviewsCount: "+1,480 تقييم من زبوناتنا",
        generousTitle: "حجم اقتصادي وافر",
        generousWeight: "600 غرام",
        proQuality: "جودة صالونات احترافية"
      }
    },

    // Why Choose Section
    whyChoose: {
      title: "لماذا تختارين فيتابليكس SOS؟",
      subtitle: "تركيبة خبيرة ومتطورة لشعر أكثر صحة ولمعاناً من أول استعمال.",
      items: [
        {
          title: "يرمم",
          desc: "الشعر التالف والأطراف المتقصفة"
        },
        {
          title: "يرطب",
          desc: "ترطيباً عميقاً من الجذور للأطراف"
        },
        {
          title: "يحمي",
          desc: "ألياف الشعر من العوامل الخارجية"
        },
        {
          title: "يمنح",
          desc: "نعومة فائقة ولمعاناً حريرياً"
        }
      ]
    },

    // Ingredients Section
    ingredients: {
      eyebrow: "قوة الطبيعة الفائقة",
      title: "مكونات ثمينة وطبيعية 100%",
      desc: "تركيبة فاخرة غنية بالمستخلصات النباتية والفيتامينات لترميم مكثف وجمال دائم لشعرك.",
      btn: "مكوناتنا الطبيعية",
      items: [
        {
          id: "neem",
          title: "النيم",
          desc: "منقي ومطهر"
        },
        {
          id: "rose",
          title: "ورد الجوري",
          desc: "مرمم ومغذي"
        },
        {
          id: "coco",
          title: "زيت جوز الهند",
          desc: "مرطب ومغذي"
        },
        {
          id: "argan",
          title: "زيت الأركان",
          desc: "مقوي للألياف"
        },
        {
          id: "soie",
          title: "بروتينات الحرير",
          desc: "حماية فائقة"
        },
        {
          id: "vitamines",
          title: "فيتامينات",
          desc: "+20 مكوّن نشط"
        }
      ]
    },

    // Results Section
    results: {
      titleLine1: "شعر أقوى، أكثر حيوية",
      titleLine2: "ولمعاناً بشكل ملحوظ",
      bullets: [
        "يقلل من تكسر وتساقط الشعر",
        "يعالج ويرمم التقصف والجفاف",
        "يمنح نعومة ولمس حريري فائق",
        "يحافظ على لون الصبغة وحيويتها"
      ],
      tagline1: "لأن شعركِ وجمالكِ",
      tagline2: "يستحقان الأفضل دائماً"
    },

    // Product Details Section
    details: {
      titleLine1: "قوة العناية الفائقة",
      titleLine2: "في كل تفصيل",
      items: [
        {
          title: "قوام كريمي غني",
          desc: "سهل التطبيق والامتصاص"
        },
        {
          title: "نتائج ملموسة",
          desc: "تلاحظين الفرق من أول استخدام"
        },
        {
          title: "خالٍ من السلفات",
          desc: "آمن للصبغة والبروتين"
        }
      ]
    },

    // Adopted Reviews Section
    adoptedReviews: {
      title: "تجارب وآراء زبوناتنا",
      subtitleHighlight: "98%",
      subtitleText: "من زبوناتنا أكدن حصولهن على شعر أقوى وأكثر نعومة ولمعاناً.",
      items: [
        {
          text: "« شعري ولا رطب بزاف وناعم ومبقاش كيتهرس كيف الأول. كنصح بيه من كل قلبي 100%! »",
          author: "— سارة، الرباط"
        },
        {
          text: "« منتج ممتاز جداً! حسيت بالفرق والنعومة واللمعان من أول استعمال. رائع! »",
          author: "— إيمان، الدار البيضاء"
        },
        {
          text: "« أخيراً لقيت ماسك اللي كيفي بالوعد ديالو! شعري ولا صحي ومغذي ومسبسب. »",
          author: "— ليلى، فاس"
        }
      ]
    },

    // How To Use Routine Section
    howToUse: {
      titleLine1: "روتين عناية سهل وسريع",
      titleLine2: "بنتائج فورية ومبهرة",
      steps: [
        {
          num: 1,
          title: "ضعي الماسك",
          desc: "على شعر نظيف ومبلل بعد الغسل"
        },
        {
          num: 2,
          title: "اتركيه يتغلغل",
          desc: "لبضع دقائق لامتصاص عميق"
        },
        {
          num: 3,
          title: "اشطفي بالماء",
          desc: "جيداً واستمتعي بشعر حريري ولامع"
        }
      ]
    },

    // Order Form & Order Drawer
    order: {
      eyebrow: "اعتني بجمال وصحة شعرك ابتداءً من اليوم!",
      mainTitle: "اطلبي الآن",
      subtitle: "وامنحي شعرك العناية الفاخرة التي يستحقها.",
      step1: "1. عرض المنتج الخاص :",
      step1Drawer: "1. عرضك الخاص :",
      step2: "2. معلومات التوصيل والاستلام :",
      step2Drawer: "2. معلومات التوصيل والاستلام :",
      packs: [
        {
          id: "pack1",
          name: "عبوة واحدة SOS للعناية بالشعر (600 غرام)",
          drawerTitle: "عبوة واحدة SOS (600 غرام)",
          drawerSub: "حجم كبير 600 غرام • ترميم فوري ومكثف",
          price: OFFERS.pack1.price,
          oldPrice: OFFERS.pack1.oldPrice,
          badge: "✨ عرض خاص (خصم 20%)",
          drawerBadge: "✨ عرض خاص • توصيل مجاني",
          pouches: 1
        }
      ],
      placeholders: {
        name: "الاسم الكامل *",
        phone: "رقم الهاتف (واتساب) *",
        city: "المدينة *",
        address: "عنوان التوصيل / الحي *"
      },
      submitBtn: "تأكيد الطلب الآن",
      drawerSubmitBtn: "تأكيد طلبي الآن",
      submitting: "جاري تأكيد طلبك...",
      currency: "درهم",
      
      // Trust Guarantees
      fastDelivery: "توصيل سريع مجاني",
      cod: "الدفع عند الاستلام",
      satisfaction: "ضمان الرضا والجودة",
      freeShippingTag: "توصيل مجاني",
      payOnDeliveryTag: "الدفع عند الاستلام",
      deliveryTimeTag: "خلال 24-48 ساعة",

      // Success
      successTitle: "تم تسجيل طلبك بنجاح !",
      successMessage: "شكراً لك {name} ! سيتصل بك فريق خدمة العملاء على الرقم {phone} لتأكيد موعد التوصيل إلى {city}.",
      anotherOrder: "طلب باقة أخرى",
      backToShop: "العودة إلى الصفحة",
      orderSummary: "ملخص الطلب :",
      productLabel: "المنتج :",
      shippingLabel: "التوصيل :",
      freeShippingValue: "مجاني (24-48 ساعة)",
      totalLabel: "المجموع للدفع :",
      phoneError: "المرجو إدخال رقم هاتف مغربي صحيح (مثال: 06 12 34 56 78).",
      errorTitle: "تعذّر إرسال الطلب",
      errorText: "لم نتمكن من تسجيل طلبك. أعيدي المحاولة أو اطلبي مباشرة عبر واتساب :",
      whatsapp: "اطلبي عبر واتساب",
      retry: "إعادة المحاولة"
    },

    // Sticky Bottom CTA
    stickyCta: {
      tag: "عرض خاص (-20%)",
      price: `${PRICE_DH} درهم`,
      oldPrice: `${OLD_PRICE_DH} درهم`,
      orderBtn: "اطلبي الآن"
    },

    // Brand Footer & Footer
    footer: {
      slogan: "جمال • عناية • ثقة",
      followUs: "تابعينا للحصول على نصائح وتخفيضات حصرية !",
      allRights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بـ",
      forHair: "من أجل شعر متألق وصحي دائماً."
    }
  }
};
