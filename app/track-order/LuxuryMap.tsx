"use client";

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface LuxuryMapProps {
    orderData: any;
    destCity: any;
    hubCity: any;
    routeGeometry: any;
    truckPosition: [number, number] | null;
    truckRotation: number;
    isCancelled: boolean;
    progressFactor: number;
    originIconInstance: any;
    destIconInstance: any;
    truckIconInstance: any;
    isFullscreen?: boolean;
    L: any; // <-- إضافة L كـ prop
}

const LuxuryMap = ({
    orderData,
    destCity,
    hubCity,
    routeGeometry,
    truckPosition,
    truckRotation,
    isCancelled,
    progressFactor,
    originIconInstance,
    destIconInstance,
    truckIconInstance,
    isFullscreen,
    L
}: LuxuryMapProps) => {
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<any[]>([]);
    const polylinesRef = useRef<any[]>([]);

    // تهيئة الخريطة
    useEffect(() => {
        if (!mapContainerRef.current || !L || mapRef.current) return;

        try {
            // إنشاء الخريطة
            const map = L.map(mapContainerRef.current, {
                zoomControl: false,
                center: [31.7917, -7.0926],
                zoom: 6
            });

            // إضافة طبقة الخريطة
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; CARTO'
            }).addTo(map);

            // إضافة أداة التحكم في التكبير
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            mapRef.current = map;

            // تحديث العناصر بعد إنشاء الخريطة
            updateMapElements();
        } catch (error) {
            console.error('Error initializing map:', error);
        }

        // تنظيف الخريطة عند إلغاء تحميل المكون
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [L]); // إعادة التشغيل فقط عند تغير L

    // تحديث العناصر على الخريطة
    const updateMapElements = () => {
        const map = mapRef.current;
        if (!map || !L) return;

        // إزالة جميع العناصر القديمة
        markersRef.current.forEach(marker => marker.remove());
        polylinesRef.current.forEach(polyline => polyline.remove());
        markersRef.current = [];
        polylinesRef.current = [];

        try {
            // إضافة نقطة الانطلاق (Hub)
            if (originIconInstance && hubCity) {
                const marker = L.marker([hubCity.lat, hubCity.lng], { icon: originIconInstance })
                    .addTo(map)
                    .bindPopup(`
                        <div class="p-4 bg-white/95 rounded-3xl text-center shadow-3xl">
                            <p class="text-[13px] font-black uppercase tracking-[0.4em] text-gray-950 mb-1 italic">HUB CENTRAL</p>
                            <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">${hubCity.name?.toUpperCase() || ''}, MAROC</p>
                        </div>
                    `);
                markersRef.current.push(marker);
            }

            // إضافة نقطة الوصول (Destination)
            if (destCity && destIconInstance) {
                const marker = L.marker([destCity.lat, destCity.lng], { icon: destIconInstance })
                    .addTo(map)
                    .bindPopup(`
                        <div class="p-4 bg-white/95 rounded-3xl text-center shadow-3xl">
                            <p class="text-[13px] font-black uppercase tracking-[0.4em] mb-1 italic ${isCancelled ? 'text-red-600' : 'text-[#c5a572]'}">${destCity.name?.toUpperCase() || ''}</p>
                            <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest italic">DESTINATION</p>
                        </div>
                    `);
                markersRef.current.push(marker);
            }

            // إضافة موقع الشاحنة
            if (!isCancelled && truckPosition && orderData?.status === 'shipped' && truckIconInstance) {
                const marker = L.marker(truckPosition, { icon: truckIconInstance }).addTo(map);
                markersRef.current.push(marker);
            }

            // إضافة مسار الرحلة
            if (routeGeometry && routeGeometry.length > 0) {
                if (!isCancelled) {
                    // المسار الخلفي (رمادي)
                    const bgPolyline = L.polyline(routeGeometry, {
                        color: '#1a1a1a',
                        weight: 4,
                        opacity: 0.1,
                        lineCap: 'round',
                        dashArray: '2, 10'
                    }).addTo(map);
                    polylinesRef.current.push(bgPolyline);

                    // مسار التقدم (ذهبي)
                    if (orderData?.status !== 'pending' && progressFactor > 0) {
                        const progressIndex = Math.floor(routeGeometry.length * progressFactor);
                        const progressRoute = routeGeometry.slice(0, progressIndex);
                        
                        if (progressRoute.length > 0) {
                            const progressPolyline = L.polyline(progressRoute, {
                                color: '#c5a572',
                                weight: 8,
                                opacity: 1,
                                lineCap: 'round',
                                lineJoin: 'round'
                            }).addTo(map);
                            polylinesRef.current.push(progressPolyline);
                        }
                    }
                } else {
                    // مسار ملغي (أحمر متقطع)
                    const cancelledPolyline = L.polyline(routeGeometry, {
                        color: '#dc2626',
                        weight: 3,
                        opacity: 0.4,
                        lineCap: 'round',
                        dashArray: '10, 20'
                    }).addTo(map);
                    polylinesRef.current.push(cancelledPolyline);
                }
            }

            // تكبير الخريطة لإظهار كامل المسار
            if (hubCity && destCity) {
                const bounds = L.latLngBounds(
                    [hubCity.lat, hubCity.lng],
                    [destCity.lat, destCity.lng]
                );
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        } catch (error) {
            console.error('Error updating map elements:', error);
        }
    };

    // تحديث العناصر عند تغير البيانات
    useEffect(() => {
        if (mapRef.current && L) {
            updateMapElements();
        }
    }, [
        hubCity,
        destCity,
        routeGeometry,
        truckPosition,
        isCancelled,
        progressFactor,
        orderData?.status,
        originIconInstance,
        destIconInstance,
        truckIconInstance
    ]);

    // إعادة ضبط حجم الخريطة عند تغير وضع ملء الشاشة
    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
                // إعادة تكبير الخريطة بعد تغيير الحجم
                if (hubCity && destCity) {
                    const bounds = L.latLngBounds(
                        [hubCity.lat, hubCity.lng],
                        [destCity.lat, destCity.lng]
                    );
                    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
                }
            }, 300);
        }
    }, [isFullscreen, hubCity, destCity, L]);

    if (!L) {
        return (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-2xl">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div 
            ref={mapContainerRef}
            className={cn(
                "w-full h-full transition-all duration-1000",
                isCancelled ? "grayscale opacity-60" : "grayscale-[0.1] hover:grayscale-0"
            )}
        />
    );
};

// دالة مساعدة لدمج الفئات
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

export default LuxuryMap;