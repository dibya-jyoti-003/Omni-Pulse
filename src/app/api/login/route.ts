import { NextResponse } from 'next/server';

export async function POST() {
  const userId = crypto.randomUUID();
  return NextResponse.json({ userId });
}
