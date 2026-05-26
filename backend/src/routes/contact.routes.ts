import { Router } from 'express';
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type Body = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  turnstileToken?: unknown;
};

function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

async function verifyTurnstile(token: string, remoteIp?: string) {
  const params = new URLSearchParams();
  params.set('secret', env.turnstileSecret);
  params.set('response', token);
  if (remoteIp) params.set('remoteip', remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: params,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as Body;

    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return res.status(200).json({ ok: true });
    }

    if (
      !isNonEmptyString(body.name, MAX_NAME) ||
      !isNonEmptyString(body.subject, MAX_SUBJECT) ||
      !isNonEmptyString(body.message, MAX_MESSAGE) ||
      typeof body.email !== 'string' ||
      !EMAIL_RE.test(body.email.trim())
    ) {
      return res.status(400).json({ error: 'Invalid form submission.' });
    }

    if (typeof body.turnstileToken !== 'string' || body.turnstileToken === '') {
      return res.status(400).json({ error: 'Missing captcha token.' });
    }

    if (!env.turnstileSecret) {
      return res.status(500).json({ error: 'Captcha is not configured.' });
    }

    const captchaOk = await verifyTurnstile(body.turnstileToken, req.ip);
    if (!captchaOk) {
      return res.status(400).json({ error: 'Captcha verification failed.' });
    }

    if (
      !env.smtp.host ||
      !env.smtp.user ||
      !env.smtp.pass ||
      !env.smtp.from ||
      !env.contactTo
    ) {
      return res.status(500).json({ error: 'Mail service is not configured.' });
    }

    const transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });

    const name = body.name.trim();
    const email = body.email.trim();
    const subject = body.subject.trim();
    const message = body.message.trim();

    await transporter.sendMail({
      from: env.smtp.from,
      to: env.contactTo,
      replyTo: `${name} <${email}>`,
      subject: `[Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
