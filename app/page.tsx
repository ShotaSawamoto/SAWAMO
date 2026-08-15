"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    no: "01",
    title: "Guesthouse",
    ja: "民泊開設・管理運営",
    lead: "民泊経営を、ワンストップで。",
    copy: "豊富な民泊事業の運営実績をベースに、許認可取得から、日々の運営管理、カスタマーサポートまで、民泊経営のすべてをワンストップでお任せいただけます。オーナー様の資産価値を高め、確かな収益化を実現します。",
    works: [
      {
        name: "Guesthouse Fukufuku",
        image: "/brand/guesthouse-fukufuku.png",
        url: "https://www.booking.com/hotel/jp/guesthouse-fukufuku.ja.html",
      },
      {
        name: "workation + guesthouse Ōgama",
        image: "/brand/workation-guesthouse-ogama.avif",
        url: "https://www.airbnb.jp/rooms/1467783801385196536?check_in=2026-09-22&check_out=2026-09-24&location=%E3%81%99%E3%81%95%E3%81%BF&search_mode=regular_search&source_impression_id=p3_1786746349_P3ffVY3wiotQuMqc&previous_page_section_name=1001&federated_search_id=23a6152e-cb47-4164-879a-37cbbaa0177b",
      },
    ],
    photos: [],
    tone: "sand",
  },
  {
    no: "02",
    title: "Guiding &\nPhotograph, Videos",
    ja: "熊野古道観光案内・\n写真及び動画撮影",
    lead: "熊野古道の物語と、旅の瞬間を残す。",
    copy: "神聖な空気が満ちる世界遺産「熊野古道」。歴史や自然に精通したガイドが古の道をご案内するとともに、その旅のワンシーンをプロのカメラワークで写真と動画に残します。\n地図を見るだけでは味わえないディープな歴史解説や自然の背景に触れながら、自分たちだけでは撮影しづらい自然体の笑顔や、雄大な自然の中を歩くドラマチックな瞬間を美しく切り取ります。",
    works: [],
    photos: [
      "/brand/kumano-gallery/kumano-01.jpg",
      "/brand/kumano-gallery/kumano-03.jpg",
      "/brand/kumano-gallery/kumano-06.jpg",
      "/brand/kumano-gallery/kumano-08.jpg",
      "/brand/kumano-gallery/kumano-09.jpg",
      "/brand/kumano-gallery/kumano-10.jpg",
    ],
    tone: "moss",
  },
  {
    no: "03",
    title: "Software, Product,\nand Web/App Development",
    ja: "ソフトウェア・プロダクト\nWeb/アプリ開発",
    lead: "構想から運用まで、ビジネスに伴走。",
    copy: "お客様のビジネスにおける複雑な課題解決や、ゼロから創り出す新規事業の立ち上げに向け、要件定義からUI/UXデザイン、システム設計、開発、そしてリリース後の運用・保守まで、すべてのフェーズを一気通貫でサポートいたします。\n常に「ユーザーファースト」の視点に立った設計を追求することで、ビジネスの成果に直結する確かな価値を持つソフトウェア・プロダクトを提供します。\nお客様のビジネスの成長を長期的に加速させる最適なパートナーとして、構想段階から伴走し、理想を形にするお手伝いをいたします。",
    works: [],
    photos: [],
    tone: "blue",
  },
  {
    no: "04",
    title: "AI-Based English Coaching",
    ja: "AI英語コーチング",
    lead: "AIで、一人ひとりに最適な英語学習を。",
    copy: "独自のAI英語学習アプリを活用し、あなたの苦手分野を精密に特定し、一人ひとりの目標とレベルに合わせた最適な学習プランをご提案。さらに、AIを活用したリアルで実践的な英会話トレーニングにより、最短距離での英語力向上をサポートします。",
    works: [],
    photos: [],
    tone: "coral",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);
  const stabilizingScroll = useRef<{ frame: number; previousBehavior: string } | null>(null);

  const stopStabilizingScroll = () => {
    if (!stabilizingScroll.current) return;
    cancelAnimationFrame(stabilizingScroll.current.frame);
    document.documentElement.style.scrollBehavior = stabilizingScroll.current.previousBehavior;
    stabilizingScroll.current = null;
  };

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
      if (window.scrollY > 20) setHasScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      stopStabilizingScroll();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const toggleService = (serviceNo: string, trigger: HTMLButtonElement) => {
    stopStabilizingScroll();

    if (openService === serviceNo) {
      setOpenService(null);
      return;
    }

    const article = trigger.closest<HTMLElement>(".service");
    if (!article) {
      setOpenService(serviceNo);
      return;
    }

    const initialTop = article.getBoundingClientRect().top;
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 0;
    const targetTop = headerHeight;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 60 : 520;
    const moveDuration = reducedMotion ? 1 : 360;
    const startedAt = performance.now();
    root.style.scrollBehavior = "auto";
    setOpenService(serviceNo);

    const stabilize = (now: number) => {
      const elapsed = now - startedAt;
      const moveProgress = Math.min(elapsed / moveDuration, 1);
      const easedProgress = 1 - Math.pow(1 - moveProgress, 3);
      const desiredTop = initialTop + (targetTop - initialTop) * easedProgress;
      const offset = article.getBoundingClientRect().top - desiredTop;
      if (Math.abs(offset) > 0.5) window.scrollBy(0, offset);

      if (elapsed < duration) {
        const frame = requestAnimationFrame(stabilize);
        stabilizingScroll.current = { frame, previousBehavior };
      } else {
        root.style.scrollBehavior = previousBehavior;
        stabilizingScroll.current = null;
      }
    };

    const frame = requestAnimationFrame(stabilize);
    stabilizingScroll.current = { frame, previousBehavior };
  };

  return (
    <main id="top">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className="site-header">
        <div className="brand">
          <img className="brand-mark" src="/brand/sawamo-mark-transparent.png" alt="" />
          <span className="brand-name">SAWAMO</span>
        </div>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="メインナビゲーション">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#works" onClick={closeMenu}>Works / Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button
          className={menuOpen ? "menu-button open" : "menu-button"}
          type="button"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          <span>地域のために、</span>
          <span>自分ができることを。</span>
          <span className="hero-en" lang="en">What I can do for the community.</span>
        </h1>
        <a
          className={`scroll-cue ${hasScrolled ? "hidden" : ""}`}
          href="#about"
          aria-label="Aboutへスクロール"
          aria-hidden={hasScrolled}
          tabIndex={hasScrolled ? -1 : undefined}
        >
          <span>Scroll</span>
          <b aria-hidden="true">↓</b>
        </a>
        <div className="water-sculpture" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className="bubbles bubbles-one" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="bubbles bubbles-two" aria-hidden="true"><i /><i /><i /></div>
      </section>

      <section className="about section" id="about" aria-label="About">
        <div className="section-label">
          <p>About</p>
        </div>
        <div className="about-copy">
          <figure className="about-photo">
            <img src="/brand/profile-dual.jpg" alt="澤本将太のビジネスとアウトドアのプロフィール写真" />
          </figure>
          <div className="about-detail">
            <h2>澤本 将太 / Shota Sawamoto</h2>
            <p>田辺で暮らし、地域の人や風景に触れるなかで見えてきた課題に、自分の経験と技術で向き合いたい。そんな思いから、民泊の開設・運営、熊野古道の観光案内と撮影、ソフトウェア開発、AI英語コーチングに取り組んでいます。</p>
            <p>宿を整え、旅の魅力を伝え、必要な仕組みをつくり、学びを支える。分野は違っても、目指しているのは地域で暮らす人と訪れる人の選択肢を増やすこと。小さな実践を積み重ねながら、田辺のこれからに役立つ仕事を育てていきます。</p>
          </div>
        </div>
      </section>

      <section className="works section" id="works" aria-labelledby="works-title">
        <div className="section-label light">
          <p id="works-title">Works / Services</p>
        </div>
        <p className="works-mobile-guide">各項目をタップすると、写真や実績をご覧いただけます。</p>
        <div className="service-list">
          {services.map((service) => (
            <article className={`service ${service.tone} ${openService === service.no ? "open" : ""}`} key={service.no}>
              <button
                className="service-trigger"
                type="button"
                aria-expanded={openService === service.no}
                aria-controls={`service-panel-${service.no}`}
                onClick={(event) => toggleService(service.no, event.currentTarget)}
              >
                <div className="service-title-wrap">
                  <p className="service-ja">{service.ja.split("\n").map((line, index) => <span key={index}>{line}</span>)}</p>
                  <h3>{service.title.split("\n").map((line, index) => <span key={index}>{line}</span>)}</h3>
                </div>
                <div className="service-summary">
                  <p className="service-lead">{service.lead}</p>
                  <p className="service-copy">{service.copy}</p>
                </div>
                <span className="service-action" aria-hidden="true">
                  <span className="service-action-label">{openService === service.no ? "閉じる" : "写真・実績を見る"}</span>
                  <span className="service-arrow">↓</span>
                </span>
              </button>
              <div className="service-panel" id={`service-panel-${service.no}`} aria-hidden={openService !== service.no}>
                <div className="service-panel-inner">
                  {service.works.length > 0 ? (
                    <div className="service-works">
                      {service.works.map((work) => (
                        <a className="service-work" href={work.url} target="_blank" rel="noreferrer" aria-label={`${work.name}の予約ページを開く`} key={work.url}>
                          <strong>{work.name}</strong>
                          <span className="service-work-visual">
                            <img src={work.image} alt={`${work.name}の室内`} />
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : service.photos.length > 0 ? (
                    <div className="service-gallery" aria-label="熊野古道で撮影した写真">
                      {service.photos.map((photo, index) => (
                        <figure key={photo}>
                          <img src={photo} alt={`熊野古道での観光案内・撮影作品 ${index + 1}`} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  ) : (
                    <p className="service-future"><span>Photos / Works / Links</span>写真・実績・関連リンクは今後追加予定です。</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="section-label">
          <p>Contact</p>
        </div>
        <div className="contact-main">
          <p className="contact-kicker">How can I help?</p>
          <h2 id="contact-title">まずは、あなたのお話を<br className="contact-mobile-break" />聞かせてください。</h2>
          <a className="contact-link" href="/contact">
            <span>お問い合わせ</span><b aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer>
        <p>Copyright© SAWAMO All rights reserved.</p>
      </footer>
    </main>
  );
}
