# 🎬 Movie / TV Watchlist → CRM-Style Project Roadmap

## Project Goal
Build a web app that behaves like a **mini CRM system** where users manage records (movies/TV shows), including creating, editing, filtering, validating, and storing structured data in the browser.

**Tech stack:** HTML + CSS + Vanilla JavaScript

---

> [!IMPORTANT]
> **Core Mindset Shift**
> You are not building a "movie app."
> You are building a **record management system (mini CRM).**
> Each movie = a structured data record.

---

## Data Model (CRM-Style)

```json
{
  "id": "uuid",
  "title": "Inception",
  "type": "movie",
  "genre": "sci-fi",
  "status": "completed",
  "rating": 5,
  "notes": "Amazing",
  "createdAt": 123456789
}
```

---

## Folder Structure

```
movie-watchlist/
│
├── index.html        ← Dashboard (list, table, stats)
├── add.html          ← Create record
├── edit.html         ← Edit record (or reuse add.html)
│
├── css/
│   ├── style.css     ← Global styles, colors, fonts
│   ├── layout.css    ← Grid, table, page layout
│   └── form.css      ← Form, inputs, modal styles
│
├── js/
│   ├── app.js        ← Page logic (render, events)
│   ├── storage.js    ← localStorage CRUD
│   ├── form.js       ← Validation + form logic
│   ├── rating.js     ← Stars component
│   └── ui.js         ← Rendering functions
│
└── assets/
    └── placeholder.jpg
```

---

## Step 1 — HTML Structure

### `index.html` — Dashboard
- **Header** — App title: `Movie CRM` | Button: `+ Add Record` (links to `add.html`)
- **Stats Bar** — `Total: X | Completed: X | Watching: X | To Watch: X`
- **Controls** — Search input, Sort dropdown (A–Z, Z–A, Highest Rated, Recently Added), Filter buttons: `All | Movies | TV | Completed | Watching | To Watch`
- **Data View** — TWO layouts to build:
  - **Grid view** — Movie cards
  - **Table view** (CRM-style): `Title | Type | Genre | Status | Rating | Actions`

**Each Movie Card contains:**
Poster, Title, Genre tag, Status badge, Rating (stars), Delete button, **Edit button** (links to `edit.html?id=...`)

### `add.html` — Create Record
Centered form for adding a new record.

### `edit.html` — Edit Record
Same form layout as `add.html` but pre-filled with existing record data.
Loads the record from `localStorage` by reading the `id` from the URL (`?id=...`).
Save button updates the existing record instead of creating a new one.

### Form fields (both `add.html` and `edit.html`):

| Section | Fields |
|---|---|
| Basic Info | Title (text), Type (radio: Movie / TV Show), Genre (dropdown) |
| Status Info | Status (dropdown) |
| Conditional *(only if Status = Completed)* | Rating (5 stars), Notes (textarea) |
| Actions | Cancel button, Save button |

---

## Step 2 — CSS (Dark CRM UI)

- **Theme:** Dark background (navy / charcoal), clean spacing, soft shadows, rounded corners
- **Cards:** Hover elevation effect
- **Filters:** Active button highlighted
- **Status colors:** 🟡 Want to Watch | 🔵 Watching | 🟢 Completed
- **Form UX:** Focus states (blue border), Error states (red border + message), Disabled fields (gray)

---

## Step 3 — Form Input States (Critical)

Every input must have these states styled:

| State | Description |
|---|---|
| `default` | Normal appearance |
| `focus` | Blue border on click |
| `filled` | Has a value |
| `error` | Red border + message below |
| `disabled` | Gray, not editable |

---

## Step 4 — JavaScript Tasks

> ✅ Start only after HTML + CSS is complete.

### 🟢 Phase 1 — Form Engine (`form.js`)
- **Task 1:** Show Rating and Notes ONLY when Status = `Completed`. Hide them for all other statuses.
- **Task 2:** Validation system:
  - Title → required, min length = 2
  - Genre → required
  - Poster URL → must be a valid URL format
  - Notes → max length 500 characters
- **Task 3:** Show inline error messages directly under each invalid field.

### 🟡 Phase 2 — Star Rating Component (`rating.js`)
- Hover → highlights stars up to hovered star
- Click → saves the rating value
- Hover out → keeps the selected rating highlighted
- Allow changing the rating by clicking again

### 🔵 Phase 3 — Data Layer (`storage.js`)
Acts as a mini database. Must contain these functions:

```javascript
getAll()           // return all records
save(record)       // add new record
deleteRecord(id)   // remove by id
update(id, data)   // edit existing record ← REQUIRED
```

### 🟣 Phase 4 — Rendering (`ui.js`)
- Render all records dynamically on `index.html`
- Show an **empty state** message if no records exist
- Update the UI without reloading the page
- `ui.js` handles all DOM updates — `app.js` calls `ui.js` functions, never touches the DOM directly

### 🟠 Phase 5 — Full CRUD
Support all four operations:

| Operation | File | Status |
|---|---|---|
| Create | `add.html` + `form.js` + `storage.js` | ✅ |
| Read | `app.js` + `ui.js` + `storage.js` | ✅ |
| Update | `edit.html` + `form.js` + `storage.js` | ✅ |
| Delete | `app.js` + `storage.js` | ✅ |

### 🔴 Phase 6 — Search, Filter, Sort
- **Search:** Real-time filtering as user types
- **Filters:** By type (Movie / TV), by status
- **Sort:** A–Z, Z–A, Highest Rated, Recently Added

### ⚫ Phase 7 — CRM Features
- **Lock Feature:** If status = `Completed` → Title, Genre, and Type fields become `disabled` (read-only)
- **Status Rule:** Cannot mark a record as `Completed` without setting a rating first

---

## Step 5 — Figma Design

Create **2 pages** in Figma:

### Page 1: Screens

**Main Screen (`index.html`):**
- Header → Stats Bar → Controls (Search + Sort + Filters) → Data View (Grid + Table)
- Table View columns: `Title | Type | Genre | Status | Rating | Actions`
- Include: Empty state ("No records yet"), hover states, active states

**Form Screen (`add.html` / `edit.html`):**
- Centered form card
- Sections: Basic Info | Status Info | Conditional Section | Buttons (Cancel / Save)
- Error messages under fields, red borders on invalid inputs, disabled fields (lock mode)

### Page 2: Components (Design System)

| Component | States |
|---|---|
| Buttons (Primary, Secondary, Danger) | default, hover, active |
| Inputs (Text, Dropdown, Radio, Textarea) | default, focus, error, disabled |
| Rating Component | default, hover, selected |
| Status Badges | 🟡 Want to Watch, 🔵 Watching, 🟢 Completed |

---

## What This Project Builds

| Skill | Practice Area |
|---|---|
| Form design | Layout, UX, field grouping |
| Validation logic | Inline errors, rules, states |
| Data modeling | JSON records, unique IDs |
| CRUD operations | Create, Read, Update, Delete |
| UI state management | Show/hide, lock, disable |
| Frontend architecture | Separated JS files, storage layer |

---

## ✅ Next Actions (In Order)

1. Create the project folder and file structure
2. Build `index.html` — HTML structure only
3. Add hardcoded test cards (2–3 records)
4. Style everything in CSS
5. Design Figma screens + components
6. Start JavaScript — Phase 1 → Phase 7

**Come back after each step — I'll review and guide you to the next one! 🚀**