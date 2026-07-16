"use client";

import React, { useState, useEffect } from 'react';
import { productsApi, categoriesApi, imageUrl, type Category } from '@/lib/api';
import { Save, Eye, EyeOff, Search, X, Check, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

export type HomepageSlot = 'after-hero' | 'after-quote' | 'after-marquee' | 'after-benefits' | 'after-showcase' | 'after-testimonials';

export const SLOT_LABELS: Record<HomepageSlot, string> = {
  'after-hero': 'Après le héros',
  'after-quote': 'Après la bande de slogans',
  'after-marquee': "Après la bande d'ingrédients (défaut)",
  'after-benefits': 'Après les bénéfices',
  'after-showcase': 'Après la vitrine de marque',
  'after-testimonials': 'Après les témoignages',
};

export interface HomepageSection {
  id: string;
  title: string;
  subtitle: string;
  visible: boolean;
  layout: 'featured' | 'carousel' | 'grid' | 'imageGrid';
  mode: 'category' | 'manual';
  categorySlug: string;
  productIds: number[];
  count: number;
  slot: HomepageSlot;
  gridSize?: 'sm' | 'md' | 'lg';
}

interface HomepageConfig {
  sections: HomepageSection[];
}

const DEFAULT_CONFIG: HomepageConfig = {
  sections: [
    { id: 's1', title: 'Soins Capillaires', subtitle: 'Botox & Filler', visible: true, layout: 'featured', mode: 'category', categorySlug: 'soins-capillaires', productIds: [], count: 5, slot: 'after-marquee' },
    { id: 's2', title: 'Lissage Professionnel', subtitle: 'Protéines 1L', visible: true, layout: 'imageGrid', mode: 'category', categorySlug: 'lissage-professionnel-1l', productIds: [], count: 4, slot: 'after-marquee' },
    { id: 's3', title: 'Soins de Cheveux', subtitle: 'Shampooings & Soins', visible: true, layout: 'carousel', mode: 'category', categorySlug: 'soins-de-cheveux', productIds: [], count: 6, slot: 'after-marquee' },
    { id: 's4', title: 'Matériel Pro', subtitle: 'Équipements professionnels', visible: true, layout: 'carousel', mode: 'category', categorySlug: 'materiel', productIds: [], count: 6, slot: 'after-marquee' },
    { id: 's5', title: 'Coffrets & Kits', subtitle: 'Nos packs exclusifs', visible: false, layout: 'carousel', mode: 'category', categorySlug: 'nos-coffrets', productIds: [], count: 6, slot: 'after-marquee' },
  ],
};

export default function HomepageManager() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_CONFIG);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pickerSection, setPickerSection] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/homepage')
      .then(r => r.json())
      .then(setConfig)
      .catch(console.error);

    Promise.all([
      productsApi.getAll({ limit: 500 }),
      categoriesApi.getAll(),
    ]).then(([prodsRes, catsRes]) => {
      setAllProducts(prodsRes.data);
      setAllCategories(catsRes.data);
    }).catch(console.error);
  }, []);

  const updateSection = (id: string, updates: Partial<HomepageSection>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  };

  const moveSection = (id: string, dir: 'up' | 'down') => {
    setConfig(prev => {
      const idx = prev.sections.findIndex(s => s.id === id);
      const newIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.sections.length) return prev;
      const sections = [...prev.sections];
      [sections[idx], sections[newIdx]] = [sections[newIdx], sections[idx]];
      return { ...prev, sections };
    });
  };

  const toggleProduct = (sectionId: string, productId: number) => {
    const section = config.sections.find(s => s.id === sectionId);
    if (!section) return;
    const ids = section.productIds.includes(productId)
      ? section.productIds.filter(id => id !== productId)
      : [...section.productIds, productId];
    updateSection(sectionId, { productIds: ids });
  };

  const handleSave = async () => {
    setSaving(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('vs_token') : null;
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const pickerSec = pickerSection ? config.sections.find(s => s.id === pickerSection) : null;
  const filteredProducts = allProducts.filter(p =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-light text-gray-900">Page d'accueil</h2>
          <p className="text-xs text-gray-400 mt-1">Configurez les 5 sections produits affichées sur la page d'accueil</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all disabled:opacity-50"
        >
          {saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? 'Sauvegarde...' : saved ? 'Sauvegardé !' : 'Enregistrer'}
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-gray-400 px-1">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary/20 border border-primary/40" /> Vedette = grande carte + grille</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" /> Carrousel = ligne de produits</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" /> Vitrine = grille centrée, images complètes</span>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {config.sections.map((section, idx) => (
          <div
            key={section.id}
            className={`bg-white border rounded-lg overflow-hidden transition-all ${
              section.visible ? 'border-gray-200' : 'border-dashed border-gray-200'
            }`}
          >
            {/* Top bar */}
            <div className={`flex items-center gap-3 px-4 py-3 border-b ${section.visible ? 'border-gray-100 bg-gray-50/50' : 'border-gray-100 bg-gray-50/20'}`}>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0">
                {idx + 1}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={idx === 0}
                  className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={idx === config.sections.length - 1}
                  className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
                >
                  <ChevronDown size={13} />
                </button>
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 truncate">{section.title || 'Section sans titre'}</span>
              <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                section.layout === 'featured' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
              }`}>
                {section.layout === 'featured' ? 'Vedette' : section.layout === 'carousel' ? 'Carrousel' : section.layout === 'imageGrid' ? 'Image + Grille' : 'Vitrine'}
              </span>
              <button
                onClick={() => updateSection(section.id, { visible: !section.visible })}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${
                  section.visible
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-500'
                    : 'bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {section.visible ? <Eye size={11} /> : <EyeOff size={11} />}
                {section.visible ? 'Visible' : 'Masqué'}
              </button>
            </div>

            {/* Body */}
            <div className={`p-4 space-y-4 ${!section.visible ? 'opacity-40' : ''}`}>
              {/* Title + Subtitle */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Titre</label>
                  <input
                    value={section.title}
                    onChange={e => updateSection(section.id, { title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm"
                    placeholder="Ex: Soins Capillaires"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Sous-titre</label>
                  <input
                    value={section.subtitle}
                    onChange={e => updateSection(section.id, { subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm"
                    placeholder="Ex: Botox & Filler"
                  />
                </div>
              </div>

              {/* Layout + Mode toggles */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">Type d'affichage</label>
                  <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                    {(['featured', 'carousel', 'grid', 'imageGrid'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => updateSection(section.id, { layout: l })}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                          section.layout === l ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {l === 'featured' ? 'Vedette' : l === 'carousel' ? 'Carrousel' : l === 'imageGrid' ? 'Image' : 'Vitrine'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">Source des produits</label>
                  <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                    {(['category', 'manual'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => updateSection(section.id, { mode: m })}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                          section.mode === m ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {m === 'category' ? 'Par catégorie' : 'Par produits'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid size toggle — only for Vitrine layout */}
              {section.layout === 'grid' && (
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">Taille des cases</label>
                  <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                    {(['sm', 'md', 'lg'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => updateSection(section.id, { gridSize: size })}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                          (section.gridSize ?? 'md') === size ? 'bg-amber-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {size === 'sm' ? 'Petites' : size === 'md' ? 'Moyennes' : 'Grandes'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Slot / Position on page */}
              <div>
                <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Position sur la page</label>
                <select
                  value={section.slot ?? 'after-marquee'}
                  onChange={e => updateSection(section.id, { slot: e.target.value as HomepageSlot })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm bg-white"
                >
                  {(Object.entries(SLOT_LABELS) as [HomepageSlot, string][]).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Category or manual product picker */}
              {section.mode === 'category' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Catégorie</label>
                    <select
                      value={section.categorySlug}
                      onChange={e => updateSection(section.id, { categorySlug: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm bg-white"
                    >
                      <option value="">— Choisir une catégorie —</option>
                      {allCategories.map(cat => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Nb. produits max</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={section.count}
                      onChange={e => updateSection(section.id, { count: Math.max(1, Math.min(20, Number(e.target.value))) })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                      Produits sélectionnés ({section.productIds.length})
                    </label>
                    <button
                      onClick={() => { setPickerSection(section.id); setSearch(''); }}
                      className="text-[9px] uppercase font-bold text-primary hover:text-black transition-colors border-b border-primary/30 pb-0.5"
                    >
                      + Choisir des produits
                    </button>
                  </div>
                  {section.productIds.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {section.productIds.map(id => {
                        const p = allProducts.find(p => p.id === id);
                        return p ? (
                          <span key={id} className="flex items-center gap-1 pl-2 pr-1 py-1 bg-gray-100 text-[11px] text-gray-700 rounded-full">
                            {p.name}
                            <button
                              onClick={() => toggleProduct(section.id, id)}
                              className="ml-1 w-4 h-4 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all"
                            >
                              <X size={9} />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucun produit sélectionné</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Product Picker Modal */}
      {pickerSection && pickerSec && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] flex flex-col rounded-lg overflow-hidden shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Choisir des produits</h3>
                <p className="text-xs text-gray-400 mt-0.5">Section : {pickerSec.title}</p>
              </div>
              <button
                onClick={() => { setPickerSection(null); setSearch(''); }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher par nom ou catégorie..."
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-primary/50 rounded-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Product list */}
            <div className="overflow-y-auto flex-1 px-2 py-2">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">Aucun produit trouvé</p>
              ) : (
                filteredProducts.map(p => {
                  const selected = pickerSec.productIds.includes(p.id);
                  const img = p.images?.[0] ? imageUrl(p.images[0]) : '/img/logo.png';
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProduct(pickerSection, p.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-all text-left ${selected ? 'bg-primary/5' : ''}`}
                    >
                      <img
                        src={img}
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded flex-shrink-0 bg-gray-50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-[11px] text-gray-400">{p.category_name} · {p.price.toLocaleString()} DH</p>
                      </div>
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                        selected ? 'bg-primary' : 'border-2 border-gray-200'
                      }`}>
                        {selected && <Check size={11} className="text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">{pickerSec.productIds.length} produit{pickerSec.productIds.length !== 1 ? 's' : ''} sélectionné{pickerSec.productIds.length !== 1 ? 's' : ''}</span>
              <button
                onClick={() => { setPickerSection(null); setSearch(''); }}
                className="px-6 py-2.5 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






