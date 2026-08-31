"use client";

import { useState, useEffect } from 'react';
import { Zap, Save, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

export default function TrackingManager() {
  const [pixelId, setPixelId] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/tracking')
      .then(r => r.json())
      .then(d => setPixelId(d.meta_pixel_id || ''))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus('idle');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('vs_token') : null;
      const res = await fetch('/api/admin/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ meta_pixel_id: pixelId.trim() }),
      });
      setStatus(res.ok ? 'saved' : 'error');
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Paramètres</p>
        <h2 className="text-2xl font-sans font-light text-gray-900">Tracking & Pixels</h2>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden max-w-xl">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Zap size={15} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Meta Pixel (Facebook)</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Collez l'ID de votre pixel pour activer le suivi des conversions</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">
              Pixel ID
            </label>
            <input
              type="text"
              value={pixelId}
              onChange={e => setPixelId(e.target.value)}
              placeholder="Ex: 854475387521991"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
            <p className="text-[10px] text-gray-400 mt-2">
              Trouvez l'ID dans{' '}
              <a
                href="https://business.facebook.com/events_manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-0.5"
              >
                Meta Events Manager <ExternalLink size={10} />
              </a>
            </p>
          </div>

          {pixelId.trim() && (
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Aperçu</p>
              <code className="text-xs text-gray-700 font-mono">fbq('init', '{pixelId.trim()}')</code>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>

            {status === 'saved' && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={14} /> Enregistré — actif sur le site
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                <AlertCircle size={14} /> Erreur lors de l'enregistrement
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 max-w-xl">
        <p className="text-[10px] uppercase tracking-widest font-bold text-amber-700 mb-1">Comment ça marche</p>
        <p className="text-xs text-amber-800 leading-relaxed">
          Collez votre Pixel ID ci-dessus et cliquez Enregistrer. Le pixel sera automatiquement chargé sur toutes les pages du site, sans intervention technique.
          Pour désactiver le tracking, videz le champ et enregistrez.
        </p>
      </div>
    </div>
  );
}
