import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'tracking-config.json');

function readConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return { meta_pixel_id: '' };
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  } catch {
    return { meta_pixel_id: '' };
  }
}

export async function GET() {
  return NextResponse.json(readConfig());
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const meRes = await fetch(`${apiBase}/auth/me`, { headers: { Authorization: authHeader } });
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
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to save' }, { status: 500 });
  }
}
