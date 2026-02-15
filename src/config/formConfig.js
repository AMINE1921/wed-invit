/**
 * ─────────────────────────────────────────────
 *  RSVP Form Submission Configuration
 * ─────────────────────────────────────────────
 *
 *  Choose a provider and set your endpoint + field mapping.
 *  See README.md for detailed setup instructions.
 */

const FORM_CONFIG = {
  /**
   * Provider: 'webhook' | 'google-forms'
   *
   * 'webhook'       → JSON POST (works with Tally webhooks, Formspree,
   *                    Web3Forms, Make/Zapier, or any custom endpoint)
   * 'google-forms'  → FormData POST to Google Forms formResponse URL
   */
  provider: 'web3forms',

  /**
   * Web3Forms access key (public — safe to commit).
   */
  accessKey: '4b0b2e19-3a9a-4c80-9a84-7d2549156a8d',

  /**
   * The URL to POST the RSVP data to.
   */
  endpoint: 'https://api.web3forms.com/submit',

  /**
   * Map each payload key to the field name / ID expected by your form.
   *
   * For Tally webhooks  → use the Tally question IDs
   * For Google Forms     → use `entry.XXXXXXXXX` ids
   * For Formspree        → use any key names you like
   */
  fieldMap: {
    code:           'code',
    guestName:      'guestName',
    seats:          'seats',
    attending:      'attending',
    mealSelections: 'mealSelections',
    dietary:        'dietary',
    timestamp:      'timestamp',
  },
};

export default FORM_CONFIG;
