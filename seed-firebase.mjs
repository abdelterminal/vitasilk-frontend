// seed-firebase.mjs
// Run with: node seed-firebase.mjs
// This uses the Firebase Client SDK to seed products directly into Firestore.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, writeBatch, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8gXB0K2nSgCa7iAW_ppxz3s2psUc5dVk",
    authDomain: "vitasilk.firebaseapp.com",
    databaseURL: "https://vitasilk-default-rtdb.firebaseio.com",
    projectId: "vitasilk",
    storageBucket: "vitasilk.firebasestorage.app",
    messagingSenderId: "922809563652",
    appId: "1:922809563652:web:f9b26322d64e203b0cd351",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PRODUCTS = [
    // LISSAGE PRO
    {
        name: "COCONUT SMOOTH 1L – BRAZILIAN PROTEIN",
        description: "Découvrez VITASILK CocoNut, une protéine brésilienne professionnelle enrichie en huile de coco, kératine, collagène hydrolysé et acides aminés. Sa formule innovante transforme vos cheveux en profondeur pour un lissage naturel et une brillance éclatante.",
        price: 580, category: "Lissage Pro", stock: 25, featured: true,
        images: ["/img/lissage pro/coconut1.png", "/img/lissage pro/coconut2.png", "/img/lissage pro/COCO-NUT-SMOOTH-250ML-show.png"],
    },
    {
        name: "24K GOLD 1L – BRAZILIAN PROTEIN GOLD",
        description: "La protéine brésilienne Vitasilk 24K Gold développée avec un complexe défroissant innovant. Grâce à ses protéines de faible poids moléculaire et acides aminés, elle répare, reconstruit et protège les cheveux. Brillance intense et douceur remarquable.",
        price: 650, category: "Lissage Pro", stock: 20, featured: true,
        images: ["/img/lissage pro/24k1.png", "/img/lissage pro/24k2.png", "/img/lissage pro/VitaSilk-24K-Gold-250ml-1.png"],
    },
    {
        name: "BLUE-SILK 1L – BRAZILIAN PROTEIN",
        description: "Blue Silk est un traitement capillaire professionnel de haute qualité conçu pour transformer vos cheveux en soie véritable. Sa formule exclusive combine des ingrédients nutritifs et lissants pour offrir des résultats salon exceptionnels.",
        price: 600, category: "Lissage Pro", stock: 18, featured: false,
        images: ["/img/lissage pro/BlueSilk-1l.png", "/img/lissage pro/BlueSilk-1L-show.png", "/img/lissage pro/BlueSilk-Modele-shooting-e1762520646963.png"],
    },
    {
        name: "FILLER GLOW 1L PROTEIN + SHAMPOO",
        description: "Traitement brésilien Filler Glow avec shampoo offert. Formule professionnelle complète qui nourrit, lisse et fait briller les cheveux. Un duo parfait pour un résultat salon à domicile.",
        price: 720, category: "Lissage Pro", stock: 15, featured: true,
        images: ["/img/lissage pro/VitaSilk-Filter-Glow-1L.jpg", "/img/lissage pro/FILLER-GLOW-1L-PROTEIN-SHAMPO-–-Brazilian-Keratin-Protein-shooting-800x1005-1.png"],
    },
    {
        name: "BOTOX CAPILLAIRE 1L",
        description: "Botox Capillaire est un produit antioxydant révolutionnaire développé avec du Panthénol et de la Kératine. Laisse vos cheveux brillants et sans frisottis. Reconstruit la fibre capillaire en restaurant l'intensité, la brillance et l'hydratation.",
        price: 490, category: "Lissage Pro", stock: 22, featured: false,
        images: ["/img/lissage pro/VitaSilk-Botox-Capillaire.png", "/img/lissage pro/VitaSilk-Botox-Capillaire-1000ml-shoot.png", "/img/lissage pro/VitaSilk-Botox-Capillaire-back.png"],
    },
    {
        name: "COFFEE EXTRACT 1L – BRAZILIAN PROTEIN",
        description: "Protéine brésilienne à l'extrait de café, enrichie en caféine et en kératine pour un lissage intense et une brillance naturelle. Idéale pour les cheveux difficiles à discipliner.",
        price: 560, category: "Lissage Pro", stock: 17, featured: false,
        images: ["/img/lissage pro/Coffee-exctract-1l.png", "/img/lissage pro/COFFEE-EXTRACT-1L-show.png", "/img/lissage pro/coffee-exctract-proteine-modele.png"],
    },
    {
        name: "24K GOLD 250ML – BRAZILIAN PROTEIN GOLD",
        description: "La version 250ml de notre protéine brésilienne 24K Gold. Idéale pour un usage personnel ou pour tester notre formule d'exception. Même qualité professionnelle en format compact.",
        price: 250, category: "Lissage Pro", stock: 30, featured: false,
        images: ["/img/lissage pro/24k-Gold-250ml-show.png", "/img/lissage pro/VitaSilk-24K-Gold-250ml-1.png"],
    },
    {
        name: "BLUE-SILK 250ML – BRAZILIAN PROTEIN",
        description: "La version 250ml de notre traitement Blue Silk. Parfaite pour les premiers essais ou pour les voyages. Effet soie garanti en format réduit.",
        price: 220, category: "Lissage Pro", stock: 28, featured: false,
        images: ["/img/lissage pro/BLUE-SILK-250ML.png", "/img/lissage pro/BLUE-SILK-250ML-show-1.png"],
    },
    {
        name: "COCONUT SMOOTH 250ML – BRAZILIAN PROTEIN",
        description: "La version 250ml du populaire Coconut Smooth. Toute la richesse de l'huile de coco et de la kératine dans un format pratique pour un usage quotidien personnel.",
        price: 200, category: "Lissage Pro", stock: 35, featured: false,
        images: ["/img/lissage pro/COCO-NUT-SMOOTH-250ML.png", "/img/lissage pro/COCO-NUT-SMOOTH-250ML-show.png"],
    },
    {
        name: "COFFEE EXTRACT 250ML – BRAZILIAN PROTEIN",
        description: "Format 250ml de la protéine à l'extrait de café. Pour des sessions lissantes personnelles avec tous les bienfaits de la caféine et de la kératine.",
        price: 210, category: "Lissage Pro", stock: 25, featured: false,
        images: ["/img/lissage pro/Coffee-extract-250ML.png", "/img/lissage pro/Coffee-extract-250ML-Show.png"],
    },
    {
        name: "FILLER GLOW 250ML PROTEIN + SHAMPOO",
        description: "Version 250ml du Filler Glow incluant un shampoo. Format parfait pour les utilisatrices personnelles souhaitant un lissage professionnel à la maison.",
        price: 280, category: "Lissage Pro", stock: 20, featured: false,
        images: ["/img/lissage pro/Brazilian-Keratin-Protein.png", "/img/lissage pro/thumb-products-x2-250ml-600x803-1.png"],
    },

    // SOINS DE CHEVEUX
    {
        name: "MASQUE CAPILLAIRE ORGANIC PROTEIN 500ML",
        description: "Masque capillaire enrichi en protéines organiques pour une nutrition intense. Répare, hydrate et renforce les cheveux fragilisés. Lisse et adoucit la fibre capillaire pour un résultat visible dès la première application.",
        price: 185, category: "Soins de Cheveux", stock: 40, featured: false,
        images: ["/img/soins de cheveux/VitaSilk-organic-protein-hair-mask.png", "/img/soins de cheveux/VitaSilk-organic-protein-hair-mask-back.png", "/img/soins de cheveux/Organic-Protein-masque-capillaire-modele.png"],
    },
    {
        name: "SPRAY 24K ROSE GOLD TANINO",
        description: "Spray capillaire tanino 24K Rose Gold pour une brillance dorée et une protection thermique. Discipline les frisottis et facilite le coiffage pour des cheveux soyeux et lumineux.",
        price: 145, category: "Soins de Cheveux", stock: 35, featured: true,
        images: ["/img/soins de cheveux/VitaSilk-24k-rose-gold-Spray.png", "/img/soins de cheveux/VitaSilk-24k-rose-gold-Spray-show.png"],
    },
    {
        name: "SERUM 24K ROSE GOLD 80ML",
        description: "Sérum capillaire luxueux à l'or rose 24K pour une brillance et une douceur incomparables. Protège contre la chaleur et les agressions extérieures. Idéal comme soin de finition pour des cheveux éclatants.",
        price: 165, category: "Soins de Cheveux", stock: 30, featured: true,
        images: ["/img/soins de cheveux/VitaSilk-24k-rose-gold-hair-serum-2.png", "/img/soins de cheveux/VitaSilk-24k-rose-gold-hair-serum-back.png", "/img/soins de cheveux/VitaSilk-24k-rose-gold-hair-serum-Shooting.png"],
    },
    {
        name: "SHAMPOO VEGANO 24K ROSE GOLD 300ML",
        description: "Shampoing végan à l'or rose 24K pour des cheveux lumineux et doux. Formule sans sulfate ni silicone pour un nettoyage en douceur tout en préservant la brillance naturelle.",
        price: 120, category: "Soins de Cheveux", stock: 45, featured: false,
        images: ["/img/soins de cheveux/VitaSilk-organic-shampoo-protein-24K-high-gloss.png", "/img/soins de cheveux/VitaSilk-shampoo-organic-protein-24K-high-gloss-back.jpg", "/img/soins de cheveux/VitaSilk-24K-Rose-Gold-Hight-Gloss-tanino-protein-vegano-shooting.png"],
    },
    {
        name: "DÉMÊLEUR 24K ROSE GOLD 300ML",
        description: "Après-shampoing démêlant à l'or rose 24K. Facilite le démêlage, nourrit et apporte brillance et souplesse aux cheveux. Formule végane sans sulfate.",
        price: 115, category: "Soins de Cheveux", stock: 38, featured: false,
        images: ["/img/soins de cheveux/VitaSilk-24K-Rose-Gold-Hight-Gloss-tanino-protein-vegano-2.png", "/img/soins de cheveux/VitaSilk-24K-Rose-Gold-Hight-Gloss-tanino-protein-vegano-back2.png"],
    },
    {
        name: "SHAMPOO ORGANIC PROTEIN 500ML",
        description: "Shampoing à protéines organiques 500ml pour un nettoyage profond et une nutrition intense. Sans sulfate ni silicone, idéal avant les traitements brésiliens ou en usage quotidien.",
        price: 130, category: "Soins de Cheveux", stock: 42, featured: false,
        images: ["/img/soins de cheveux/VitaSilk-organic-protein-Shampoing.png", "/img/soins de cheveux/Organic-Protein-Shampoo-500ml.png", "/img/soins de cheveux/VitaSilk-organic-protein-Shampoing-modele.png"],
    },

    // MATÉRIEL
    {
        name: "SÉCHOIR VITASILK 2600W PREMIUM GRIS",
        description: "Sèche-cheveux professionnel Vitasilk 2600W. Moteur haute vitesse pour un séchage rapide. Design ergonomique et léger avec finition mate et accents dorés. Inclut 2 embouts concentrateurs pour un coiffage précis.",
        price: 750, category: "Matériel", stock: 15, featured: true,
        images: ["/img/materiel/VitaSilk-Bazaar-sechoir-2600-watts.png", "/img/materiel/VitaSilk-Bazaar-sechoir-2600-watts-2.jpg", "/img/materiel/VitaSilk-Bazaar-sechoir-2600-watts-3.jpg"],
    },
    {
        name: "BROSSE VITASILK SOUFFLANTE 1500W",
        description: "Brosse soufflante professionnelle Vitasilk 1500W pour un brushing parfait à domicile. Combine la chaleur et le volume pour des résultats salon. Design ergonomique pour une prise en main optimale.",
        price: 550, category: "Matériel", stock: 12, featured: false,
        images: ["/img/materiel/VITASILK-BROSSE-plaque-gris.png", "/img/materiel/VitaSilk-Bazaar-dry-curl-styling.png"],
    },
    {
        name: "PLAQUE VITASILK SUPER GOLD PLUS",
        description: "Lisseur professionnel Vitasilk Super Gold Plus. Plaques flottantes pour s'adapter à tous les types de cheveux. Température jusqu'à 485°F pour un lissage parfait en une seule passe.",
        price: 680, category: "Matériel", stock: 10, featured: true,
        images: ["/img/materiel/VitaSilk-plaque-smooth-Super-485F.png", "/img/materiel/VitaSilk-plaque-smooth-Super-485F.jpg", "/img/materiel/Vitasilk-Bazaar-plaque-super.jpg"],
    },
    {
        name: "PLAQUE VITASILK 480°F GRIS",
        description: "Lisseur professionnel Vitasilk 480°F en coloris gris élégant. Température haute performance pour maîtriser même les cheveux les plus rebelles. Plaques céramiques pour une chaleur uniforme.",
        price: 580, category: "Matériel", stock: 14, featured: false,
        images: ["/img/materiel/PLAQUE-NORMAL-Vitasilk.png", "/img/materiel/Vitasilk-Bazaar-plaque-250c.jpg", "/img/materiel/VitaSilk-Bazaar-plaque-3.jpg"],
    },
    {
        name: "PLAQUE VITASILK SUPER GOLD",
        description: "Lisseur Vitasilk Super Gold, l'allié parfait pour un lissage brésilien maison. Compatible avec tous les produits Vitasilk. Plaques larges pour couvrir plus de cheveux en moins de temps.",
        price: 490, category: "Matériel", stock: 20, featured: false,
        images: ["/img/materiel/VitaSilk-Bazaar-plaque.jpg", "/img/materiel/Vitasilk-Bazaar-plaque.jpg", "/img/materiel/VitaSilk-plaque.jpg"],
    },

    // NOS PACKS
    {
        name: "KIT SILK EXPRESS PACK",
        description: "Kit complet pour un lissage brésilien express professionnel à domicile. Inclut tout le nécessaire pour transformer vos cheveux en soie : protéine, shampoing et soin. La puissance et le soin pour un volume maîtrisé.",
        price: 890, category: "Nos Packs", stock: 10, featured: true,
        images: ["/img/nos packs/Pack-Kit-Silk-Express-800x800.png"],
    },
    {
        name: "DUO LISSAGE ET PROTECTION PACK",
        description: "Le duo parfait alliant lissage intense et protection capillaire. Ce pack contient un traitement brésilien et un soin protecteur pour des cheveux lisses et protégés durablement.",
        price: 950, category: "Nos Packs", stock: 8, featured: false,
        images: ["/img/nos packs/Pack-Duo-Lissage-et-Protection.png"],
    },
    {
        name: "COFFRET BRUSHING PROFESSIONNEL PACK",
        description: "Coffret complet pour un brushing professionnel à domicile. Inclut une brosse soufflante et des soins adaptés pour un résultat digne d'un salon de coiffure.",
        price: 1100, category: "Nos Packs", stock: 7, featured: true,
        images: ["/img/nos packs/Pack-Coffret-Brushing-Professionnel.png"],
    },
    {
        name: "RITUEL ÉCLAT QUOTIDIEN PACK",
        description: "Le rituel complet pour des cheveux éclatants au quotidien. Shampoing, masque et sérum réunis dans un coffret luxueux pour entretenir la beauté et la brillance de vos cheveux tous les jours.",
        price: 750, category: "Nos Packs", stock: 12, featured: false,
        images: ["/img/nos packs/Pack-Rituel-Eclat-Quotidien.png"],
    },
    {
        name: "CURE NUTRITION INTENSE PACK",
        description: "Pack de cure nutrition intense pour les cheveux abîmés et secs. Une cure complète qui répare, nourrit et reconstruit la fibre capillaire pour des cheveux transformés en quelques semaines.",
        price: 820, category: "Nos Packs", stock: 9, featured: false,
        images: ["/img/nos packs/Pack-Cure-Nutrition-Intense.png"],
    },
    {
        name: "EXPÉRIENCE ROYALE 24K PACK",
        description: "Le coffret ultime à l'or 24K pour une expérience capillaire royale. Ce pack premium rassemble nos meilleurs soins dorés pour des cheveux d'une beauté et d'une brillance incomparables.",
        price: 1350, category: "Nos Packs", stock: 5, featured: true,
        images: ["/img/nos packs/Pack-Experience-Royale-24K.png"],
    },
];

async function seed() {
    console.log("🔄 Checking existing products...");
    try {
        const existingSnap = await getDocs(collection(db, "products"));
        if (existingSnap.size > 0) {
            console.log(`⚠️  Found ${existingSnap.size} existing products. Deleting...`);
            // Delete in batches of 500
            const chunks = [];
            for (let i = 0; i < existingSnap.docs.length; i += 499) {
                chunks.push(existingSnap.docs.slice(i, i + 499));
            }
            for (const chunk of chunks) {
                const batch = writeBatch(db);
                chunk.forEach(d => batch.delete(d.ref));
                await batch.commit();
            }
            console.log("✅ Deleted all existing products.");
        }

        console.log(`\n🚀 Seeding ${PRODUCTS.length} products...\n`);
        for (let i = 0; i < PRODUCTS.length; i++) {
            const product = PRODUCTS[i];
            await addDoc(collection(db, "products"), {
                ...product,
                createdAt: new Date(),
            });
            console.log(`  ✅ (${i + 1}/${PRODUCTS.length}) ${product.name}`);
        }

        console.log("\n🎉 All products seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}

seed();
