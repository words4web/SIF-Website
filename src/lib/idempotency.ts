const IDEMPOTENCY_KEY_STORAGE = "shelly_foods_checkout_idempotency_key";

export function generateUUID(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"?.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v?.toString(16);
  });
}

export function getOrCreateIdempotencyKey(): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    let key = sessionStorage.getItem(IDEMPOTENCY_KEY_STORAGE);
    if (!key) {
      key = generateUUID();
      sessionStorage.setItem(IDEMPOTENCY_KEY_STORAGE, key);
    }
    return key;
  } catch {
    return generateUUID();
  }
}

export function resetIdempotencyKey(): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    const key = generateUUID();
    sessionStorage.setItem(IDEMPOTENCY_KEY_STORAGE, key);
    return key;
  } catch {
    return generateUUID();
  }
}

export function clearIdempotencyKey(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.removeItem(IDEMPOTENCY_KEY_STORAGE);
  } catch {}
}
