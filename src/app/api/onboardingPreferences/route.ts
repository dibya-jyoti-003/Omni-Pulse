import { NextResponse } from 'next/server';
import { getOrCreateUser, updateUserInterests } from '@/lib/serverStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') ?? 'demo-user';
  const user = getOrCreateUser(userId);
  return NextResponse.json({ user });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    userId?: string;
    interests?: string[];
  };

  const userId = body?.userId ?? 'demo-user';
  const interests = body?.interests ?? [];
  const user = updateUserInterests(userId, interests);
  return NextResponse.json({ user });
}
