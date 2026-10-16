// Copy ported verbatim from the source page. Prices are derived from ./config
// so the copy can never show a different number than the one the server bills.
import { formatDh, OLD_PRICE_DH, PRICE_DH } from "./config";

export const translations = {
  fr: {
    // Navbar
    nav: {
      home: 'Accueil',
      collection: 'Collection',
      routine: 'Routine',
      avis: 'Avis',
      faq: 'FAQ',
      routine3Steps: 'Routine 3 Étapes',
      ourProducts: 'Nos Produits',
      results: 'Résultats Cliniques',
      order: 'Commander',
      orderRoutine: 'Commander votre Routine',
      guarantee: '🌿 100% Organique · Kératine & Protéine · Paiement à la livraison',
      closeMenu: 'Fermer le menu',
      openMenu: 'Menu',
      langSwitch: 'العربية'
    },

    // Hero Section
    hero: {
      brandTag1: 'CRYSTAL',
      brandTag2: 'ROYAL PREMIUM',
      titleLine1: 'Des cheveux plus lisses,',
      titleLine2: 'plus forts, plus beaux.',
      description: 'La puissance de la kératine pour une chevelure nourrie, réparée et durablement sublimée.',
      btnDiscover: 'DÉCOUVRIR LA COLLECTION',
      btnRoutine: 'VOIR LA ROUTINE'
    },

    // Collection Intro Section
    collection: {
      tag: 'NOTRE COLLECTION',
      heading1: 'La force de la kératine',
      heading2: 'au naturel.',
      paragraph: 'Le Complexe Royal de Crystal est une formule unique à base de kératine, conçue pour réparer, nourrir et protéger vos cheveux en profondeur.',
      btnMore: 'EN SAVOIR PLUS',
      modelPhotoAlt: 'Chevelure soyeuse, lisse et brillante Crystal Royal Premium'
    },

    // Benefits Section
    benefits: {
      tag: 'LES BIENFAITS',
      title: 'Une chevelure visiblement transformée',
      items: [
        {
          id: 'lisse',
          title: 'LISSE',
          desc: 'Réduit les frisottis et discipline les cheveux.'
        },
        {
          id: 'renforce',
          title: 'RENFORCE',
          desc: 'Répare la fibre capillaire et limite la casse.'
        },
        {
          id: 'nourrit',
          title: 'NOURRIT',
          desc: 'Apporte douceur, brillance et vitalité.'
        },
        {
          id: 'protege',
          title: 'PROTÈGE',
          desc: 'Protège des agressions extérieures et de la chaleur.'
        }
      ]
    },

    // Products Section
    products: {
      tag: 'NOS PRODUITS',
      title: 'Une routine complète',
      subtitle: 'Des soins ciblés pour des cheveux plus forts, plus lisses et plus brillants.',
      btnDiscover: 'DÉCOUVRIR',
      items: {
        shampoo: {
          number: '01',
          name: 'SHAMPOOING LISSANT',
          category: 'Protein & Keratin',
          volume: '500ml',
          description: 'Nettoie en douceur tout en préparant la fibre capillaire à recevoir les soins.',
          features: [
            'Nettoie sans agresser',
            'Apporte brillance et douceur',
            'Prépare au soin'
          ]
        },
        mask: {
          number: '02',
          name: 'MASQUE RÉPARATEUR',
          category: 'Protein & Keratin',
          volume: '500ml',
          description: 'Répare intensément et nourrit en profondeur les cheveux.',
          features: [
            'Répare la fibre capillaire',
            'Nourrit et hydrate',
            'Rend les cheveux plus souples'
          ]
        },
        serum: {
          number: '03',
          name: 'SÉRUM LISSANT',
          category: 'Protein & Keratin',
          volume: '50ml',
          description: 'Protège, sublime et apporte une finition parfaite à votre chevelure.',
          features: [
            'Protège des agressions',
            'Apporte brillance et douceur',
            'Lisse les longueurs'
          ]
        }
      }
    },

    // Routine 3-Step Section
    routine: {
      title: 'Votre routine en 3 étapes',
      subtitle: 'Des gestes simples pour des résultats visibles et durables.',
      btnRoutine: 'DÉCOUVRIR LA ROUTINE',
      steps: [
        {
          stepNumber: '01',
          action: 'NETTOYER',
          product: 'Shampooing',
          alt: 'Étape 01 : Nettoyer avec le Shampooing Crystal Hair Care'
        },
        {
          stepNumber: '02',
          action: 'RÉPARER',
          product: 'Masque',
          alt: 'Étape 02 : Réparer avec le Masque Crystal Hair Care'
        },
        {
          stepNumber: '03',
          action: 'SUBLIMER',
          product: 'Sérum',
          alt: 'Étape 03 : Sublimer avec le Sérum Crystal Hair Care'
        }
      ]
    },

    // Results Section
    results: {
      tag: 'RÉSULTATS',
      headline1: 'Des cheveux doux,',
      headline2: 'brillants et en pleine santé.',
      subtext: 'La kératine agit en profondeur pour lisser, renforcer et sublimer vos cheveux, jour après jour.',
      btnResults: 'VOIR LES RÉSULTATS',
      photoAlt: 'Résultat brillance et texture soyeuse des cheveux Crystal',
      cursiveTitle: 'Brillance',
      cursiveNaturelle: 'Naturelle'
    },

    // Lifestyle Section
    lifestyle: {
      tag: 'UN MOMENT POUR VOUS',
      title1: 'Plus qu’un soin,',
      title2: 'une expérience.',
      description: 'Offrez à vos cheveux le luxe d’un soin professionnel, à la maison. La collection Crystal transforme votre routine en un véritable moment de bien-être.',
      btnDiscover: 'DÉCOUVRIR LA COLLECTION',
      photoAlt: 'Moment de soin Crystal Royal Premium'
    },

    // Testimonials Section
    testimonials: {
      tag: 'ILS EN PARLENT MIEUX QUE NOUS',
      title: 'Vos avis, notre plus belle récompense',
      prevAria: 'Avis précédent',
      nextAria: 'Avis suivant',
      items: [
        {
          id: 1,
          name: 'Lina B.',
          rating: 5,
          text: '“Mes cheveux sont incroyablement doux et brillants. La gamme Crystal a vraiment changé ma routine !”'
        },
        {
          id: 2,
          name: 'Imane R.',
          rating: 5,
          text: "“J'adore l'odeur et la texture des produits. Mes cheveux sont plus forts et visiblement plus sains.”"
        },
        {
          id: 3,
          name: 'Karima K.',
          rating: 5,
          text: '“Une vraie découverte ! Mes cheveux sont plus lisses, plus doux et beaucoup plus beaux.”'
        },
        {
          id: 4,
          name: 'Sonia M.',
          rating: 5,
          text: '“Après 2 semaines d’utilisation, mes pointes abîmées ont retrouvé toute leur vitalité. Le sérum est magique !”'
        },
        {
          id: 5,
          name: 'Nadia T.',
          rating: 5,
          text: '“Qualité salon professionnel à la maison. Le masque nourrit en profondeur sans alourdir ma chevelure.”'
        },
        {
          id: 6,
          name: 'Yasmine E.',
          rating: 5,
          text: '“Mes cheveux étaient très secs à cause des brushings répétés. Ce trio Crystal les a complètement réparés !”'
        }
      ]
    },

    // Order Form Section
    order: {
      tag: 'COMMANDE RAPIDE',
      title: 'Commandez votre routine CRYSTAL',
      subtitle: 'Remplissez le formulaire et nous vous contacterons pour confirmer votre commande.',
      packTitle: 'Gamme CRYSTAL® Royal Premium',
      packSubtitle: 'Formule Kératine & Protéine Organique',
      packTag: 'Soin Professionnel à Domicile',
      packPrice: formatDh(PRICE_DH, 'fr'),
      packOldPrice: formatDh(OLD_PRICE_DH, 'fr'),
      packImgAlt: 'Pack complet Crystal Royal Premium - Shampooing, Masque et Sérum',
      guarantees: [
        {
          title: 'Livraison rapide à domicile',
          desc: 'Expédition sous 24h à 48h ouvrées'
        },
        {
          title: 'Paiement à la livraison',
          desc: 'Réglez en toute sérénité à la réception du colis'
        },
        {
          title: 'Garantie Authenticité 100%',
          desc: 'Formule certifiée bio, 0% sulfates & non testé sur les animaux'
        }
      ],
      routineOptions: [
        {
          id: 'pack_complet',
          label: 'Pack complet — Shampoo + Masque + Sérum',
          price: formatDh(PRICE_DH, 'fr'),
          oldPrice: formatDh(OLD_PRICE_DH, 'fr'),
          subtext: '500ml + 500ml + 50ml · Recommandé pour un résultat optimal',
          tag: 'OFFRE COMPLÈTE',
          badgeClass: 'badge-best'
        }
      ],
      routineLabel: 'Choisissez votre routine',
      fullNameLabel: 'Nom complet',
      fullNamePlaceholder: 'Ex: Sarah Benani',
      phoneLabel: 'Téléphone',
      phonePlaceholder: 'Ex: 06 12 34 56 78',
      cityLabel: 'Ville',
      cityPlaceholder: 'Ex: Casablanca, Rabat, Marrakech, Paris...',
      emailLabel: 'Email (Optionnel)',
      emailPlaceholder: 'votre@email.com',
      consentText: "J'accepte d'être contacté(e) par appel téléphonique ou WhatsApp pour confirmer ma commande.",
      submitBtn: 'COMMANDER MAINTENANT',
      submitting: 'Enregistrement en cours...',
      confidentiality: 'Vos données personnelles sont confidentielles et protégées.',
      errors: {
        fullName: 'Veuillez saisir votre nom complet',
        phone: 'Veuillez saisir votre numéro de téléphone',
        phoneInvalid: 'Numéro de téléphone invalide',
        city: 'Veuillez indiquer votre ville',
        emailInvalid: 'Format d’adresse email invalide',
        consent: 'Veuillez accepter d’être contacté(e) pour confirmer votre commande'
      },
      failure: {
        title: "La commande n'a pas pu être envoyée",
        message: 'Un problème technique est survenu. Commandez directement sur WhatsApp, notre équipe vous répond tout de suite.',
        btnWhatsApp: 'Commander sur WhatsApp',
        btnRetry: 'Réessayer',
        waMessage: 'Bonjour, je veux commander {product} — Total : {total} — Nom : {name} — Ville : {city}'
      },
      success: {
        title: 'Merci pour votre commande ✨',
        refLabel: 'Référence de commande :',
        message: 'Nous avons bien reçu votre demande.\nNotre équipe vous contactera très prochainement par téléphone ou WhatsApp pour confirmer les détails de livraison.',
        chosenProduct: 'Produit choisi :',
        priceLabel: 'Prix total :',
        recipient: 'Destinataire :',
        btnNewOrder: 'Passer une autre commande',
        btnWhatsApp: 'Support WhatsApp Direct',
        waMessage: "Bonjour, j'ai passé la commande {ref} pour la routine Crystal."
      }
    },

    // Final CTA Section
    finalCta: {
      badge: "RITUEL D'EXCEPTION · RÉSULTATS PROFESSIONNELS",
      headline1: 'Offrez à vos cheveux',
      headline2: 'la routine qu’ils méritent.',
      leadText: 'Révélez la beauté naturelle de votre chevelure grâce à la synergie puissante de la kératine pure et des protéines végétales. Réparation intense, brillance soyeuse et protection longue durée.',
      benefits: [
        'Kératine Pure & Protéines',
        '0% Sulfates, Parabènes & Sel',
        'Brillance & Douceur Miroir',
        'Protection Anti-Casse 72h'
      ],
      btnOrder: 'COMMANDER LA ROUTINE COMPLÈTE',
      reassurances: [
        'Livraison Rapide',
        'Paiement à la réception',
        'Stock Limité'
      ],
      packBadgeHighlight: 'PACK COMPLET 3-EN-1',
      packBadgeSub: 'Shampooing + Masque + Sérum',
      serumBadge: 'Sérum 50ml',
      shampooBadge: 'Shampooing 500ml',
      maskBadge: 'Masque 500ml',
      serumAlt: 'Sérum Lissant Réparateur Crystal 50ml',
      shampooAlt: 'Shampooing Lissant Kératine & Protéine Crystal 500ml',
      maskAlt: 'Masque Réparateur Intense Crystal 500ml'
    },

    // FAQ Section
    faq: {
      tag: 'FOIRE AUX QUESTIONS',
      title: 'Questions Fréquentes',
      subtitle: 'Tout ce que vous devez savoir sur nos rituels de soin et nos engagements.',
      items: [
        {
          question: 'À quel type de cheveux la gamme Crystal est-elle adaptée ?',
          answer: 'La gamme Crystal Royal Premium est formulée pour tous les types de cheveux, particulièrement les cheveux secs, abîmés, indisciplinés, crépus, colorés ou fragilisés par les lissages et fers à lisser.'
        },
        {
          question: 'Les produits contiennent-ils des sulfates ou du sel ?',
          answer: 'Non, tous les produits Crystal sont 100% garantis sans sulfates, sans parabènes, sans silicone lourd et sans sel ajouté afin de préserver l’hydratation naturelle et prolonger l’effet des lissages.'
        },
        {
          question: 'À quelle fréquence utiliser le masque réparateur ?',
          answer: 'Nous recommandons d’utiliser le masque 1 à 2 fois par semaine après le shampooing. Laissez poser entre 5 et 10 minutes pour une pénétration optimale des protéines au cœur du cortex capillaire.'
        },
        {
          question: 'Comment se déroule la livraison et le paiement ?',
          answer: 'La livraison est effectuée à domicile sous 24h à 48h ouvrées. Vous pouvez payer en espèces à la livraison directement auprès de notre livreur après vérification de votre colis.'
        }
      ]
    },

    // Footer Section
    footer: {
      copyright: '© 2025 Vitasilk Professional. Tous droits réservés.',
      colNavTitle: 'Navigation',
      colInfoTitle: 'Informations',
      colSocialTitle: 'Suivez-nous',
      signature: 'La beauté au naturel. 🌿',
      links: {
        home: 'Accueil',
        collection: 'Collection',
        routine: 'Routine',
        avis: 'Avis',
        faq: 'FAQ',
        contact: 'Contact',
        delivery: 'Livraison',
        returns: 'Retours',
        legal: 'Mentions légales',
        privacy: 'Politique de confidentialité'
      }
    },

    // Sticky Mobile CTA
    stickyMobile: {
      title: 'Gamme CRYSTAL®',
      badge: 'Paiement à la livraison',
      btn: 'Commander'
    }
  },

  ar: {
    // Navbar
    nav: {
      home: 'الرئيسية',
      collection: 'المجموعة',
      routine: 'الروتين',
      avis: 'آراء العملاء',
      faq: 'الأسئلة الشائعة',
      routine3Steps: 'روتين من 3 خطوات',
      ourProducts: 'منتجاتنا',
      results: 'نتائج مثبتة',
      order: 'اطلب الآن',
      orderRoutine: 'اطلب روتينك الخاص',
      guarantee: '🌿 عضوي 100% · كيراتين وبروتين · الدفع عند الاستلام',
      closeMenu: 'إغلاق القائمة',
      openMenu: 'القائمة',
      langSwitch: 'FR'
    },

    // Hero Section
    hero: {
      brandTag1: 'CRYSTAL',
      brandTag2: 'رويال بريميوم',
      titleLine1: 'شعر أكثر نعومة وانسيابية،',
      titleLine2: 'أكثر قوة وجمالاً.',
      description: 'قوة الكيراتين والبروتين الطبيعي لشعر مغذى، مرمم ومشرق بنعومة فائقة تدوم طويلاً.',
      btnDiscover: 'اكتشف المجموعة',
      btnRoutine: 'شاهد الروتين'
    },

    // Collection Intro Section
    collection: {
      tag: 'مجموعتنا الفاخرة',
      heading1: 'قوة الكيراتين',
      heading2: 'بلمسة طبيعية نقية.',
      paragraph: 'المركب الملكي من Crystal تركيبة فريدة غنية بالكيراتين العضوي والبروتينات، صُممت خصيصاً لإصلاح وتغذية وحماية شعرك بعمق من الجذور حتى الأطراف.',
      btnMore: 'معرفة المزيد',
      modelPhotoAlt: 'شعر حريري ناعم ولامع مع كريستال رويال بريميوم'
    },

    // Benefits Section
    benefits: {
      tag: 'الفوائد والمميزات',
      title: 'شعر متحول بشكل ملحوظ وفوري',
      items: [
        {
          id: 'lisse',
          title: 'تمليس ونعومة',
          desc: 'يقضي على التطاير ويمنح الشعر انسيابية حريرية تامة.'
        },
        {
          id: 'renforce',
          title: 'تقوية وترميم',
          desc: 'يعالج ألياف الشعر المتضررة ويحد من التقصف والتكسر.'
        },
        {
          id: 'nourrit',
          title: 'تغذية مكثفة',
          desc: 'يمنح الشعر نعومة ولمعاناً فائقاً وحيوية متجددة.'
        },
        {
          id: 'protege',
          title: 'حماية شاملة',
          desc: 'يحمي من الحرارة العالية والعوامل الخارجية الضارة.'
        }
      ]
    },

    // Products Section
    products: {
      tag: 'منتجاتنا',
      title: 'روتين عناية متكامل',
      subtitle: 'عناية فائقة ومركزة لشعر أقوى، أكثر نعومة ولمعاناً زجاجياً مبهراً.',
      btnDiscover: 'اكتشف المنتج',
      items: {
        shampoo: {
          number: '01',
          name: 'شامبو التمليس والتغذية',
          category: 'بروتين وكيراتين',
          volume: '500ml',
          description: 'ينظف بلطف شديد ويهيئ ألياف الشعر للاستفادة القصوى من خطوات العلاج والترميم.',
          features: [
            'ينظف بلطف دون تجفيف الشعر',
            'يمنح لمعاناً ونعومة فائقة',
            'يهيئ الشعر للعناية العميقة'
          ]
        },
        mask: {
          number: '02',
          name: 'ماسك الترميم المكثف',
          category: 'بروتين وكيراتين',
          volume: '500ml',
          description: 'يصلح التلف بعمق ويغذي خصلات الشعر بأقوى البروتينات الأساسية.',
          features: [
            'يرمم ألياف الشعر التالفة بعمق',
            'يغذي ويرطب بشكل مكثف',
            'يجعل الشعر فائق المرونة والليونة'
          ]
        },
        serum: {
          number: '03',
          name: 'سيروم الحماية واللمعان',
          category: 'بروتين وكيراتين',
          volume: '50ml',
          description: 'يحمي من الحرارة ويضفي لمسة نهائية حريرية براقة وخالية من التجاعيد.',
          features: [
            'يحمي من الحرارة والتلف اليومي',
            'يمنح بريقاً ولمعاناً زجاجياً مبهراً',
            'ينعم الأطراف ويزيل الهيشان تماماً'
          ]
        }
      }
    },

    // Routine 3-Step Section
    routine: {
      title: 'روتينك الخاص في 3 خطوات',
      subtitle: 'خطوات بسيطة وفعالة لنتائج مبهرة وملحوظة تدوم طويلاً.',
      btnRoutine: 'اكتشف الروتين الكامل',
      steps: [
        {
          stepNumber: '01',
          action: 'تنظيف',
          product: 'شامبو',
          alt: 'الخطوة 01 : تنظيف الشعر بشامبو كريستال'
        },
        {
          stepNumber: '02',
          action: 'ترميم',
          product: 'ماسك',
          alt: 'الخطوة 02 : ترميم الشعر بماسك كريستال'
        },
        {
          stepNumber: '03',
          action: 'إشراق وحماية',
          product: 'سيروم',
          alt: 'الخطوة 03 : إبراز اللمعان بسيروم كريستال'
        }
      ]
    },

    // Results Section
    results: {
      tag: 'النتائج المثبتة',
      headline1: 'شعر ناعم كالحرير،',
      headline2: 'لامع وفي قمة الحيوية والصحة.',
      subtext: 'يعمل الكيراتين النقي في عمق البصيلات لتنعيم وتقوية وتجميل شعرك يوماً بعد يوم.',
      btnResults: 'مشاهدة النتائج والآراء',
      photoAlt: 'نتيجة اللمعان والملمس الحريري لشعر كريستال',
      cursiveTitle: 'لمعان',
      cursiveNaturelle: 'طبيعي'
    },

    // Lifestyle Section
    lifestyle: {
      tag: 'لحظة عناية فاخرة',
      title1: 'أكثر من مجرد عناية،',
      title2: 'إنها تجربة فريدة.',
      description: 'امنحي شعرك رفاهية العناية الاحترافية داخل منزلك. مجموعة Crystal تحول روتينك اليومي إلى لحظة استرخاء وجمال حقيقي.',
      btnDiscover: 'اكتشف المجموعة',
      photoAlt: 'لحظة عناية خاصة مع كريستال رويال بريميوم'
    },

    // Testimonials Section
    testimonials: {
      tag: 'تجارب حقيقية لعميلاتنا',
      title: 'آراؤكم هي فخرنا وأكبر نجاح لنا',
      prevAria: 'الرأي السابق',
      nextAria: 'الرأي التالي',
      items: [
        {
          id: 1,
          name: 'لينا ب.',
          rating: 5,
          text: '«أصبح شعري ناعماً ولامعاً بشكل لا يصدق. مجموعة كريستال غيرت مظهر شعري تماماً!»'
        },
        {
          id: 2,
          name: 'إيمان ر.',
          rating: 5,
          text: '«أعشق رائحة وقوام المنتجات. شعري صار أقوى وبدا صحياً ولامعاً جداً من أول أسبوع.»'
        },
        {
          id: 3,
          name: 'كريمة ك.',
          rating: 5,
          text: '«اكتشاف رائع بكل معنى الكلمة! شعري أصبح أكثر انسيابية ونعومة وأسهل في التصفيف بكثير.»'
        },
        {
          id: 4,
          name: 'سونيا م.',
          rating: 5,
          text: '«بعد أسبوعين فقط من الاستخدام، استعادت أطرافي المتقصفة كامل حيويتها. السيروم سحري حقاً!»'
        },
        {
          id: 5,
          name: 'نادية ت.',
          rating: 5,
          text: '«جودة صالونات التجميل العالمية في البيت. الماسك يغذي بعمق دون أن يثقل الشعر على الإطلاق.»'
        },
        {
          id: 6,
          name: 'ياسمين ع.',
          rating: 5,
          text: '«كان شعري جافاً ومجهداً من كثرة السشوار والتمليس. هذا الثلاثي من كريستال عالجه ورطبه بالكامل!»'
        }
      ]
    },

    // Order Form Section
    order: {
      tag: 'طلب سريع ومضمون',
      title: 'اطلب روتين CRYSTAL الخاص بك الآن',
      subtitle: 'املأ الاستمارة وسنتواصل معك هاتفياً أو عبر الواتساب لتأكيد طلبك وتوصيله.',
      packTitle: 'مجموعة CRYSTAL® رويال بريميوم',
      packSubtitle: 'تركيبة الكيراتين والبروتين العضوي النقي',
      packTag: 'عناية احترافية فاخرة في المنزل',
      packPrice: formatDh(PRICE_DH, 'ar'),
      packOldPrice: formatDh(OLD_PRICE_DH, 'ar'),
      packImgAlt: 'الباقة الكاملة كريستال رويال بريميوم - شامبو، ماسك وسيروم',
      guarantees: [
        {
          title: 'توصيل سريع إلى باب المنزل',
          desc: 'شحن وتوصيل خلال 24 إلى 48 ساعة عمل'
        },
        {
          title: 'الدفع عند الاستلام',
          desc: 'ادفع بكل أمان وراحة بعد فحص واستلام طلبيتك'
        },
        {
          title: 'ضمان الأصالة والجودة 100%',
          desc: 'تركيبة عضوية معتمدة، خالية من السلفات وغير مجربة على الحيوانات'
        }
      ],
      routineOptions: [
        {
          id: 'pack_complet',
          label: 'الباقة الكاملة — شامبو + ماسك + سيروم',
          price: formatDh(PRICE_DH, 'ar'),
          oldPrice: formatDh(OLD_PRICE_DH, 'ar'),
          subtext: '500 مل + 500 مل + 50 مل · موصى بها للحصول على أفضل نتيجة مثالية',
          tag: 'العرض الكامل',
          badgeClass: 'badge-best'
        }
      ],
      routineLabel: 'اختر باقة العناية المناسبة',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: سارة بناني',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: 'مثال: 06 12 34 56 78',
      cityLabel: 'المدينة',
      cityPlaceholder: 'مثال: الدار البيضاء، الرباط، مراكش، طنجة...',
      emailLabel: 'البريد الإلكتروني (اختياري)',
      emailPlaceholder: 'votre@email.com',
      consentText: 'أوافق على التواصل معي عبر الهاتف أو الواتساب لتأكيد طلبي وتحديد موعد التوصيل.',
      submitBtn: 'تأكيد الطلب الآن',
      submitting: 'جاري تسجيل الطلب...',
      confidentiality: 'بياناتك الشخصية سرية ومحمية تماماً 100%.',
      errors: {
        fullName: 'يرجى إدخال اسمك الكامل',
        phone: 'يرجى إدخال رقم هاتفك للتواصل',
        phoneInvalid: 'رقم الهاتف غير صالح',
        city: 'يرجى تحديد مدينتك',
        emailInvalid: 'صيغة البريد الإلكتروني غير صحيحة',
        consent: 'يرجى الموافقة على التواصل لتأكيد طلبيتك'
      },
      failure: {
        title: 'تعذر إرسال الطلب',
        message: 'حدث خطأ تقني. اطلب مباشرة عبر الواتساب وسيرد عليك فريقنا فوراً.',
        btnWhatsApp: 'اطلب عبر الواتساب',
        btnRetry: 'إعادة المحاولة',
        waMessage: 'مرحباً، أريد طلب {product} — المجموع: {total} — الاسم: {name} — المدينة: {city}'
      },
      success: {
        title: 'شكراً جزيلاً لطلبك ✨',
        refLabel: 'رقم مرجع الطلب :',
        message: 'تم استلام طلبك بنجاح تام.\nسيتواصل معك فريقنا قريباً جداً عبر الهاتف أو الواتساب لتأكيد تفاصيل وموعد التوصيل.',
        chosenProduct: 'المنتج المختار :',
        priceLabel: 'السعر الإجمالي :',
        recipient: 'المستلم :',
        btnNewOrder: 'تقديم طلب جديد',
        btnWhatsApp: 'تواصل مباشر عبر الواتساب',
        waMessage: 'مرحباً، لقد قمت بتأكيد الطلب رقم {ref} لروتين Crystal.'
      }
    },

    // Final CTA Section
    finalCta: {
      badge: 'طقس عناية استثنائي · نتائج احترافية',
      headline1: 'امنحي شعرك',
      headline2: 'الروتين الفاخر الذي يستحقه.',
      leadText: 'أبرزي الجمال الطبيعي لشعرك بفضل التآزر القوي للكيراتين النقي والبروتينات النباتية. ترميم مكثف، لمعان حريري وحماية فائقة طويلة الأمد.',
      benefits: [
        'كيراتين نقي وبروتينات نباتية',
        '0% سلفات، بارابين وأملاح مضافة',
        'لمعان زجاجي ونعومة فائقة',
        'حماية ضد التقصف تدوم 72 ساعة'
      ],
      btnOrder: 'اطلب الروتين الكامل الآن',
      reassurances: [
        'توصيل سريع',
        'الدفع عند الاستلام',
        'الكمية محدودة'
      ],
      packBadgeHighlight: 'الباقة الكاملة 3 في 1',
      packBadgeSub: 'شامبو + ماسك + سيروم',
      serumBadge: 'سيروم 50 مل',
      shampooBadge: 'شامبو 500 مل',
      maskBadge: 'ماسك 500 مل',
      serumAlt: 'سيروم التمليس والترميم كريستال 50 مل',
      shampooAlt: 'شامبو التمليس بالكيراتين والبروتين كريستال 500 مل',
      maskAlt: 'ماسك الترميم المكثف كريستال 500 مل'
    },

    // FAQ Section
    faq: {
      tag: 'الأسئلة الشائعة',
      title: 'إجابات عن أكثر الأسئلة تكراراً',
      subtitle: 'كل ما تودين معرفته حول روتين العناية، الاستخدام وضمانات الجودة.',
      items: [
        {
          question: 'لأي نوع من أنواع الشعر صُممت مجموعة Crystal؟',
          answer: 'صُممت مجموعة Crystal Royal Premium لجميع أنواع الشعر، وتحديداً الشعر الجاف، التالف، المتطاير، المصبوغ أو المجهد بفعل جلسات التمليس وأدوات الحرارة.'
        },
        {
          question: 'هل تحتوي منتجات Crystal على السلفات أو الأملاح الضارة؟',
          answer: 'كلا، جميع منتجات Crystal خالية 100% من السلفات، البارابين، السيليكون الثقيل والأملاح، وذلك للحفاظ على ترطيب الشعر الطبيعي وإطالة نتائج علاجات التمليس.'
        },
        {
          question: 'كم مرة يُنصح باستخدام الماسك المرمم أسبوعياً؟',
          answer: 'نوصي باستخدام الماسك مرة إلى مرتين أسبوعياً بعد غسل الشعر بالشامبو. يُترك على الشعر من 5 إلى 10 دقائق لضمان امتصاص وتغلغل عميق للبروتينات في ألياف الشعر.'
        },
        {
          question: 'كيف تتم عملية التوصيل والدفع؟',
          answer: 'يتم التوصيل إلى باب منزلك خلال 24 إلى 48 ساعة عمل. الدفع يتم نقداً عند الاستلام مباشرة لمندوب التوصيل بعد معاينة وفحص طلبيتك.'
        }
      ]
    },

    // Footer Section
    footer: {
      copyright: '© 2025 Vitasilk Professional. جميع الحقوق محفوظة.',
      colNavTitle: 'التنقل',
      colInfoTitle: 'معلومات',
      colSocialTitle: 'تابعونا',
      signature: 'الجمال بلمسة الطبيعة. 🌿',
      links: {
        home: 'الرئيسية',
        collection: 'المجموعة',
        routine: 'الروتين',
        avis: 'آراء العملاء',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        delivery: 'التوصيل والشحن',
        returns: 'سياسة الإرجاع',
        legal: 'الشروط والأحكام',
        privacy: 'سياسة الخصوصية'
      }
    },

    // Sticky Mobile CTA
    stickyMobile: {
      title: 'مجموعة CRYSTAL®',
      badge: 'الدفع عند الاستلام',
      btn: 'اطلب الآن'
    }
  }
};

export type Translations = (typeof translations)["fr"];
