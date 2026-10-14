"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./useLanguage";

const services = [
  { id:"consulting", audience:"business", ja:"民泊開設コンサルティング", en:"Guesthouse Setup Consulting", leadJa:"宿を始める、その一歩目から。", leadEn:"From the first idea to opening day.", copyJa:"物件や地域の特性を活かしたコンセプト設計から、許認可取得、設備・備品の選定、料金設計、予約サイトへの掲載、運営体制づくりまで。民泊開設に必要な工程を整理し、開業まで伴走します。", copyEn:"From concept development that makes the most of your property and its location to licensing, equipment selection, pricing, booking-site setup and operating systems, we organise every step required to open your guesthouse and support you through launch.", detailJa:"初めて宿泊事業に取り組む方にも分かりやすく、実際の運営を見据えた無理のない計画をご提案します。", detailEn:"We provide clear, practical plans for first-time accommodation operators, always designed with day-to-day operations in mind.", photos:[] },
  { id:"management", audience:"business", ja:"民泊管理運営代行", en:"Guesthouse Management", leadJa:"日々の運営を、地域から支える。", leadEn:"Reliable local support for everyday operations.", copyJa:"予約管理、ゲストとの連絡、チェックイン案内、清掃手配、価格調整、カスタマーサポートまで、宿の運営を一括して支援します。", copyEn:"We provide end-to-end operational support, including reservation management, guest communication, check-in guidance, cleaning coordination, pricing adjustments and customer service.", detailJa:"オーナー様の負担を減らしながら、ゲストに選ばれ続ける宿づくりと、安定した運営を目指します。", detailEn:"Our goal is to reduce the owner’s workload while building a well-run property that guests continue to choose.", photos:[] },
  { id:"staying", audience:"consumer", ja:"管理施設での宿泊", en:"Stays at Managed Properties", leadJa:"熊野で、心地よく滞在する。", leadEn:"A welcoming base for your time in Kumano.", copyJa:"Kumano Trail Staysが管理運営をお手伝いしている宿泊施設をご案内します。地域での時間をゆっくりと楽しめる、それぞれに個性のある宿を掲載しています。", copyEn:"Discover accommodation whose day-to-day operations are supported by Kumano Trail Stays. Each property offers its own welcoming base from which to enjoy the region at a relaxed pace.", detailJa:"現在、自社で保有・直営する宿泊施設はありません。掲載しているのは、オーナー様から管理運営をお任せいただいている施設です。ご予約や空室状況は、各施設の予約ページでご確認いただけます。", detailEn:"We do not currently own or directly operate accommodation. The properties shown here are independently owned and managed with our operational support. Availability and bookings are handled through each property’s booking page.", ctaJa:"宿泊について問い合わせる", ctaEn:"Ask about accommodation", ctaHref:"/contact", showStays:true, photos:[] },
  { id:"guiding", audience:"consumer", ja:"熊野古道通訳案内及び写真・動画撮影", en:"Kumano Kodo Guiding, Photography & Videography", leadJa:"道の物語を知れば、旅はもっと深くなる。", leadEn:"Discover the stories that make every step meaningful.", copyJa:"世界遺産・熊野古道の歴史、信仰、自然、地域の暮らしを、歩くペースに合わせてご案内します。英語での通訳案内に加え、ツアー中の自然な表情や古道を歩く姿を写真に収め、ご希望に応じて旅の動画も制作します。", copyEn:"Explore the history, spirituality, nature and local life of the World Heritage Kumano Kodo at a pace that suits you. Alongside English-language guiding and interpretation, we photograph natural moments on the trail and can also create a video of your journey on request.", detailJa:"地図を見るだけでは出会えない背景や物語に触れながら、ご自身では残しにくい旅の瞬間を美しく記録します。熊野で過ごす時間と、その記憶を持ち帰れる旅をお手伝いします。", detailEn:"Go beyond the map, connect with the stories behind the trail and bring home beautiful images of moments that are difficult to capture by yourself.", photos:["/brand/kumano-gallery/kumano-01.jpg","/brand/kumano-gallery/kumano-03.jpg","/brand/kumano-gallery/kumano-06.jpg","/brand/kumano-gallery/kumano-08.jpg","/brand/kumano-gallery/kumano-09.jpg","/brand/kumano-gallery/kumano-10.jpg"] },
];

