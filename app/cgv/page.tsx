import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CGVPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-black transition-colors mb-8">
                        <ArrowLeft size={14} />
                        Retour
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-4">Conditions d'Achat</p>
                    <h1 className="text-4xl font-sans font-light text-gray-900 uppercase tracking-widest">Conditions Générales de Vente</h1>
                </div>

                <div className="space-y-10 text-gray-600 font-light leading-relaxed text-sm">

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">1. Objet et Champ d'Application</h2>
                        <p>Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes réalisées par <strong className="font-semibold text-gray-800">Vitasilk</strong> via le site vitasilk.ma. Tout achat effectué sur notre boutique implique l'acceptation pleine et entière des présentes CGV.</p>
                        <p>Vitasilk se réserve le droit de modifier ses CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">2. Produits</h2>
                        <p>Nos produits sont des soins capillaires professionnels (lissages, traitements, coffrets, matériel) destinés à un usage professionnel et particulier. Toutes les caractéristiques essentielles des produits sont indiquées sur les fiches produit.</p>
                        <p>Les photographies et visuels présentés sont aussi fidèles que possible au produit réel. Des variations mineures de teinte peuvent exister dues à la reproduction photographique.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">3. Prix</h2>
                        <p>Les prix sont indiqués en <strong className="font-semibold text-gray-800">Dirhams Marocains (MAD)</strong>, toutes taxes comprises. Vitasilk se réserve le droit de modifier ses prix à tout moment, sans préavis. Les produits vous seront facturés sur la base des tarifs en vigueur au moment de la validation de votre commande.</p>
                        <p>Les frais de livraison sont indiqués séparément lors du récapitulatif de commande.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">4. Commandes</h2>
                        <p>La passation d'une commande sur vitasilk.ma s'effectue en plusieurs étapes :</p>
                        <ol className="space-y-2 pl-4 border-l border-gray-200 list-none">
                            <li><span className="font-semibold text-gray-800">1.</span> Sélection des produits et ajout au panier</li>
                            <li><span className="font-semibold text-gray-800">2.</span> Validation du panier</li>
                            <li><span className="font-semibold text-gray-800">3.</span> Saisie des coordonnées de livraison</li>
                            <li><span className="font-semibold text-gray-800">4.</span> Confirmation et validation de la commande</li>
                        </ol>
                        <p>Une confirmation de commande vous sera envoyée par email/WhatsApp après validation. Vitasilk se réserve le droit d'annuler toute commande frauduleuse ou en cas de rupture de stock.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">5. Paiement</h2>
                        <p>Le paiement s'effectue à la livraison (<strong className="font-semibold text-gray-800">paiement à la livraison — Cash on Delivery</strong>). Le montant total est à régler en espèces au livreur lors de la réception de votre colis.</p>
                        <p>Vitasilk n'est pas responsable des délais supplémentaires liés au refus de paiement ou à l'absence du destinataire.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">6. Livraison</h2>
                        <p>Vitasilk livre dans <strong className="font-semibold text-gray-800">tout le Maroc</strong> via des transporteurs partenaires. Les délais de livraison sont estimatifs :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Meknès et région :</span> 24 à 48 heures ouvrées</li>
                            <li><span className="font-semibold text-gray-800">Grandes villes (Casablanca, Rabat, Fès, Marrakech…) :</span> 24 à 48 heures ouvrées</li>
                            <li><span className="font-semibold text-gray-800">Autres régions :</span> 48 à 72 heures ouvrées</li>
                            <li><span className="font-semibold text-gray-800">Zones éloignées :</span> 3 à 5 jours ouvrés</li>
                        </ul>
                        <p>Ces délais sont donnés à titre indicatif et peuvent varier en période de forte demande ou lors de jours fériés. Vitasilk ne saurait être tenu responsable des retards imputables au transporteur.</p>
                        <p>Vous pouvez suivre votre commande via la page <Link href="/track-order" className="text-primary hover:underline">Suivi de commande</Link> ou en nous contactant sur WhatsApp au <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a>.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">7. Frais de Livraison</h2>
                        <p>Les frais de livraison varient selon la destination et sont calculés automatiquement lors de la commande. Toute commande peut bénéficier de la <strong className="font-semibold text-gray-800">livraison gratuite</strong> à partir d'un certain montant indiqué sur le site.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">8. Réception et Vérification</h2>
                        <p>À la réception de votre commande, nous vous invitons à vérifier l'état du colis et des produits en présence du livreur. En cas d'anomalie (colis endommagé, produit manquant ou défectueux), veuillez :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li>Refuser le colis ou émettre des réserves écrites sur le bon de livraison</li>
                            <li>Nous contacter immédiatement via WhatsApp au <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a></li>
                            <li>Nous envoyer des photos du colis et du produit concerné</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">9. Retours et Échanges</h2>
                        <p>Pour des raisons d'hygiène et de sécurité, les produits capillaires ne peuvent être retournés ou échangés une fois ouverts ou utilisés, sauf en cas de défaut avéré ou d'erreur de notre part.</p>
                        <p>Tout retour doit être signalé dans les <strong className="font-semibold text-gray-800">48 heures</strong> suivant la réception, en nous contactant via :</p>
                        <ul className="space-y-1 pl-4 border-l border-gray-200">
                            <li>WhatsApp : <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a></li>
                            <li>Email : <a href="mailto:contact@vitasilkbs.ma" className="text-primary hover:underline">contact@vitasilkbs.ma</a></li>
                        </ul>
                        <p>Les frais de retour sont à la charge du client sauf en cas d'erreur de notre part ou de produit défectueux.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">10. Remboursements</h2>
                        <p>En cas de retour accepté, le remboursement sera effectué dans un délai de <strong className="font-semibold text-gray-800">5 à 7 jours ouvrés</strong> par le même moyen de paiement utilisé lors de la commande, ou par virement sur présentation d'un RIB.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">11. Disponibilité des Produits</h2>
                        <p>Nos offres de produits et tarifs sont valables tant qu'ils sont visibles sur le site. En cas d'indisponibilité exceptionnelle d'un produit après votre commande, nous vous en informerons dans les plus brefs délais et vous proposerons soit un produit de remplacement équivalent, soit l'annulation et le remboursement intégral de votre commande.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">12. Service Client</h2>
                        <p>Notre équipe est disponible pour répondre à toutes vos questions :</p>
                        <ul className="space-y-1 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">WhatsApp :</span> <a href="https://wa.me/212661086837" className="text-primary hover:underline">+212 661 086 837</a></li>
                            <li><span className="font-semibold text-gray-800">Email :</span> <a href="mailto:contact@vitasilkbs.ma" className="text-primary hover:underline">contact@vitasilkbs.ma</a></li>
                            <li><span className="font-semibold text-gray-800">Adresse :</span> Meknès, Maroc</li>
                        </ul>
                        <p className="text-xs text-gray-400">Du lundi au samedi, de 9h à 18h (heure du Maroc)</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">13. Litiges</h2>
                        <p>En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux marocains compétents seront saisis, conformément à la législation marocaine en vigueur.</p>
                    </section>

                    <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">Dernière mise à jour : Avril 2025</p>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-black text-gray-400">
                    <Link href="/mentions-legales" className="hover:text-black transition-colors">Mentions Légales</Link>
                    <Link href="/politique-de-confidentialite" className="hover:text-black transition-colors">Politique de Confidentialité</Link>
                    <Link href="/livraison" className="hover:text-black transition-colors">Livraison & Retours</Link>
                </div>
            </div>
        </div>
    );
}
