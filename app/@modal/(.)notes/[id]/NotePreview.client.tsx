// app/@modal/(.)notes/[id]/NotePreview.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (error || !note) return <p>Failed to load note.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>{formattedDate}</p>
        <span>{note.tag}</span>
      </div>
    </Modal>
  );
}
