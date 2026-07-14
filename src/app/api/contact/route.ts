// Forwards contact messages to whatever endpoint CONTACT_WEBHOOK_URL points at
// (Formspree, Zapier, a Slack/Discord webhook). Nothing is stored locally: the SQLite
// file is read-only in production and the filesystem is ephemeral.
const WEBHOOK = process.env.CONTACT_WEBHOOK_URL;

export async function POST(request: Request) {
  if (!WEBHOOK) {
    return Response.json({ error: "Contact form is not configured yet." }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, website } = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: real users never fill a hidden field.
  if (typeof website === "string" && website.length > 0) {
    return Response.json({ ok: true });
  }

  const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
  const safeName = clean(name, 100);
  const safeEmail = clean(email, 200);
  const safeMessage = clean(message, 5000);

  if (!safeName || !safeMessage || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(safeEmail)) {
    return Response.json({ error: "Please provide a name, a valid email, and a message." }, { status: 400 });
  }

  const response = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name: safeName, email: safeEmail, message: safeMessage }),
  });

  if (!response.ok) {
    return Response.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
