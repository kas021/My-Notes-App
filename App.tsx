import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import ConfirmDialog from './components/ConfirmDialog';
import useLocalStorage from './hooks/useLocalStorage';
import type { Note } from './types';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('quicknotes-data', []);
  // This state determines what the user sees: the list of notes, or the editor.
  const [view, setView] = useState<'list' | 'edit' | 'create'>('list');
  // When editing, this holds the note being modified.
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  // State for the confirmation dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  const handleCreateNew = useCallback(() => {
    setSelectedNote(null);
    setView('create');
  }, []);

  const handleEdit = useCallback((note: Note) => {
    setSelectedNote(note);
    setView('edit');
  }, []);

  const handleSave = useCallback((noteToSave: Note) => {
    setNotes(prevNotes => {
      // Check if a note with the same ID already exists.
      const noteExists = prevNotes.some(n => n.id === noteToSave.id);
      if (noteExists) {
        // If it exists, update it.
        return prevNotes.map(n => (n.id === noteToSave.id ? noteToSave : n));
      } else {
        // Otherwise, add it as a new note.
        return [noteToSave, ...prevNotes];
      }
    });
    setView('list');
    setSelectedNote(null);
  }, [setNotes]);

  // This function is triggered when the user clicks the delete button on a note.
  // It opens the confirmation dialog.
  const handleRequestDelete = useCallback((id: string) => {
    setNoteToDeleteId(id);
    setIsConfirmOpen(true);
  }, []);

  // This is the actual deletion logic, called when the user confirms in the dialog.
  const handleConfirmDelete = useCallback(() => {
    if (noteToDeleteId) {
      setNotes(prevNotes => prevNotes.filter(n => n.id !== noteToDeleteId));
    }
    // Reset state and close dialog
    setIsConfirmOpen(false);
    setNoteToDeleteId(null);
  }, [noteToDeleteId, setNotes]);

  // This is called when the user cancels the deletion from the dialog.
  const handleCancelDelete = useCallback(() => {
    setIsConfirmOpen(false);
    setNoteToDeleteId(null);
  }, []);


  const handleCancel = useCallback(() => {
    setView('list');
    setSelectedNote(null);
  }, []);

  const sortedNotes = [...notes].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      {view === 'list' && <Header onNewNote={handleCreateNew} />}
      
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {view === 'list' ? (
          <div className="py-8">
            {sortedNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleRequestDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No notes yet!</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Click "New Note" to get started.</p>
              </div>
            )}
          </div>
        ) : (
          <NoteEditor
            noteToEdit={selectedNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </main>
      
      <Footer />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Note"
      >
        <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
      </ConfirmDialog>
    </div>
  );
}

export default App;
