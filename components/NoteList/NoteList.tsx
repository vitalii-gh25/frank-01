//components/NoteList/NoteList.tsx

'use client';

import { useState } from 'react';
import type { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [previewId, setPreviewId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  const handleOpenPreview = (id: string) => {
    setPreviewId(id);
  };

  return (
    <>
      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <button
                type="button"
                className={css.link}
                onClick={() => handleOpenPreview(note.id)}
              >
                View details
              </button>

              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                disabled={mutation.isPending}
                className={css.button}
              >
                {mutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Відкриваємо модалку NotePreview на основі previewId */}
      {previewId && <NotePreview noteId={previewId} />}
    </>
  );
}
