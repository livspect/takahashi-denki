// Cloudflare Worker
// - /api/contact (POST): お問い合わせフォームの内容を受け取り、Email Sending で
//   contact@taka-den.net 宛にメール送信する。
// - それ以外: 静的アセット(./out)をそのまま配信する。
//
// taka-den.net は Email Sending 有効済み。送信元は同ドメインの noreply@taka-den.net。

interface EmailMessage {
  to: string | string[];
  from: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

interface Env {
  EMAIL: { send(message: EmailMessage): Promise<unknown> };
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const TO_EMAIL = "contact@taka-den.net";
const FROM_EMAIL = "noreply@taka-den.net";
const FROM_NAME = "たかはし電器 お問い合わせフォーム";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405);
      }
      return handleContact(request, env);
    }
    // /api/* 以外（run_worker_first 対象外）は通常ここには来ないが、念のため静的配信。
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env): Promise<Response> {
  let data: Record<string, string> = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = (await request.json()) as Record<string, string>;
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) data[k] = String(v);
    }
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  const type = clip(data.type || "その他", 100);
  const name = clip(data.name, 100);
  const kana = clip(data.kana, 100);
  const company = clip(data.company, 200);
  const email = clip(data.email, 200);
  const tel = clip(data.tel, 50);
  const message = clip(data.message, 5000);

  if (!name || !email || !message) {
    return json({ ok: false, error: "required_fields" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  const text = [
    `■ お問い合わせ種別: ${type}`,
    `■ お名前: ${name}`,
    `■ フリガナ: ${kana || "（未記入）"}`,
    `■ 会社名・所属: ${company || "（未記入）"}`,
    `■ メールアドレス: ${email}`,
    `■ 電話番号: ${tel || "（未記入）"}`,
    "",
    "■ お問い合わせ内容:",
    message,
    "",
    "--",
    "このメールは有限会社たかはし電器のお問い合わせフォームから自動送信されました。",
    "返信はこのメールにそのまま返信すると送信者へ届きます（Reply-To 設定済み）。",
  ].join("\n");

  try {
    await env.EMAIL.send({
      to: TO_EMAIL,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: email,
      subject: `【お問い合わせ】${type} / ${name} 様`,
      text,
      html: `<pre style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin:0;">${escapeHtml(
        text,
      )}</pre>`,
    });
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

function clip(v: string | undefined, max: number): string {
  return (v ?? "").toString().trim().slice(0, max);
}

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}
