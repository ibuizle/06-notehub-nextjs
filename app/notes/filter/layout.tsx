import React from 'react';
import s from './LayoutNotes.module.css'; //

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}

export default function FilterLayout({ children, sidebar, modal }: LayoutProps) {
  return (
    <div className={s.container}>
      <aside className={s.sidebar}>
        {sidebar}
      </aside>
      <div className={s.notesWrapper}>
        {children}
        {modal}
      </div>
    </div>
  );
}