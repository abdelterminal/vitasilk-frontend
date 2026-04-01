"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Check, RotateCcw } from 'lucide-react';

interface ImageCropperProps {
    image: string;
    onCrop: (croppedImage: string) => void;
    onCancel: () => void;
}

export default function ImageCropper({ image, onCrop, onCancel }: ImageCropperProps) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            imgRef.current = img;
        };
    }, [image]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleCrop = () => {
        if (!imgRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Final cropped size
        const size = 400;
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);

        // Draw image based on position and zoom
        const img = imgRef.current;
        const aspect = img.width / img.height;

        let drawW, drawH;
        if (aspect > 1) {
            drawH = size * zoom;
            drawW = drawH * aspect;
        } else {
            drawW = size * zoom;
            drawH = drawW / aspect;
        }

        const drawX = (size - drawW) / 2 + position.x;
        const drawY = (size - drawH) / 2 + position.y;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        onCrop(canvas.toDataURL('image/jpeg', 0.8));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-950/90 backdrop-blur-sm"
                onClick={onCancel}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-sans font-bold text-gray-900 tracking-tight">Ajuster Votre Portrait</h3>
                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">Finition de prestige Vitasilk</p>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Cropping Area */}
                <div className="bg-gray-50 p-8 flex items-center justify-center overflow-hidden">
                    <div
                        className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-primary shadow-2xl overflow-hidden cursor-move bg-white"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <div
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                            }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <img src={image} alt="To crop" className="max-w-none h-full object-contain" />
                        </div>
                        {/* Overlay to show what remains */}
                        <div className="absolute inset-0 pointer-events-none ring-[100px] ring-black/40 rounded-full" />
                    </div>
                </div>

                {/* Controls */}
                <div className="p-8 space-y-8 bg-white">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setZoom(Math.max(1, zoom - 0.1))} className="p-3 bg-gray-50 rounded-xl hover:text-primary transition-all shadow-sm">
                            <ZoomOut size={18} />
                        </button>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="flex-1 accent-primary h-1 bg-gray-100 rounded-full appearance-none cursor-pointer"
                        />
                        <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-3 bg-gray-50 rounded-xl hover:text-primary transition-all shadow-sm">
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); }}
                            className="flex-1 py-5 border border-gray-100 rounded-2xl text-[10px] uppercase font-black tracking-widest text-gray-400 hover:text-gray-950 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={14} /> Réinitialiser
                        </button>
                        <button
                            onClick={handleCrop}
                            className="flex-[2] py-5 bg-gray-900 text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                        >
                            <Check size={16} /> Confirmer le Portrait
                        </button>
                    </div>
                </div>

                {/* Hidden Canvas */}
                <canvas ref={canvasRef} className="hidden" />
            </motion.div>
        </div>
    );
}
