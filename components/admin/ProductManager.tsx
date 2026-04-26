"use client";

import React, { useState, useEffect, useRef } from 'react';
import { productsApi, categoriesApi, uploadsApi, imageUrl, type Product as ApiProduct, type Category } from '@/lib/api';
import {
    Plus, Trash2, Edit, X, Upload, Check, ImageIcon, AlertCircle,
    Search, Filter, ChevronLeft, ChevronRight as ChevronRightIcon,
    LayoutList, LayoutGrid, Grid2x2, Download, FileUp, Loader2, Info,
} from 'lucide-react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

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

type ViewMode = 'list' | 'small' | 'big';

interface ImportRow {
    nom: string;
    description: string;
    prix_dh: number;
    prix_eur: number;
    stock: number;
    categorie: string;
    vedette: boolean;
    _status?: 'pending' | 'ok' | 'error';
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

    // View + selection
    const [viewMode, setViewMode] = useState<ViewMode>('big');
    const [checkedIds, setCheckedIds] = useState<Set<number | string>>(new Set());

    // CSV Import
    const importInputRef = useRef<HTMLInputElement>(null);
    const [importRows, setImportRows] = useState<ImportRow[]>([]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showFormatGuide, setShowFormatGuide] = useState(false);
    const [importProgress, setImportProgress] = useState<{ done: number; total: number } | null>(null);

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
            if (type === 'number') newValue = value === '' ? '' : parseFloat(value);
            else if (type === 'checkbox') newValue = checked;
            if (name === 'directCheckout' && checked) return { ...prev, directCheckout: true, enableCart: false };
            if (name === 'enableCart' && checked) return { ...prev, enableCart: true, directCheckout: false };
            if (name === 'directCheckout' && !checked && !prev.enableCart) return { ...prev, directCheckout: false, enableCart: true };
            if (name === 'enableCart' && !checked && !prev.directCheckout) return { ...prev, enableCart: true, directCheckout: false };
            return { ...prev, [name]: newValue };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const slotsLeft = 4 - formData.imageFiles.length;
            files.slice(0, slotsLeft).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX = 1024;
                        let w = img.width, h = img.height;
                        if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
                        else { if (h > MAX) { w *= MAX / h; h = MAX; } }
                        canvas.width = w; canvas.height = h;
                        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
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
            const imgs = [...prev.imageFiles];
            const ni = direction === 'left' ? index - 1 : index + 1;
            if (ni >= 0 && ni < imgs.length) [imgs[index], imgs[ni]] = [imgs[ni], imgs[index]];
            return { ...prev, imageFiles: imgs };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.category_id) { alert("Veuillez sélectionner une catégorie."); return; }
        setLoading(true);
        try {
            const imageUrls = await Promise.all(
                formData.imageFiles.map(async (img) => img.startsWith('data:') ? uploadsApi.uploadSingle(base64ToFile(img)) : img)
            );
            const productData = {
                name: formData.name, description: formData.description,
                price: formData.price, price_eur: formData.price_eur,
                category_id: formData.category_id, stock: formData.stock,
                featured: formData.featured, direct_checkout: formData.directCheckout,
                enable_cart: formData.enableCart, images: imageUrls,
            };
            if (isEditing) await productsApi.update(currentId, productData);
            else await productsApi.create(productData);
            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (error) { console.error("Error saving product:", error); }
        finally { setLoading(false); }
    };

    const handleEdit = (product: ApiProduct) => {
        setFormData({
            name: product.name, description: product.description || '',
            price: product.price, price_eur: product.price_eur || 0,
            category_id: product.category_id || 0, stock: product.stock,
            featured: product.featured || false, directCheckout: product.direct_checkout || false,
            enableCart: product.enable_cart !== false, imageFiles: product.images || [],
        });
        setCurrentId(product.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number | string) => {
        if (window.confirm("Supprimer ce produit définitivement ?")) {
            await productsApi.delete(id);
            fetchProducts();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', description: '', price: 0, price_eur: 0,
            category_id: categories.length > 0 ? categories[0].id : 0,
            stock: 0, featured: false, directCheckout: false, enableCart: true, imageFiles: [],
        });
        setIsEditing(false);
        setCurrentId('');
        setImageUrlInput('');
    };

    // ── Filtering ──────────────────────────────────────────────────────────
    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || p.category_name === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // ── Selection ──────────────────────────────────────────────────────────
    const allChecked = filteredProducts.length > 0 && filteredProducts.every(p => checkedIds.has(p.id));
    const toggleAll = () => {
        if (allChecked) setCheckedIds(prev => { const n = new Set(prev); filteredProducts.forEach(p => n.delete(p.id)); return n; });
        else setCheckedIds(prev => { const n = new Set(prev); filteredProducts.forEach(p => n.add(p.id)); return n; });
    };
    const toggleOne = (id: number | string) => {
        setCheckedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    };

    // ── Export CSV ─────────────────────────────────────────────────────────
    const exportCSV = () => {
        const list = products.filter(p => checkedIds.has(p.id));
        const headers = ['ID', 'Nom', 'Description', 'Prix DH', 'Prix EUR', 'Stock', 'Catégorie', 'En Vedette'];
        const rows = list.map(p => [
            String(p.id), p.name, p.description || '',
            String(p.price), String(p.price_eur || 0), String(p.stock),
            p.category_name || '', p.featured ? 'oui' : 'non',
        ]);
        const csv = [headers, ...rows].map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\r\n');
        const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `produits-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ── Download CSV template ──────────────────────────────────────────────
    const downloadTemplate = () => {
        const header = 'nom,description,prix_dh,prix_eur,stock,categorie,vedette';
        const example = '"Exemple Produit","Description du produit",299,27,50,"Soin Cheveux","non"';
        const blob = new Blob(['﻿' + header + '\r\n' + example], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'modele-import-produits.csv';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ── Parse CSV file ─────────────────────────────────────────────────────
    const parseCSV = (text: string): string[][] => {
        const rows: string[][] = [];
        let row: string[] = [], field = '', inQuote = false;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '"') {
                if (inQuote && text[i + 1] === '"') { field += '"'; i++; }
                else inQuote = !inQuote;
            } else if (ch === ',' && !inQuote) {
                row.push(field.trim()); field = '';
            } else if ((ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) && !inQuote) {
                if (ch === '\r') i++;
                row.push(field.trim()); rows.push(row);
                row = []; field = '';
            } else {
                field += ch;
            }
        }
        if (field || row.length) { row.push(field.trim()); rows.push(row); }
        return rows;
    };

    const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = (ev.target?.result as string).replace(/^﻿/, '');
            const rows = parseCSV(text);
            if (rows.length < 2) return;
            const header = rows[0].map(h => h.toLowerCase().trim());
            const idx = (key: string) => header.indexOf(key);
            const parsed: ImportRow[] = rows.slice(1).filter(r => r.some(c => c)).map(r => ({
                nom: r[idx('nom')] || '',
                description: r[idx('description')] || '',
                prix_dh: parseFloat(r[idx('prix_dh')] || r[idx('prix')] || '0') || 0,
                prix_eur: parseFloat(r[idx('prix_eur')] || '0') || 0,
                stock: parseInt(r[idx('stock')] || '0') || 0,
                categorie: r[idx('categorie')] || '',
                vedette: ['oui', 'true', '1'].includes((r[idx('vedette')] || '').toLowerCase()),
                _status: 'pending',
            })).filter(r => r.nom);
            setImportRows(parsed);
            setShowImportModal(true);
        };
        reader.readAsText(file, 'UTF-8');
        e.target.value = '';
    };

    const runImport = async () => {
        setImportProgress({ done: 0, total: importRows.length });
        let done = 0;
        const updated = [...importRows];
        for (let i = 0; i < importRows.length; i++) {
            const row = importRows[i];
            try {
                const cat = categories.find(c => c.name.toLowerCase() === row.categorie.toLowerCase()) || categories[0];
                await productsApi.create({
                    name: row.nom,
                    description: row.description,
                    price: row.prix_dh,
                    price_eur: row.prix_eur,
                    stock: row.stock,
                    category_id: cat?.id || categories[0]?.id,
                    featured: row.vedette,
                    images: [],
                });
                updated[i] = { ...updated[i], _status: 'ok' };
            } catch {
                updated[i] = { ...updated[i], _status: 'error' };
            }
            done++;
            setImportProgress({ done, total: importRows.length });
            setImportRows([...updated]);
        }
        fetchProducts();
    };

    // ── Stock badge ────────────────────────────────────────────────────────
    const stockBadge = (stock: number) => cn(
        "px-2.5 py-1 rounded-full text-[7px] uppercase font-black tracking-widest border shrink-0",
        stock > 10 ? "text-emerald-500 bg-emerald-50 border-emerald-100" :
            stock > 0 ? "text-amber-500 bg-amber-50 border-amber-100" :
                "text-red-500 bg-red-50 border-red-100"
    );

    return (
        <div className="space-y-10">
            {/* ── Header ── */}
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none -rotate-12 translate-x-20">STOCK</div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-sans font-light text-gray-900 tracking-tight">Inventaire de Prestige</h2>
                        <p className="text-[10px] uppercase font-bold mt-2 text-primary">Édition Maison Vitasilk • {products.length} Pièces</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {/* Import CSV */}
                        <button
                            onClick={downloadTemplate}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-500 text-[9px] uppercase font-black tracking-widest hover:border-gray-400 hover:text-gray-700 transition-all rounded-sm"
                            title="Télécharger le modèle CSV"
                        >
                            <Download size={13} />
                            Modèle CSV
                        </button>
                        <button
                            onClick={() => setShowFormatGuide(true)}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-primary/30 text-primary text-[9px] uppercase font-black tracking-widest hover:bg-primary hover:text-white transition-all rounded-sm"
                        >
                            <FileUp size={13} />
                            Importer CSV
                        </button>
                        <input ref={importInputRef} type="file" accept=".csv" className="hidden" onChange={handleImportFile} />
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-950 hover:bg-primary text-white text-[9px] uppercase font-black tracking-widest transition-all duration-500 shadow-xl rounded-sm group"
                        >
                            <Plus size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                            Nouveau Produit
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Controls ── */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none rounded-sm"
                    />
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-4 min-w-[200px]">
                    <Filter size={13} className="text-gray-400 shrink-0" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="flex-1 bg-transparent text-[10px] uppercase font-bold focus:outline-none cursor-pointer text-gray-600 appearance-none"
                    >
                        <option value="all">Toutes les Gammes</option>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                </div>
                {/* View toggle + select-all */}
                <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3">
                    <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className="w-4 h-4 accent-primary cursor-pointer mr-2"
                        title="Tout sélectionner"
                    />
                    <div className="w-px h-6 bg-gray-100 mx-1" />
                    {([['list', LayoutList], ['small', Grid2x2], ['big', LayoutGrid]] as [ViewMode, any][]).map(([mode, Icon]) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={cn(
                                "p-2 rounded transition-all",
                                viewMode === mode ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700"
                            )}
                            title={mode === 'list' ? 'Liste' : mode === 'small' ? 'Petites cartes' : 'Grandes cartes'}
                        >
                            <Icon size={16} />
                        </button>
                    ))}
                    <div className="w-px h-6 bg-gray-100 mx-1" />
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* ── List view ── */}
            {viewMode === 'list' && (
                <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-50 bg-[#FAF9F6]">
                                <th className="pl-6 pr-2 py-4 w-10" />
                                <th className="px-4 py-4 text-[9px] uppercase tracking-widest text-gray-400 font-black">Produit</th>
                                <th className="px-4 py-4 text-[9px] uppercase tracking-widest text-gray-400 font-black">Catégorie</th>
                                <th className="px-4 py-4 text-[9px] uppercase tracking-widest text-gray-400 font-black text-right">Prix</th>
                                <th className="px-4 py-4 text-[9px] uppercase tracking-widest text-gray-400 font-black text-center">Stock</th>
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-gray-400 font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map(product => (
                                <tr
                                    key={product.id}
                                    className={cn("group hover:bg-gray-50/50 transition-colors", checkedIds.has(product.id) && "bg-primary/5")}
                                >
                                    <td className="pl-6 pr-2 py-4">
                                        <input type="checkbox" checked={checkedIds.has(product.id)} onChange={() => toggleOne(product.id)} className="w-4 h-4 accent-primary cursor-pointer" />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0 relative border border-gray-100">
                                                {product.images?.[0]
                                                    ? <Image src={imageUrl(product.images[0])} alt={product.name} fill className="object-contain p-1" />
                                                    : <div className="w-full h-full flex items-center justify-center text-gray-200"><ImageIcon size={18} /></div>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</p>
                                                {product.featured && <span className="text-[8px] uppercase font-black text-amber-500 tracking-widest">En vedette</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">{product.category_name || '—'}</span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <p className="text-sm font-black text-gray-900">{product.price?.toLocaleString()} DH</p>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={stockBadge(product.stock)}>
                                            {product.stock > 10 ? product.stock : product.stock > 0 ? `${product.stock} restant` : 'Rupture'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(product)} className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 rounded-sm transition-all"><Edit size={15} /></button>
                                            <button onClick={() => handleDelete(product.id)} className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-sm transition-all"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ── Small cards view ── */}
            {viewMode === 'small' && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className={cn("bg-white border rounded-sm overflow-hidden group transition-all hover:shadow-lg relative", checkedIds.has(product.id) ? "border-primary shadow-md" : "border-gray-100")}
                        >
                            <div className="absolute top-2 left-2 z-20">
                                <input type="checkbox" checked={checkedIds.has(product.id)} onChange={() => toggleOne(product.id)} className="w-4 h-4 accent-primary cursor-pointer" />
                            </div>
                            <div className="relative h-36 bg-[#FAF9F6] overflow-hidden">
                                {product.images?.[0]
                                    ? <Image src={imageUrl(product.images[0])} alt={product.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-700" />
                                    : <div className="absolute inset-0 flex items-center justify-center text-gray-200"><ImageIcon size={28} strokeWidth={1} /></div>
                                }
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => handleEdit(product)} className="w-8 h-8 bg-white text-gray-900 hover:bg-primary hover:text-white rounded-sm flex items-center justify-center transition-all"><Edit size={13} /></button>
                                    <button onClick={() => handleDelete(product.id)} className="w-8 h-8 bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-sm flex items-center justify-center transition-all"><Trash2 size={13} /></button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-black text-gray-900">{product.price?.toLocaleString()} <span className="text-[9px] text-primary font-black">DH</span></p>
                                    <span className={stockBadge(product.stock)}>{product.stock}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Big cards view (original) ── */}
            {viewMode === 'big' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={cn("bg-white border shadow-sm overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-1000 relative", checkedIds.has(product.id) ? "border-primary" : "border-gray-100")}>
                            {/* Select checkbox */}
                            <div className="absolute top-3 left-3 z-30">
                                <input type="checkbox" checked={checkedIds.has(product.id)} onChange={() => toggleOne(product.id)} className="w-4 h-4 accent-primary cursor-pointer" />
                            </div>
                            {product.featured && (
                                <div className="absolute top-0 left-0 z-20 overflow-hidden w-24 h-24">
                                    <div className="absolute top-5 -left-8 bg-primary text-white text-[7px] font-bold uppercase py-1.5 w-32 text-center shadow-lg -rotate-45">En Vedette</div>
                                </div>
                            )}
                            <div className="relative h-64 md:h-80 overflow-hidden bg-[#FAF9F6] p-4">
                                <div className="relative w-full h-full overflow-hidden">
                                    {product.images?.[0]
                                        ? <Image src={imageUrl(product.images[0])} alt={product.name} fill className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-1000" />
                                        : <div className="absolute inset-0 flex items-center justify-center text-gray-200"><ImageIcon size={48} strokeWidth={1} /></div>
                                    }
                                </div>
                                <div className={cn("absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center gap-4 z-10", "opacity-100 md:opacity-0 md:group-hover:opacity-100")}>
                                    <button onClick={() => handleEdit(product)} className="w-12 h-12 bg-white text-gray-900 hover:bg-primary hover:text-white flex items-center justify-center rounded-sm transition-all duration-500 shadow-xl"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(product.id)} className="w-12 h-12 bg-white text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center rounded-sm transition-all duration-500 shadow-xl"><Trash2 size={18} /></button>
                                </div>
                                <div className="absolute bottom-6 left-6 z-10">
                                    <span className="px-5 py-2 bg-white border border-gray-100 text-[8px] uppercase tracking-[0.2em] font-black text-gray-950 shadow-sm">{product.category_name}</span>
                                </div>
                            </div>
                            <div className="p-6 md:p-10 space-y-4 md:space-y-6">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="font-sans font-light text-2xl text-gray-950 leading-tight line-clamp-1">{product.name}</h3>
                                    <span className={stockBadge(product.stock)}>
                                        {product.stock > 10 ? "Disponible" : product.stock > 0 ? "Stock Limité" : "Rupture"}
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-2 h-8 uppercase tracking-widest">{product.description || "Collection Exclusive Vitasilk"}</p>
                                <div className="flex justify-between items-end pt-8 border-t border-gray-50">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Tarification Maison</p>
                                        <p className="text-2xl md:text-3xl font-sans font-light text-gray-950">{product.price?.toLocaleString()} <span className="text-xs text-primary uppercase font-black tracking-normal">DH</span></p>
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
            )}

            {filteredProducts.length === 0 && (
                <div className="py-32 text-center bg-white border border-gray-100">
                    <ImageIcon className="mx-auto text-gray-100 mb-8" size={64} strokeWidth={0.5} />
                    <p className="text-xl font-light text-gray-300">Aucun produit trouvé</p>
                </div>
            )}

            {/* ── Floating export bar ── */}
            <AnimatePresence>
                {checkedIds.size > 0 && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-6 bg-gray-900 text-white px-8 py-4 shadow-2xl rounded-2xl border border-white/10"
                    >
                        <span className="text-[10px] uppercase tracking-widest font-black text-white/70">{checkedIds.size} sélectionné{checkedIds.size > 1 ? 's' : ''}</span>
                        <button onClick={exportCSV} className="flex items-center gap-3 px-6 py-2.5 bg-primary hover:bg-amber-500 text-white text-[10px] uppercase font-black tracking-widest rounded-xl transition-all shadow-lg">
                            <Download size={14} /> Exporter CSV
                        </button>
                        <button onClick={() => setCheckedIds(new Set())} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Format guide modal ── */}
            <AnimatePresence>
                {showFormatGuide && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Format du fichier CSV</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-black mt-1">Guide d'importation de produits</p>
                                </div>
                                <button onClick={() => setShowFormatGuide(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 shrink-0">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
                                    <Info size={16} className="shrink-0 mt-0.5" />
                                    <p>La première ligne doit contenir les noms de colonnes exacts ci-dessous. L'ordre des colonnes n'a pas d'importance tant que les noms sont corrects.</p>
                                </div>

                                {/* Column reference table */}
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="px-4 py-3 text-left text-[9px] uppercase tracking-widest text-gray-400 font-black">Colonne</th>
                                                <th className="px-4 py-3 text-left text-[9px] uppercase tracking-widest text-gray-400 font-black">Requis</th>
                                                <th className="px-4 py-3 text-left text-[9px] uppercase tracking-widest text-gray-400 font-black">Type</th>
                                                <th className="px-4 py-3 text-left text-[9px] uppercase tracking-widests text-gray-400 font-black">Valeurs acceptées</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { col: 'nom', req: true, type: 'Texte', values: 'Nom du produit. Ex: Lissage Pro Intense' },
                                                { col: 'description', req: false, type: 'Texte', values: 'Description libre, peut être vide' },
                                                { col: 'prix_dh', req: true, type: 'Nombre', values: 'Prix en dirhams. Ex: 299 ou 149.50' },
                                                { col: 'prix_eur', req: false, type: 'Nombre', values: "Prix en euros. Mettre 0 si non applicable" },
                                                { col: 'stock', req: false, type: 'Nombre entier', values: 'Quantité en stock. Défaut: 0' },
                                                { col: 'categorie', req: false, type: 'Texte', values: "Doit correspondre exactement à une catégorie existante. Si vide ou introuvable, la première catégorie est utilisée" },
                                                { col: 'vedette', req: false, type: 'Texte', values: "oui / non — affiche le produit en page d'accueil. Défaut: non" },
                                            ].map(({ col, req, type, values }) => (
                                                <tr key={col} className="hover:bg-gray-50/50">
                                                    <td className="px-4 py-3">
                                                        <code className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded">{col}</code>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {req
                                                            ? <span className="text-[8px] uppercase font-black text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Requis</span>
                                                            : <span className="text-[8px] uppercase font-black text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">Optionnel</span>
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-gray-500">{type}</td>
                                                    <td className="px-4 py-3 text-xs text-gray-600 leading-relaxed">{values}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Example */}
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">Exemple de fichier</p>
                                    <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                                        <pre className="text-xs text-green-400 font-mono whitespace-pre leading-relaxed">{`nom,description,prix_dh,prix_eur,stock,categorie,vedette\nLissage Pro Intense,Soin lissant longue durée,299,27,50,Soin Cheveux,non\nMasque Hydratant Or,Masque nutrition profonde,189,17,30,Masques,oui\nHuile Argan Premium,,349,32,20,Huiles,non`}</pre>
                                    </div>
                                </div>

                                {/* Rules */}
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">Règles importantes</p>
                                    {[
                                        'Enregistrer le fichier en format .csv (UTF-8 de préférence)',
                                        'Les virgules dans un champ de texte doivent être entourées de guillemets doubles : "Soin, nutrition"',
                                        'Les images ne peuvent pas être importées via CSV — à ajouter manuellement après import',
                                        "Les catégories doivent exister au préalable dans l'admin",
                                        'Les lignes sans nom de produit sont ignorées automatiquement',
                                    ].map((rule, i) => (
                                        <div key={i} className="flex items-start gap-3 text-xs text-gray-600">
                                            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">{i + 1}</span>
                                            {rule}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3 justify-end">
                                <button
                                    onClick={downloadTemplate}
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 text-[10px] uppercase font-black tracking-widest rounded-xl hover:border-gray-400 transition-all"
                                >
                                    <Download size={13} />
                                    Télécharger le modèle
                                </button>
                                <button
                                    onClick={() => { setShowFormatGuide(false); importInputRef.current?.click(); }}
                                    className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-primary transition-all"
                                >
                                    <FileUp size={13} />
                                    Choisir un fichier CSV
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Import preview modal ── */}
            <AnimatePresence>
                {showImportModal && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Importer des produits</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-black mt-1">{importRows.length} produit{importRows.length > 1 ? 's' : ''} détecté{importRows.length > 1 ? 's' : ''}</p>
                                </div>
                                <button onClick={() => { setShowImportModal(false); setImportProgress(null); setImportRows([]); }} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Preview table */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            {['Nom', 'Catégorie', 'Prix DH', 'Stock', 'Statut'].map(h => (
                                                <th key={h} className="pb-3 text-left text-[9px] uppercase tracking-widest text-gray-400 font-black pr-4">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {importRows.map((row, i) => (
                                            <tr key={i} className="py-2">
                                                <td className="py-3 pr-4 font-medium text-gray-900">{row.nom}</td>
                                                <td className="py-3 pr-4 text-gray-500 text-xs">{row.categorie || '—'}</td>
                                                <td className="py-3 pr-4 font-bold text-gray-900">{row.prix_dh} DH</td>
                                                <td className="py-3 pr-4 text-gray-500">{row.stock}</td>
                                                <td className="py-3">
                                                    {row._status === 'ok' && <span className="text-emerald-600 text-[9px] font-black uppercase">✓ Importé</span>}
                                                    {row._status === 'error' && <span className="text-red-500 text-[9px] font-black uppercase">✗ Erreur</span>}
                                                    {row._status === 'pending' && <span className="text-gray-300 text-[9px] font-black uppercase">En attente</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Progress bar */}
                            {importProgress && (
                                <div className="px-6 pb-2">
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-300 rounded-full"
                                            style={{ width: `${(importProgress.done / importProgress.total) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-[9px] text-gray-400 mt-1 text-center">{importProgress.done} / {importProgress.total}</p>
                                </div>
                            )}

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-4">
                                <button onClick={() => { setShowImportModal(false); setImportProgress(null); setImportRows([]); }} className="px-6 py-3 border border-gray-200 text-gray-600 text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-gray-50 transition-all">
                                    Annuler
                                </button>
                                <button
                                    onClick={runImport}
                                    disabled={!!importProgress && importProgress.done < importProgress.total}
                                    className="flex items-center gap-3 px-8 py-3 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-primary transition-all disabled:opacity-50"
                                >
                                    {importProgress && importProgress.done < importProgress.total
                                        ? <><Loader2 size={14} className="animate-spin" /> Importation...</>
                                        : importProgress?.done === importProgress?.total && importProgress?.done > 0
                                            ? <><Check size={14} /> Terminé</>
                                            : <><FileUp size={14} /> Importer {importRows.length} produit{importRows.length > 1 ? 's' : ''}</>
                                    }
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Product form modal (unchanged) ── */}
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
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Nom du Produit</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Ex: Lissage Pro Intense..." className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-sm rounded-sm shadow-inner" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} placeholder="Décrivez ce produit..." className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-sm rounded-sm shadow-inner resize-none" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Prix (DH)</label>
                                        <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Stock</label>
                                        <input name="stock" type="number" value={formData.stock} onChange={handleInputChange} className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3 cursor-pointer p-4 border border-primary/20 rounded-sm bg-primary/5 hover:bg-primary/10 transition-colors">
                                        <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                                        <div>
                                            <span className="text-xs font-bold text-gray-700">Produit En Vedette</span>
                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Apparaît dans la section vedette de la page d'accueil</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-100 rounded-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <input type="checkbox" checked={formData.enableCart} onChange={(e) => { const c = e.target.checked; setFormData(prev => ({ ...prev, enableCart: c, directCheckout: (!c && !prev.directCheckout) ? true : prev.directCheckout })); }} className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                                        <span className="text-xs font-bold text-gray-700">Activer l'Ajout au Panier</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-100 rounded-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <input type="checkbox" checked={formData.directCheckout} onChange={(e) => { const c = e.target.checked; setFormData(prev => ({ ...prev, directCheckout: c, enableCart: (!c && !prev.enableCart) ? true : prev.enableCart })); }} className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                                        <span className="text-xs font-bold text-gray-700">Activer l'Achat Rapide</span>
                                    </label>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pl-1">Catégorie</label>
                                    <select name="category_id" value={formData.category_id} onChange={(e) => setFormData(prev => ({ ...prev, category_id: Number(e.target.value) }))} className="w-full px-6 py-5 bg-white border border-gray-100 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 text-sm rounded-sm shadow-inner uppercase tracking-widest font-bold text-gray-600 appearance-none">
                                        {categories.length === 0 && <option value={0}>Aucune catégorie</option>}
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                    {categories.length === 0 && <div className="flex items-center space-x-2 text-red-400 text-[10px] pl-1 font-bold"><AlertCircle size={12} /><span>Aucune catégorie trouvée.</span></div>}
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
                                                    {i > 0 && <button type="button" onClick={() => moveImage(i, 'left')} className="w-7 h-7 bg-white/90 text-gray-900 flex items-center justify-center rounded-full hover:bg-white"><ChevronLeft size={14} /></button>}
                                                    {i < formData.imageFiles.length - 1 && <button type="button" onClick={() => moveImage(i, 'right')} className="w-7 h-7 bg-white/90 text-gray-900 flex items-center justify-center rounded-full hover:bg-white"><ChevronRightIcon size={14} /></button>}
                                                </div>
                                                <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"><X size={12} /></button>
                                            </div>
                                        ))}
                                        {formData.imageFiles.length < 4 && (
                                            <label className="h-32 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-gray-300 hover:text-primary rounded-sm overflow-hidden relative">
                                                <Upload size={24} strokeWidth={1} />
                                                <span className="text-[8px] mt-2 uppercase font-bold tracking-[0.2em]">Ajouter Image</span>
                                                <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button disabled={loading || categories.length === 0} type="submit" className="w-full py-6 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-all duration-700 flex items-center justify-center space-x-4 shadow-2xl shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed group">
                                        {loading
                                            ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            : <><Check size={18} className="group-hover:scale-125 transition-transform" /><span>{isEditing ? 'Confirmer les Modifications' : 'Publier le Produit'}</span></>
                                        }
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
