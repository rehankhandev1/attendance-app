import fs from 'fs';

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  console.error('DB_URL environment variable is not set.');
  process.exit(1);
}

function csvEscape(field) {
  const s = String(field);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

async function getJson(path) {
  const res = await fetch(`${DB_URL}/${path}.json`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

async function main() {
  const subjects = (await getJson('subjects')) || [];
  const students = (await getJson('students')) || [];

  const rows = [['Subject', 'Student', 'Date', 'Status']];

  for (const subject of subjects) {
    const att = (await getJson('attendance/' + encodeURIComponent(subject))) || {};
    const dates = Object.keys(att).sort();
    for (const date of dates) {
      const dayRecord = att[date] || {};
      for (const student of students) {
        const status = dayRecord[student];
        if (status) rows.push([subject, student, date, status]);
      }
    }
  }

  const csv = rows.map(r => r.map(csvEscape).join(',')).join('\n');

  fs.mkdirSync('backups', { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(`backups/attendance-${today}.csv`, csv);
  console.log(`Backup written: backups/attendance-${today}.csv (${rows.length - 1} records)`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
