import { useEffect, useRef, useState } from "react";

const AMAZON_URL = "https://www.amazon.com/dp/B0GLJ4WN5P";
const REVIEWS_URL = "https://www.amazon.com/product-reviews/B0GLJ4WN5P";
// Replace the empty address with the authors' public inbox before launch.
const CONTACT_URL = "mailto:?subject=Walk%20the%20Right%20Path%20inquiry";
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const previewPages = [
  { src: asset("assets/preview/cover.jpg"), alt: "Marjan's Moment book cover" },
  { src: asset("assets/preview/marjan.jpg"), alt: "Meet Marjan character page" },
  { src: asset("assets/preview/saalih.jpg"), alt: "Meet Saalih character page" },
  { src: asset("assets/preview/bilal.jpg"), alt: "Meet Bilal character page" },
  { src: asset("assets/preview/opening.jpg"), alt: "Opening story page" },
  { src: asset("assets/preview/kitchen.jpg"), alt: "Opening illustration page" },
];

function Reader({ onClose }) {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState("");
  const dialogRef = useRef(null);
  const touchStart = useRef(null);

  const changePage = (direction) => {
    const next = page + direction;
    if (next < 0 || next >= previewPages.length) return;
    setTurning(direction > 0 ? "turn-next" : "turn-back");
    window.setTimeout(() => {
      setPage(next);
      setTurning("");
    }, 170);
  };

  useEffect(() => {
    dialogRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") changePage(1);
      if (event.key === "ArrowLeft") changePage(-1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.classList.add("reader-open");
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("reader-open");
    };
  }, [page, onClose]);

  return (
    <div className="reader-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="reader" role="dialog" aria-modal="true" aria-label="Preview the first pages" ref={dialogRef} tabIndex={-1}>
        <div className="reader-topbar">
          <div>
            <p className="eyebrow">Book preview</p>
            <h2>Marjan’s Moment</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close book preview">×</button>
        </div>
        <div className="page-stage" onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}
          onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 45) changePage(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}>
          <span className="book-spine" aria-hidden="true" />
          <img className={`preview-page ${turning}`} src={previewPages[page].src} alt={previewPages[page].alt} draggable="false" />
        </div>
        <div className="reader-controls">
          <button onClick={() => changePage(-1)} disabled={page === 0} aria-label="Previous page">← <span>Previous</span></button>
          <p aria-live="polite">{page + 1} of {previewPages.length}</p>
          <button onClick={() => changePage(1)} disabled={page === previewPages.length - 1} aria-label="Next page"><span>Next</span> →</button>
        </div>
        <p className="preview-note">Preview pages are reduced-resolution samples. The complete book is not stored on this website.</p>
        <a className="reader-buy" href={AMAZON_URL} target="_blank" rel="noreferrer">Get the book on Amazon</a>
      </section>
    </div>
  );
}

function Author({ image, name, children }) {
  return (
    <article className="author">
      <img className="author-portrait" src={image} alt={`Illustrated portrait of ${name}`} />
      <div><h3>{name}</h3><p>{children}</p></div>
    </article>
  );
}

export function App() {
  const [readerOpen, setReaderOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <a href="#top" aria-label="Walk the Right Path home"><img src={asset("assets/brand-lockup.png")} alt="Walk the Right Path" /></a>
      </header>
      <main id="top">
        <section className="hero" aria-label="Marjan's Moment featured book">
          <img className="hero-image" src={asset("assets/hero-art.webp")} alt="Marjan's Moment book displayed in a bright garden beside an open illustrated storybook" />
          <button className="hero-hotspot preview-hotspot" onClick={() => setReaderOpen(true)} aria-label="Read the first pages of Marjan's Moment" />
          <a className="hero-hotspot amazon-hotspot" href={AMAZON_URL} target="_blank" rel="noreferrer" aria-label="Buy Marjan's Moment on Amazon" />
          <button className="hero-hotspot left-hotspot" onClick={() => setReaderOpen(true)} aria-label="Open book preview" />
          <button className="hero-hotspot right-hotspot" onClick={() => setReaderOpen(true)} aria-label="Open book preview" />
        </section>
        <section className="story-section section-shell">
          <div className="story-copy">
            <p className="eyebrow">Marjan’s Moment</p><h1>About the Story</h1>
            <p>When Marjan’s new laptop is accidentally broken by her brother Bilal, anger takes over. A sudden turn of events causes her to reconsider what forgiveness really means.</p>
            <p className="story-heart">A heartfelt story about mistakes, mercy, and moving on.</p>
          </div>
          <aside className="review-card" aria-label="Reader review">
            <p className="stars" aria-label="Five out of five stars">★★★★★</p>
            <blockquote>“A short and sweet book with a weighty message.”</blockquote>
            <a href={REVIEWS_URL} target="_blank" rel="noreferrer">Read reviews on Amazon <span aria-hidden="true">→</span></a>
          </aside>
        </section>
        <section className="authors-section section-shell">
          <p className="eyebrow">The mother–daughter team</p><h2>Meet the Authors</h2>
          <div className="authors-list">
            <Author image={asset("assets/esha-portrait.png")} name="Esha Mirza">Esha Mirza is a young author, spoken word artist, and storyteller from Northern New Jersey. She brings humor and heart to her writing and plays soccer and basketball for her school. She also participates in Young Muslims and volunteers at her local masjid.</Author>
            <Author image={asset("assets/sheleeza-portrait.png")} name="Sheleeza Baksh">Sheleeza Baksh is a Guyanese-born teacher and writer who now calls New Jersey home. With a degree in Journalism from the University of Guyana, she writes stories that reflect authentic Muslim experiences and values. She enjoys spending time with her family and volunteering at Islamic organizations and masjids.</Author>
          </div>
        </section>
        <section className="contact-section"><h2>Contact</h2><span aria-hidden="true" /><a href={CONTACT_URL}>Send an Email</a></section>
      </main>
      <footer><img src={asset("assets/brand-lockup-footer.png")} alt="Walk the Right Path" /><p>© {new Date().getFullYear()} Walk the Right Path</p></footer>
      {readerOpen && <Reader onClose={() => setReaderOpen(false)} />}
    </>
  );
}
