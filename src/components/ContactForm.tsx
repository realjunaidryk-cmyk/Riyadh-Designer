"use client";

import { useRef, useState, type FormEvent } from "react";
import { whatsappLink, type Lang } from "@/content/site";
import type { UI } from "@/content/ui";
import { ui } from "@/content/ui";
import { track } from "./Analytics";
import { WhatsAppIcon } from "./Icons";

type Field = "name" | "email" | "phone" | "type" | "location" | "message";
const order: Field[] = ["name", "email", "phone", "type", "location", "message"];

const codes = ["+966", "+971", "+973", "+965", "+968", "+974", "+20", "+962", "+44", "+1"];

function validate(f: Record<string, string>): Partial<Record<Field, true>> {
  const e: Partial<Record<Field, true>> = {};
  if (f.name.trim().length < 2) e.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = true;
  const digits = f.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 12) e.phone = true;
  if (!f.type) e.type = true;
  if (f.location.trim().length < 2) e.location = true;
  if (f.message.trim().length < 10) e.message = true;
  return e;
}

// Enquiry form. There is no form backend yet, so a valid enquiry is handed to WhatsApp as a ready-written
// message to the studio's number; the visitor sends it from there.
export function ContactForm({ lang, types }: { lang: Lang; types: { value: string; label: string }[] }) {
  const t: UI["contact"] = ui[lang].contact;
  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    email: "",
    code: "+966",
    phone: "",
    type: "",
    location: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, true>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, true>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sentLink, setSentLink] = useState<string | null>(null);
  const summary = useRef<HTMLDivElement>(null);

  const set = (k: string, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k as Field]) setErrors(validate(next));
  };
  const blur = (k: Field) => {
    setTouched((x) => ({ ...x, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    if (Object.keys(errs).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setShowSummary(false);
    const typeLabel = types.find((x) => x.value === values.type)?.label ?? values.type;
    const text = t.message({ ...values, phone: `${values.code} ${values.phone}`, type: typeLabel });
    const link = whatsappLink(text);
    setSentLink(link);
    track("generate_lead", { method: "whatsapp_form", project_type: values.type });
    window.open(link, "_blank", "noopener");
  };

  const show = (k: Field) => touched[k] && errors[k];
  const describe = (k: Field, hint?: boolean) =>
    [hint ? `${k}-hint` : "", show(k) ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errList = order.filter((k) => errors[k]);

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="form-title">
      <h2 className="serif h3" id="form-title">
        {t.formTitle}
      </h2>

      {showSummary && errList.length > 0 && (
        <div className="summary" role="alert" tabIndex={-1} ref={summary} aria-labelledby="summary-title">
          <h3 id="summary-title">{t.errors.summary}</h3>
          <ul>
            {errList.map((k) => (
              <li key={k}>
                <a
                  href={`#f-${k}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`f-${k}`)?.focus();
                  }}
                >
                  {t.errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="field">
        <label htmlFor="f-name">{t.fields.name}</label>
        <input
          id="f-name"
          className="input"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          onBlur={() => blur("name")}
          aria-invalid={!!show("name")}
          aria-describedby={describe("name")}
        />
        {show("name") && <p className="error" id="name-error">{t.errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-email">{t.fields.email}</label>
        <input
          id="f-email"
          className="input"
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => blur("email")}
          aria-invalid={!!show("email")}
          aria-describedby={describe("email")}
        />
        {show("email") && <p className="error" id="email-error">{t.errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-phone">{t.fields.phone}</label>
        <div className="phone-row" dir="ltr">
          <select
            className="input"
            aria-label={t.fields.code}
            value={values.code}
            onChange={(e) => set("code", e.target.value)}
          >
            {codes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            id="f-phone"
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!show("phone")}
            aria-describedby={describe("phone")}
          />
        </div>
        {show("phone") && <p className="error" id="phone-error">{t.errors.phone}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-type">{t.fields.type}</label>
        <select
          id="f-type"
          className="input"
          value={values.type}
          onChange={(e) => set("type", e.target.value)}
          onBlur={() => blur("type")}
          aria-invalid={!!show("type")}
          aria-describedby={describe("type")}
        >
          <option value="">{t.select}</option>
          {types.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
        {show("type") && <p className="error" id="type-error">{t.errors.type}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-location">{t.fields.location}</label>
        <input
          id="f-location"
          className="input"
          autoComplete="address-level2"
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
          onBlur={() => blur("location")}
          aria-invalid={!!show("location")}
          aria-describedby={describe("location", true)}
        />
        <p className="hint" id="location-hint">
          {t.fields.locationHint}
        </p>
        {show("location") && <p className="error" id="location-error">{t.errors.location}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-budget">{t.fields.budget}</label>
        <select id="f-budget" className="input" value={values.budget} onChange={(e) => set("budget", e.target.value)}>
          <option value="">{t.select}</option>
          {t.budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="f-message">{t.fields.message}</label>
        <textarea
          id="f-message"
          className="input"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!show("message")}
          aria-describedby={describe("message", true)}
        />
        <p className="hint" id="message-hint">
          {t.fields.messageHint}
        </p>
        {show("message") && <p className="error" id="message-error">{t.errors.message}</p>}
      </div>

      {sentLink && (
        <div className="success" role="status">
          <p>{t.success}</p>
          <p>
            {t.blocked}{" "}
            <a href={sentLink} target="_blank" rel="noopener">
              {t.open}
            </a>
          </p>
        </div>
      )}

      <div className="form-foot">
        <button className="btn btn-primary" type="submit">
          <WhatsAppIcon />
          {t.submit}
        </button>
        <p className="form-note">{t.note}</p>
      </div>
    </form>
  );
}
