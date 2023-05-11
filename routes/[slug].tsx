import { Handlers } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { getPost, Post } from "../utils/posts.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

import { PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Head } from "https://deno.land/x/fresh@1.1.5/runtime.ts";

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">{post.title}</h1>
      <time class="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString("sv-se", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      <div
        class="mt-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: render(post.content) }}
      />
    </main>
  );
}
