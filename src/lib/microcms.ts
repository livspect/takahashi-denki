import { createClient, MicroCMSListResponse } from "microcms-js-sdk";

export type BlogCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category?: BlogCategory;
  thumbnail?: { url: string; width: number; height: number };
  excerpt?: string;
  body: string;
  publishedAt: string;
  revisedAt: string;
  createdAt: string;
  updatedAt: string;
};

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
  category?: string; // 電気 / 空調 / 給排水 など
  area?: string;
  year?: string;
  scale?: string;
  summary?: string;
  thumbnail?: { url: string; width?: number; height?: number };
  publishedAt?: string;
};

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
