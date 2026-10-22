import BookCard from './BookCard.jsx';

export default function BookList({ books, favorites, onFavorite, onDelete }) {
  return (
    <div className="book-grid" aria-live="polite">
      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">⌕</div>
          <h3>Không tìm thấy sách phù hợp</h3>
          <p>Hãy thử tìm từ khóa khác hoặc đổi thể loại nhé!</p>
        </div>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.has(String(book.id))}
            onFavorite={onFavorite}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
