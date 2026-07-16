"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Sofia M.",
    role: "Cliente Vérifiée",
    text: "J'utilisais des produits de salon mais depuis que j'ai essayé le Blue Silk, je lisse mes cheveux chez moi toute seule. Résultat super lisse et brillant qui dure vraiment. Je recommande à toutes mes amies !",
    product: "Blue Silk 1L",
    rating: 5,
  },
  {
    id: 2,
    name: "Amina R.",
    role: "Coiffeuse Professionnelle",
    text: "J'utilise la gamme 24K Gold dans mon salon depuis plusieurs mois. Pas de fumée, pas d'odeur forte, et le résultat est vraiment professionnel. Mes clientes reviennent exprès pour ce traitement.",
    product: "Collection 24K Gold",
    rating: 5,
  },
  {
    id: 3,
    name: "Lina T.",
    role: "Cliente Vérifiée",
    text: "Le masque Organic Protein a réparé mes cheveux abîmés par la décoloration. Dès la première application j'ai senti la différence — cheveux plus doux, moins cassants. Je l'utilise chaque semaine.",
    product: "Masque Organic Protein",
    rating: 5,
  }
];

const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[#FAF9F5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] uppercase font-bold text-primary mb-3">Avis Clients</p>
          <h2 className="text-3xl lg:text-5xl font-sans font-light text-gray-900 leading-tight mb-6">
            Elles ont essayé. <span className="text-primary">Elles recommandent.</span>
          </h2>
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">4.9/5</span>
            <span className="text-xs text-gray-400">&middot; Avis v&eacute;rifi&eacute;s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <Quote className="absolute -top-2 -right-2 text-primary/10" size={80} strokeWidth={1} />

              <div className="flex gap-1 text-amber-400 mb-5 relative z-10">
                {[...Array(review.rating)].map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 font-light leading-relaxed mb-8 relative z-10 min-h-[120px]">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 ring-4 ring-primary/10">
                  {initials(review.name)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide">{review.name}</h4>
                  <p className="text-[10px] text-primary uppercase font-bold">{review.role}</p>
                  <p className="text-[10px] text-gray-400">{review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
