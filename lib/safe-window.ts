/**
 * Safely returns a reference to window.top if it is same-origin.
 * Falls back to the current window when access is not allowed.
 */
export function getSafeTopWindow(): Window {
  if (typeof window === "undefined") return globalThis as unknown as Window
  try {
    // 👉 Reading location.href forces a same-origin check.
    //    If cross-origin, a DOMException is thrown.
    void window.top?.location.href
    return window.top ?? window
  } catch {
    return window
  }
}
