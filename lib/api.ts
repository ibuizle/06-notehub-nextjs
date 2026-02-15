import axios from 'axios';
import { Note } from '@/types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const API_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: API_URL,
});

// Налаштування заголовка авторизації
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error('API Token not found inside .env file!');
}

// Інтерфейс відповіді від бекенду (список нотаток + пагінація)
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Оновлений інтерфейс параметрів запиту (додано tag)
interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string; // 👈 Нове поле для фільтрації
}

export type CreateNoteParams = Pick<Note, 'title' | 'content' | 'tag'>;

// Оновлена функція отримання нотаток
export const fetchNotes = async ({ 
  page, 
  perPage, 
  search = '', 
  tag = '' // За замовчуванням порожній рядок
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  
  // Створюємо об'єкт параметрів
  const params: Record<string, string | number> = {
    page,
    perPage,
    search,
  };

  // 👇 Логіка фільтрації:
  // Якщо тег передано і він НЕ дорівнює "all", додаємо його в запит.
  // Якщо tag === 'all', ми просто не надсилаємо цей параметр, і сервер повертає все.
  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
  });
  
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};