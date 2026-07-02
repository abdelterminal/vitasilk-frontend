import Link from 'next/link';
import { ArrowLeft, Truck, RotateCcw, MapPin, Clock, Shield, Phone } from 'lucide-react';

export default function LivraisonPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-black transition-colors mb-8">
                        <ArrowLeft size={14} />
                        Retour
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-4">Expédition</p>
                    <h1 className="text-4xl font-sans font-light text-gray-900 uppercase tracking-widest">Livraison & Retours</h1>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                    {[
                        { icon: Truck, title: 'Livraison Nationale', desc: 'Partout au Maroc' },
                        { icon: Clock, title: '24 – 72h', desc: 'Délai estimé' },
                        { icon: Shield, title: 'Paiement à la livraison', desc: 'Cash on delivery' },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm space-y-3">
                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center mx-auto">
                                <Icon size={18} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-black text-gray-900">{title}</p>
                                <p className="text-xs text-gray-400 mt-1">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-10 text-gray-600 font-light leading-relaxed text-sm">

                    <section className="space-y-4">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900 flex items-center gap-3">
                            <Truck size={16} className="text-primary" />
                            Délais de Livraison
                        </h2>
                        <p>Vitasilk expédie vers toutes les villes et régions du Maroc via des transporteurs partenaires fiables. Les commandes sont traitées et expédiées le jour ouvré suivant la validation.</p>
                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-black uppercase tracking-widest text-gray-900 text-[10px]">Destination</th>
                                        <th className="text-left p-4 font-black uppercase tracking-widest text-gray-900 text-[10px]">Délai estimé</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr>
                                        <td className="p-4 font-semibold text-gray-800">Casablanca et région</td>
                                        <td className="p-4 text-gray-500">24 à 48 heures ouvrées</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="p-4 font-semibold text-gray-800">Casablanca, Rabat, Fès, Marrakech, Tanger</td>
                                        <td className="p-4 text-gray-500">24 à 48 heures ouvrées</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold text-gray-800">Autres villes du Maroc</td>
                                        <td className="p-4 text-gray-500">48 à 72 heures ouvrées</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="p-4 font-semibold text-gray-800">Zones éloignées et rurales</td>
                                        <td className="p-4 text-gray-500">3 à 5 jours ouvrés</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 italic">Ces délais sont donnés à titre indicatif. Ils peuvent varier lors de jours fériés, de périodes de forte demande (Ramadan, fêtes nationales) ou en cas de conditions météorologiques exceptionnelles.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900 flex items-center gap-3">
                            <MapPin size={16} className="text-primary" />
                            Frais de Livraison
                        </h2>
                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-black uppercase tracking-widest text-gray-900 text-[10px]">Montant de commande</th>
                                        <th className="text-left p-4 font-black uppercase tracking-widest text-gray-900 text-[10px]">Frais</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr>
                                        <td className="p-4 font-semibold text-gray-800">Toute commande</td>
                                        <td className="p-4 text-gray-500">Calculés automatiquement selon la destination</td>
                                    </tr>
                                    <tr className="bg-primary/5">
                                        <td className="p-4 font-black text-gray-900">Commande éligible à la livraison gratuite</td>
                                        <td className="p-4 font-black text-primary">GRATUIT</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400">Le montant exact des frais de livraison est affiché lors du récapitulatif de votre commande, avant validation.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900 flex items-center gap-3">
                            <Shield size={16} className="text-primary" />
                            Paiement à la Livraison
                        </h2>
                        <p>Vitasilk propose le <strong className="font-semibold text-gray-800">paiement à la livraison (Cash on Delivery)</strong> sur l'ensemble du territoire marocain. Le règlement s'effectue en espèces directement au livreur lors de la réception de votre colis.</p>
                        <p>Aucune information bancaire ne vous est demandée sur notre site.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">Suivi de Commande</h2>
                        <p>Un numéro de suivi vous sera communiqué par WhatsApp dès l'expédition de votre colis. Vous pouvez également suivre votre commande directement sur notre site :</p>
                        <Link href="/track-order" className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-black transition-colors">
                            Suivre ma commande
                        </Link>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900 flex items-center gap-3">
                            <RotateCcw size={16} className="text-primary" />
                            Politique de Retours
                        </h2>
                        <p>Pour des raisons d'hygiène et de sécurité propres aux produits capillaires, <strong className="font-semibold text-gray-800">aucun retour n'est accepté</strong> sur les produits ouverts ou utilisés.</p>
                        <p>Des exceptions sont accordées dans les cas suivants :</p>
                        <ul className="space-y-2 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Produit défectueux ou endommagé :</span> signalement sous 48h après réception avec photos à l'appui</li>
                            <li><span className="font-semibold text-gray-800">Erreur de notre part :</span> produit différent de la commande</li>
                            <li><span className="font-semibold text-gray-800">Produit non conforme :</span> différence majeure avec la description</li>
                        </ul>
                        <p>Pour initier un retour, contactez-nous dans les <strong className="font-semibold text-gray-800">48 heures</strong> suivant la réception.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">Remboursements</h2>
                        <p>Tout retour accepté donne lieu à un remboursement intégral dans un délai de <strong className="font-semibold text-gray-800">5 à 7 jours ouvrés</strong>.</p>
                    </section>

                    <section className="bg-gray-900 rounded-2xl p-8 space-y-4">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-white flex items-center gap-3">
                            <Phone size={16} className="text-primary" />
                            Besoin d'Aide ?
                        </h2>
                        <p className="text-gray-400 text-sm">Notre équipe est disponible 7j/7 pour toute question relative à votre livraison ou commande. Service après-vente inclus.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="https://wa.me/212661086837" target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#25D366] text-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:opacity-90 transition-opacity">
                                WhatsApp : +212 661 086 837
                            </a>
                            <a href="mailto:contact@vitasilkbs.ma"
                               className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/10 text-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-white/20 transition-colors">
                                contact@vitasilkbs.ma
                            </a>
                        </div>
                    </section>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-black text-gray-400">
                    <Link href="/mentions-legales" className="hover:text-black transition-colors">Mentions Légales</Link>
                    <Link href="/politique-de-confidentialite" className="hover:text-black transition-colors">Politique de Confidentialité</Link>
                    <Link href="/cgv" className="hover:text-black transition-colors">CGV</Link>
                </div>
            </div>
        </div>
    );
}
