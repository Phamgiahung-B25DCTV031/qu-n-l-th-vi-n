const palette = {
  'Văn học': 'cover-literature',
  'Khoa học': 'cover-science',
  'Công nghệ': 'cover-technology',
  'Kỹ năng': 'cover-skills',
};

export default function BookCard({ book, isFavorite, onFavorite, onDelete }) {
  return (
    <article className="book-card">
      <div className={`book-cover ${palette[book.genre] || 'cover-other'}`}>
        <span className="cover-symbol" aria-hidden="true">▤</span>
        <span className="cover-genre">{book.genre}</span>
        <span className="cover-id">{book.id}</span>
      </div>
      <div className="book-info">
        <span className="genre-tag">{book.genre}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Tác giả: {book.author}</p>
        <p className="book-year">Xuất bản: {book.year}</p>
        <div className="card-actions">
          <button
            type="button"
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            aria-pressed={isFavorite}
            aria-label={`${isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'} sách ${book.title}`}
            onClick={() => onFavorite(book.id)}
          >
            {isFavorite ? '♥ Đã yêu thích' : '♡ Yêu thích'}
          </button>
          <button type="button" className="delete-button" aria-label={`Xóa sách ${book.title}`} onClick={() => onDelete(book.id)}>
            Xóa
          </button>
        </div>
      </div>
    </article>
  );
}
