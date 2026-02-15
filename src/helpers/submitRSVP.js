import FORM_CONFIG from '../config/formConfig';

/**
 * Submit an RSVP payload to the configured form endpoint.
 *
 * @param {Object} payload
 * @param {string}   payload.code
 * @param {string}   payload.guestName
 * @param {number}   payload.seats
 * @param {boolean}  payload.attending
 * @param {Array<{seatIndex: number, main: string, side: string, dessert: string}>} payload.mealSelections
 * @param {string}   payload.dietary
 * @param {string}   payload.timestamp
 *
 * @returns {Promise<{ success: boolean }>}
 */
export async function submitRSVP(payload) {
  const { provider, endpoint, fieldMap } = FORM_CONFIG;

  if (!endpoint || endpoint === 'YOUR_ENDPOINT_HERE') {
    // Dev / demo mode — simulate a successful submission
    console.info('[submitRSVP] No endpoint configured — simulating success.');
    console.table(payload);
    await new Promise((r) => setTimeout(r, 1200));
    return { success: true };
  }

  /* ───── Google Forms ───── */
  if (provider === 'google-forms') {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      const fieldName = fieldMap[key];
      if (fieldName) {
        formData.append(
          fieldName,
          typeof value === 'object' ? JSON.stringify(value) : String(value),
        );
      }
    });

    // Google Forms requires no-cors; response is opaque so we assume success.
    await fetch(endpoint, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });

    return { success: true };
  }

  /* ───── Web3Forms ───── */
  if (provider === 'web3forms') {
    const body = {
      access_key: FORM_CONFIG.accessKey,
      subject: `RSVP — ${payload.guestName}`,
      from_name: 'Wedding RSVP',
    };

    Object.entries(payload).forEach(([key, value]) => {
      const fieldName = fieldMap[key];
      if (fieldName) {
        body[fieldName] = typeof value === 'object' ? JSON.stringify(value) : value;
      }
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Web3Forms error');
    return { success: true };
  }

  /* ───── Webhook / Tally / Formspree (JSON POST) ───── */
  const mapped = {};
  Object.entries(payload).forEach(([key, value]) => {
    const fieldName = fieldMap[key];
    if (fieldName) mapped[fieldName] = value;
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(mapped),
  });

  if (!response.ok) {
    throw new Error(`Submission failed (${response.status})`);
  }

  return { success: true };
}
