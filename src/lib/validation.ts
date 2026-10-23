/** Shared by the contact form (client) and /api/contact (server): one set of rules, two layers. */
export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const messages = {
  en: {
    nameShort: "Enter your name.",
    nameLong: "Keep your name under 100 characters.",
    email: "Enter a valid email address, like name@company.com.",
    messageShort: "Add a little more detail: at least 10 characters.",
    messageLong: "Keep your message under 4,000 characters.",
  },
  id: {
    nameShort: "Masukkan nama Anda.",
    nameLong: "Nama maksimal 100 karakter.",
    email: "Masukkan alamat email yang valid, misalnya nama@perusahaan.com.",
    messageShort: "Tambahkan sedikit detail: minimal 10 karakter.",
    messageLong: "Pesan maksimal 4.000 karakter.",
  },
};

export function validateContact(input: Partial<ContactInput>, lang: keyof typeof messages = "en"): ContactErrors {
  const m = messages[lang];
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  if (name.length < 2) errors.name = m.nameShort;
  else if (name.length > 100) errors.name = m.nameLong;
  if (!EMAIL.test(email)) errors.email = m.email;
  if (message.length < 10) errors.message = m.messageShort;
  else if (message.length > 4000) errors.message = m.messageLong;
  return errors;
}
