import fs from "node:fs";
import path from "node:path";

export interface BlogTopic {
  id: string;
  category: string;
  title: string;
  angle: string;
  keywords: string[];
  audience: string;
  used: boolean;
}

export interface StyleGuide {
  voice: string;
  length: string;
  required: string[];
  forbidden: string[];
  reference_posts: string[];
}

export interface TopicsFile {
  queue: BlogTopic[];
  style_guide: StyleGuide;
}

const TOPICS_PATH = path.join(process.cwd(), "content", "blog", "topics.json");

export function loadTopics(): TopicsFile {
  const raw = fs.readFileSync(TOPICS_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getNextTopic(topicId?: string): BlogTopic | null {
  const { queue } = loadTopics();
  if (topicId) {
    return queue.find((t) => t.id === topicId) ?? null;
  }
  return queue.find((t) => !t.used) ?? null;
}

export function getStyleGuide(): StyleGuide {
  return loadTopics().style_guide;
}
