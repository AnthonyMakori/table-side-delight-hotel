import { ApiRoom } from '@/types/accommodation';

const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchRooms(): Promise<ApiRoom[]> {
  const res = await fetch(`${API_BASE}/rooms`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch rooms (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as ApiRoom[] | any;
  return Array.isArray(data) ? data : [];
}
