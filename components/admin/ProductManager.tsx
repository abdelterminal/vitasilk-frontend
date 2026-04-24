"use client";

import React, { useState, useEffect } from 'react';
import { productsApi, categoriesApi, uploadsApi, imageUrl, type Product as ApiProduct, type Category } from '@/lib/api';
import { Plus, Trash2, Edit, X, Upload, Check, ImageIcon, AlertCircle, Search, Filter, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

function base64ToFile(dataUrl: string): File {
  const [meta, data] = dataUrl.split(',');
  const mime = meta.split(':')[1].split(';')[0];
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new File([new Blob([arr], { type: mime })], `upload_${Date.now()}.jpg`, { type: mime });
}

const ProductManager = () => {
 const [products, setProducts] = useState<ApiProduct[]>([]);
 const [categories, setCategories] = useState<Category[]>([]);
 const [showModal, setShowModal] = useState(false);
 const [isEditing, setIsEditing] = useState(false);
 const [currentId, setCurrentId] = useState<number | string>('');
 const [loading, setLoading] = useState(false);
 const [imageUrlInput, setImageUrlInput] = useState('');
 const [searchQuery, setSearchQuery] = useState('');
 const [filterCategory, setFilterCategory] = useState('all');

 const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: 0,
  price_eur: 0,
  category_id: 0,
  stock: 0,
  featured: false,
  directCheckout: false,
  enableCart: true,
  imageFiles: [] as string[],
 });

 useEffect(() => {
  fetchProducts();
  fetchCategories();
 }, []);

 const fetchProducts = async () => {
  try {
   const res = await productsApi.getAll({ limit: 200 });
   setProducts(res.data || []);
  } catch (e) { console.error(e); }
 };

 const fetchCategories = async () => {
  try {
   const res = await categoriesApi.getAll();
   const cats = res.data;
   setCategories(cats);
   if (cats.length > 0 && !formData.category_id) {
    setFormData(prev => ({ ...prev, category_id: cats[0].id }));
   }
  } catch (e) { console.error(e); }
 };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const target = e.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  setFormData(prev => {
   let newValue: string | number | boolean = value;
   if (type === 'number') {
    newValue = value === '' ? '' : parseFloat(value);
   } else if (type === 'checkbox') {
    newValue = checked;
   }

   if (name === 'directCheckout' && checked) {
    return { ...prev, directCheckout: true, enableCart: false };
   }
   if (name === 'enableCart' && checked) {
    return { ...prev, enableCart: true, directCheckout: false };
   }
   if (name === 'directCheckout' && !checked && !prev.enableCart) {
    return { ...prev, directCheckout: false, enableCart: true };
   }
   if (name === 'enableCart' && !checked && !prev.directCheckout) {
    return { ...prev, enableCart: true, directCheckout: false };
   }

   return {
    ...prev,
    [name]: newValue
   };
  });
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
   const files = Array.from(e.target.files);
   const slotsLeft = 4 - formData.imageFiles.length;
   const filesToProcess = files.slice(0, slotsLeft);

   filesToProcess.forEach(file => {
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
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      setFormData(prev => ({ ...prev, imageFiles: [...prev.imageFiles, dataUrl] }));
     };
     img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
   });
  }
 };

 const handleAddImageUrl = () => {
  if (imageUrlInput.trim()) {
   setFormData(prev => ({ ...prev, imageFiles: [...prev.imageFiles, imageUrlInput.trim()] }));
   setImageUrlInput('');
  }
 };

  const removeImage = (index: number) => {
  setFormData(prev => ({ ...prev, imageFiles: prev.imageFiles.filter((_, i) => i !== index) }));
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    setFormData(prev => {
        const newImages = [...prev.imageFiles];
        const newIndex = direction === 'left' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newImages.length) {
            [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
        }
        return { ...prev, imageFiles: newImages };
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.category_id) {
   alert("Veuillez sélectionner une catégorie d'abord.");
   return;
  }
  setLoading(true);

  try {
   // Upload any Base64 images; keep existing URLs as-is
   const imageUrls = await Promise.all(
    formData.imageFiles.map(async (img) => {
     if (img.startsWith('data:')) {
      return uploadsApi.uploadSingle(base64ToFile(img));
     }
     return img;
    })
   );

   const productData = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    price_eur: formData.price_eur,
    category_id: formData.category_id,
    stock: formData.stock,
    featured: formData.featured,
    direct_checkout: formData.directCheckout,
    enable_cart: formData.enableCart,
    images: imageUrls,
   };

   if (isEditing) {
    await productsApi.update(currentId, productData);
   } else {
    await productsApi.create(productData);
   }

   setShowModal(false);
   resetForm();
   fetchProducts();
  } catch (error) {
   console.error("Error saving product:", error);
  } finally {
   setLoading(false);
  }
 };

 const handleEdit = (product: ApiProduct) => {
  setFormData({
   name: product.name,
   description: product.description || '',
   price: product.price,
   price_eur: product.price_eur || 0,
   category_id: product.category_id || 0,
   stock: product.stock,
   featured: product.featured || false,
   directCheckout: product.direct_checkout || false,
   enableCart: product.enable_cart !== false,
   imageFiles: product.images || [],
  });
  setCurrentId(product.id);
  setIsEditing(true);
  setShowModal(true);
 };

 const handleDelete = async (id: number | string, name: string) => {
  if (window.confirm("Supprimer ce produit définitivement ?")) {
   await productsApi.delete(id);
   fetchProducts();
  }
 };

 const resetForm = () => {
  setFormData({
   name: '',
   description: '',
   price: 0,
   price_eur: 0,
   category_id: categories.length > 0 ? categories[0].id : 0,
   stock: 0,
   featured: false,
   directCheckout: false,
   enableCart: true,
   imageFiles: [],
  });
  setIsEditing(false);
  setCurrentId('');
  setImageUrlInput('');
 };

 const filteredProducts = products.filter(p => {
  const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory = filterCategory === 'all' || p.category_name === filterCategory;
  return matchesSearch && matchesCategory;
 });

 return (
  <div className="space-y-10">
   <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
   <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none -rotate-12 translate-x-20">STOCK</div>
   <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative z-10">
   <div className="text-center md:text-left">
   <h2 className="text-2xl md:text-4xl font-sans font-light text-gray-900 tracking-tight">Inventaire de Prestige</h2>
   <p className="text-[10px] uppercase font-bold mt-2">Édition Maison Vitasilk • {products.length} Pièces</p>
   </div>
   <button
   onClick={() => { resetForm(); setShowModal(true); }}
   className="w-full md:w-auto bg-gray-950 hover:bg-primary text-white px-6 md:px-10 py-4 md:py-5 text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-700 shadow-2xl flex items-center justify-center space-x-4 group"
   >
  <Plus size={16} className="group-hover:rotate-180 transition-transform duration-700" />
  <span>Créer une Pièce Unique</span>
  </button>
  </div>
  </div>

  <div className="flex flex-col lg:flex-row gap-6">
  <div className="relative flex-1 group">
  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
  <input
  type="text"
  placeholder="Rechercher une création..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 focus:border-primary/20 focus:ring-8 focus:ring-primary/5 transition-all text-sm outline-none rounded-sm"
  />
  </div>
  <div className="flex items-center gap-4 bg-white border border-gray-100 px-8 py-5 min-w-[240px]">
  <Filter size={14} className="text-gray-400" />
  <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
  className="flex-1 bg-transparent text-[10px] uppercase font-bold focus:outline-none cursor-pointer text-gray-600 appearance-none"
  >
  <option value="all">Toutes les Gammes</option>
  {categories.map(cat => (
  <option key={cat.id} value={cat.name}>{cat.name}</option>
  ))}
  </select>
  </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
  {filteredProducts.map(product => (
  <div key={product.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-1000 relative">
  {product.featured && (
  <div className="absolute top-0 left-0 z-20 overflow-hidden w-24 h-24">
  <div className="absolute top-5 -left-8 bg-primary text-white text-[7px] font-bold uppercase py-1.5 w-32 text-center shadow-lg -rotate-45">
  En Vedette
  </div>
  </div>
  )}

    <div className="relative h-64 md:h-80 overflow-hidden bg-[#FAF9F6] p-4">
   <div className="relative w-full h-full overflow-hidden">
   {product.images?.[0] ? (
   <Image
   src={imageUrl(product.images[0])}
   alt={product.name}
   fill
   className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-1000"
   />
  ) : (
  <div className="absolute inset-0 flex items-center justify-center text-gray-200">
  <ImageIcon size={48} strokeWidth={1} />
  </div>
  )}
  </div>

    <div className={cn(
        "absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center gap-4 z-10",
        "opacity-100 md:opacity-0 md:group-hover:opacity-100"
    )}>
  <button
  onClick={() => handleEdit(product)}
  className="w-12 h-12 bg-white text-gray-900 hover:bg-primary hover:text-white flex items-center justify-center rounded-sm transition-all duration-500 shadow-xl"
  title="Éditer"
  >
  <Edit size={18} />
  </button>
  <button
  onClick={() => handleDelete(product.id, product.name)}
  className="w-12 h-12 bg-white text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center rounded-sm transition-all duration-500 shadow-xl"
  title="Supprimer"
  >
  <Trash2 size={18} />
  </button>
  </div>

  <div className="absolute bottom-6 left-6 z-10">
  <span className="px-5 py-2 bg-white border border-gray-100 text-[8px] uppercase tracking-[0.2em] font-black text-gray-950 shadow-sm">
  {product.category_name}
  </span>
  </div>
  </div>

   <div className="p-6 md:p-10 space-y-4 md:space-y-6">
  <div className="flex justify-between items-start gap-4">
  <h3 className="font-sans font-light text-2xl text-gray-950 leading-tight line-clamp-1">{product.name}</h3>
  <div className={cn(
  "px-3 py-1 rounded-full text-[7px] uppercase font-black tracking-widest border shrink-0",
  product.stock > 10 ? "text-emerald-500 bg-emerald-50 border-emerald-100" :
  product.stock > 0 ? "text-amber-500 bg-amber-50 border-amber-100" :
  "text-red-500 bg-red-50 border-red-100"
  )}>
  {product.stock > 10 ? "Disponible" : product.stock > 0 ? "Stock Limité" : "Rupture"}
  </div>
  </div>

  <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-2 h-8 uppercase tracking-widest">
  {product.description || "Collection Exclusive Vitasilk"}
  </p>

  <div className="flex justify-between items-end pt-8 border-t border-gray-50">
  <div>
  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Tarification Maison</p>
   <p className="text-2xl md:text-3xl font-sans font-light text-gray-950">
   {product.price?.toLocaleString()} <span className="text-xs text-primary uppercase font-black tracking-normal">DH</span>
   </p>
  </div>
  <div className="text-right">
  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Unités</p>
  <p className="text-sm font-bold text-gray-950">{product.stock}</p>
  </div>
  </div>
  </div>
  </div>
  ))}
  </div>

  {showModal && (
   <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12">
   <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowModal(false)} />
   <div className="relative bg-[#FDFBF7] w-full h-full md:h-auto md:max-w-5xl md:max-h-[95vh] overflow-y-auto md:rounded-sm shadow-2xl overflow-hidden border border-white/20">
   <div className="sticky top-0 z-20 bg-[#FDFBF7] border-b border-gray-100 px-6 md:px-10 py-6 md:py-8 flex justify-between items-center">
   <div>
   <h2 className="text-2xl md:text-3xl font-sans font-light text-gray-900">{isEditing ? 'Éditer la Création' : 'Nouvelle Création'}</h2>
   <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-1">Maison Vitasilk</p>
   </div>
   <button onClick={() => setShowModal(false)} className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center text-gray-400 hover:text-black hover:rotate-90 transition-all duration-500 rounded-full border border-gray-100">
   <X size={20} />
   </button>
   </div>

   <form onSubmit={handleSubmit} className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
  <div className="lg:col-span-7 space-y-10">
  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Nom du Produit d'Exception</label>
  <input
  name="name" value={formData.name} onChange={handleInputChange} required
  placeholder="Ex: Lissage Pro Intense..."
  className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-sm rounded-sm shadow-inner"
  />
  </div>

  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Description & Composition</label>
  <textarea
  name="description" value={formData.description} onChange={handleInputChange} rows={6}
  placeholder="Décrivez l'expérience sensorielle de ce produit..."
  className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-sm rounded-sm shadow-inner resize-none"
  />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Tarif Exclusif (DH)</label>
  <input
  name="price" type="number" value={formData.price} onChange={handleInputChange}
  className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner"
  />
  </div>
  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Stock Disponible</label>
  <input
  name="stock" type="number" value={formData.stock} onChange={handleInputChange}
  className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner"
  />
  </div>
  </div>

  <div className="space-y-4">
  <label className="flex items-center space-x-3 cursor-pointer p-4 border border-primary/20 rounded-sm bg-primary/5 hover:bg-primary/10 transition-colors">
  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
  <div>
    <span className="text-xs font-bold text-gray-700">Produit En Vedette</span>
    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Apparaît dans la section vedette de la page d'accueil</p>
  </div>
  </label>

  <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-100 rounded-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
  <input type="checkbox" checked={formData.enableCart} onChange={(e) => {
      const checked = e.target.checked;
      setFormData(prev => ({
          ...prev,
          enableCart: checked,
          directCheckout: (!checked && !prev.directCheckout) ? true : prev.directCheckout
      }));
  }} className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
  <span className="text-xs font-bold text-gray-700">Activer l'Ajout au Panier</span>
  </label>

  <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-100 rounded-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
  <input type="checkbox" checked={formData.directCheckout} onChange={(e) => {
      const checked = e.target.checked;
      setFormData(prev => ({
          ...prev,
          directCheckout: checked,
          enableCart: (!checked && !prev.enableCart) ? true : prev.enableCart
      }));
  }} className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
  <span className="text-xs font-bold text-gray-700">Activer l'Achat Rapide (Checkout Direct sous l'image)</span>
  </label>
  </div>
  </div>

  <div className="lg:col-span-5 space-y-10">
  <div className="space-y-4">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Sélection de la Gamme</label>
  <select
  name="category_id"
  value={formData.category_id}
  onChange={(e) => setFormData(prev => ({ ...prev, category_id: Number(e.target.value) }))}
  className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner uppercase tracking-widest font-bold text-gray-600 appearance-none"
  >
  {categories.length === 0 && <option value={0}>Aucune catégorie disponible</option>}
  {categories.map(cat => (
  <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
  </select>
  {categories.length === 0 && (
  <div className="flex items-center space-x-2 text-red-400 text-[10px] pl-1 font-bold">
  <AlertCircle size={12} />
  <span>Aucune catégorie trouvée dans la base de données.</span>
  </div>
  )}
  </div>

  <div className="space-y-4">
  <div className="flex justify-between items-end">
  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Galerie d'Images</label>
  <span className="text-[9px] text-gray-400 font-medium">{formData.imageFiles.length}/4</span>
  </div>

  <div className="grid grid-cols-2 gap-4 mt-4">
  {formData.imageFiles.map((img, i) => (
  <div key={i} className="relative h-32 bg-white border border-gray-100 p-1 group shadow-sm transition-all hover:shadow-lg">
  {img.startsWith('data:')
    ? <img src={img} alt="Preview" className="object-cover w-full h-full" />
    : <Image src={imageUrl(img)} alt="Preview" fill className="object-cover" />
  }

  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
    {i > 0 && (
        <button type="button" onClick={() => moveImage(i, 'left')}
            className="w-7 h-7 bg-white/90 text-gray-900 flex items-center justify-center rounded-full hover:bg-white">
            <ChevronLeft size={14} />
        </button>
    )}
    {i < formData.imageFiles.length - 1 && (
        <button type="button" onClick={() => moveImage(i, 'right')}
            className="w-7 h-7 bg-white/90 text-gray-900 flex items-center justify-center rounded-full hover:bg-white">
            <ChevronRightIcon size={14} />
        </button>
    )}
  </div>

  <button
  type="button"
  onClick={() => removeImage(i)}
  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
  >
  <X size={12} />
  </button>
  </div>
  ))}
  {formData.imageFiles.length < 4 && (
  <label className="h-32 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-gray-300 hover:text-primary rounded-sm overflow-hidden relative">
  <Upload size={24} strokeWidth={1} />
  <span className="text-[8px] mt-2 uppercase font-bold tracking-[0.2em]">Ajouter Image</span>
  <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
  <div className="absolute inset-0 opacity-[0.03] luxury-text text-4xl pointer-events-none select-none -rotate-12 translate-y-4">VITASILK</div>
  </label>
  )}
  </div>
  <p className="text-[9px] text-gray-400">Vous pouvez ajouter une image via Upload.</p>
  </div>

  <div className="pt-8">
  <button
  disabled={loading || categories.length === 0}
  type="submit"
  className="w-full py-6 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-all duration-700 flex items-center justify-center space-x-4 shadow-2xl shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed group"
  >
  {loading ? (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  ) : (
  <>
  <Check size={18} className="group-hover:scale-125 transition-transform" />
  <span>{isEditing ? 'Confirmer les Modifications' : 'Publier le Produit'}</span>
  </>
  )}
  </button>
  </div>
  </div>
  </form>
  </div>
  </div>
  )}
  </div>
 );
};

export default ProductManager;
