import { profile } from "./content";
import type { ContactInput } from "./validation";

/**
 * Contact service. Set VITE_CONTACT_ENDPOINT in .env to any endpoint that accepts
 * JSON POST (Formspree, your own Express API, a serverless function...).
 * Without it, the message opens in the visitor's email app instead.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export type SendResult = { via: "api" | "mailto" };

export class ApiError extends Error {
  constructor(public status: number, public fields?: Partial<Record<keyof ContactInput, string>>) {
    super(`Request failed with ${status}`);
  }
}

export async function sendContact(input: ContactInput, honeypot = ""): Promise<SendResult> {
  if (honeypot) return { via: "api" };

  if (!ENDPOINT) {
    const subject = encodeURIComponent(`Portfolio message from ${input.name}`);
    const body = encodeURIComponent(`${input.message}\n\n${input.name}\n${input.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    return { via: "mailto" };
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.fields);
  }
  return { via: "api" };
}
