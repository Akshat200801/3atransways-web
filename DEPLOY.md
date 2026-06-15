# Three A Transways — Website Deploy Guide

A complete walkthrough for putting this website online, written for someone
who has never deployed a Next.js site before. **Read the whole document
once** before doing anything, then pick **Path A**, **B**, or **C** below
based on what kind of hosting account you have.

---

## 1. What this project is

This is the **Three A Transways company website**, built using a framework
called **Next.js**. Next.js is a tool that turns React code (the `.tsx`
files you'll see) into a fast, working website.

**Important:** Next.js websites are not like old-school HTML/PHP websites.
You cannot just drag-and-drop these files onto a normal shared-hosting
account (like GoDaddy, Bluehost, Hostinger) and expect it to work. It
either needs a host designed for Next.js (Path A or B), or it needs to be
"built" into plain static files first (Path C).

---

## 2. What's in this folder

Plain-English description of each top-level folder. **You do not need to
edit anything inside these.** They're listed so you know what's what.

| Folder / file | What it is |
|---|---|
| `app/` | All the pages of the website (home, about, services, contact, etc). Each subfolder = one page. |
| `components/` | Re-usable parts of the website (the top navigation bar, footer, hero section, cards, etc). |
| `public/` | Static files served as-is — the company logo, favicon, and any images that aren't loaded from the internet. |
| `lib/` and `services/` | Small utility code that handles things like the contact-form submission. |
| `app/api/` | Server-side code that runs when someone submits the contact form (sends the email). |
| `package.json` | The "recipe" — lists which extra software pieces the project needs. The host reads this automatically. |
| `package-lock.json` | A precise version-lock of the recipe. Don't delete it. |
| `next.config.mjs` | Next.js configuration. Don't edit. |
| `tailwind.config.ts` | Visual style configuration. Don't edit. |
| `tsconfig.json` | TypeScript configuration. Don't edit. |
| `node_modules/` | (will not exist when you first download) — auto-generated when you run `npm install`. Hundreds of megabytes. **Never** upload this folder anywhere; the host generates it themselves. |
| `.next/` | (will not exist when you first download) — auto-generated when the site is built. Same rule: don't upload manually. |
| `.gitignore` | A list of files that are deliberately not stored with the project. Ignore it. |
| `README.md` | Older project notes for developers. You can ignore. |
| `DEPLOY.md` | **This file.** Your deployment instructions. |

---

## 3. Three paths to put this online

Read the description of each path and pick the one that matches what your
hosting provider gives you.

### Path A — Vercel (recommended, free, easiest)

**Use this if:** the person who sent you these files said "Vercel," or
you don't already have a host and just want the simplest option that
works.

Vercel is a company that hosts Next.js websites for free. It is built by
the same team that makes Next.js, so it's the smoothest path.

**Steps:**

1. Go to **https://vercel.com** and click **Sign Up**. The fastest way is
   to **Continue with GitHub** (you'll need a GitHub account too — sign
   up at github.com first if you don't have one).
2. Once signed in, you'll see a Vercel dashboard. Click **Add New… →
   Project**.
3. Vercel will ask you to import a Git repository. If the website code is
   already on GitHub (ask the person who sent it to you — they likely
   have a GitHub link), click **Import** next to that repository.
   - If the code is **not** on GitHub yet, click **Upload Template** or
     follow Vercel's instructions to upload the project folder directly.
4. Vercel auto-detects this is a Next.js project. You should see "Next.js"
   as the framework. **Do not change any settings.** Just click **Deploy**
   at the bottom.
5. Wait ~2 minutes. When it finishes, Vercel will show you a URL like
   `your-project-name.vercel.app`. **That's your live website.**

**Custom domain (e.g. `3atransways.com`):**

6. In the Vercel dashboard, open the project → **Settings → Domains**.
7. Type your domain (`3atransways.com`) and click **Add**.
8. Vercel shows you DNS settings — usually one `A` record and one `CNAME`.
9. Log in to wherever you bought the domain (GoDaddy, Namecheap, etc.) and
   add those DNS records exactly as Vercel shows them.
10. Wait 10 minutes to a few hours. The site will then be live on your
    custom domain.

**Done.** Skip the rest of this document.

---

### Path B — A "Node.js" host (Render, Railway, DigitalOcean App Platform, AWS Amplify, Hostinger VPS, etc)

**Use this if:** your host's documentation mentions "Node.js" or the host
asks you for "build command" and "start command" when creating a service.

**Required values for the host:**

| Setting they ask for | What to put |
|---|---|
| Build command | `npm install && npm run build` |
| Start command | `npm start` |
| Node version | `20` (or newer if 20 isn't available) |
| Port | `3000` (some hosts use the `PORT` environment variable automatically — leave as-is) |

**Step-by-step on a generic Node host (uses Render as the example because
it's free):**

1. Go to **https://render.com** and sign up (Continue with GitHub works
   well here too).
2. Click **New + → Web Service**.
3. Connect the GitHub repository where the website code lives (the person
   who sent you the files will have this).
4. On the configuration screen:
   - **Name:** anything, e.g. `3atransways`
   - **Region:** pick the one closest to your audience
   - **Branch:** `main`
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm start`
   - **Instance type:** Free is fine to start
5. Click **Create Web Service**. Wait ~5 minutes for the build to finish.
6. Render will give you a URL like `your-name.onrender.com`. That's your
   live site.

**Custom domain:** under **Settings → Custom Domains** on Render, same
flow as Vercel — Render shows you DNS records, you add them at your
domain registrar.

---

### Path C — Traditional shared hosting (cPanel, GoDaddy, Bluehost, Hostinger shared, FTP-only)

**Use this if:** your host **does not mention Node.js**, only lets you
upload files via FTP / File Manager / cPanel, and is the kind of place
you'd upload WordPress or plain HTML files.

Next.js cannot run on these hosts as-is. You have two options:

#### Option C1 — Switch to Path A (strongly recommended)

Vercel is free and works in 5 minutes. There is no good reason to fight
with cPanel for this. Go back to Path A.

#### Option C2 — Build a static export (requires a developer's help)

If you absolutely must use traditional hosting, this site needs to be
rebuilt as a "static export" — a collection of plain `.html`, `.css`, and
`.js` files. This requires:

1. Someone technical to edit `next.config.mjs` and set `output: "export"`.
2. The contact form (`app/api/contact/`) **will stop working** because
   static exports cannot run server code. The form would need to be
   re-pointed at a third-party form service (Formspree, Web3Forms, etc).
3. After the edit, that person runs `npm install && npm run build` on
   their computer. The output goes into a folder called `out/`.
4. You upload the **contents of `out/`** (not the folder itself, the
   files inside it) into your hosting's `public_html/` or `www/` folder
   via FTP / cPanel File Manager.

If you're not the technical person, send this paragraph back to whoever
gave you the project and ask them to do steps 1–3 for you, then send you
the `out/` folder.

---

## 4. After the website is live

### Making changes later

When you want to update text, photos, or anything else on the site:

- **If you used Path A or B**, all you have to do is push the updated
  files to GitHub. Vercel / Render will detect the change and rebuild
  the live site automatically within a couple of minutes.
- **If you used Path C**, the technical person has to rebuild the
  `out/` folder and you re-upload the new files via FTP.

### Where the contact form sends emails

The contact form submission is handled by code in `app/api/contact/`. It
uses environment variables to know which email account to send from.
After deploying, in your host's dashboard, you'll need to set these
environment variables (the person who sent you the project should give
you the values):

- `RESEND_API_KEY` — or whatever email provider key is in use
- `CONTACT_TO_EMAIL` — the email address that should *receive* contact
  form submissions

Without these, the contact form will appear to submit but no email will
arrive. Ask the project owner for the current values and paste them in
the host's "Environment Variables" section.

---

## 5. If something goes wrong

- **Build fails on Vercel/Render with "command not found":** the host is
  on the wrong Node version. Find the setting (Vercel: Project Settings →
  General → Node.js Version; Render: Environment → `NODE_VERSION`) and
  set it to **20**.
- **Site loads but shows a blank page or error:** open the host's
  **Logs** / **Runtime Logs** tab — there will be a Red error message
  near the top. Copy it and send it to the person who built the site.
- **Contact form submits but no email arrives:** environment variables
  not set. See the section above.
- **Anything else:** send a screenshot of the host's logs page (not the
  website itself — the *deploy logs*) to whoever built the site. The
  logs almost always say what's wrong in plain English near the top.

---

## TL;DR

If you read nothing else: **use Vercel (Path A)**. It's free, it takes
five minutes, and it's what this site was built for. The other paths
exist if you've been told you must use a specific host.
