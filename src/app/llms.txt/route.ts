import { LLMS_TXT } from "../../lib/llms-content.ts";

export function GET() {
  return new Response(LLMS_TXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
