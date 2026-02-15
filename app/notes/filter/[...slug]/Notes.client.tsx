'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from '@/app/notes/NotesPage.module.css';

interface Props {
  initialTag: string;
}

export default function NotesClient({ initialTag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tag = useMemo(() => initialTag ?? 'all', [initialTag]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search,
        tag,
      }),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Add note
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {!isLoading && !isError && data && (
        <>
          <NoteList notes={data.notes} />

          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={({ selected }) =>
              setCurrentPage(selected + 1)
            }
          />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
