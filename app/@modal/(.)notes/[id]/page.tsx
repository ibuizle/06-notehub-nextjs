import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';

interface Props {
  // У Next.js 15 params — це Promise
  params: Promise<{
    id: string;
  }>;
}

export default async function InterceptedNotePage({ params }: Props) {
  // Очікуємо розв'язання промісу параметрів
  const { id } = await params;
  
  const queryClient = new QueryClient();

  // Попереднє завантаження даних на сервері для конкретної нотатки
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Відображаємо компонент попереднього перегляду, який містить Modal */}
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}