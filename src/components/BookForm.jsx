import { useState } from 'react';

const nowYear = new Date().getFullYear();
const emptyForm = { title: '', author: '', genre: '', year: '' };

function validate(name, value, genres) {
  const text = String(value).trim();
  if (name === 'title') return text.length < 3 ? 'Tên sách phải có ít nhất 3 ký tự.' : '';
  if (name === 'author') return text ? '' : 'Vui lòng nhập tên tác giả.';
  if (name === 'genre') return genres.includes(text) ? '' : 'Vui lòng chọn thể loại hợp lệ.';
  if (name === 'year') {
    if (!/^\d{4}$/.test(text)) return 'Năm xuất bản phải gồm 4 chữ số.';
    return Number(text) >= 1900 && Number(text) <= nowYear ? '' : `Năm phải từ 1900 đến ${nowYear}.`;
  }
  return '';
}

export default function BookForm({ genres, onAdd }) {
  const [values, setValues] = useState(emptyForm);
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const errors = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, validate(name, value, genres)]));

  function update(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setMessage('');
  }

  function submit(event) {
    event.preventDefault();
    setTouched({ title: true, author: true, genre: true, year: true });
    if (Object.values(errors).some(Boolean)) {
      setMessage('Vui lòng kiểm tra lại thông tin được đánh dấu.');
      return;
    }
    onAdd({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre,
      year: Number(values.year),
    });
    setValues(emptyForm);
    setTouched({});
    setMessage('Đã thêm sách mới vào thư viện!');
  }

  return (
    <section className="add-section" id="book-form" aria-labelledby="form-heading">
      <div className="form-intro">
        <p className="eyebrow">ĐÓNG GÓP CÙNG LỚP</p>
        <h2 id="form-heading">Thêm một cuốn sách mới</h2>
        <p>Có một cuốn sách thú vị muốn chia sẻ? Hãy thêm vào thư viện của lớp nhé!</p>
        <div className="form-decoration" aria-hidden="true">✧</div>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="book-title">Tên sách <span>*</span></label>
          <input id="book-title" value={values.title} onChange={(e) => update('title', e.target.value)} placeholder="Ví dụ: Đắc Nhân Tâm" aria-invalid={Boolean(touched.title && errors.title)} aria-describedby="title-error" />
          <small id="title-error" className="field-error">{touched.title && errors.title}</small>
        </div>
        <div className="field">
          <label htmlFor="book-author">Tác giả <span>*</span></label>
          <input id="book-author" value={values.author} onChange={(e) => update('author', e.target.value)} placeholder="Tên tác giả" aria-invalid={Boolean(touched.author && errors.author)} aria-describedby="author-error" />
          <small id="author-error" className="field-error">{touched.author && errors.author}</small>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="book-genre">Thể loại <span>*</span></label>
            <select id="book-genre" value={values.genre} onChange={(e) => update('genre', e.target.value)} aria-invalid={Boolean(touched.genre && errors.genre)} aria-describedby="genre-error">
              <option value="">Chọn thể loại</option>
              {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
            </select>
            <small id="genre-error" className="field-error">{touched.genre && errors.genre}</small>
          </div>
          <div className="field">
            <label htmlFor="book-year">Năm xuất bản <span>*</span></label>
            <input id="book-year" type="number" min="1900" max={nowYear} value={values.year} onChange={(e) => update('year', e.target.value)} placeholder="Ví dụ: 2023" aria-invalid={Boolean(touched.year && errors.year)} aria-describedby="year-error" />
            <small id="year-error" className="field-error">{touched.year && errors.year}</small>
          </div>
        </div>
        <button className="primary-button" type="submit">+ Thêm sách vào thư viện</button>
        <p role="status" className="form-message" data-kind={message.startsWith('Đã') ? 'success' : 'error'}>{message}</p>
      </form>
    </section>
  );
}
