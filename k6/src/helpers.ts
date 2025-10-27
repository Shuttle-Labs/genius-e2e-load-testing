import http from "k6/http";

export function pickAnyToken(res: http.Response): string | null {
  try {
    const data = JSON.parse(res.body as string);
    const arr =
      (data && data.pageProps && (data.pageProps.tokens || data.pageProps.items)) ||
      data.tokens ||
      data.items ||
      [];
    if (!Array.isArray(arr) || arr.length === 0) return null;

    const t = arr[Math.floor(Math.random() * arr.length)];
    return t.address || t.id || t.tokenAddress || null;
  } catch (e) {
    if (__VU === 1 && __ITER < 2) console.log("pickAnyToken parse error:", String(e));
    return null;
  }
}
