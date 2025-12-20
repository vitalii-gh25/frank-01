// app/notes/page.tsx

import { redirect } from 'next/navigation';

export default function NotesPage() {
  // Перенаправлення на "all notes"
  redirect('/notes/filter/all');
}
