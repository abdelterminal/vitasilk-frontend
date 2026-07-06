import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'homepage-config.json');

const DEFAULT_CONFIG = {
  sections: [
    { id: 's1', title: 'Soins Capillaires', subtitle: 'Botox & Filler', visible: true, layout: 'featured', mode: 'category', categorySlug: 'soins-capillaires', productIds: [], count: 5, slot: 'after-marquee' },
    { id: 's2', title: 'Lissage Professionnel', subtitle: 'Protéines 1L', visible: true, layout: 'featured', mode: 'category', categorySlug: 'lissage-professionnel-1l', productIds: [], count: 5, slot: 'after-marquee' },
    { id: 's3', title: 'Soins de Cheveux', subtitle: 'Shampooings & Soins', visible: true, layout: 'carousel', mode: 'category', categorySlug: 'soins-de-cheveux', productIds: [], count: 6, slot: 'after-marquee' },
    { id: 's4', title: 'Matériel Pro', subtitle: 'Équipements professionnels', visible: true, layout: 'carousel', mode: 'category', categorySlug: 'materiel', productIds: [], count: 6, slot: 'after-marquee' },
    { id: 's5', title: 'Coffrets & Kits', subtitle: 'Nos packs exclusifs', visible: false, layout: 'carousel', mode: 'category', categorySlug: 'nos-coffrets', productIds: [], count: 6, slot: 'after-marquee' },
  ],
};

function readConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return DEFAULT_CONFIG;
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function GET() {
  return NextResponse.json(readConfig());
}

export async function POST(req: Request) {
  // Verify admin JWT via the Express backend
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const meRes = await fetch(`${apiBase}/auth/me`, {
      headers: { Authorization: authHeader },
    });
    if (!meRes.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: user } = await meRes.json();
    if (user?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch {
    return NextResponse.json({ error: 'Auth check failed' }, { status: 401 });
  }

  try {
    const body = await req.json();
    fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('homepage config write error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to save' }, { status: 500 });
  }
}
