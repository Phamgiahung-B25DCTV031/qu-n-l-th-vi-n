export default function Header({ favoriteCount, darkMode, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Trang chủ Thư viện lớp học">
          <span className="brand-icon" aria-hidden="true">▥</span>
          <span><strong>Thư viện lớp học</strong><small>Khám phá tri thức mỗi ngày</small></span>
        </a>
        <div className="header-actions">
          <span className="favorite-counter">♥ {favoriteCount} yêu thích</span>
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Chuyển chế độ sáng tối" title={darkMode ? 'Bật sáng' : 'Bật tối'}>
            {darkMode ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </header>
  );
}
