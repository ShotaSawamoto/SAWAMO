"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "../useLanguage";

const inquiryTypes = [
  { ja:"民泊開設コンサルティング", en:"Guesthouse Setup Consulting" },
  { ja:"民泊管理運営代行", en:"Guesthouse Management" },
  { ja:"宿泊について", en:"Accommodation" },
  { ja:"熊野古道通訳案内", en:"Kumano Kodo Guiding & Interpretation" },
  { ja:"その他", en:"Other" },
];
type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";
  const [submitState,setSubmitState] = useState<SubmitState>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitState !== "success") return;
    window.scrollTo({ top:0, behavior:"smooth" });
    successRef.current?.focus({ preventScroll:true });
  }, [submitState]);

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("_honey")) return;
    setSubmitState("sending");
    const payload = { _subject:"Kumano Trail Stays website enquiry", _template:"table", name:formData.get("name"), email:formData.get("email"), company:formData.get("company"), phone:formData.get("phone"), inquiry_type:formData.getAll("inquiry_type").join(", ") || "Not selected", message:formData.get("message"), _honey:"" };
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@kumanotrailstays.com", { method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" }, body:JSON.stringify(payload) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error("Submission failed");
      form.reset(); setSubmitState("success");
    } catch { setSubmitState("error"); }
  };

  return <main className="contact-page" lang={language}>
    <header className="site-header contact-page-header">
      <a className="brand" href="/" aria-label="Kumano Trail Stays"><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /></a>
      <nav className="nav contact-page-nav" aria-label={isEn ? "Main navigation" : "メインナビゲーション"}><a href="/#about">About</a><a href="/#services">Services</a><a href="/#service-staying-trigger">Stays</a><a href="/contact" aria-current="page">Contact</a></nav>
      <div className="header-actions"><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={isEn ? "日本語に切り替える" : "Switch to English"}><span>{isEn ? "JP" : "EN"}</span><small>{isEn ? "日本語" : "English"}</small></button><a className="contact-page-back" href="/">← {isEn ? "Back" : "戻る"}</a></div>
    </header>
    <section className={`contact-page-main ${submitState === "success" ? "is-success" : ""}`} aria-labelledby="contact-page-title">
      {submitState === "success" ? <div className="contact-success" ref={successRef} tabIndex={-1} role="status"><span className="contact-success-mark" aria-hidden="true">✓</span><p className="contact-page-eyebrow">Message sent</p><h1 id="contact-page-title">{isEn ? <>Thank you for<br />your enquiry.</> : <>お問い合わせを<br />送信しました。</>}</h1><p>{isEn ? "Thank you for contacting Kumano Trail Stays. We have received your message and will get back to you shortly." : "Kumano Trail Staysへお問い合わせいただき、ありがとうございます。内容を確認のうえ、折り返しご連絡いたします。"}</p><div className="contact-success-actions"><a className="contact-success-primary" href="/">{isEn ? "Return to home" : "トップページへ"}<span>→</span></a><button type="button" onClick={() => setSubmitState("idle")}>{isEn ? "Send another enquiry" : "続けて問い合わせる"}</button></div></div> : <>
      <div className="contact-page-intro"><p className="contact-page-eyebrow">Contact</p><h1 id="contact-page-title">{isEn ? <><span>Tell us about your</span><span>plans and journey.</span></> : <><span>まずは、あなたのお話を</span><span>聞かせてください。</span></>}</h1><p>{isEn ? "Please tell us what you can about accommodation, your guesthouse plans, management needs or Kumano Kodo journey." : "宿泊、民泊の開設・運営、熊野古道の通訳案内について、わかる範囲でお気軽にご記入ください。"}</p><p className="contact-page-required"><span>＊</span>{isEn ? "Required fields" : "は必須項目です。"}</p></div>
      <form className="contact-form" onSubmit={handleSubmit} aria-busy={submitState === "sending"}>
        <fieldset className="contact-form-types"><legend>{isEn ? "Type of enquiry" : "お問い合わせ種別"}</legend><div className="contact-checkbox-grid">{inquiryTypes.map((type) => <label key={type.en}><input type="checkbox" name="inquiry_type" value={type.en} /><span>{isEn ? type.en : type.ja}</span></label>)}</div></fieldset>
        <label className="contact-field"><span>{isEn ? "Company / Organisation" : "貴社名・屋号"}</span><input type="text" name="company" autoComplete="organization" /></label>
        <label className="contact-field"><span>{isEn ? "Name" : "お名前"} <b>＊</b></span><input type="text" name="name" autoComplete="name" required /></label>
        <label className="contact-field"><span>{isEn ? "Email address" : "メールアドレス"} <b>＊</b></span><input type="email" name="email" autoComplete="email" inputMode="email" required /></label>
        <label className="contact-field"><span>{isEn ? "Phone number" : "電話番号"}</span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" /></label>
        <label className="contact-field contact-field-message"><span>{isEn ? "Message" : "お問い合わせ内容"} <b>＊</b></span><textarea name="message" rows={8} required /></label>
        <input className="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <p className="contact-form-note">{isEn ? "The information you provide will only be used to respond to your enquiry." : "ご入力いただいた情報は、お問い合わせへの回答のためにのみ使用します。"}</p>
        <button className={`contact-submit ${submitState === "sending" ? "is-sending" : ""}`} type="submit" disabled={submitState === "sending"}><span>{submitState === "sending" ? (isEn ? "Sending…" : "送信しています…") : (isEn ? "Send enquiry" : "送信する")}</span><b aria-hidden="true">{submitState === "sending" ? "" : "→"}</b></button>
        <div className="contact-form-status" aria-live="assertive">{submitState === "error" && <p className="error" role="alert">{isEn ? "We could not send your enquiry. Please try again later or email info@kumanotrailstays.com." : "送信できませんでした。時間をおいて再度お試しいただくか、info@kumanotrailstays.comへ直接ご連絡ください。"}</p>}</div>
      </form>
      </>}
    </section>
    <footer className="contact-page-footer"><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /><p>Copyright © Kumano Trail Stays. All rights reserved.</p></footer>
  </main>;
}
