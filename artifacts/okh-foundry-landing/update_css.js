const fs = require('fs');
const content = fs.readFileSync('src/index.css', 'utf-8');

const newCss = `
:root {
  --okh-espresso: #2a2320;
  --okh-teal: #1c3a34;
  --okh-rust: #5b3a27;
  --okh-orange: #c46a2c;
  --okh-amber: #e6a03c;
  --okh-olive: #676a2c;
  --okh-ochre: #a06e28;
  --okh-paper: #f6f2ee;
  --okh-void: #0f172a;

  --background: 222 47% 10%;
  --foreground: 213 11% 90%;
  --border: 215 20% 20%;
  --card: 222 47% 12%;
  --card-foreground: 213 11% 90%;
  --card-border: 215 20% 20%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 16% 57%;
  --sidebar: 222 47% 10%;
  --sidebar-foreground: 213 11% 90%;
  --sidebar-border: 215 20% 20%;
  --sidebar-primary: 25 65% 48%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 217 33% 17%;
  --sidebar-accent-foreground: 213 11% 90%;
  --sidebar-ring: 25 65% 48%;
  --popover: 222 47% 10%;
  --popover-foreground: 213 11% 90%;
  --popover-border: 215 20% 20%;
  --primary: 25 65% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 213 11% 90%;
  --accent: 25 65% 48%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --input: 215 20% 25%;
  --ring: 25 65% 48%;
  --chart-1: 25 65% 48%;
  --chart-2: 38 78% 56%;
  --chart-3: 166 48% 17%;
  --chart-4: 31 58% 38%;
  --chart-5: 43 72% 52%;
  --radius: 0.5rem;
  --app-font-sans: 'DM Sans', sans-serif;
  --app-font-serif: 'Alfa Slab One', serif;
  --app-font-mono: 'JetBrains Mono', monospace;
}

.dark {
  --okh-espresso: #2a2320;
  --okh-teal: #1c3a34;
  --okh-rust: #5b3a27;
  --okh-orange: #c46a2c;
  --okh-amber: #e6a03c;
  --okh-olive: #676a2c;
  --okh-ochre: #a06e28;
  --okh-paper: #f6f2ee;
  --okh-void: #0f172a;

  --background: 222 47% 10%;
  --foreground: 213 11% 90%;
  --border: 215 20% 20%;
  --card: 222 47% 12%;
  --card-foreground: 213 11% 90%;
  --card-border: 215 20% 20%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 16% 57%;
  --sidebar: 222 47% 10%;
  --sidebar-foreground: 213 11% 90%;
  --sidebar-border: 215 20% 20%;
  --sidebar-primary: 25 65% 48%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 217 33% 17%;
  --sidebar-accent-foreground: 213 11% 90%;
  --sidebar-ring: 25 65% 48%;
  --popover: 222 47% 10%;
  --popover-foreground: 213 11% 90%;
  --popover-border: 215 20% 20%;
  --primary: 25 65% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 213 11% 90%;
  --accent: 25 65% 48%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --input: 215 20% 25%;
  --ring: 25 65% 48%;
  --chart-1: 25 65% 48%;
  --chart-2: 38 78% 56%;
  --chart-3: 166 48% 17%;
  --chart-4: 31 58% 38%;
  --chart-5: 43 72% 52%;
}

body {
  background-color: #0f172a;
  color: #e5e7eb;
  margin: 0;
  padding: 0;
}
`;

const modified = content.replace(/\\/\\* LIGHT MODE \\*\\/[\\s\\S]+?(?=\\@layer base \\{)/, newCss + "\\n\\n");
fs.writeFileSync('src/index.css', modified);
