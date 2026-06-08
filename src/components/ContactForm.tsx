"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const sentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 送信完了時は、フォーム下部から完了メッセージが見える位置へスクロールする。
  useEffect(() => {
    if (status === "sent") {
      sentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  // 採用ページの「この職種に応募する」等から ?type=...&role=... で来た場合、
  // お問い合わせ種別と本文をプリフィルし、フォームへスクロールする。
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const role = params.get("role");

    if (type) {
      const sel = form.elements.namedItem("type") as HTMLSelectElement | null;
      if (sel && Array.from(sel.options).some((o) => o.value === type)) {
        sel.value = type;
      }
    }
    if (role) {
      const msg = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (msg && !msg.value) {
        msg.value = `「${role}」の求人について応募・お問い合わせします。\n\n`;
      }
    }
    if (type || role) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const agree = form.elements.namedItem("agree") as HTMLInputElement | null;
    if (!agree?.checked) {
      setError("プライバシーポリシーへの同意が必要です。");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && data.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(
          "送信に失敗しました。お手数ですが、お電話（03-3752-3570）でお問い合わせください。",
        );
      }
    } catch {
      setStatus("error");
      setError(
        "送信に失敗しました。通信環境をご確認のうえ、再度お試しください。",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={sentRef}
        className="bg-muted p-8 lg:p-12 flex flex-col items-center text-center min-h-[480px] justify-center scroll-mt-28"
      >
        <div className="w-14 h-14 rounded-full bg-brand-700 text-white flex items-center justify-center text-2xl mb-6">
          ✓
        </div>
        <h2 className="text-2xl font-black mb-3">送信しました</h2>
        <p className="text-sm text-foreground/75 leading-relaxed mb-8">
          お問い合わせありがとうございます。
          <br />
          担当者より2営業日以内にご返信いたします。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-bold text-brand-700 hover:text-brand-800"
        >
          別のお問い合わせをする
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full p-3 border border-[color:var(--border)] bg-white text-sm";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="bg-muted p-8 lg:p-12 space-y-6 scroll-mt-24"
    >
      <div>
        <h2 className="text-2xl font-black mb-2">お問い合わせフォーム</h2>
        <p className="text-sm text-foreground/70">
          必須項目をご記入の上、ご送信ください。担当者より2営業日以内にご返信いたします。
        </p>
      </div>

      <Field label="お問い合わせ種別" required>
        <select name="type" className={inputClass} defaultValue="施工のご依頼・お見積り">
          <option>施工のご依頼・お見積り</option>
          <option>採用について</option>
          <option>協力会社のご相談</option>
          <option>取材・メディア</option>
          <option>その他</option>
        </select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="お名前" required>
          <input type="text" name="name" required placeholder="山田 太郎" className={inputClass} />
        </Field>
        <Field label="フリガナ" required>
          <input type="text" name="kana" required placeholder="ヤマダ タロウ" className={inputClass} />
        </Field>
      </div>

      <Field label="会社名・所属">
        <input type="text" name="company" placeholder="株式会社サンプル" className={inputClass} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="メールアドレス" required>
          <input type="email" name="email" required placeholder="sample@example.com" className={inputClass} />
        </Field>
        <Field label="電話番号" required>
          <input type="tel" name="tel" required placeholder="03-0000-0000" className={inputClass} />
        </Field>
      </div>

      <Field label="お問い合わせ内容" required>
        <textarea name="message" required rows={8} placeholder="ご相談内容をご記入ください。" className={inputClass} />
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="agree" className="mt-1" />
        <span>
          <a href="/privacy" className="text-brand-700 underline">
            プライバシーポリシー
          </a>
          に同意します。
        </span>
      </label>

      {error && (
        <p className="text-sm font-bold text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brand-700 text-white py-4 font-black text-base hover:bg-brand-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-2">
        {label}
        {required && (
          <span className="ml-2 text-[10px] bg-brand-700 text-white px-2 py-0.5 align-middle">
            必須
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
