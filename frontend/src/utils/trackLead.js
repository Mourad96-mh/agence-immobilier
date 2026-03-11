/**
 * trackLead — fires on every phone/WhatsApp contact across the site
 * 1. Reads UTM params from URL
 * 2. POSTs lead data to Google Sheets via Apps Script
 * 3. Fires a Google Ads conversion event
 *
 * @param {object} context — any extra info about the lead (source, property, form data, etc.)
 * @param {'whatsapp'|'phone'|'form'} type — how the user contacted
 */

// REPLACE HERE: Google Ads Conversion ID  (e.g. 'AW-123456789')
const ADS_CONVERSION_ID = "AW-17548598231";

// REPLACE HERE: Google Ads Conversion Label (e.g. 'AbCdEfGhIjKlMnOp')
const ADS_CONVERSION_LABEL = "DdZtCJK7wYYcENe36a9B";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbweZeFuJfgiB5fBhkG3vAAl0EY9EjwqTxM5hJYNy0mg7xdTmIHvVNnWQN-HsDpwp-CG8g/exec";

// ─── DEBUG MODE (remove before production) ───────────────────────────────────
const DEBUG = false;

function showDebugToast(payload, gtagFired) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed; bottom: 80px; left: 16px; z-index: 99999;
    background: #1a1a2e; color: #fff; border-left: 4px solid #22c55e;
    border-radius: 8px; padding: 12px 16px; max-width: 340px;
    font-family: monospace; font-size: 12px; line-height: 1.6;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  `;
  toast.innerHTML = `
    <div style="font-weight:700;font-size:13px;margin-bottom:6px;">
      🎯 trackLead fired — <span style="color:#86efac">${payload.type}</span>
    </div>
    <div><b>source:</b> ${payload.source}</div>
    <div><b>city:</b> ${payload.city || "—"}</div>
    <div><b>ref:</b> ${payload.property_ref || "—"}</div>
    <div><b>utm_source:</b> ${payload.utm_source || "—"}</div>
    <div><b>gclid:</b> ${payload.gclid || "—"}</div>
    <div style="margin-top:6px;padding-top:6px;border-top:1px solid #333">
      <span style="color:${gtagFired ? "#86efac" : "#f87171"}">
        ${gtagFired ? "✓ gtag fired" : "✗ gtag not found (placeholder ID)"}
      </span>
      &nbsp;|&nbsp;
      <span style="color:#86efac">✓ Sheet POST sent</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 6000);
}
// ─────────────────────────────────────────────────────────────────────────────

function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: p.get("gclid") || "",
  };
}

export function trackLead(context = {}, type = "whatsapp") {
  const payload = {
    timestamp: new Date().toISOString(),
    type,
    source: context.source || "mecalus-site",
    property_ref: context.property_ref || "",
    property_title: context.property_title || "",
    city: context.city || "",
    category: context.category || "",
    transaction: context.transaction || "",
    price: context.price || "",
    page_url: window.location.href,
    ...getUTMs(),
  };

  // 1. Post to Google Sheets (fire-and-forget)
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  // 2. Fire Google Ads conversion
  const gtagFired = typeof window.gtag === "function";
  if (gtagFired) {
    window.gtag("event", "conversion", {
      send_to: `${ADS_CONVERSION_ID}/${ADS_CONVERSION_LABEL}`,
    });
  }

  // 3. Debug
  if (DEBUG) {
    console.group(
      "%c[trackLead]",
      "color:#22c55e;font-weight:bold",
      payload.type,
      "—",
      payload.source,
    );
    console.table(payload);
    console.log("gtag fired:", gtagFired);
    console.groupEnd();
    showDebugToast(payload, gtagFired);
  }
}

/** Shorthand for property card/modal clicks */
export function trackPropertyLead(property, type) {
  trackLead(
    {
      source: "property-card",
      property_ref: property.propertyCode || "",
      property_title: property.title?.fr || property.title?.en || "",
      city: property.city || "",
      category: property.category || "",
      transaction: property.transactionType || "",
      price: property.price || "",
    },
    type,
  );

  // Save WhatsApp clicks as leads in the DB
  if (type === "whatsapp") {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "whatsapp",
        subject: `${property.title?.fr || ""} — Réf. ${property.propertyCode || ""}`,
        city: property.city || "",
        propertyType: property.category || "",
        message: `Intérêt WhatsApp pour le bien ${property.propertyCode || ""} à ${property.city || ""}`,
      }),
    }).catch(() => {});
  }
}
