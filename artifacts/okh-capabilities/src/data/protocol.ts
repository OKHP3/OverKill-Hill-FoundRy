import { FileText, Users, Settings, ScrollText, Layers, FileStack, Zap, MessageSquare, ListChecks, SearchCheck, Scale, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Stage {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface Phase {
  id: string;
  phaseNumber: string;
  title: string;
  description: string;
  icon: string;
  stages: Stage[];
}

export const PROTOCOL_PHASES: Phase[] = [
  {
    id: "craft",
    phaseNumber: "01",
    title: "Craft the Brief",
    description: "Define the GPT's purpose, audience, persona, and capability boundaries before a single instruction is written. Protocol-first prevents scope creep and vague outputs.",
    icon: "◈",
    stages: [
      {
        id: "build_brief",
        label: "Build Brief",
        description: "Define the GPT's core purpose, target audience, and primary workflow.",
        icon: FileText
      },
      {
        id: "persona",
        label: "Persona",
        description: "Establish the tone, voice, and behavioral constraints.",
        icon: Users
      },
      {
        id: "capabilities",
        label: "Capabilities",
        description: "Toggle and configure baseline features (Web Search, Code Interpreter, etc.).",
        icon: Settings
      },
      {
        id: "conversation_contract",
        label: "Conversation Contract",
        description: "Set the rules of engagement and how it handles ambiguity.",
        icon: ScrollText
      }
    ]
  },
  {
    id: "forge",
    phaseNumber: "02",
    title: "Forge the Instructions",
    description: "Stack layered instructions, knowledge files, and conversation starters into a coherent, testable system. Every element earns its place or gets cut.",
    icon: "⬡",
    stages: [
      {
        id: "instruction_stack",
        label: "Instruction Stack",
        description: "Layer operational guidelines, priorities, and step-by-step logic.",
        icon: Layers
      },
      {
        id: "knowledge_files",
        label: "Knowledge Files",
        description: "Upload and map curated documents with explicit retrieval policies.",
        icon: FileStack
      },
      {
        id: "actions",
        label: "Actions",
        description: "Configure OpenAPI schemas, authentication, and endpoint routing.",
        icon: Zap
      },
      {
        id: "conversation_starters",
        label: "Conversation Starters",
        description: "Craft initial user prompts that demonstrate optimal use cases.",
        icon: MessageSquare
      }
    ]
  },
  {
    id: "ship",
    phaseNumber: "03",
    title: "Test & Ship",
    description: "Run the test matrix, audit mode, and platform comparison before export. Ship a complete package — not just a prompt pasted into a GPT builder.",
    icon: "⬢",
    stages: [
      {
        id: "test_matrix",
        label: "Test Matrix",
        description: "Run the happy path, edge cases, out-of-scope, and adversarial prompts.",
        icon: ListChecks
      },
      {
        id: "audit_mode",
        label: "Audit Mode",
        description: "Evaluate against the 10-point quality and safety checklist.",
        icon: SearchCheck
      },
      {
        id: "platform_compare",
        label: "Platform Compare",
        description: "Benchmark against Gemini Gems and Copilot Agents.",
        icon: Scale
      },
      {
        id: "export_package",
        label: "Export Package",
        description: "Package the final configuration, icons, and instructions for deployment.",
        icon: Package
      }
    ]
  }
];
