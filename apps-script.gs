/**
 * The Trendy Space — quote form backend (Google Apps Script).
 *
 * Setup (5 minutes, on the CLIENT's Google account so they own the leads):
 * 1. Create a Google Sheet named "The Trendy Space leads". Extensions → Apps Script.
 * 2. Paste this file, set NOTIFY_EMAIL below, Save.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me    Who has access: Anyone
 * 4. Copy the web-app URL and paste it into FORM_ENDPOINT in index.html.
 * 5. Submit a test from the site; a row should appear and an email arrive.
 */
const NOTIFY_EMAIL = 'client-email@example.com'; // ← client's email
const SHEET_NAME = 'Leads';
const HEADERS = ['Time', 'Name', 'Phone', 'Need', 'Shape', 'Finish', 'Area', 'Page'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  const phone = String(p.phone || '').replace(/\D/g, '').slice(-10);
  if (!p.name || phone.length !== 10 || p.company) {
    return ContentService.createTextOutput('ignored');
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  const clean = (v) => String(v || '').slice(0, 200).replace(/^[=+\-@]/, "'$&"); // block formula injection
  const row = [new Date(), clean(p.name), "'" + phone, clean(p.need), clean(p.shape), clean(p.finish), clean(p.area), clean(p.page)];
  sheet.appendRow(row);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New enquiry (The Trendy Space): ' + clean(p.name) + ' (' + phone + ')',
    body:
      'Name: ' + p.name + '\n' +
      'Phone: ' + phone + '  →  tel:+91' + phone + '\n' +
      'Need: ' + (p.need || '-') + '\n' +
      'Shape: ' + (p.shape || '-') + '\n' +
      'Finish tried on site: ' + (p.finish || '-') + '\n' +
      'Area: ' + (p.area || '-') + '\n\n' +
      'WhatsApp: https://wa.me/91' + phone,
  });

  return ContentService.createTextOutput('ok');
}
