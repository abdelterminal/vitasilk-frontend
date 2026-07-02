import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-black transition-colors mb-8">
                        <ArrowLeft size={14} />
                        Retour
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-4">Vos Données</p>
                    <h1 className="text-4xl font-sans font-light text-gray-900 uppercase tracking-widest">Politique de Confidentialité</h1>
                </div>

                <div className="space-y-10 text-gray-600 font-light leading-relaxed text-sm">

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">1. Responsable du Traitement</h2>
                        <p>Vitasilk, dont le siège social est situé à <strong className="font-semibold text-gray-800">Meknès, Maroc</strong>, est responsable du traitement de vos données personnelles collectées via le site vitasilk.ma.</p>
                        <p>Contact : <a href="mailto:contact@vitasilkbs.ma" className="text-primary hover:underline">contact@vitasilkbs.ma</a> — WhatsApp : <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a></p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">2. Données Collectées</h2>
                        <p>Lors de votre navigation et de vos achats sur vitasilk.ma, nous sommes susceptibles de collecter les données suivantes :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Données d'identité :</span> nom, prénom</li>
                            <li><span className="font-semibold text-gray-800">Coordonnées :</span> adresse de livraison, numéro de téléphone, adresse email</li>
                            <li><span className="font-semibold text-gray-800">Données de commande :</span> historique d'achats, produits commandés, montants</li>
                            <li><span className="font-semibold text-gray-800">Données de connexion :</span> adresse IP, navigateur utilisé, pages visitées</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">3. Finalités du Traitement</h2>
                        <p>Vos données sont utilisées pour :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li>Traiter et livrer vos commandes</li>
                            <li>Gérer votre compte client</li>
                            <li>Vous envoyer des confirmations de commande et mises à jour de livraison</li>
                            <li>Vous informer des offres et promotions (avec votre consentement)</li>
                            <li>Améliorer notre service et l'expérience utilisateur</li>
                            <li>Respecter nos obligations légales et comptables</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">4. Conservation des Données</h2>
                        <p>Vos données personnelles sont conservées pendant la durée nécessaire à l'exécution du contrat et au respect de nos obligations légales :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Données de compte :</span> jusqu'à la suppression du compte ou 3 ans d'inactivité</li>
                            <li><span className="font-semibold text-gray-800">Données de commande :</span> 5 ans à des fins comptables et fiscales</li>
                            <li><span className="font-semibold text-gray-800">Données de connexion :</span> 12 mois maximum</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">5. Partage des Données</h2>
                        <p>Vitasilk ne vend, ne loue et ne cède jamais vos données personnelles à des tiers à des fins commerciales. Vos données peuvent être partagées uniquement avec :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li>Nos prestataires de livraison (uniquement nom, adresse et téléphone nécessaires à la livraison)</li>
                            <li>Nos prestataires techniques (hébergement, maintenance)</li>
                            <li>Les autorités compétentes si la loi l'exige</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">6. Sécurité</h2>
                        <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération. Vos mots de passe sont chiffrés et jamais stockés en clair.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">7. Vos Droits</h2>
                        <p>Conformément à la loi marocaine 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez des droits suivants :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Droit d'accès :</span> obtenir une copie de vos données</li>
                            <li><span className="font-semibold text-gray-800">Droit de rectification :</span> corriger des données inexactes</li>
                            <li><span className="font-semibold text-gray-800">Droit de suppression :</span> demander l'effacement de vos données</li>
                            <li><span className="font-semibold text-gray-800">Droit d'opposition :</span> vous opposer à certains traitements</li>
                        </ul>
                        <p>Pour exercer ces droits, contactez-nous par email à <a href="mailto:contact@vitasilkbs.ma" className="text-primary hover:underline">contact@vitasilkbs.ma</a> ou via WhatsApp au <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a>.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">8. Cookies</h2>
                        <p>Notre site utilise des cookies techniques strictement nécessaires au bon fonctionnement du site (session, panier, préférences). Aucun cookie publicitaire tiers n'est utilisé sans votre consentement préalable.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">9. Modifications</h2>
                        <p>Vitasilk se réserve le droit de modifier la présente politique à tout moment. Toute modification sera publiée sur cette page avec la date de mise à jour.</p>
                        <p className="text-gray-400 text-xs">Dernière mise à jour : Avril 2025</p>
                    </section>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-black text-gray-400">
                    <Link href="/mentions-legales" className="hover:text-black transition-colors">Mentions Légales</Link>
                    <Link href="/cgv" className="hover:text-black transition-colors">CGV</Link>
                    <Link href="/livraison" className="hover:text-black transition-colors">Livraison & Retours</Link>
                </div>
            </div>
        </div>
    );
}
