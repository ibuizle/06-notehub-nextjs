import Link from 'next/link';
import s from './SidebarNotes.module.css';

const TAGS = ['all', 'Work', 'Personal', 'Study', 'Important', 'Ideas'];

export default function SidebarNotes() {
  return (
    <div className={s.sidebar}>
      <ul className={s.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={s.menuItem}>
            <Link 
              href={`/notes/filter/${tag}`} 
              className={s.menuLink}
            >
              {tag === 'all' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}