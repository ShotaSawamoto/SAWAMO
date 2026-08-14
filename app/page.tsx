"use client";

import { useEffect, useState } from "react";

const services = [
  {
    no: "01",
    title: "Guesthouse",
    ja: "民泊開設・管理運営",
    copy: "土地と旅人のあいだに、心地よい滞在をつくる。物件選定・立ち上げから日々の運営まで、地域に馴染む宿づくりを支えます。",
    tone: "sand",
  },
  {
    no: "02",
    title: "Guiding &\nPhotograph, Videos",
    ja: "熊野古道観光案内・写真及び動画撮影",
    copy: "歩く速さで見えてくる、熊野の物語。土地の背景を伝えるガイドと、その人らしい旅の記憶を残す写真・映像を届けます。",
    tone: "moss",
  },
  {
    no: "03",
    title: "Software, Product,\nand Web/App Development",
    ja: "ソフトウェア・プロダクト・Web/アプリ開発",
    copy: "アイデアを、使われ続けるかたちへ。課題の整理から設計、デザイン、実装までを一貫して伴走します。",
    tone: "blue",
  },
  {
    no: "04",
    title: "AI English\nCoaching",
    ja: "AI英語コーチング",
    copy: "AIと人の対話を組み合わせた、続けられる英語学習。目標と生活リズムに合わせ、実践的な学び方を一緒に設計します。",
    tone: "coral",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="トップへ">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>S.S.</span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="メインナビゲーション">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#works" onClick={closeMenu}>Works</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow reveal">KUMANO, WAKAYAMA — JAPAN</p>
        <h1 id="hero-title" className="hero-title">
          <span>Make a place.</span>
          <span>Guide a journey.</span>
          <span>Build what&apos;s next.</span>
        </h1>
        <div className="hero-bottom">
          <p>宿、旅、テクノロジー、ことば。<br />異なる領域を横断し、新しい体験をつくります。</p>
          <a className="scroll-link" href="#about">
            <span>Scroll to explore</span><b aria-hidden="true">↓</b>
          </a>
        </div>
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <div className="section-label">
          <span>01</span><p>About</p>
        </div>
        <div className="about-copy">
          <h2 id="about-title">人と場所、<br />リアルとデジタルを<br />つなぐ仕事。</h2>
          <div className="about-detail">
            <p>熊野を拠点に、民泊運営、観光案内と撮影、ソフトウェア開発、AI英語コーチングに取り組んでいます。</p>
            <p>一見ばらばらに見える仕事の中心にあるのは、「まだ言葉になっていない価値を見つけ、届くかたちにする」こと。現場を知ることと、手を動かしてつくること。その両方を大切にしています。</p>
          </div>
        </div>
        <div className="about-note"><span>Based in</span><strong>KUMANO</strong><span>Available worldwide</span></div>
      </section>

      <section className="works section" id="works" aria-labelledby="works-title">
        <div className="section-label light">
          <span>02</span><p id="works-title">Works / Services</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className={`service ${service.tone}`} key={service.no}>
              <div className="service-no">{service.no}</div>
              <div className="service-title-wrap">
                <p>{service.ja}</p>
                <h3>{service.title.split("\n").map((line, index) => <span key={index}>{line}</span>)}</h3>
              </div>
              <p className="service-copy">{service.copy}</p>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="statement" aria-label="私たちの考え">
        <p>Small details.</p><p>Long journeys.</p><p>Meaningful work.</p>
      </section>

      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="section-label">
          <span>03</span><p>Contact</p>
        </div>
        <div className="contact-main">
          <p className="contact-kicker">Have a project in mind?</p>
          <h2 id="contact-title">一緒に、<br />何かを始めましょう。</h2>
          <a className="contact-link" href="mailto:contact@yourdomain.jp">
            <span>contact@yourdomain.jp</span><b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="トップへ">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>S.S.</span>
        </a>
        <p>Guesthouse / Guide / Development / Coaching</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  );
}
