# OverKill Hill P³ – Unified Sitemap (Standardized)

This document converts the custom `//` (page) and `//#` (section) notation into a more conventional sitemap structure suitable for implementation in Eleventy or Jekyll.

---

## 1. overkillhill.com (OverKill Hill Universe)

- `/`  
  Home (index)

- `/projects/`  
  Projects overview

- `/found-ry/`
  - Section: `Cage-Fight-Ry`
  - Section: `Phenomould-R`
  - Section: `PromptAscend-R`
  - Section: `ToneStrik-Ry`
  - Section: `TellePrompt-Ry`
  - Section: `StructRefino-Ry`

- `/homestead-r/`
  - Section: `HomeEstimate-R`
  - Section: `FloorPlan-R`
  - Section: `HomeVisual-R`

- `/un-nocked-truth/`
  - Section: `Geared-Up`
  - Section: `Dialed-In`
  - Section: `Hunted-Down`

- `/pathscrib-r/`
  - Section: `Abrahamic Reference Engine`

- `/manifesto/`

- `/writings/`
  - Child page: `/writings/magnus-saga/`
  - Child page: `/writings/biases-as-constants/`

- `/ponders-concepts/`

- `/prompt-gallery/`

- `/universe/`

- `/about/`

---

## 2. askjamie.bot (AskJamie Ecosystem)

- `/`  
  Home (index)

- `/resume-representative/`

- `/professional-portfolio/`

- `/enterprise-sleuth/`

- `/brandguard/`
  - Section: `LEGO`
  - Section: `Starbucks`
  - Section: `Brooks Running`
  - Section: `Ping Golf`
  - Section: `Costco`
  - Section: `Hershey`
  - Section: `LVMH`
  - Section: `Dollar General`
  - Section: `Coca-Cola`
  - Section: `Discount Tire`
  - Section: `Scheels`

- `/bfs-framing-intelligent-futures/`

- `/universe/`

- `/about/`

---

## 3. glee-fully.tools (Glee-fully Personalizable Tools)

- `/`  
  Home (index)

- `/discovered-careers/`
  - Section: `Resume Builder`
  - Section: `Resume Customizer`
  - Section: `Career Fitness`
  - Section: `Letter Composer`
  - Section: `Blinkin Tuner`
  - Section: `Career Seeker`

- `/treasured-finds/`
  - Section: `Personal Librarian`
  - Section: `Decor Detective`
  - Section: `Present Hoarder`
  - Section: `Scentinal Journal`
  - Section: `Spirited Journal`
  - Section: `Supply Haus`
  - Section: `Bag Nabbit`

- `/tasty-tracker/`
  - Section: `Flavor Meister`
  - Section: `Menu Conductor`
  - Section: `Wishful Tastes`
  - Section: `Pantry Shopper`
  - Section: `Palatably Profiled`

- `/travelers-guide/`
  - Section: `Journey Diary`
  - Section: `Itinerary Hacker`
  - Section: `Detour Discoverer`
  - Section: `Dreamland Journeys`
  - Section: `Memento Log`

- `/organized-life/`
  - Section: `Task Maestro`
  - Section: `Thrifty Spender`
  - Section: `Giftlist Helper`
  - Section: `Scheduling Wizard`
  - Section: `Lifestyle Wallboard`
  - Section: `Neighborly Bazaar`

- `/healthy-bee-ing/`
  - Section: `Care Check`
  - Section: `Calm Keep`
  - Section: `Snappy Count`
  - Section: `Medi Minder`
  - Section: `Moody Log`
  - Section: `Maven Wise`

- `/identity-known/`
  - Section: `Critter Spotter`
  - Section: `Roost Wrangler`
  - Section: `Sight Seeker`
  - Section: `Snap Decoder`
  - Section: `Motif Muse`
  - Section: `Maker Matcher`
  - Section: `Self Fixer`

- `/persona/`

- `/concepts-ideas/`

- `/universe/`

- `/about/`

---

## 4. Notes on Implementation in Eleventy / Jekyll

- Each **page** above typically becomes one Markdown or HTML file, e.g. `src/found-ry.md` or `found-ry.html`.
- Each **section** becomes a heading *inside* that file, usually with Markdown syntax:

  ```markdown
  ---
  layout: default
  title: "Found-Ry"
  permalink: "/found-ry/"
  ---

  ## Cage-Fight-Ry
  Content here...

  ## Phenomould-R
  Content here...

  ## PromptAscend-R
  Content here...
  ```

- For Eleventy, the folder and file structure under `src/` plus optional `permalink` in front matter will control URLs.
- For Jekyll, files live under the site root with front matter and optional `permalink` to control paths.

This sitemap is structured so it can be translated directly into directories and Markdown files for either generator.

