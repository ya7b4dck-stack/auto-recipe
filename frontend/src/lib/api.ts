import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

export function getPostSlugs() {
  return fs.readdirSync(contentDir)
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    title: data.title,
    ai_assistant: data.ai_assistant,
    difficulty: data.difficulty,
    estimated_time_min: data.estimated_time_min,
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // 時間がかかる順にソートするなどの処理も可能
    .sort((post1, post2) => (post1.estimated_time_min > post2.estimated_time_min ? -1 : 1));
  return posts;
}
