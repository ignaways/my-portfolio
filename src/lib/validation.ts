/** Shared by the contact form (client) and /api/contact (server): one set of rules, two layers. */
export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  if (name.length < 2) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address, like name@company.com.";
  if (message.length < 10) errors.message = "Add a little more detail: at least 10 characters.";
  else if (message.length > 4000) errors.message = "Keep your message under 4,000 characters.";
  return errors;
}
