import { NextResponse } from 'next/server';
import { MOCK_DATA } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ items: [] });
  }

  const items = MOCK_DATA.filter((item) => {
    const haystack = [
      item.title,
      item.author,
      item.description,
      item.type,
      ...(item.tags ?? []),
      ...(item.topics ?? [])
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  }).slice(0, 20);

  return NextResponse.json({ items });
}
