import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/Notes.client';

interface Props {
  params: Promise<{
    tag: string[];
  }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params;
  // Оскільки це [...tag], тут завжди щось буде. Беремо перший елемент.
  const tag = resolvedParams.tag[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}