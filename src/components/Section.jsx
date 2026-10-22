// Component dùng props.children theo yêu cầu bài học.
export default function Section({ id, eyebrow, title, right, className = '', children }) {
  return (
    <section id={id} className={`library-section ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="section-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-heading`}>{title}</h2></div>
        {right}
      </div>
      {children}
    </section>
  );
}
