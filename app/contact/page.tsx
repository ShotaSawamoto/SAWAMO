"use client";

import { FormEvent, useState } from "react";

const inquiryTypes = [
  "民泊開設・管理運営",
  "熊野古道観光案内・写真及び動画撮影",
  "ソフトウェア・プロダクト・Web/アプリ開発",
  "AI英語コーチング",
  "その他",
];

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) return;

    setSubmitState("sending");

    const payload = {
      _subject: "SAWAMO Webサイトからのお問い合わせ",
      _template: "table",
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      inquiry_type: formData.getAll("inquiry_type").join("、") || "未選択",
      message: formData.get("message"),
      _honey: "",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/sawamo.umehikari@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) throw new Error("Submission failed");

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <main className="contact-page">
      <header className="site-header contact-page-header">
        <div className="brand">
          <img className="brand-mark" src="/brand/sawamo-mark-transparent.png" alt="" />
          <span className="brand-name">SAWAMO</span>
        </div>
        <nav className="nav contact-page-nav" aria-label="メインナビゲーション">
          <a href="/#about">About</a>
          <a href="/#works">Works / Services</a>
          <a href="/contact" aria-current="page">Contact</a>
        </nav>
        <a className="contact-page-back" href="/">← Back</a>
      </header>

      <section className="contact-page-main" aria-labelledby="contact-page-title">
        <div className="contact-page-intro">
          <p className="contact-page-eyebrow">Contact</p>
          <h1 id="contact-page-title"><span>まずは、あなたのお話を</span><span>聞かせてください。</span></h1>
          <p>民泊の開設・運営、熊野古道の観光案内や撮影、ソフトウェア開発、英語コーチングについて、わかる範囲でお気軽にご記入ください。</p>
          <p className="contact-page-required"><span>＊</span>は必須項目です。</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <fieldset className="contact-form-types">
            <legend>お問い合わせ種別</legend>
            <div className="contact-checkbox-grid">
              {inquiryTypes.map((type) => (
                <label key={type}>
                  <input type="checkbox" name="inquiry_type" value={type} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="contact-field">
            <span>貴社名・屋号</span>
            <input type="text" name="company" autoComplete="organization" />
          </label>

          <label className="contact-field">
            <span>お名前 <b>＊</b></span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label className="contact-field">
            <span>メールアドレス <b>＊</b></span>
            <input type="email" name="email" autoComplete="email" inputMode="email" required />
          </label>

          <label className="contact-field">
            <span>電話番号</span>
            <input type="tel" name="phone" autoComplete="tel" inputMode="tel" />
          </label>

          <label className="contact-field contact-field-message">
            <span>お問い合わせ内容 <b>＊</b></span>
            <textarea name="message" rows={8} required />
          </label>

          <input className="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <p className="contact-form-note">ご入力いただいた情報は、お問い合わせへの回答のためにのみ使用します。</p>

          <button className="contact-submit" type="submit" disabled={submitState === "sending"}>
            <span>{submitState === "sending" ? "送信中…" : "送信する"}</span>
            <b aria-hidden="true">→</b>
          </button>

          <div className="contact-form-status" aria-live="polite">
            {submitState === "success" && <p className="success">お問い合わせを送信しました。ありがとうございます。</p>}
            {submitState === "error" && <p className="error">送信できませんでした。時間をおいて再度お試しいただくか、sawamo.umehikari@gmail.comへ直接ご連絡ください。</p>}
          </div>
        </form>
      </section>

      <footer className="contact-page-footer">
        <p>Copyright© SAWAMO All rights reserved.</p>
      </footer>
    </main>
  );
}
