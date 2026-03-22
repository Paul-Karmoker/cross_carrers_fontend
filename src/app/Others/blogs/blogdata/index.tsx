// blogs/blogdata/index.ts
import { blogPosts as blogPosts01 } from './blogdata01';   // first batch (posts 1–50)
import { blogPosts as blogPosts02 } from './blogdata02';
import { blogPosts as blogPosts03 } from './blogdata03';           // second batch (uncomment when ready)
// import { blogPosts03 } from './blogdata03';           // third batch

import { BlogPost, authorPaul } from './type';

// Merge all posts into one array
export const blogPosts: BlogPost[] = [
  ...blogPosts01,
  ...blogPosts02,
  ...blogPosts03,
];

// Re‑export types and author so components can import them from the same path
export type { BlogPost };
export { authorPaul };