import Link from 'next/link';
import s from './Home.module.css'; 

export default function NotFound() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404 - Page not found</h1>
      <p className={s.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/" style={{ color: '#0d6efd', textDecoration: 'underline' }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}