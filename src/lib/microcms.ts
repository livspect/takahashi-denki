import { createClient, MicroCMSListResponse } from "microcms-js-sdk";

export type BlogCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
};

// microCMS の標準ブログテンプレに合わせる: 本文は content(リッチエディタ)、
// アイキャッチ画像は eyecatch。抜粋(excerpt)フィールドは無いので content から自動生成する。
export type BlogPost = {
  id: string;
  title: string;
  category?: BlogCategory;
  eyecatch?: { url: string; width: number; height: number };
  content: string;
  publishedAt: string;
  revisedAt: string;
  createdAt: string;
  updatedAt: string;
};

/** リッチエディタ(HTML)本文からプレーンテキストの抜粋を生成する。 */
export function blogExcerpt(html: string | undefined, max = 100): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const client =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (!client) return [];
  const res = await client.get<MicroCMSListResponse<BlogPost>>({
    endpoint: "blogs",
    queries: { limit, orders: "-publishedAt" },
  });
  return res.contents;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  if (!client) return null;
  try {
    return await client.get<BlogPost>({
      endpoint: "blogs",
      contentId: id,
    });
  } catch {
    return null;
  }
}

// 施工事例（microCMS の "works" エンドポイント）。
// エンドポイント未作成・env 無し・取得失敗時は [] を返し、呼び出し側でサンプルに
// フォールバックする（デグレ防止）。
export type WorkItem = {
  id: string;
  title: string;
  // セレクトフィールドは配列で返る（例 ["電気"]）。テキストにした場合は文字列。
  category?: string | string[];
  area?: string;
  year?: string;
  scale?: string;
  summary?: string;
  // 実写真は thumbnail(microCMS画像フィールド)、暫定/ダミーは image(テキストでパスやURL)を使う。
  thumbnail?: { url: string; width?: number; height?: number };
  image?: string;
  publishedAt?: string;
};

/** category(セレクト=配列 / テキスト=文字列)を表示・絞り込み用の文字列に正規化する。 */
export function workCategory(c: string | string[] | undefined): string {
  if (Array.isArray(c)) return c[0] ?? "その他";
  return c ?? "その他";
}

export async function getWorks(limit = 100): Promise<WorkItem[]> {
  if (!client) return [];
  try {
    const res = await client.get<MicroCMSListResponse<WorkItem>>({
      endpoint: "works",
      queries: { limit, orders: "-publishedAt" },
    });
    return res.contents;
  } catch {
    return [];
  }
}

export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
