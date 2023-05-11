#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "https://deno.land/x/fresh@1.1.5/dev.ts";

await dev(import.meta.url, "./main.ts");
