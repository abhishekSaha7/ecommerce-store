// Safe hydration-checked localStorage helper for Next.js App Router and node test runners

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined" || !window.localStorage || typeof window.localStorage.getItem !== "function") {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.error(`Error loading key "${key}" from localStorage:`, error);
    return fallback;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined" || !window.localStorage || typeof window.localStorage.setItem !== "function") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}
