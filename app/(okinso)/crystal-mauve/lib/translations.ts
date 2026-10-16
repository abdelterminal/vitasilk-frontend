import { PRICE_DH, OLD_PRICE_DH, formatDh } from "./config";

// Prices are interpolated from lib/config.ts — never hardcode them here.
const fr = (n: number) => formatDh(n, "fr");
const ar = (n: number) => formatDh(n, "ar");

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      products: 'Produits',
      about: 'À propos',
      reviews: 'Avis',
      order: 'Commander',
      orderPack: `Commander le pack (${fr(PRICE_DH)})`,
      brandSub: 'ROYAL PREMIUM'
    },
    // Hero
    hero: {
      tag: 'SOIN COMPLET CHEVEUX',
      titlePart1: 'Des cheveux ',
      titleHighlight1: 'plus forts,',
      titlePart2: 'plus doux et ',
      titleHighlight2: 'plus brillants',
      desc: 'Le pack Organic Hair Care de Crystal est la solution idéale pour nourrir, réparer et sublimer vos cheveux en profondeur. Un trio puissant pour des résultats visibles dès les premières utilisations.',
      cta: 'Découvrir le pack',
      features: [
        'Cheveux plus forts et résistants',
        'Hydratation intense',
        'Brillance naturelle',
        'Convient à tous types de cheveux'
      ],
      handwriting: 'Le rituel\nnaturel pour\nvos cheveux'
    },
    // Results Section
    results: {
      tag: 'RÉSULTATS PROUVÉS',
      badge1: '+98% de brillance',
      badge2: '100% Naturel & Testé',
      titlePart1: 'Des résultats spectaculaires,',
      titleHighlight: 'visibles dès la première',
      titlePart2: 'utilisation',
      desc: 'Conçu pour réparer en profondeur la fibre capillaire, le rituel Crystal redonne vie, brillance et souplesse aux cheveux ternes ou abîmés dès la première application.',
      metrics: [
        { number: '98%', label: 'de brillance intense & douceur' },
        { number: '-85%', label: 'de casse & pointes fourchues' },
        { number: '3x', label: 'plus de nutrition & vitalité' }
      ],
      cta: 'Commander mon rituel'
    },
    // Why pack
    why: {
      title: 'Pourquoi choisir notre pack ?',
      subtitle: 'Une formule complète enrichie en actifs naturels pour des cheveux visiblement plus sains, plus forts et plus brillants.',
      items: [
        { title: 'Soin complet', desc: 'Shampooing + masque + sérum' },
        { title: 'Ingrédients naturels', desc: "à base d'huiles précieuses" },
        { title: 'Réparation en profondeur', desc: 'des cheveux abîmés' },
        { title: 'Résultats visibles', desc: 'dès les premières utilisations' }
      ]
    },
    // Ingredients
    ingredients: {
      tag: 'DES INGRÉDIENTS NATURELS',
      titlePart1: 'La puissance ',
      titleHighlight1: 'de la',
      titleHighlight2: 'nature',
      titlePart2: 'au service de vos',
      titlePart3: 'cheveux',
      desc: 'Enrichi en huiles précieuses et en extraits naturels, notre formule nourrit, répare et protège vos cheveux en profondeur, tout en leur apportant douceur et brillance.',
      cta: 'Découvrir les ingrédients'
    },
    // Product Spotlights
    products: {
      shampoo: {
        tag: '1. SHAMPOING',
        titlePart1: 'Nettoie en ',
        titleHighlight1: 'douceur',
        titlePart2: 'et prépare ',
        titleHighlight2: 'vos cheveux',
        desc: "Notre shampoing sans sulfate nettoie délicatement le cuir chevelu et élimine les impuretés tout en préservant l'hydratation naturelle des cheveux.",
        checks: ['Sans sulfate', 'Nourrit et purifie', 'Apporte de la brillance'],
        cta: 'En savoir plus'
      },
      mask: {
        tag: '2. MASQUE CAPILLAIRE',
        titleHighlight: 'Répare et nourrit',
        titlePart2: 'en profondeur',
        desc: 'Le masque capillaire est un véritable soin intensif qui redonne force et souplesse aux cheveux abîmés, tout en facilitant le démêlage.',
        checks: ['Répare les cheveux abîmés', 'Hydrate et nourrit', 'Apporte douceur et brillance'],
        cta: 'En savoir plus'
      },
      serum: {
        tag: '3. SÉRUM',
        titleHighlight: 'Protège et sublime',
        titlePart2: 'vos cheveux',
        desc: 'Le sérum nourrit les pointes, réduit les frisottis et apporte une brillance naturelle sans alourdir les cheveux.',
        checks: ['Réduit les frisottis', 'Protège des agressions extérieures', 'Fait briller les cheveux'],
        cta: 'En savoir plus'
      }
    },
    // How to use
    howToUse: {
      title: "Comment l'utiliser ?",
      subtitle: 'Un geste simple pour des résultats incroyables !',
      steps: [
        {
          num: '1',
          title: 'Lavez vos cheveux',
          desc: 'Appliquez le shampoing sur cheveux mouillés, massez et rincez.'
        },
        {
          num: '2',
          title: 'Nourrissez',
          desc: 'Appliquez le masque, laissez poser quelques minutes puis rincez.'
        },
        {
          num: '3',
          title: 'Protégez',
          desc: 'Appliquez quelques gouttes de sérum sur cheveux humides ou secs.'
        }
      ]
    },
    // Customer opinions
    opinions: {
      titlePart1: "Ce qu'elles ",
      titleHighlight: 'en pensent',
      subtitle: 'Des milliers de femmes déjà conquises par les résultats !',
      reviews: [
        {
          quote: "« Mes cheveux sont beaucoup plus doux et brillants. J'adore ce pack ! »",
          author: 'Sara K.'
        },
        {
          quote: "« Le masque est incroyable, il répare vraiment les cheveux abîmés. Je recommande à 100% ! »",
          author: 'Nadia B.'
        },
        {
          quote: "« Le sérum est léger et ne graisse pas les cheveux. Mes pointes sont plus fortes et moins cassantes. »",
          author: 'Imane L.'
        }
      ]
    },
    // Order section
    order: {
      headingPart1: 'Votre routine capillaire complète',
      headingHighlight: 'au naturel',
      subtext: 'Commandez dès maintenant et révélez la beauté naturelle de vos cheveux.',
      promoBadge: `Pack Trio Royal Complet • ${fr(PRICE_DH)}`,
      oldPrice: fr(OLD_PRICE_DH),
      freeDelivery: 'Livraison Gratuite',
      productBadge: '✨ Trio Royal Complet • Soin 100% Bio',
      formLabel: 'Vos coordonnées de livraison :',
      fullNameLabel: 'Nom & Prénom *',
      fullNamePlaceholder: 'Ex: Sarah Martin',
      phoneLabel: 'Numéro de téléphone *',
      phonePlaceholder: 'Ex: 06 12 34 56 78',
      addressLabel: 'Adresse de livraison *',
      addressPlaceholder: 'Numéro et nom de rue',
      cityLabel: 'Ville *',
      cityPlaceholder: 'Ex: Paris, Lyon, Casablanca...',
      codTitle: 'Paiement à la livraison',
      codDesc: 'Payez en espèces à la réception de votre colis chez vous',
      submitBtn: `Ajouter au panier — ${fr(PRICE_DH)}`,
      submittingBtn: 'Enregistrement en cours...',
      guarantees: [
        'Livraison 24/48h Offerte',
        'Garantie 30 jours',
        '100% Bio & Naturel'
      ],
      fixedCta: `Commander le pack — ${fr(PRICE_DH)}`,
      requiredFields: 'Veuillez remplir tous les champs obligatoires.',
      invalidPhone: 'Veuillez saisir un numéro de téléphone marocain valide (ex : 06 12 34 56 78).',
      errorMsg: "Votre commande n'a pas pu être envoyée. Réessayez ou commandez directement sur WhatsApp :",
      whatsappBtn: 'Commander sur WhatsApp'
    },
    // Success Screen
    success: {
      title: '✨ Merci beaucoup pour votre commande !',
      orderRef: 'Numéro de référence :',
      received: 'Votre commande a été reçue avec succès.',
      contactNotice: 'Notre équipe vous contactera très prochainement par téléphone pour confirmer les détails et la date de livraison.',
      productLabel: 'Produit sélectionné :',
      productValue: 'Pack Trio Royal – Shampooing + Masque + Sérum',
      recipientLabel: 'Destinataire :',
      newOrderBtn: 'Passer une nouvelle commande'
    },
    // Modal
    modal: {
      congrats: 'Félicitations',
      subtitle: 'Votre commande a été enregistrée avec succès. Notre service client vous contactera sous peu pour confirmer la livraison.',
      packChosen: 'Formule choisie :',
      amountDue: 'Montant à régler à la livraison :',
      phone: 'Téléphone :',
      address: 'Adresse :',
      closeBtn: 'Parfait, merci !'
    },
    // Cart
    cart: {
      title: 'Mon Panier',
      freeShippingSuccess: '🎉 Vous bénéficiez de la ',
      freeShippingBold: 'Livraison Gratuite',
      emptyText: 'Votre panier est vide',
      browseBtn: 'Commander le Pack Trio',
      productTitle: 'Pack Crystal Organic Hair Care',
      productSub: 'Trio Royal (Shampooing + Masque + Sérum)',
      delete: 'Supprimer',
      subtotal: 'Sous-total',
      deliveryRow: 'Livraison Colissimo 48h',
      freeBadge: 'GRATUITE',
      total: 'Total',
      checkoutBtn: 'Passer la commande • ',
      security: '🔒 Paiement Sécurisé • Livraison Gratuite'
    },
    // Footer
    footer: {
      brandSub: 'ROYAL PREMIUM',
      copyright: '© 2025 Crystal. Tous droits réservés.'
    }
  },

  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      about: 'عن المجموعة',
      reviews: 'آراء الزبائن',
      order: 'اطلبي الآن',
      orderPack: `طلب الباقة (${ar(PRICE_DH)})`,
      brandSub: 'رويال بريميوم'
    },
    // Hero
    hero: {
      tag: 'عناية متكاملة للشعر',
      titlePart1: 'شعر ',
      titleHighlight1: 'أكثر قوة،',
      titlePart2: 'أكثر نعومة و ',
      titleHighlight2: 'أكثر لمعاناً',
      desc: 'مجموعة Organic Hair Care من Crystal هي الحل المثالي لتغذية وترميم وتألق شعركِ من الأعماق. ثلاثي فعال ومثالي لنتائج ملحوظة من أولى الاستخدامات.',
      cta: 'اكتشفي المجموعة',
      features: [
        'شعر أقوى وأكثر مقاومة',
        'ترطيب عميق ومكثف',
        'لمعان وبريق طبيعي',
        'مناسب لجميع أنواع الشعر'
      ],
      handwriting: 'الروتين\nالطبيعي الفاخر\nلشعركِ'
    },
    // Results Section
    results: {
      tag: 'نتائج مثبتة سريرياً',
      badge1: '+98% لمعان فائق',
      badge2: '100% طبيعي ومجرب',
      titlePart1: 'نتائج مذهلة واستثنائية،',
      titleHighlight: 'تظهر بوضوح من أول',
      titlePart2: 'استخدام',
      desc: 'صُمم لعلاج ألياف الشعر وترميمها بعمق، حيث يعيد روتين Crystal الحيوية والنعومة الفائقة والمرونة للشعر التالف أو الباهت منذ أول تطبيق.',
      metrics: [
        { number: '98%', label: 'لمعان مكثف ونعومة حريرية' },
        { number: '-85%', label: 'تقليل التقصف وتكسر الأطراف' },
        { number: '3x', label: 'تغذية وحيوية مضاعفة 3 مرات' }
      ],
      cta: 'اطلبي روتينكِ الآن'
    },
    // Why pack
    why: {
      title: 'لماذا تختارين مجموعتنا ؟',
      subtitle: 'تركيبة ملكية متكاملة غنية بالمكونات الطبيعية الفعالة لشعر صحي وقوي ولامع بشكل ملحوظ.',
      items: [
        { title: 'عناية متكاملة', desc: 'شامبو + ماسك + سيروم' },
        { title: 'مكونات طبيعية', desc: 'مستخلصة من أجود الزيوت الثمينة' },
        { title: 'ترميم عميق', desc: 'للشعر المتضرر والمجهد' },
        { title: 'نتائج ملحوظة', desc: 'من أولى الاستخدامات' }
      ]
    },
    // Ingredients
    ingredients: {
      tag: 'مكونات طبيعية نقية 100%',
      titlePart1: 'قوة ',
      titleHighlight1: 'الطبيعة',
      titleHighlight2: 'الفائقة',
      titlePart2: 'في خدمة جمال ونقاء',
      titlePart3: 'شعركِ',
      desc: 'بفضل غناها بالزيوت الثمينة والخلاصات النباتية النقية، تعمل تركيبتنا على تغذية شعركِ وحمايته وترميمه بعمق ليمنحكِ نعومة ساحرة وبريقاً يدوم.',
      cta: 'اكتشفي أسرار المكونات'
    },
    // Product Spotlights
    products: {
      shampoo: {
        tag: '1. الشامبو المنظف',
        titlePart1: 'ينظف ',
        titleHighlight1: 'بلطف فائق',
        titlePart2: 'ويهيئ ',
        titleHighlight2: 'خصلات شعركِ',
        desc: 'شامبو خالي من السلفات ينظف فروة الرأس بلطف ويزيل الرواسب والشوائب مع الحفاظ التام على الرطوبة الطبيعية للشعر.',
        checks: ['خالٍ تماماً من السلفات', 'يغذي وينقي الفروة', 'يضفي لمعاناً طبيعياً'],
        cta: 'معرفة المزيد'
      },
      mask: {
        tag: '2. ماسك الترميم',
        titleHighlight: 'يرمم ويغذي',
        titlePart2: 'في أعمق الطبقات',
        desc: 'علاج مكثف وفاخر يعيد القوة والمرونة للشعر المتضرر، ويمنحكِ تسريحاً سهلاً وفورياً بدون أي تشابك.',
        checks: ['يعالج الشعر التالف والمجهد', 'يرطب ويغذي بكثافة', 'يمنح ملمساً حريرياً ولمعاناً'],
        cta: 'معرفة المزيد'
      },
      serum: {
        tag: '3. السيروم المغذي',
        titleHighlight: 'يحمي ويجمل',
        titlePart2: 'شعركِ بلمسة مخملية',
        desc: 'سيروم خفيف يغذي الأطراف، يمنع الهيشان والتطاير، ويمنح شعركِ بريقاً جذاباً بدون أي ملمس دهني.',
        checks: ['يقلل الهيشان والتقصف', 'يحمي من الحرارة والعوامل الخارجية', 'يضفي بريقاً ولمعاناً ساحراً'],
        cta: 'معرفة المزيد'
      }
    },
    // How to use
    howToUse: {
      title: 'كيفية الاستخدام ؟',
      subtitle: 'خطوات بسيطة وسريعة لنتائج احترافية مذهلة !',
      steps: [
        {
          num: '1',
          title: 'اغسلي شعركِ',
          desc: 'ضعي الشامبو على شعر مبلل، دلكي الفروة بلطف ثم اشطفي بالماء الفاتر.'
        },
        {
          num: '2',
          title: 'غذّي بعمق',
          desc: 'ضعي الماسك على كامل الشعر، اتركيه لدقائق ليتغلغل ثم اشطفيه جيداً.'
        },
        {
          num: '3',
          title: 'احمي ولمّعي',
          desc: 'ضعي بضع قطرات من السيروم على الأطراف سواء كان الشعر رطباً أو جافاً.'
        }
      ]
    },
    // Customer opinions
    opinions: {
      titlePart1: 'ماذا يقول ',
      titleHighlight: 'عملاؤنا',
      subtitle: 'آلاف السيدات جربن النتائج الرائعة وأبدين إعجابهن الكامل !',
      reviews: [
        {
          quote: '« أصبح شعري أكثر نعومة ولمعاناً بشكل لا يُصدق. أفضل مجموعة جربتها حتى الآن ! »',
          author: 'سارة ك.'
        },
        {
          quote: '« الماسك ممتاز جداً، عالج التلف الناتج عن الصبغة في وقت قياسي. أنصح به بشدة ! »',
          author: 'نادية ب.'
        },
        {
          quote: '« السيروم خفيف جداً ولا يترك أي ملمس زيتي. أطراف شعري لم تعد تتقصف أبداً. »',
          author: 'إيمان ل.'
        }
      ]
    },
    // Order section
    order: {
      headingPart1: 'روتينكِ الكامل للعناية بالشعر',
      headingHighlight: 'بمكونات طبيعية',
      subtext: 'اطلبي الآن واكتشفي الإشراقة والجمال الطبيعي لخصلات شعركِ.',
      promoBadge: `باقة التريو الملكي الكامل • ${ar(PRICE_DH)}`,
      oldPrice: ar(OLD_PRICE_DH),
      freeDelivery: 'توصيل مجاني سريع',
      productBadge: '✨ باقة التريو الملكي • عناية 100% طبيعية',
      formLabel: 'معلومات التوصيل الخاصة بكِ :',
      fullNameLabel: 'الاسم الكامل *',
      fullNamePlaceholder: 'مثال: سارة محمد',
      phoneLabel: 'رقم الهاتف *',
      phonePlaceholder: 'مثال: 06 12 34 56 78',
      addressLabel: 'عنوان التوصيل *',
      addressPlaceholder: 'اسم الشارع، الحي، رقم المنزل',
      cityLabel: 'المدينة *',
      cityPlaceholder: 'مثال: الدار البيضاء، الرياض، الجزائر...',
      codTitle: 'الدفع عند الاستلام',
      codDesc: 'ادفعي نقداً بأمان تام عند استلام طردكِ في منزلكِ',
      submitBtn: `تأكيد الطلب — ${ar(PRICE_DH)}`,
      submittingBtn: 'جاري تسجيل طلبكِ...',
      guarantees: [
        'توصيل سريع مجاني',
        'ضمان الرضا والجودة',
        '100% طبيعي وأصلي'
      ],
      fixedCta: `طلب باقة التريو — ${ar(PRICE_DH)}`,
      requiredFields: 'يرجى ملء جميع الحقول المطلوبة.',
      invalidPhone: 'يرجى إدخال رقم هاتف مغربي صحيح (مثال: 06 12 34 56 78).',
      errorMsg: 'تعذر إرسال طلبكِ. حاولي مرة أخرى أو اطلبي مباشرة عبر واتساب :',
      whatsappBtn: 'اطلبي عبر واتساب'
    },
    // Success Screen
    success: {
      title: '✨ شكراً جزيلاً لطلبك',
      orderRef: 'رقم مرجع الطلب :',
      received: 'تم استلام طلبك بنجاح تام.',
      contactNotice: 'سيتواصل معك فريقنا قريباً جداً عبر الهاتف لتأكيد تفاصيل وموعد التوصيل.',
      productLabel: 'المنتج المختار :',
      productValue: 'الباقة الكاملة – شامبو + ماسك + سيروم',
      recipientLabel: 'المستلم :',
      newOrderBtn: 'تقديم طلب جديد'
    },
    // Modal
    modal: {
      congrats: 'تهانينا',
      subtitle: 'تم تسجيل طلبكِ بنجاح تام. سيتواصل معكِ فريق خدمة العملاء قريباً لتأكيد موعد التوصيل.',
      packChosen: 'الباقة المختارة :',
      amountDue: 'المبلغ المطلوب عند الاستلام :',
      phone: 'رقم الهاتف :',
      address: 'العنوان :',
      closeBtn: 'ممتاز، شكراً لكم !'
    },
    // Cart
    cart: {
      title: 'سلة المشتريات',
      freeShippingSuccess: '🎉 استمتعي بميزة ',
      freeShippingBold: 'التوصيل المجاني',
      emptyText: 'سلتكِ فارغة حالياً',
      browseBtn: 'طلب باقة التريو الملكي',
      productTitle: 'باقة Crystal Organic Hair Care',
      productSub: 'التريو الملكي (شامبو + ماسك + سيروم)',
      delete: 'حذف',
      subtotal: 'المجموع الفرعي',
      deliveryRow: 'توصيل سريع خلال 48 ساعة',
      freeBadge: 'مجاناً',
      total: 'المجموع الإجمالي',
      checkoutBtn: 'إتمام الطلب • ',
      security: '🔒 دفع آمن عند الاستلام • توصيل مجاني'
    },
    // Footer
    footer: {
      brandSub: 'رويال بريميوم',
      copyright: '© 2025 كريستال. جميع الحقوق محفوظة.'
    }
  }
}

export type Translations = typeof translations.fr;