const serviceGroups = [
  { id:"consumer", label:"to C", titleJa:"熊野を旅する方へ", titleEn:"For travellers to Kumano" },
  { id:"business", label:"to B", titleJa:"宿泊事業者・オーナーの方へ", titleEn:"For businesses & property owners" },
];

const stays = [
  { name:"Guesthouse Fukufuku", image:"/brand/guesthouse-fukufuku.png", url:"https://www.booking.com/hotel/jp/guesthouse-fukufuku.ja.html", label:"Guesthouse / Tanabe" },
  { name:"workation + guesthouse Ōgama", image:"/brand/workation-guesthouse-ogama.avif", url:"https://www.airbnb.jp/rooms/1467783801385196536", label:"Workation stay / Susami" },
];

const formatJapaneseServiceTitle = (title:string) => {
  const [before, after] = title.split("及び");
  return after ? <>{before}及び<br />{after}</> : title;
};

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; const height = document.documentElement.scrollHeight - window.innerHeight; if (progressRef.current) progressRef.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`; if (window.scrollY > 20) setHasScrolled(true); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive:true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleService = (id:string, trigger:HTMLButtonElement) => {
    if (openService === id) { setOpenService(null); return; }
    const article = trigger.closest<HTMLElement>(".service-card");
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    setOpenService(id);
    if (article) requestAnimationFrame(() => window.scrollTo({ top:Math.max(0,window.scrollY + article.getBoundingClientRect().top - headerHeight - 12), behavior:"smooth" }));
  };

  return <main id="top" lang={language}>
    <div className="progress" ref={progressRef} />
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Kumano Trail Stays"><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /></a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label={isEn ? "Main navigation" : "メインナビゲーション"}><a href="#about" onClick={closeMenu}>About</a><a href="#services" onClick={closeMenu}>Services</a><a className="nav-stays" href="#service-staying-trigger" onClick={() => { setOpenService("staying"); closeMenu(); }}>Stays</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
      <div className="header-actions"><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={isEn ? "日本語に切り替える" : "Switch to English"}><span>{isEn ? "JP" : "EN"}</span><small>{isEn ? "日本語" : "English"}</small></button><button className={menuOpen ? "menu-button open" : "menu-button"} type="button" aria-label={menuOpen ? (isEn ? "Close menu" : "メニューを閉じる") : (isEn ? "Open menu" : "メニューを開く")} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button></div>
    </header>

    <section className="hero" aria-labelledby="hero-title"><div className="hero-image" aria-hidden="true" /><div className="hero-overlay" aria-hidden="true" /><div className="hero-content"><p className="hero-eyebrow">Kumano Trail Stays — Tanabe, Wakayama</p>{isEn ? <><h1 id="hero-title" className="hero-title-en"><span>Connecting Kumano</span><span>with the world.</span></h1><p className="hero-en" lang="ja">宿と旅で、熊野と世界をつなぐ。</p></> : <><h1 id="hero-title"><span>宿と旅で、</span><span>熊野と世界をつなぐ。</span></h1><p className="hero-en" lang="en">Connecting Kumano with the world<br />through stays and journeys.</p></>}</div><div className="trail-lines" aria-hidden="true"><i /><i /><i /></div><a className={`scroll-cue ${hasScrolled ? "hidden" : ""}`} href="#about" aria-hidden={hasScrolled} tabIndex={hasScrolled ? -1 : undefined}><span>Scroll to explore</span><b>↓</b></a></section>

    <section className="about section" id="about" aria-labelledby="about-title"><div className="section-heading"><p>About</p><h2 id="about-title">{isEn ? <>Creating new ways to stay<br />and travel in Kumano.</> : <>熊野で、宿と旅の<br />新しい選択肢をつくる。</>}</h2></div><div className="about-grid"><div className="about-copy">{isEn ? <><p>Based in Tanabe, Wakayama, Kumano Trail Stays supports the setup and operation of accommodation and provides guided interpretation on the Kumano Kodo.</p><p>Drawing on our local experience and practical knowledge of hospitality, we create welcoming stays and meaningful encounters for both visitors and the people who call Kumano home.</p></> : <><p>Kumano Trail Staysは、和歌山県田辺市を拠点に、宿泊施設の開設・運営と熊野古道の通訳案内を行っています。</p><p>地域で暮らしてきた経験と、宿泊事業に携わってきた知識を活かし、熊野を訪れる人と地域で暮らす人の双方にとって、心地よい滞在と新しい出会いをつくります。</p></>}</div></div></section>

    <section className="services section" id="services" aria-labelledby="services-title"><div className="section-heading light"><p>Services</p><h2 id="services-title">{isEn ? "Nurturing stays. Deepening journeys." : "宿を育て、旅を深める。"}</h2></div><div className="service-groups">{serviceGroups.map((group) => <section className="service-group" key={group.id} aria-labelledby={`service-group-${group.id}`}><div className="service-group-heading"><span>{group.label}</span><h3 id={`service-group-${group.id}`}>{isEn ? group.titleEn : group.titleJa}</h3></div><div className="service-list">{services.filter((service) => service.audience === group.id).map((service) => { const index = services.findIndex((item) => item.id === service.id); return <article className={`service-card ${openService === service.id ? "open" : ""}`} key={service.id}><button className="service-trigger" id={`service-${service.id}-trigger`} type="button" aria-expanded={openService === service.id} aria-controls={`service-${service.id}`} onClick={(event) => toggleService(service.id,event.currentTarget)}><span className="service-number">0{index+1}</span><span className="service-titles"><strong>{isEn ? service.en : formatJapaneseServiceTitle(service.ja)}</strong><small>{isEn ? formatJapaneseServiceTitle(service.ja) : service.en}</small></span><span className="service-lead">{isEn ? service.leadEn : service.leadJa}</span><span className="service-toggle" aria-hidden="true"><i />{openService === service.id ? "Close" : "View"}</span></button><div className="service-panel" id={`service-${service.id}`} aria-hidden={openService !== service.id}><div className="service-panel-inner"><p>{isEn ? service.copyEn : service.copyJa}</p><p>{isEn ? service.detailEn : service.detailJa}</p>{service.showStays && <div className="stay-grid service-stays" aria-label={isEn ? "Managed properties" : "管理運営を支援している宿泊施設"}>{stays.map((stay) => <a className="stay-card" href={stay.url} target="_blank" rel="noreferrer" key={stay.name}><div className="stay-image"><img src={stay.image} alt={isEn ? `${stay.name} accommodation` : `${stay.name}の施設写真`} loading="lazy" /></div><div className="stay-meta"><p>{stay.label}</p><h3>{stay.name}</h3><span aria-hidden="true">↗</span></div></a>)}</div>}{service.photos.length > 0 && <div className="service-gallery" aria-label={isEn ? "Kumano Kodo guiding, photography and videography gallery" : "熊野古道通訳案内及び写真・動画撮影ギャラリー"}>{service.photos.map((photo,photoIndex) => <figure key={photo}><img src={photo} alt={isEn ? `Kumano Kodo guiding, photography and videography work ${photoIndex+1}` : `熊野古道での通訳案内及び写真・動画撮影作品 ${photoIndex+1}`} loading="lazy" /></figure>)}</div>}<a className="service-panel-cta" href={service.ctaHref ?? "/contact"}>{isEn ? (service.ctaEn ?? "Ask about this service") : (service.ctaJa ?? "このサービスについて相談する")}<span>→</span></a></div></div></article>; })}</div></section>)}</div></section>

    <section className="contact section" id="contact" aria-labelledby="contact-title"><div className="contact-inner"><p>Contact</p><h2 id="contact-title">{isEn ? <>Tell us about your stay<br />or journey.</> : <>宿のこと、旅のこと。<br />まずはお聞かせください。</>}</h2><p className="contact-copy">{isEn ? "Feel free to contact us about places to stay, starting or managing accommodation, or arranging a guided journey on the Kumano Kodo—even if your plans are still taking shape." : "宿泊先のご相談、民泊の開設・運営、熊野古道の案内について、内容が固まっていなくてもお気軽にご相談ください。"}</p><a className="contact-button" href="/contact">{isEn ? "Go to contact form" : "お問い合わせフォームへ"}<span>→</span></a><div className="contact-direct"><a href="mailto:info@kumanotrailstays.com">info@kumanotrailstays.com</a><a href="tel:08057185597">080-5718-5597</a></div></div></section>
    <footer><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /><p>Copyright © Kumano Trail Stays. All rights reserved.</p></footer>
  </main>;
}
