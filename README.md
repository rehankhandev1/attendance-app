# Attendance — IIPS DAVV · MCA First Semester · Section B

A shared, mobile-friendly attendance system built to replace daily paper sign-in sheets for a class of 37 students across 8 subjects.

**Live app:** https://rehankhandev1.github.io/attendance-app/

---

## The problem

Every lecture and lab, a sheet of paper was passed around for students to write their names one by one, then handed to the teacher at the end. This happened separately for **every subject, every single day** — 5 theory subjects and 3 labs, 37 students, no backup, no record beyond that one page, and no easy way to check who'd been missing class over time.

## The solution

A single web app any teacher can open on their phone, no installation or account needed — just a link and a shared passcode. Pick a subject and a date, tap Present or Absent per student, tap Save. Every teacher's phone stays in sync automatically.

## Features

- **One shared roster and set of subjects** — set up once, used by every teacher
- **Passcode-gated** — keeps it to staff only
- **Live sync across devices** — mark attendance on one phone, see it instantly on another
- **Reports view** — a full ledger per subject: every student, every date, attendance %
- **CSV export** — one tap to download the full attendance record as a spreadsheet
- **Automated daily backups** — a scheduled job pulls every subject's data each night and commits it as a dated CSV into this repository, independent of the live database

## How it's built

| Layer | Technology |
|---|---|
| Interface | Single-file HTML/CSS/JS — works on any phone browser |
| Hosting | GitHub Pages (free, static) |
| Data | Firebase Realtime Database — live sync, no backend server to run or maintain |
| Backups | GitHub Actions, scheduled daily, committing snapshots straight into `/backups` |

## Why it matters

Paper attendance for 8 subjects a day, every day, for a class of 37 doesn't scale — it's slow to take, easy to lose, and impossible to search later. This replaces that entirely: attendance now takes seconds per lecture, syncs across every teacher automatically, and keeps a permanent, exportable record that survives even if any single piece of the system fails.

---

Built by **Rehan Khan** — MCA First Semester, Section B, IIPS DAVV, Indore.
