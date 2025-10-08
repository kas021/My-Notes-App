
import React, { useState, useEffect } from 'react';
import type { Note } from '../types';

interface NoteEditorProps {
  noteToEdit?: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // When a note is passed for editing, we populate the form fields.
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
        alert("Please fill in both the title and content.");
        return;
    };

    const note: Note = {
      id: noteToEdit ? noteToEdit.id : `note-${Date.now()}`,
      title: title,
      content: content,
      timestamp: Date.now(),
    };
    onSave(note);
  };

  const isEditing = !!noteToEdit;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        {isEditing ? 'Edit Note' : 'Create a New Note'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your note's title"
              className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200">
            Content
          </label>
          <div className="mt-2">
            <textarea
              id="content"
              name="content"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
