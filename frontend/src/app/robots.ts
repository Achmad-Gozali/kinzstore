import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Auth placeholders and legal boilerplate — no search value, excluded from crawling and from sitemap.ts. */
const DISALLOWED_PATHS = ["/masuk", "/daftar", "/kebijakan-privasi", "/syarat-ketentuan"];

/**
 * AI crawlers used for LLM training / AI-answer scraping, explicitly disallowed.
 * Googlebot (Search) is deliberately NOT in this list — only Google-Extended (Gemini/AI
 * training opt-out token) is blocked, so normal Google Search indexing is unaffected.
 * User-agent tokens verified against each vendor's published crawler documentation.
 */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot", // OpenAI — training crawler
  "ChatGPT-User", // OpenAI — live browsing on behalf of ChatGPT users
  "Google-Extended", // Google — Gemini/AI training opt-out (does not affect Googlebot Search)
  "CCBot", // Common Crawl — dataset widely reused for LLM training
  "anthropic-ai", // Anthropic
  "ClaudeBot", // Anthropic — Claude training crawler
  "Bytespider", // ByteDance/TikTok
  "PerplexityBot", // Perplexity AI
  "Diffbot", // Diffbot
  "Omgilibot", // Webz.io/Omgili
  "FacebookBot", // Meta — AI/language model training crawler
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
