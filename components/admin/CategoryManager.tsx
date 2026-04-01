"use client";

import React, { useState, useEffect } from 'react';
import { categoriesApi, uploadsApi, imageUrl, type Category } from '@/lib/api';
import { Plus, Trash2, Tag, Check, X, Upload, Edit, ImageIcon, Layers } from 'lucide-react';
import Image from 'next/image';

function base64ToFile(dataUrl: string): File {
  const [meta, data] = dataUrl.split(',');
  const mime = meta.split(':')[1].split(';')[0];
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new File([new Blob([arr], { type: mime })], `cat_${Date.now()}.jpg`, { type: mime });
}

const CategoryManager = () => {
 const [categories, setCategories] = useState<Category[]>([]);
 const [newCat, setNewCat] = useState('');
 const [catImage, setCatImage] = useState<string | null>(null); // Base64 preview
 const [isEditing, setIsEditing] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetchCategories();
 }, []);

 const fetchCategories = async () => {
  try {
   const res = await categoriesApi.getAll();
   setCategories(res.data);
  } catch (e) { console.error(e); }
 };

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
   const reader = new FileReader();
   reader.onload = (event) => {
    const img = document.createElement('img');
    img.onload = () => {
     const canvas = document.createElement('canvas');
     const MAX_WIDTH = 1024;
     const MAX_HEIGHT = 1024;
     let width = img.width;
     let height = img.height;

     if (width > height) {
      if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
     } else {
      if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
     }

     canvas.width = width;
     canvas.height = height;
     const ctx = canvas.getContext('2d');
     ctx?.drawImage(img, 0, 0, width, height);
     const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
     setCatImage(dataUrl);
    };
    img.src = event.target?.result as string;
   };
   reader.readAsDataURL(file);
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newCat.trim()) return;
  setLoading(true);

  try {
   let finalImage: string | undefined;

   if (catImage && catImage.startsWith('data:')) {
    finalImage = await uploadsApi.uploadSingle(base64ToFile(catImage));
   } else if (catImage) {
    finalImage = catImage; // already a URL
   }

   const catData = { name: newCat.toLowerCase(), image: finalImage };

   if (isEditing && editId !== null) {
    await categoriesApi.update(editId, catData);
   } else {
    await categoriesApi.create(catData);
   }

   cancelEdit();
   fetchCategories();
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const handleEdit = (cat: Category) => {
  setNewCat(cat.name);
  setCatImage(cat.image ? imageUrl(cat.image) : null);
  setIsEditing(true);
  setEditId(cat.id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const cancelEdit = () => {
  setNewCat('');
  setCatImage(null);
  setIsEditing(false);
  setEditId(null);
 };

 const handleDelete = async (id: number, name: string) => {
  if (confirm("Supprimer cette catégorie et ses produits associés ?")) {
   await categoriesApi.delete(id);
   fetchCategories();
  }
 };

 return (
  <div className="space-y-12">
  <div className="bg-white p-10 border border-gray-100 shadow-sm relative overflow-hidden">
  <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none -rotate-12 translate-x-20">GAMMES</div>
  <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
  <div>
  <h2 className="text-4xl font-sans font-light text-gray-900 tracking-tight">Curations de Collections</h2>
  <p className="text-[10px] uppercase font-bold mt-2">Édition Maison Vitasilk • {categories.length} Univers</p>
  </div>
  <div className="flex items-center gap-4">
  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
  <Layers size={20} />
  </div>
  </div>
  </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div className="lg:col-span-5">
  <div className="bg-white p-10 border border-gray-100 shadow-sm sticky top-24">
  <div className="mb-10">
  <h3 className="text-2xl font-sans font-light text-gray-900">{isEditing ? 'Éditer la Gamme' : 'Nouvelle Gamme'}</h3>
  <p className="text-[10px] uppercase text-primary font-bold mt-1">Définition de l'Univers</p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold text-gray-500 pl-1">Nom de la Collection</label>
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Ex: Lissage d'Or..."
            className="w-full px-6 py-5 bg-[#FAF9F6] border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-sm rounded-sm"
          />
        </div>

  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Image de Couverture</label>

  <div className="relative group">
  <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-100 transition-all cursor-pointer hover:bg-primary/5 hover:border-primary/20 group">
  <Upload size={24} className="text-gray-300 group-hover:text-primary transition-colors" />
  <span className="text-[8px] mt-2 uppercase font-black tracking-widest text-gray-400 group-hover:text-primary">Upload Image</span>
  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
  </label>

  {catImage && (
  <div className="absolute inset-0 bg-white p-1">
  <div className="relative w-full h-full">
  <Image src={catImage} alt="Preview" fill className="object-cover" />
  <button
  type="button"
  onClick={() => setCatImage(null)}
  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow-xl"
  >
  <X size={12} />
  </button>
  </div>
  </div>
  )}
  </div>
  </div>

  <div className="flex flex-col gap-4 pt-4">
  <button
  type="submit"
  disabled={loading}
  className="w-full bg-gray-950 hover:bg-primary text-white py-6 transition-all duration-700 flex items-center justify-center space-x-4 text-[10px] uppercase font-bold shadow-2xl"
  >
  {loading ? (
  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
  ) : (
  <>
  {isEditing ? <Check size={18} /> : <Plus size={18} />}
  <span>{isEditing ? 'Confirmer les Modifications' : 'Créer la Collection'}</span>
  </>
  )}
  </button>
  {isEditing && (
  <button
  type="button"
  onClick={cancelEdit}
  className="w-full py-4 border border-gray-100 text-gray-400 hover:text-black hover:border-black transition-all text-[9px] uppercase tracking-widest font-black"
  >
  Annuler l'Édition
  </button>
  )}
  </div>
  </form>
  </div>
  </div>

  <div className="lg:col-span-7">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
  {categories.map((cat) => (
  <div key={cat.id} className="group relative bg-white border border-gray-100 shadow-sm overflow-hidden h-[400px] transition-all duration-1000 hover:shadow-2xl">
  <div className="absolute inset-0 z-0">
  {cat.image ? (
  <Image
  src={imageUrl(cat.image)}
  alt={cat.name}
  fill
  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
  />
  ) : (
  <div className="w-full h-full bg-[#FAF9F6] flex items-center justify-center text-gray-100">
  <ImageIcon size={80} strokeWidth={1} />
  </div>
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
  </div>

  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
  <div className="flex justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
  <div className="flex gap-2">
  <button
  onClick={() => handleEdit(cat)}
  className="w-10 h-10 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-950 flex items-center justify-center rounded-sm transition-all"
  >
  <Edit size={16} />
  </button>
  <button
  onClick={() => handleDelete(cat.id, cat.name)}
  className="w-10 h-10 bg-red-500/20 backdrop-blur-md text-red-100 hover:bg-red-500 hover:text-white flex items-center justify-center rounded-sm transition-all"
  >
  <Trash2 size={16} />
  </button>
  </div>
  </div>

  <div>
  <span className="text-[8px] uppercase tracking-[0.4em] font-black mb-4 block translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-1000" style={{ color: '#C9A14A' }}>Excellence Vitasilk</span>
  <h4 className="text-3xl font-sans font-bold uppercase tracking-tighter leading-none drop-shadow-lg" style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{cat.name}</h4>
  <div className="w-0 group-hover:w-full h-[1px] bg-primary/50 mt-6 transition-all duration-1000" />
  <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-6 flex items-center gap-3">
  <span>Découvrir la Collection</span>
  <div className="h-[1px] w-4 bg-gray-600" />
  </div>
  </div>
  </div>
  </div>
  ))}

  {categories.length === 0 && (
  <div className="col-span-full py-32 bg-white border border-dashed border-gray-200 flex flex-col items-center justify-center space-y-6">
  <div className="w-20 h-20 bg-gray-50 flex items-center justify-center text-gray-200">
  <Tag size={32} strokeWidth={1} />
  </div>
  <div className="text-center">
  <p className="text-gray-900 text-sm font-medium uppercase tracking-widest">Aucune Gamme Créée</p>
  <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">Commencez par définir votre premier univers</p>
  </div>
  </div>
  )}
  </div>
  </div>
  </div>
  </div>
 );
};

export default CategoryManager;
