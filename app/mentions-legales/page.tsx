import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-black transition-colors mb-8">
                        <ArrowLeft size={14} />
                        Retour
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-4">Informations Légales</p>
                    <h1 className="text-4xl font-sans font-light text-gray-900 uppercase tracking-widest">Mentions Légales</h1>
                </div>

                <div className="prose prose-sm max-w-none space-y-10 text-gray-600 font-light leading-relaxed">

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">1. Éditeur du Site</h2>
                        <p>Le présent site <strong className="font-semibold text-gray-800">vitasilk.ma</strong> est édité par la société <strong className="font-semibold text-gray-800">Vitasilk</strong>, spécialisée dans la vente de produits capillaires professionnels.</p>
                        <ul className="space-y-1 pl-4 border-l border-gray-200">
                            <li><span className="font-semibold text-gray-800">Dénomination :</span> Vitasilk</li>
                            <li><span className="font-semibold text-gray-800">Adresse :</span> Meknès, Maroc</li>
                            <li><span className="font-semibold text-gray-800">Téléphone / WhatsApp :</span> +212 662 633 170</li>
                            <li><span className="font-semibold text-gray-800">Email :</span> sales@vitasilk.ma</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">2. Hébergement</h2>
                        <p>Le site est hébergé par <strong className="font-semibold text-gray-800">Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">3. Propriété Intellectuelle</h2>
                        <p>L'ensemble des éléments constituant le site vitasilk.ma (textes, graphismes, logiciels, photographies, images, sons, vidéos, plans, logos, marques…) est la propriété exclusive de Vitasilk ou de ses partenaires.</p>
                        <p>Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, sans l'accord préalable et écrit de Vitasilk, est strictement interdite.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">4. Responsabilité</h2>
                        <p>Vitasilk met tout en œuvre pour offrir aux utilisateurs des informations et/ou outils disponibles et vérifiés. Cependant, Vitasilk ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des informations ou de la présence de virus sur son site.</p>
                        <p>Les informations fournies par Vitasilk le sont à titre indicatif et ne sauraient dispenser l'utilisateur d'une analyse complémentaire et personnalisée.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">5. Droit Applicable</h2>
                        <p>Les présentes mentions légales sont soumises au droit marocain. En cas de litige et à défaut de résolution amiable, les tribunaux marocains seront seuls compétents.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-900">6. Contact</h2>
                        <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
                        <ul className="space-y-1 pl-4 border-l border-gray-200">
                            <li>Par WhatsApp : <a href="https://wa.me/212662633170" className="text-primary hover:underline">+212 662 633 170</a></li>
                            <li>Par email : <a href="mailto:sales@vitasilk.ma" className="text-primary hover:underline">sales@vitasilk.ma</a></li>
                        </ul>
                    </section>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-black text-gray-400">
                    <Link href="/cgv" className="hover:text-black transition-colors">CGV</Link>
                    <Link href="/politique-de-confidentialite" className="hover:text-black transition-colors">Politique de Confidentialité</Link>
                    <Link href="/livraison" className="hover:text-black transition-colors">Livraison & Retours</Link>
                </div>
            </div>
        </div>
    );
}
