"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "../useLanguage";

const courses = [
  { value:"Takijiri-oji to Tsugizakura-oji — JPY 58,000", ja:"滝尻王子〜継桜王子", en:"Takijiri-oji to Tsugizakura-oji", price:"58,000円" },
  { value:"Tsugizakura-oji to Kumano Hongu Taisha — JPY 58,000", ja:"継桜王子〜熊野本宮大社", en:"Tsugizakura-oji to Kumano Hongu Taisha", price:"58,000円" },
  { value:"Hosshinmon-oji to Kumano Hongu Taisha — JPY 38,000", ja:"発心門王子〜熊野本宮大社", en:"Hosshinmon-oji to Kumano Hongu Taisha", price:"38,000円" },
];

type SubmitState = "idle" | "sending" | "success" | "error";

export default function KumanoKodoBookingPage() {
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
    const payload = {
      _subject:"Kumano Kodo service booking enquiry",
      _template:"table",
      course:formData.get("course"),
      preferred_date:formData.get("preferred_date"),
      alternate_date:formData.get("alternate_date"),
      participants:formData.get("participants"),
      photo_video_request:formData.get("photo_video_request"),
      name:formData.get("name"),
      email:formData.get("email"),
      phone:formData.get("phone"),
      message:formData.get("message"),
      _honey:"",
    };
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@kumanotrailstays.com", { method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" }, body:JSON.stringify(payload) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error("Submission failed");
      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return <main className="contact-page booking-page" lang={language}>
    <header className="site-header contact-page-header">
      <a className="brand" href="/" aria-label="Kumano Trail Stays"><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /></a>
      <nav className="nav contact-page-nav" aria-label={isEn ? "Main navigation" : "メインナビゲーション"}><a href="/#about">About</a><a href="/#services">Services</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions"><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={isEn ? "日本語に切り替える" : "Switch to English"}><span>{isEn ? "JP" : "EN"}</span><small>{isEn ? "日本語" : "English"}</small></button><a className="contact-page-back" href="/#services">← {isEn ? "Back" : "戻る"}</a></div>
    </header>

    <section className={`contact-page-main booking-page-main ${submitState === "success" ? "is-success" : ""}`} aria-labelledby="booking-page-title">
      {submitState === "success" ? <div className="contact-success" ref={successRef} tabIndex={-1} role="status"><span className="contact-success-mark" aria-hidden="true">✓</span><p className="contact-page-eyebrow">Request sent</p><h1 id="booking-page-title">{isEn ? <>Thank you for<br />your request.</> : <>予約・お問い合わせを<br />送信しました。</>}</h1><p>{isEn ? "We have received your request. We will check availability and contact you shortly." : "内容を受け付けました。日程等を確認のうえ、折り返しご連絡いたします。"}</p><div className="contact-success-actions"><a className="contact-success-primary" href="/">{isEn ? "Return to home" : "トップページへ"}<span>→</span></a><button type="button" onClick={() => setSubmitState("idle")}>{isEn ? "Send another request" : "続けて問い合わせる"}</button></div></div> : <>
        <div className="contact-page-intro booking-page-intro"><p className="contact-page-eyebrow">Kumano Kodo Guide</p><h1 id="booking-page-title">{isEn ? <><span>Walk deeper into</span><span>the story of Kumano.</span></> : <><span>熊野古道を歩き、</span><span>旅の記憶を残す。</span></>}</h1><p>{isEn ? "English-language guiding, photography and optional video creation are available for your journey along the Kumano Kodo." : "熊野古道の歴史や信仰、自然をご案内しながら、旅の自然な表情を写真に収めます。ご希望に応じて動画制作にも対応します。"}</p><div className="booking-service-note"><strong>{isEn ? "Service includes" : "サービス内容"}</strong><p>{isEn ? "Guiding and interpretation on the Kumano Kodo, plus photography during the tour. Please let us know if you would also like a travel video." : "熊野古道の通訳案内とツアー中の写真撮影を含みます。動画制作をご希望の場合はフォームでお知らせください。"}</p></div><p className="contact-page-required"><span>＊</span>{isEn ? "Required fields" : "は必須項目です。"}</p></div>

        <form className="contact-form booking-form" onSubmit={handleSubmit} aria-busy={submitState === "sending"}>
          <fieldset className="booking-course-fieldset"><legend>{isEn ? "Select a course" : "コースを選択してください"} <b>＊</b></legend><div className="booking-course-grid">{courses.map((course,index) => <label key={course.value}><input type="radio" name="course" value={course.value} required /><span><small>0{index+1}</small><strong>{isEn ? course.en : course.ja}</strong><b>{course.price}</b></span></label>)}</div></fieldset>
          <div className="booking-fields-row"><label className="contact-field"><span>{isEn ? "Preferred date" : "第1希望日"} <b>＊</b></span><input type="date" name="preferred_date" required /></label><label className="contact-field"><span>{isEn ? "Alternate date" : "第2希望日"}</span><input type="date" name="alternate_date" /></label></div>
          <label className="contact-field"><span>{isEn ? "Number of participants" : "参加人数"} <b>＊</b></span><input type="number" name="participants" min="1" inputMode="numeric" required /></label>
          <fieldset className="booking-option-fieldset"><legend>{isEn ? "Photography / video request" : "写真・動画撮影のご希望"}</legend><div className="contact-checkbox-grid"><label><input type="radio" name="photo_video_request" value="Photography only" defaultChecked /><span>{isEn ? "Photography only" : "写真撮影のみ"}</span></label><label><input type="radio" name="photo_video_request" value="Photography and video" /><span>{isEn ? "Photography and video" : "写真・動画撮影"}</span></label><label><input type="radio" name="photo_video_request" value="Would like to discuss" /><span>{isEn ? "Would like to discuss" : "相談したい"}</span></label></div></fieldset>
          <label className="contact-field"><span>{isEn ? "Name" : "お名前"} <b>＊</b></span><input type="text" name="name" autoComplete="name" required /></label>
          <label className="contact-field"><span>{isEn ? "Email address" : "メールアドレス"} <b>＊</b></span><input type="email" name="email" autoComplete="email" inputMode="email" required /></label>
          <label className="contact-field"><span>{isEn ? "Phone number" : "電話番号"}</span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" /></label>
          <label className="contact-field contact-field-message"><span>{isEn ? "Questions or requests" : "ご質問・ご要望"}</span><textarea name="message" rows={7} /></label>
          <input className="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <p className="contact-form-note">{isEn ? "Submitting this form is a booking request, not a confirmed reservation. We will contact you after checking availability and details." : "フォームの送信時点では予約確定ではありません。空き状況と内容を確認後、こちらからの返信をもって予約内容をご案内します。"}</p>
          <button className={`contact-submit ${submitState === "sending" ? "is-sending" : ""}`} type="submit" disabled={submitState === "sending"}><span>{submitState === "sending" ? (isEn ? "Sending…" : "送信しています…") : (isEn ? "Send booking request" : "予約・問い合わせを送信する")}</span><b aria-hidden="true">{submitState === "sending" ? "" : "→"}</b></button>
          <div className="contact-form-status" aria-live="assertive">{submitState === "error" && <p className="error" role="alert">{isEn ? "We could not send your request. Please try again later or email info@kumanotrailstays.com." : "送信できませんでした。時間をおいて再度お試しいただくか、info@kumanotrailstays.comへ直接ご連絡ください。"}</p>}</div>
        </form>
      </>}
    </section>
    <footer className="contact-page-footer"><img src="/brand/kumano-trail-stays-logo.png" alt="Kumano Trail Stays" /><p>Copyright © Kumano Trail Stays. All rights reserved.</p></footer>
  </main>;
}
