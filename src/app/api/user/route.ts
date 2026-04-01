import { NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/serverStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') ?? 'demo-user';
  const user = getOrCreateUser(userId);
  return NextResponse.json({ user });
}
