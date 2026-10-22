export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="genre-tabs" role="group" aria-label="Lọc sách theo thể loại">
      {['all', ...genres].map((genre) => (
        <button
          type="button"
          key={genre}
          className={`genre-tab ${selected === genre ? 'selected' : ''}`}
          aria-pressed={selected === genre}
          onClick={() => onChange(genre)}
        >
          {genre === 'all' ? 'Tất cả sách' : genre}
        </button>
      ))}
    </div>
  );
}
