"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not send your message.");
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not send your message.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="panel">
        <h2>Message sent</h2>
        <p>Thanks. We read every correction and will reply if a response is needed.</p>
      </div>
    );
  }

  return (
    <form className="contact-form panel" onSubmit={submit}>
      <h2>Send a message</h2>
      <p>Use this form for corrections, accessibility issues, data problems, or partnership requests.</p>

      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" name="name" type="text" required maxLength={100} autoComplete="name" />

      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" />

      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" required rows={6} maxLength={5000} />

      <div aria-hidden="true" className="honeypot">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
