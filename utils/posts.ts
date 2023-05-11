export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
}

// Importing two new std lib functions to help with parsing front matter and joining file paths.
import { extract } from "https://deno.land/std@0.162.0/encoding/front_matter.ts";
import { join } from "https://deno.land/std@0.162.0/path/mod.ts";

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body } = extract(text);
  return {
    slug,
    title: attrs.title,
    publishedAt: new Date(attrs.published_at),
    content: body,
    snippet: attrs.snippet,
  };
}
