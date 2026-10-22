import { useEffect, useMemo, useState } from 'react';

import { initialBooks } from './data/books.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import Footer from './components/Footer.jsx';

const PREFIX = 'lop-thu-vien-react-v1-';
function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function persist(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); }
  catch (error) { console.warn('Không thể lưu localStorage:', error); }
}
function normalize(text) {
  return String(text ?? '').toLocaleLowerCase('vi').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

export default function App() {
  // App giữ state chung, truyền dữ liệu + callback xuống các component qua props.
  const [books, setBooks] = useState(() => {
    const cached = readStored('books', initialBooks);
    return Array.isArray(cached) ? cached : initialBooks;
  });
  const [favorites, setFavorites] = useState(() => {
  const saved = readStored('favorites', []);
  return new Set(
    Array.isArray(saved) ? saved.map(String) : []
  );
});
  const [genre, setGenre] = useState('all');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => readStored('darkMode', false) === true);

  useEffect(() => persist('books', books), [books]);
  useEffect(() => persist('favorites', [...favorites]), [favorites]);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    persist('darkMode', darkMode);
  }, [darkMode]);

  // Set tạo tập thể loại không trùng, kể cả khi người dùng xóa hết sách một thể loại.
  const genres = useMemo(() => [...new Set([...initialBooks, ...books].map((book) => book.genre))].sort((a, b) => a.localeCompare(b, 'vi')), [books]);
  const filteredBooks = useMemo(() => books.filter((book) =>
    (genre === 'all' || book.genre === genre) &&
    normalize(book.title).includes(normalize(search.trim()))
  ), [books, genre, search]);
  const favoriteCount = books.filter((book) => favorites.has(String(book.id))).length;

  function toggleFavorite(id) {
    setFavorites((previous) => {
      const next = new Set(previous);
      if (next.has(String(id))) next.delete(String(id));
      else next.add(String(id));
      return next;
    });
  }
  function deleteBook(id) {
    const book = books.find((item) => String(item.id) === String(id));
    if (!book || !window.confirm(`Bạn có chắc muốn xóa "${book.title}"?`)) return;
    setBooks((previous) => previous.filter((item) => String(item.id) !== String(id)));
    setFavorites((previous) => {
      const next = new Set(previous);
      next.delete(String(id));
      return next;
    });
  }
  function addBook(book) {
    const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setBooks((previous) => [{ id, ...book }, ...previous]);
    setSearch(''); setGenre('all');
  }
  function resetBooks() {
    if (!window.confirm('Khôi phục toàn bộ 12 sách mẫu? Sách bạn tự thêm sẽ bị xóa.')) return;
    setBooks(initialBooks);
    setFavorites(new Set());
    setGenre('all'); setSearch('');
  }

  return (
    <div id="top">
      <Header favoriteCount={favoriteCount} darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />
      <main className="container">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-content">
            <p className="eyebrow">TỦ SÁCH CỦA CHÚNG MÌNH</p>
            <h1 id="hero-heading">Mỗi trang sách, <em>một chân trời mới.</em></h1>
            <p>Góc nhỏ dành cho những cuốn sách hay. Tìm điều bạn thích, lưu sách bạn yêu và chia sẻ tri thức cùng cả lớp.</p>
            <a className="hero-link" href="#book-form">+ Thêm sách vào thư viện <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="art-circle" /><span className="art-book art-book-one" /><span className="art-book art-book-two" /><span className="art-book art-book-three" />
          </div>
        </section>
        <Section id="books" eyebrow="BỘ SƯU TẬP" title="Khám phá sách hay" right={<span className="book-total">{books.length} cuốn sách</span>}>
          <div className="toolbar">
            <label className="search-wrap"><span aria-hidden="true">⌕</span><span className="sr-only">Tìm theo tên sách</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Tìm sách theo tên..." />
            </label>
            <button className="secondary-button" type="button" onClick={() => { setSearch(''); setGenre('all'); }}>Đặt lại lọc</button>
          </div>
          <GenreFilter genres={genres} selected={genre} onChange={setGenre} />
          <div className="results-line"><p role="status">Đang hiển thị {filteredBooks.length} / {books.length} cuốn</p><button className="text-button" onClick={resetBooks} type="button">↻ Khôi phục sách mẫu</button></div>
          <BookList books={filteredBooks} favorites={favorites} onFavorite={toggleFavorite} onDelete={deleteBook} />
        </Section>
        <BookForm genres={genres} onAdd={addBook} />
      </main>
      <Footer />
    </div>
  );
}
