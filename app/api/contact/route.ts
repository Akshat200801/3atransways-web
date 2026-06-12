import { NextResponse } from "next/server";

/**
 * Quote-request handler. POSTs from the /contact form land here.
 * We forward the lead to ravi@3alogistics.net via Resend's HTTPS API.
 *
 * Required env vars (set in Vercel):
 *   RESEND_API_KEY      — reuse the Cargoflow key
 *   CONTACT_TO_EMAIL    — where leads land (default ravi@3alogistics.net)
 *   CONTACT_FROM_EMAIL  — verified Resend sender. Fallback to
 *                         onboarding@resend.dev which works without
 *                         DNS verification but ends up in spam.
 */
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY not configured" },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "ravi@3alogistics.net";
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Three A Transways <onboarding@resend.dev>";

  let body: Record<string, string> = {};
  try {
    body = (await req.json()) as Record<string, string>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required" },
      { status: 400 }
    );
  }

  // Plaintext + HTML so the lead reads cleanly in Gmail, Outlook and
  // mobile clients alike. Tiny inline table keeps it skimmable.
  const fields = [
    ["Name", body.name],
    ["Company", body.company],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Route", body.route],
    ["Message", body.message],
  ];
  const text = fields
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const html = `
    <h2 style="font-family:Inter,sans-serif">New quote request</h2>
    <table style="font-family:Inter,sans-serif;font-size:14px;border-collapse:collapse">
      ${fields
        .filter(([, v]) => !!v)
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;color:#475569;vertical-align:top">${k}</td>
          <td style="padding:6px 0;color:#0f172a;white-space:pre-wrap">${escapeHtml(
            String(v)
          )}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Reply-to lets us hit Reply in Gmail and answer the lead
        // directly without copying the email out of the body.
        reply_to: email,
        subject: `New quote request — ${name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: `Resend ${res.status}: ${errBody.slice(0, 200)}` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
