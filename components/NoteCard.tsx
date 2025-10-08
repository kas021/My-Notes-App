
import React from 'react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formattedDate = new Date(note.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{note.title}</h2>
        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap flex-grow">{note.content}</p>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 rounded-b-lg">
        <p className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
