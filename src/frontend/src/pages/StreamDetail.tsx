import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Lock,
  Map as MapIcon,
  Trophy,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CareerStream, createActor } from "../backend";
import CTAButton from "../components/CTAButton";
import PageHeader from "../components/PageHeader";
import ProgressBadge from "../components/ProgressBadge";
import { useAuth } from "../hooks/use-auth";
import { useSubscription } from "../hooks/use-subscription";
import { STREAM_META } from "../types";
import type { StreamProgressPublic } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizQuestion {
  id: number;
  text: string;
  options: { id: number; text: string; emoji: string }[];
}

interface StreamQuiz {
  id: number;
  title: string;
  description: string;
  duration: string;
  questions: QuizQuestion[];
}

interface MicroProject {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  difficulty: string;
}

interface StreamContent {
  quizzes: StreamQuiz[];
  projects: MicroProject[];
  careers: { title: string; description: string }[];
}

// ─── Stream Content Data ──────────────────────────────────────────────────────

const STREAM_CONTENT: Record<string, StreamContent> = {
  contentGaming: {
    quizzes: [
      {
        id: 1,
        title: "YouTube Strategy Basics",
        description:
          "Explore how viral content is planned and distributed online.",
        duration: "8 min",
        questions: [
          {
            id: 1,
            text: "What do you think makes a video go viral on YouTube?",
            options: [
              {
                id: 1,
                text: "Posting every day regardless of quality",
                emoji: "📅",
              },
              {
                id: 2,
                text: "A strong hook in the first 10 seconds",
                emoji: "🪝",
              },
              {
                id: 3,
                text: "Very long videos with lots of detail",
                emoji: "⏱️",
              },
              {
                id: 4,
                text: "Using every trending hashtag available",
                emoji: "#️⃣",
              },
            ],
          },
          {
            id: 2,
            text: "Which element matters most when building an audience online?",
            options: [
              { id: 1, text: "Posting only on holidays", emoji: "🎉" },
              {
                id: 2,
                text: "Consistency and recognizable style",
                emoji: "🔄",
              },
              { id: 3, text: "Avoiding comments and interaction", emoji: "🔇" },
              {
                id: 4,
                text: "Copying other creators' formats exactly",
                emoji: "📋",
              },
            ],
          },
          {
            id: 3,
            text: "How do you think thumbnails affect a video's success?",
            options: [
              {
                id: 1,
                text: "They don't matter — only the title does",
                emoji: "🙅",
              },
              {
                id: 2,
                text: "They're the first thing viewers judge",
                emoji: "👁️",
              },
              { id: 3, text: "Brighter always means more clicks", emoji: "💡" },
              { id: 4, text: "Only face thumbnails perform well", emoji: "😊" },
            ],
          },
          {
            id: 4,
            text: "What role does storytelling play in content creation?",
            options: [
              {
                id: 1,
                text: "None — facts and data are all that matter",
                emoji: "📊",
              },
              {
                id: 2,
                text: "It creates emotional connection with the audience",
                emoji: "❤️",
              },
              {
                id: 3,
                text: "Stories slow down the pacing too much",
                emoji: "🐢",
              },
              {
                id: 4,
                text: "Only fiction channels need storytelling",
                emoji: "📚",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Game Design Basics",
        description:
          "Understand the core principles of how games are designed and balanced.",
        duration: "10 min",
        questions: [
          {
            id: 1,
            text: "What is the main purpose of a game's 'core loop'?",
            options: [
              {
                id: 1,
                text: "To make the game as hard as possible",
                emoji: "💀",
              },
              {
                id: 2,
                text: "To keep players engaged through repeated meaningful actions",
                emoji: "🔁",
              },
              {
                id: 3,
                text: "To add as many features as possible",
                emoji: "➕",
              },
              { id: 4, text: "To show off the best graphics", emoji: "🎨" },
            ],
          },
          {
            id: 2,
            text: "Why do most successful games start simple and add complexity gradually?",
            options: [
              {
                id: 1,
                text: "Because players have short attention spans",
                emoji: "⏰",
              },
              { id: 2, text: "To reduce the cost of development", emoji: "💰" },
              {
                id: 3,
                text: "To ease players into mechanics without overwhelming them",
                emoji: "📈",
              },
              { id: 4, text: "It's just an industry tradition", emoji: "🏛️" },
            ],
          },
          {
            id: 3,
            text: "What does 'player agency' mean in game design?",
            options: [
              {
                id: 1,
                text: "The speed at which players progress",
                emoji: "⚡",
              },
              {
                id: 2,
                text: "The player's ability to make meaningful choices",
                emoji: "🎯",
              },
              {
                id: 3,
                text: "How many characters the player can unlock",
                emoji: "🔓",
              },
              {
                id: 4,
                text: "The AI controlling non-player characters",
                emoji: "🤖",
              },
            ],
          },
          {
            id: 4,
            text: "Which of the following best describes 'game balance'?",
            options: [
              {
                id: 1,
                text: "Ensuring all characters look equally good",
                emoji: "💄",
              },
              {
                id: 2,
                text: "Making sure no strategy is overwhelmingly dominant",
                emoji: "⚖️",
              },
              {
                id: 3,
                text: "Having equal numbers of levels in each world",
                emoji: "🔢",
              },
              {
                id: 4,
                text: "Splitting the game into two equal halves",
                emoji: "✂️",
              },
            ],
          },
          {
            id: 5,
            text: "What is 'emergent gameplay'?",
            options: [
              {
                id: 1,
                text: "Gameplay that only appears in sequels",
                emoji: "2️⃣",
              },
              {
                id: 2,
                text: "Unintended but interesting outcomes from player creativity",
                emoji: "✨",
              },
              { id: 3, text: "New DLC released after launch", emoji: "📦" },
              { id: 4, text: "Tutorial sections for new players", emoji: "🎓" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Content Planning & Strategy",
        description:
          "Explore how professional creators plan and schedule their content.",
        duration: "9 min",
        questions: [
          {
            id: 1,
            text: "What is a content calendar used for?",
            options: [
              { id: 1, text: "Tracking personal appointments", emoji: "🗓️" },
              {
                id: 2,
                text: "Planning when and what content will be published",
                emoji: "📋",
              },
              {
                id: 3,
                text: "Counting how many followers you have per month",
                emoji: "📊",
              },
              { id: 4, text: "Scheduling meetings with sponsors", emoji: "🤝" },
            ],
          },
          {
            id: 2,
            text: "What does 'content pillar' mean in strategy?",
            options: [
              {
                id: 1,
                text: "The most expensive piece of content you create",
                emoji: "💸",
              },
              {
                id: 2,
                text: "A core theme or topic your content consistently revolves around",
                emoji: "🏛️",
              },
              {
                id: 3,
                text: "A clickbait headline that grabs attention",
                emoji: "📰",
              },
              { id: 4, text: "The first video in a series", emoji: "1️⃣" },
            ],
          },
          {
            id: 3,
            text: "Why do creators repurpose content across platforms?",
            options: [
              { id: 1, text: "Because they're lazy", emoji: "😴" },
              {
                id: 2,
                text: "To save time and reach different audience segments",
                emoji: "🔄",
              },
              {
                id: 3,
                text: "Because platforms require it in their terms",
                emoji: "📜",
              },
              { id: 4, text: "To confuse the algorithm", emoji: "🤔" },
            ],
          },
          {
            id: 4,
            text: "What is 'evergreen content'?",
            options: [
              {
                id: 1,
                text: "Content about nature and the environment",
                emoji: "🌿",
              },
              {
                id: 2,
                text: "Content that stays relevant and valuable over a long time",
                emoji: "♻️",
              },
              {
                id: 3,
                text: "Content released during spring only",
                emoji: "🌸",
              },
              { id: 4, text: "The most recent trending topic", emoji: "🔥" },
            ],
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Design a YouTube Channel Concept",
        description:
          "Plan a YouTube channel from scratch — decide your niche, target audience, and content style. Think about what makes your channel unique and how you'd structure your first 5 videos.",
        objectives: [
          "Define a clear niche and target audience",
          "Write titles and descriptions for 5 video ideas",
          "Sketch a thumbnail concept for your top video",
        ],
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Create a Game Design Document (Mini)",
        description:
          "Write a short game design document for an original game concept. Include the core loop, main mechanics, win/lose conditions, and the emotion you want players to feel.",
        objectives: [
          "Describe core gameplay loop in under 200 words",
          "Define at least 3 game mechanics",
          "Explain what makes your game fun and unique",
        ],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Script a 60-Second Content Intro",
        description:
          "Write and practise a 60-second video intro script. Focus on hooking the viewer immediately, introducing yourself memorably, and previewing the value the video delivers.",
        objectives: [
          "Hook the audience within the first 5 seconds",
          "Introduce yourself and channel personality",
          "Clearly state what the viewer will gain",
        ],
        difficulty: "Beginner",
      },
    ],
    careers: [
      {
        title: "Game Designer",
        description:
          "Design mechanics, levels, and player experiences for games.",
      },
      {
        title: "Content Creator",
        description: "Build audiences with video, audio, and written content.",
      },
      {
        title: "UX Designer",
        description: "Shape how people interact with digital products.",
      },
      {
        title: "Animator",
        description: "Bring characters and stories to life frame by frame.",
      },
    ],
  },
  science: {
    quizzes: [
      {
        id: 1,
        title: "Experiment Design",
        description:
          "Understand how scientists structure experiments to get reliable results.",
        duration: "9 min",
        questions: [
          {
            id: 1,
            text: "What is the purpose of a control group in an experiment?",
            options: [
              { id: 1, text: "To make the experiment run faster", emoji: "⚡" },
              {
                id: 2,
                text: "To provide a baseline for comparison",
                emoji: "📏",
              },
              { id: 3, text: "To test the most extreme variable", emoji: "🔬" },
              { id: 4, text: "To increase the sample size", emoji: "📈" },
            ],
          },
          {
            id: 2,
            text: "Why do scientists repeat experiments multiple times?",
            options: [
              { id: 1, text: "Because they enjoy it", emoji: "😄" },
              {
                id: 2,
                text: "To ensure results are consistent and reliable",
                emoji: "🔁",
              },
              {
                id: 3,
                text: "To find the most impressive result",
                emoji: "🏆",
              },
              { id: 4, text: "To use up their lab budget", emoji: "💰" },
            ],
          },
          {
            id: 3,
            text: "What is an independent variable?",
            options: [
              { id: 1, text: "The result you measure at the end", emoji: "📊" },
              {
                id: 2,
                text: "The factor you intentionally change in the experiment",
                emoji: "🔧",
              },
              {
                id: 3,
                text: "A variable that cannot be controlled",
                emoji: "🌪️",
              },
              { id: 4, text: "The title of your experiment", emoji: "📝" },
            ],
          },
          {
            id: 4,
            text: "What does 'peer review' mean in science?",
            options: [
              { id: 1, text: "Friends checking your homework", emoji: "👫" },
              {
                id: 2,
                text: "Other scientists checking your methods and findings",
                emoji: "🔍",
              },
              {
                id: 3,
                text: "Reviewing your classmates' presentations",
                emoji: "🎤",
              },
              { id: 4, text: "Reading scientific papers for fun", emoji: "📖" },
            ],
          },
          {
            id: 5,
            text: "What makes a good scientific hypothesis?",
            options: [
              {
                id: 1,
                text: "It should be very complicated to sound impressive",
                emoji: "🤓",
              },
              {
                id: 2,
                text: "It should be testable and falsifiable",
                emoji: "✅",
              },
              { id: 3, text: "It should always be proven true", emoji: "✔️" },
              {
                id: 4,
                text: "It should be based on feelings rather than evidence",
                emoji: "💭",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Research Methods",
        description:
          "Discover how researchers design studies and interpret data.",
        duration: "10 min",
        questions: [
          {
            id: 1,
            text: "What is the difference between qualitative and quantitative research?",
            options: [
              {
                id: 1,
                text: "Qualitative uses numbers; quantitative uses words",
                emoji: "🔄",
              },
              {
                id: 2,
                text: "Qualitative explores concepts; quantitative measures data",
                emoji: "🎭",
              },
              { id: 3, text: "There is no real difference", emoji: "🤷" },
              {
                id: 4,
                text: "Qualitative is easier than quantitative",
                emoji: "💤",
              },
            ],
          },
          {
            id: 2,
            text: "Why is a large sample size important in research?",
            options: [
              { id: 1, text: "It takes more time to do", emoji: "⏳" },
              {
                id: 2,
                text: "It makes results more representative and reduces bias",
                emoji: "🎯",
              },
              {
                id: 3,
                text: "Journals only publish large studies",
                emoji: "📰",
              },
              {
                id: 4,
                text: "Small samples always contain errors",
                emoji: "❌",
              },
            ],
          },
          {
            id: 3,
            text: "What is confirmation bias in research?",
            options: [
              {
                id: 1,
                text: "Confirming your results with a supervisor",
                emoji: "👨‍🏫",
              },
              {
                id: 2,
                text: "Seeking data that supports your existing belief",
                emoji: "🕵️",
              },
              {
                id: 3,
                text: "Running an experiment twice to confirm it works",
                emoji: "✌️",
              },
              {
                id: 4,
                text: "Checking measurements are in the right units",
                emoji: "📐",
              },
            ],
          },
          {
            id: 4,
            text: "What does 'correlation does not imply causation' mean?",
            options: [
              { id: 1, text: "Correlated events are unrelated", emoji: "🚫" },
              {
                id: 2,
                text: "Two things happening together doesn't mean one causes the other",
                emoji: "🔗",
              },
              {
                id: 3,
                text: "Only lab experiments can prove causation",
                emoji: "🧪",
              },
              { id: 4, text: "Causal research is more expensive", emoji: "💸" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Lab Safety & Ethics",
        description:
          "Learn the essential rules that keep scientists and their subjects safe.",
        duration: "8 min",
        questions: [
          {
            id: 1,
            text: "Why is lab safety critical in scientific experiments?",
            options: [
              { id: 1, text: "To avoid failing the class", emoji: "📉" },
              {
                id: 2,
                text: "To prevent injuries, contamination, and invalid results",
                emoji: "🦺",
              },
              {
                id: 3,
                text: "Rules only matter in chemistry labs",
                emoji: "🧪",
              },
              {
                id: 4,
                text: "Safety equipment looks professional",
                emoji: "👔",
              },
            ],
          },
          {
            id: 2,
            text: "What is 'informed consent' in scientific research?",
            options: [
              {
                id: 1,
                text: "The researcher agreeing to follow safety rules",
                emoji: "✍️",
              },
              {
                id: 2,
                text: "Participants voluntarily agreeing after understanding the study",
                emoji: "🤝",
              },
              {
                id: 3,
                text: "Getting permission to publish results",
                emoji: "📄",
              },
              {
                id: 4,
                text: "The ethics board approving the budget",
                emoji: "💰",
              },
            ],
          },
          {
            id: 3,
            text: "What does it mean to disclose a conflict of interest?",
            options: [
              {
                id: 1,
                text: "Arguing with colleagues about methodology",
                emoji: "🗣️",
              },
              {
                id: 2,
                text: "Revealing any financial or personal stake in the research outcome",
                emoji: "💼",
              },
              {
                id: 3,
                text: "Declaring all the chemicals used in the study",
                emoji: "⚗️",
              },
              {
                id: 4,
                text: "Sharing your research with competitors",
                emoji: "🏃",
              },
            ],
          },
          {
            id: 4,
            text: "Why should scientists share negative results?",
            options: [
              {
                id: 1,
                text: "They shouldn't — only successes deserve publishing",
                emoji: "🏆",
              },
              {
                id: 2,
                text: "It prevents others from wasting time on the same dead end",
                emoji: "🛑",
              },
              { id: 3, text: "Funding bodies require it by law", emoji: "⚖️" },
              {
                id: 4,
                text: "It makes the researcher look more honest",
                emoji: "😇",
              },
            ],
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Design a Scientific Experiment",
        description:
          "Choose a topic that interests you and design a complete experiment. Identify your hypothesis, variables, method, and how you'd record results. No lab needed — this is all about thinking like a scientist.",
        objectives: [
          "Write a clear, testable hypothesis",
          "Identify independent, dependent, and control variables",
          "Outline your experimental procedure step by step",
        ],
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Analyse a Real Research Study",
        description:
          "Find a published science article (from BBC Science, ScienceDaily, or similar) and analyse it critically. Evaluate the methodology, sample size, and whether the conclusions are supported by the data.",
        objectives: [
          "Summarise the study's main question and findings",
          "Identify the methodology and assess its strengths",
          "Note any potential biases or limitations",
        ],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Create a Science Communication Post",
        description:
          "Take a complex scientific concept you find fascinating and explain it in plain language for a general audience. Think about analogies, visuals, and how to make it accessible without losing accuracy.",
        objectives: [
          "Explain a complex concept in under 300 words",
          "Use at least one analogy to aid understanding",
          "Cite your sources clearly",
        ],
        difficulty: "Beginner",
      },
    ],
    careers: [
      {
        title: "Software Engineer",
        description: "Build the apps and systems powering the world.",
      },
      {
        title: "Data Scientist",
        description: "Find insights in data to drive major decisions.",
      },
      {
        title: "Biomedical Researcher",
        description: "Advance health and medicine through science.",
      },
      {
        title: "Environmental Scientist",
        description: "Solve pressing climate and ecological challenges.",
      },
    ],
  },
  commerce: {
    quizzes: [
      {
        id: 1,
        title: "Business Plan Basics",
        description:
          "Understand the building blocks of a business idea and how to structure one.",
        duration: "9 min",
        questions: [
          {
            id: 1,
            text: "What is a value proposition in a business?",
            options: [
              { id: 1, text: "The price of your product", emoji: "💰" },
              {
                id: 2,
                text: "What makes your offer uniquely valuable to customers",
                emoji: "💎",
              },
              { id: 3, text: "The number of products you sell", emoji: "🔢" },
              { id: 4, text: "Your company's legal name", emoji: "📝" },
            ],
          },
          {
            id: 2,
            text: "What does 'target market' mean in business?",
            options: [
              {
                id: 1,
                text: "The store where you sell your product",
                emoji: "🏪",
              },
              {
                id: 2,
                text: "The specific group of customers you aim to serve",
                emoji: "🎯",
              },
              { id: 3, text: "Your company's revenue goal", emoji: "📈" },
              { id: 4, text: "Competitors you want to beat", emoji: "⚔️" },
            ],
          },
          {
            id: 3,
            text: "What is a business model?",
            options: [
              { id: 1, text: "A 3D replica of your store", emoji: "🏗️" },
              {
                id: 2,
                text: "How a company creates, delivers, and captures value",
                emoji: "🔄",
              },
              {
                id: 3,
                text: "The number of employees you plan to hire",
                emoji: "👥",
              },
              { id: 4, text: "Your office layout plan", emoji: "🗺️" },
            ],
          },
          {
            id: 4,
            text: "Which of the following best describes a 'lean startup' approach?",
            options: [
              {
                id: 1,
                text: "Starting a business with a very small team",
                emoji: "👤",
              },
              {
                id: 2,
                text: "Building an MVP and iterating based on real feedback",
                emoji: "🔁",
              },
              {
                id: 3,
                text: "Avoiding any investment in marketing",
                emoji: "🚫",
              },
              { id: 4, text: "Only selling digital products", emoji: "💻" },
            ],
          },
          {
            id: 5,
            text: "What does ROI stand for and why does it matter?",
            options: [
              {
                id: 1,
                text: "Rate of Inventory — it tracks stock levels",
                emoji: "📦",
              },
              {
                id: 2,
                text: "Return on Investment — it measures profit relative to cost",
                emoji: "💹",
              },
              {
                id: 3,
                text: "Record of Income — it logs all sales",
                emoji: "📋",
              },
              {
                id: 4,
                text: "Risk of Insolvency — a warning signal",
                emoji: "⚠️",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Financial Literacy",
        description:
          "Explore how money works — from budgeting to understanding key financial terms.",
        duration: "10 min",
        questions: [
          {
            id: 1,
            text: "What is the difference between a fixed cost and a variable cost?",
            options: [
              {
                id: 1,
                text: "Fixed costs change monthly; variable costs stay the same",
                emoji: "🔄",
              },
              {
                id: 2,
                text: "Fixed costs stay constant; variable costs change with output",
                emoji: "📊",
              },
              { id: 3, text: "There is no real difference", emoji: "🤷" },
              { id: 4, text: "Variable costs are always higher", emoji: "📈" },
            ],
          },
          {
            id: 2,
            text: "What does 'cash flow' refer to in a business?",
            options: [
              {
                id: 1,
                text: "How much money is in the bank account",
                emoji: "🏦",
              },
              {
                id: 2,
                text: "The movement of money in and out of the business over time",
                emoji: "💸",
              },
              { id: 3, text: "Total annual revenue", emoji: "📅" },
              { id: 4, text: "The number of daily transactions", emoji: "🔢" },
            ],
          },
          {
            id: 3,
            text: "What is compound interest?",
            options: [
              {
                id: 1,
                text: "Interest calculated only on the original amount",
                emoji: "1️⃣",
              },
              {
                id: 2,
                text: "Interest earned on both principal and accumulated interest",
                emoji: "📈",
              },
              { id: 3, text: "A penalty for missing a payment", emoji: "❌" },
              { id: 4, text: "A type of bank account", emoji: "🏦" },
            ],
          },
          {
            id: 4,
            text: "What is the purpose of a budget?",
            options: [
              {
                id: 1,
                text: "To limit how much you can spend forever",
                emoji: "🔒",
              },
              {
                id: 2,
                text: "To plan and control how resources are allocated over time",
                emoji: "📋",
              },
              { id: 3, text: "To calculate your tax return", emoji: "📊" },
              { id: 4, text: "To impress investors with numbers", emoji: "😎" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Market Research Fundamentals",
        description:
          "Learn how businesses gather and use data to understand their customers.",
        duration: "8 min",
        questions: [
          {
            id: 1,
            text: "What is primary market research?",
            options: [
              {
                id: 1,
                text: "Research done by the government about an industry",
                emoji: "🏛️",
              },
              {
                id: 2,
                text: "Collecting original data directly from customers or potential customers",
                emoji: "🎤",
              },
              {
                id: 3,
                text: "Reading existing published reports",
                emoji: "📖",
              },
              {
                id: 4,
                text: "The most important research you do",
                emoji: "⭐",
              },
            ],
          },
          {
            id: 2,
            text: "What is a SWOT analysis used for?",
            options: [
              {
                id: 1,
                text: "Evaluating how attractive an employee is",
                emoji: "👔",
              },
              {
                id: 2,
                text: "Assessing a business's Strengths, Weaknesses, Opportunities, Threats",
                emoji: "🔍",
              },
              {
                id: 3,
                text: "Calculating profitability over 5 years",
                emoji: "📊",
              },
              {
                id: 4,
                text: "Testing a new product before launch",
                emoji: "🧪",
              },
            ],
          },
          {
            id: 3,
            text: "What does 'market segmentation' mean?",
            options: [
              {
                id: 1,
                text: "Dividing a market into distinct groups of buyers",
                emoji: "✂️",
              },
              {
                id: 2,
                text: "Breaking a company into smaller departments",
                emoji: "🏢",
              },
              {
                id: 3,
                text: "The percentage of the market you control",
                emoji: "🥧",
              },
              {
                id: 4,
                text: "Testing different prices for your product",
                emoji: "🏷️",
              },
            ],
          },
          {
            id: 4,
            text: "Why is customer feedback valuable to a business?",
            options: [
              {
                id: 1,
                text: "It's required by law in most countries",
                emoji: "⚖️",
              },
              {
                id: 2,
                text: "It helps businesses improve products and spot unmet needs",
                emoji: "💡",
              },
              {
                id: 3,
                text: "Positive reviews boost the CEO's confidence",
                emoji: "😁",
              },
              {
                id: 4,
                text: "Feedback is mostly noise and rarely useful",
                emoji: "📢",
              },
            ],
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Write a One-Page Business Pitch",
        description:
          "Choose a problem you've noticed in your school, community, or daily life and design a simple business idea to solve it. Write a one-page pitch covering the problem, your solution, target customers, and how you'd make money.",
        objectives: [
          "Clearly define a problem and your solution",
          "Identify who your first customers would be",
          "Describe your revenue model in simple terms",
        ],
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Build a Mock Startup Budget",
        description:
          "Create a monthly budget for a fictional startup of your choice. Include your startup costs, recurring expenses, and projected revenue for the first three months. Use a spreadsheet or simple table format.",
        objectives: [
          "List all startup and running costs",
          "Project monthly revenue realistically",
          "Calculate your break-even point",
        ],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Conduct a Mini Market Survey",
        description:
          "Create a 5-question survey about a product or service idea and collect at least 5 responses from friends, family, or classmates. Summarise what you learned and how it would change your approach.",
        objectives: [
          "Write 5 clear, unbiased survey questions",
          "Collect and record at least 5 genuine responses",
          "Summarise findings and key insights in 100 words",
        ],
        difficulty: "Beginner",
      },
    ],
    careers: [
      {
        title: "Entrepreneur",
        description: "Build and scale businesses that solve real problems.",
      },
      {
        title: "Financial Analyst",
        description: "Guide companies through data-driven financial decisions.",
      },
      {
        title: "Marketing Manager",
        description: "Create campaigns that connect brands to people.",
      },
      {
        title: "Management Consultant",
        description: "Help organisations improve strategy and performance.",
      },
    ],
  },
  arts: {
    quizzes: [
      {
        id: 1,
        title: "Portfolio Building",
        description:
          "Explore how artists and designers curate and present their work professionally.",
        duration: "8 min",
        questions: [
          {
            id: 1,
            text: "What is the purpose of a creative portfolio?",
            options: [
              {
                id: 1,
                text: "To store all your work in one folder",
                emoji: "📁",
              },
              {
                id: 2,
                text: "To showcase your skills and style to potential clients or schools",
                emoji: "✨",
              },
              {
                id: 3,
                text: "To track how many projects you've completed",
                emoji: "🔢",
              },
              {
                id: 4,
                text: "To keep your work private and secure",
                emoji: "🔒",
              },
            ],
          },
          {
            id: 2,
            text: "How should you decide which work to include in your portfolio?",
            options: [
              {
                id: 1,
                text: "Include everything — more is always better",
                emoji: "📚",
              },
              {
                id: 2,
                text: "Include your strongest, most relevant pieces for your audience",
                emoji: "🎯",
              },
              {
                id: 3,
                text: "Only include work from the last month",
                emoji: "📅",
              },
              {
                id: 4,
                text: "Include work you enjoyed making, not what looks best",
                emoji: "❤️",
              },
            ],
          },
          {
            id: 3,
            text: "What makes a creative's personal brand important?",
            options: [
              {
                id: 1,
                text: "It gets you verified on social media",
                emoji: "✅",
              },
              {
                id: 2,
                text: "It communicates who you are and what you stand for as an artist",
                emoji: "🎨",
              },
              {
                id: 3,
                text: "It's just a logo and colour palette",
                emoji: "🖌️",
              },
              {
                id: 4,
                text: "It's only relevant for large studios",
                emoji: "🏢",
              },
            ],
          },
          {
            id: 4,
            text: "Why is context important when presenting artwork?",
            options: [
              {
                id: 1,
                text: "Viewers should interpret work without any help",
                emoji: "🧩",
              },
              {
                id: 2,
                text: "It helps audiences understand your intent and creative process",
                emoji: "💬",
              },
              {
                id: 3,
                text: "Context replaces the need for quality work",
                emoji: "🔄",
              },
              {
                id: 4,
                text: "Only galleries require contextual notes",
                emoji: "🖼️",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Creative Brief Essentials",
        description:
          "Learn how creative professionals communicate requirements and intentions.",
        duration: "9 min",
        questions: [
          {
            id: 1,
            text: "What is a creative brief used for?",
            options: [
              {
                id: 1,
                text: "A short summary of a finished project",
                emoji: "📝",
              },
              {
                id: 2,
                text: "A document guiding the creative direction and goals of a project",
                emoji: "🧭",
              },
              {
                id: 3,
                text: "A contract between artist and client",
                emoji: "📜",
              },
              {
                id: 4,
                text: "A list of materials needed for a shoot",
                emoji: "🎒",
              },
            ],
          },
          {
            id: 2,
            text: "Who typically writes a creative brief?",
            options: [
              { id: 1, text: "The finance team", emoji: "💰" },
              {
                id: 2,
                text: "The client or project lead, with input from the creative team",
                emoji: "🤝",
              },
              { id: 3, text: "Only the art director", emoji: "🎬" },
              {
                id: 4,
                text: "It's auto-generated by design software",
                emoji: "🤖",
              },
            ],
          },
          {
            id: 3,
            text: "What should a good creative brief include?",
            options: [
              { id: 1, text: "Just the deadline and budget", emoji: "📅" },
              {
                id: 2,
                text: "Objective, audience, tone, deliverables, and timeline",
                emoji: "✅",
              },
              {
                id: 3,
                text: "The creative's personal vision statement",
                emoji: "💭",
              },
              {
                id: 4,
                text: "Only visual references and moodboards",
                emoji: "🖼️",
              },
            ],
          },
          {
            id: 4,
            text: "What is 'creative direction'?",
            options: [
              {
                id: 1,
                text: "Telling team members where to sit in the office",
                emoji: "🗺️",
              },
              {
                id: 2,
                text: "Guiding the visual and conceptual language of a project",
                emoji: "🎨",
              },
              {
                id: 3,
                text: "The instructions given to printer operators",
                emoji: "🖨️",
              },
              {
                id: 4,
                text: "The path from sketch to final artwork",
                emoji: "✏️",
              },
            ],
          },
          {
            id: 5,
            text: "Why should you ask clarifying questions before starting a creative project?",
            options: [
              {
                id: 1,
                text: "To delay the project and buy more time",
                emoji: "⏰",
              },
              {
                id: 2,
                text: "To make sure your output aligns with the client's actual vision",
                emoji: "🎯",
              },
              {
                id: 3,
                text: "Questions make you look more experienced",
                emoji: "😎",
              },
              {
                id: 4,
                text: "You should never ask — just use your instincts",
                emoji: "🤷",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Art History Overview",
        description:
          "Explore key movements in art history and how they still influence design today.",
        duration: "10 min",
        questions: [
          {
            id: 1,
            text: "What was the Bauhaus movement known for?",
            options: [
              { id: 1, text: "Romantic landscape painting", emoji: "🌅" },
              {
                id: 2,
                text: "Combining fine art with functional design and craft",
                emoji: "🏛️",
              },
              {
                id: 3,
                text: "Political protest art on public walls",
                emoji: "✊",
              },
              {
                id: 4,
                text: "Abstract sculpture using natural materials",
                emoji: "🌿",
              },
            ],
          },
          {
            id: 2,
            text: "What defines Impressionism as an art movement?",
            options: [
              {
                id: 1,
                text: "Hyper-realistic portraits of historical figures",
                emoji: "👑",
              },
              {
                id: 2,
                text: "Capturing light and atmosphere through loose, expressive brushwork",
                emoji: "🌤️",
              },
              {
                id: 3,
                text: "Geometric abstraction and primary colours only",
                emoji: "🔺",
              },
              {
                id: 4,
                text: "Religious iconography in medieval style",
                emoji: "⛪",
              },
            ],
          },
          {
            id: 3,
            text: "How does understanding art history help a designer today?",
            options: [
              {
                id: 1,
                text: "It doesn't — modern design has nothing to do with the past",
                emoji: "🙅",
              },
              {
                id: 2,
                text: "It provides a reference library of ideas, aesthetics, and context",
                emoji: "📚",
              },
              {
                id: 3,
                text: "It helps you memorise facts for quizzes",
                emoji: "🧠",
              },
              { id: 4, text: "Only if you work in a museum", emoji: "🏛️" },
            ],
          },
          {
            id: 4,
            text: "What is the significance of the Dadaist movement?",
            options: [
              {
                id: 1,
                text: "It established the rules of formal composition",
                emoji: "📐",
              },
              {
                id: 2,
                text: "It challenged traditional art norms and embraced absurdity and chance",
                emoji: "🎲",
              },
              {
                id: 3,
                text: "It was the birth of photographic art",
                emoji: "📷",
              },
              {
                id: 4,
                text: "It focused on realistic depictions of working-class life",
                emoji: "🏭",
              },
            ],
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Build a Mini Portfolio",
        description:
          "Select 3-5 of your best creative pieces (drawings, designs, photos, writing — anything creative) and write a short artist's statement for each. Organise them as if presenting to a university admissions panel.",
        objectives: [
          "Curate your 3-5 strongest creative pieces",
          "Write a 2-3 sentence statement for each piece",
          "Arrange them in a logical narrative sequence",
        ],
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Write a Creative Brief for a Real Brand",
        description:
          "Choose a brand you admire and write a creative brief for a fictional campaign — a new product launch, a social media series, or a redesign. Include target audience, tone, key messages, and visual direction.",
        objectives: [
          "Define the campaign objective clearly",
          "Describe the target audience in detail",
          "Specify tone, visual style, and key deliverables",
        ],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Create an Art Movement Mood Board",
        description:
          "Pick an art movement that interests you and create a digital mood board that captures its essence. Add a written explanation of how that movement influences contemporary design or media today.",
        objectives: [
          "Research and select an art movement",
          "Compile 8-12 visual references that define it",
          "Write 150 words on its modern relevance",
        ],
        difficulty: "Beginner",
      },
    ],
    careers: [
      {
        title: "Graphic Designer",
        description: "Communicate visually through brand and digital design.",
      },
      {
        title: "Fashion Designer",
        description:
          "Shape identity and culture through clothing and aesthetics.",
      },
      {
        title: "Performing Artist",
        description: "Move audiences through theatre, dance, or music.",
      },
      {
        title: "Art Director",
        description: "Lead the visual direction of campaigns and productions.",
      },
    ],
  },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useStreamProgress(stream: CareerStream) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<StreamProgressPublic | null>({
    queryKey: ["streamProgress", stream],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProgress(stream);
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

function useMarkQuizCompleted(stream: CareerStream) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (quizId: number) => {
      if (!actor) throw new Error("Not connected");
      await actor.markQuizCompleted(stream, BigInt(quizId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["streamProgress", stream] });
      qc.invalidateQueries({ queryKey: ["allProgress"] });
      toast.success("Quiz marked as completed!");
    },
    onError: () => toast.error("Failed to save progress. Please try again."),
  });
}

function useMarkProjectCompleted(stream: CareerStream) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: number) => {
      if (!actor) throw new Error("Not connected");
      await actor.markMicroProjectCompleted(stream, BigInt(projectId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["streamProgress", stream] });
      qc.invalidateQueries({ queryKey: ["allProgress"] });
      toast.success("Project marked as completed!");
    },
    onError: () => toast.error("Failed to save progress. Please try again."),
  });
}

// ─── Quiz Modal ───────────────────────────────────────────────────────────────

interface QuizModalProps {
  quiz: StreamQuiz;
  completed: boolean;
  accentColor: string;
  onClose: () => void;
  onComplete: (quizId: number) => void;
}

function QuizModal({
  quiz,
  completed,
  accentColor,
  onClose,
  onComplete,
}: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const question = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const isLast = currentQ === totalQ - 1;
  const selectedAnswer = answers[question.id];

  const handleAnswer = (optionId: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  };

  const handleFinish = () => {
    onComplete(quiz.id);
    onClose();
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 m-0 max-w-none max-h-none w-full h-full border-0 bg-transparent p-0"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-elevated"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-display font-bold text-foreground text-sm">
              {quiz.title}
            </h3>
            {!showResult && (
              <p className="text-xs text-muted-foreground">
                Question {currentQ + 1} of {totalQ}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-smooth touch-target"
            aria-label="Close quiz"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        {!showResult && (
          <div className="h-1 bg-muted">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${((currentQ + 1) / totalQ) * 100}%`,
                background: accentColor,
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {showResult ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Quiz Complete!
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Great job working through <strong>{quiz.title}</strong>. Every
                question you explore gets you closer to understanding your path.
              </p>
              {completed ? (
                <p className="text-sm text-muted-foreground mb-4">
                  This quiz is already saved to your progress.
                </p>
              ) : (
                <CTAButton
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleFinish}
                  className="w-full"
                  data-ocid="quiz-save-progress"
                  style={{ background: accentColor }}
                >
                  Save My Progress
                </CTAButton>
              )}
              {completed && (
                <CTAButton
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={onClose}
                  className="w-full mt-2"
                >
                  Close
                </CTAButton>
              )}
            </div>
          ) : (
            <div>
              <p className="font-semibold text-foreground text-base mb-5 leading-snug">
                {question.text}
              </p>
              <div className="flex flex-col gap-3 mb-6">
                {question.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleAnswer(opt.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-smooth touch-target ${
                      selectedAnswer === opt.id
                        ? "border-2 bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                    style={
                      selectedAnswer === opt.id
                        ? {
                            borderColor: accentColor,
                            background: `${accentColor}12`,
                          }
                        : {}
                    }
                    data-ocid={`quiz-option-${opt.id}`}
                  >
                    <span className="text-xl shrink-0">{opt.emoji}</span>
                    <span className="text-sm text-foreground">{opt.text}</span>
                  </button>
                ))}
              </div>
              <CTAButton
                type="button"
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={selectedAnswer === undefined}
                className="w-full"
                showArrow
                data-ocid="quiz-next-btn"
                style={
                  selectedAnswer !== undefined
                    ? { background: accentColor }
                    : {}
                }
              >
                {isLast ? "See Results" : "Next Question"}
              </CTAButton>
            </div>
          )}
        </div>
      </motion.div>
    </dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StreamDetailPage() {
  const { streamId } = useParams({ from: "/streams/$streamId" });
  const { isPremium, isLoading: subLoading } = useSubscription();
  const { isAuthenticated } = useAuth();

  const stream = STREAM_META.find((s) => s.id === streamId);
  const content = STREAM_CONTENT[streamId] ?? STREAM_CONTENT.contentGaming;

  const streamEnum =
    CareerStream[streamId as keyof typeof CareerStream] ??
    CareerStream.contentGaming;

  const { data: progress, isLoading: progressLoading } =
    useStreamProgress(streamEnum);
  const markQuizMutation = useMarkQuizCompleted(streamEnum);
  const markProjectMutation = useMarkProjectCompleted(streamEnum);

  const [activeQuiz, setActiveQuiz] = useState<StreamQuiz | null>(null);

  if (!stream) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Stream not found.</p>
        <Link
          to="/streams"
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          ← Back to Streams
        </Link>
      </div>
    );
  }

  const isQuizCompleted = (quizId: number) =>
    progress?.completedQuizzes.includes(BigInt(quizId)) ?? false;

  const isProjectCompleted = (projectId: number) =>
    progress?.completedMicroProjects.includes(BigInt(projectId)) ?? false;

  const completedQuizCount = content.quizzes.filter((q) =>
    isQuizCompleted(q.id),
  ).length;
  const completedProjectCount = content.projects.filter((p) =>
    isProjectCompleted(p.id),
  ).length;
  const totalItems = content.quizzes.length + content.projects.length;
  const completedItems = completedQuizCount + completedProjectCount;
  const progressPct = Math.round((completedItems / totalItems) * 100);

  const canInteract = isAuthenticated;

  const loading = subLoading || progressLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Stream header */}
      <div
        className="border-b border-border"
        style={{ background: `${stream.accentColor}18` }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="py-6">
            <Link
              to="/streams"
              className="text-xs text-muted-foreground hover:text-foreground transition-smooth mb-3 inline-flex items-center gap-1"
            >
              ← All Streams
            </Link>
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-card"
                style={{ background: `${stream.accentColor}25` }}
              >
                {stream.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="font-display font-bold text-foreground text-xl leading-tight">
                    {stream.label}
                  </h1>
                  <span
                    className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full"
                    style={{ background: stream.accentColor }}
                  >
                    {stream.careerCount} Careers
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stream.tagline}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {isAuthenticated && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground font-medium">
                    Your Progress
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: stream.accentColor }}
                  >
                    {completedItems}/{totalItems} completed
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      background: stream.accentColor,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* ── Quizzes Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="quizzes-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen
                className="w-4 h-4"
                style={{ color: stream.accentColor }}
              />
              <h2 className="font-display font-bold text-foreground text-base">
                Quizzes
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {completedQuizCount}/{content.quizzes.length} done
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {content.quizzes.map((quiz, idx) => {
                const completed = isQuizCompleted(quiz.id);
                const locked = !isPremium && idx > 0;

                return (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.07 }}
                  >
                    <Card
                      className={`p-4 transition-smooth ${
                        canInteract && !locked
                          ? "hover:shadow-card cursor-pointer"
                          : "opacity-80"
                      }`}
                      data-ocid={`quiz-card-${quiz.id}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-semibold text-sm text-foreground">
                              {quiz.title}
                            </p>
                            {completed && <ProgressBadge variant="completed" />}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                            {quiz.description}
                          </p>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            ⏱ {quiz.duration}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {locked ? (
                            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            </div>
                          ) : completed ? (
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center"
                              style={{ background: `${stream.accentColor}20` }}
                            >
                              <CheckCircle2
                                className="w-5 h-5"
                                style={{ color: stream.accentColor }}
                              />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => canInteract && setActiveQuiz(quiz)}
                              className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-105 touch-target"
                              style={{ background: stream.accentColor }}
                              aria-label={`Start ${quiz.title}`}
                              disabled={!canInteract}
                              data-ocid={`quiz-start-${quiz.id}`}
                            >
                              <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                          )}
                        </div>
                      </div>
                      {locked && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            🔒 Upgrade to Premium to unlock this quiz.{" "}
                            <Link
                              to="/pricing"
                              className="text-primary font-semibold hover:underline"
                            >
                              View plans
                            </Link>
                          </p>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ── Micro-Projects Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          data-ocid="projects-section"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wrench
                className="w-4 h-4"
                style={{ color: stream.accentColor }}
              />
              <h2 className="font-display font-bold text-foreground text-base">
                Micro-Projects
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {completedProjectCount}/{content.projects.length} done
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {content.projects.map((project, idx) => {
                const completed = isProjectCompleted(project.id);
                const locked = !isPremium && idx > 0;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.07 }}
                  >
                    <Card
                      className={`p-4 transition-smooth ${completed ? "ring-1 ring-current" : ""}`}
                      style={completed ? { color: stream.accentColor } : {}}
                      data-ocid={`project-card-${project.id}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => {
                            if (!canInteract || locked || completed) return;
                            markProjectMutation.mutate(project.id);
                          }}
                          className={`mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-smooth touch-target ${
                            completed
                              ? "border-transparent"
                              : locked || !canInteract
                                ? "border-muted-foreground/30 cursor-not-allowed"
                                : "border-border hover:border-primary cursor-pointer"
                          }`}
                          style={
                            completed
                              ? {
                                  background: stream.accentColor,
                                  borderColor: stream.accentColor,
                                }
                              : {}
                          }
                          aria-label={
                            completed
                              ? "Project completed"
                              : "Mark project as done"
                          }
                          disabled={
                            !canInteract ||
                            locked ||
                            completed ||
                            markProjectMutation.isPending
                          }
                          data-ocid={`project-check-${project.id}`}
                        >
                          {completed && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          )}
                          {locked && !completed && (
                            <Lock className="w-3 h-3 text-muted-foreground/50" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p
                              className={`font-semibold text-sm ${
                                completed
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {project.title}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {project.difficulty}
                            </Badge>
                            {completed && <ProgressBadge variant="completed" />}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                            {project.description}
                          </p>
                          <div>
                            <p className="text-xs font-semibold text-foreground mb-1.5">
                              Learning objectives:
                            </p>
                            <ul className="space-y-1">
                              {project.objectives.map((obj) => (
                                <li
                                  key={obj}
                                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                    style={{ background: stream.accentColor }}
                                  />
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {locked && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-xs text-muted-foreground">
                                🔒 Upgrade to Premium to unlock this project.{" "}
                                <Link
                                  to="/pricing"
                                  className="text-primary font-semibold hover:underline"
                                >
                                  View plans
                                </Link>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ── Career Profiles Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          data-ocid="careers-section"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4" style={{ color: stream.accentColor }} />
            <h2 className="font-display font-bold text-foreground text-base">
              Career Profiles
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {content.careers.map((career, idx) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <Card className="p-4 h-full">
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {career.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {career.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Guest login prompt ── */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-muted/40 border border-border rounded-2xl p-6 text-center"
            data-ocid="stream-login-prompt"
          >
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display font-bold text-foreground mb-2">
              Login to Track Progress
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
              Sign in to save your quiz and project completions to your
              personalized roadmap.
            </p>
            <Link to="/">
              <CTAButton
                variant="primary"
                type="button"
                data-ocid="stream-login-btn"
              >
                Sign In
              </CTAButton>
            </Link>
          </motion.div>
        )}

        {/* ── Premium upsell (authenticated free users) ── */}
        {isAuthenticated && !isPremium && !subLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="border border-border rounded-2xl p-5 text-center"
            style={{ background: `${stream.accentColor}0d` }}
            data-ocid="stream-premium-upsell"
          >
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-display font-bold text-foreground mb-1.5">
              Unlock All Quizzes & Projects
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
              Premium gives you full access to every quiz, project, and your
              AI-powered career roadmap.
            </p>
            <Link to="/pricing">
              <CTAButton
                type="button"
                variant="primary"
                data-ocid="stream-upgrade-btn"
                style={{ background: stream.accentColor }}
              >
                Upgrade to Premium
              </CTAButton>
            </Link>
          </motion.div>
        )}

        {/* ── Generate Roadmap CTA ── */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pb-6 text-center"
            data-ocid="roadmap-cta-section"
          >
            <div
              className="rounded-2xl p-6 border border-border"
              style={{ background: `${stream.accentColor}10` }}
            >
              <MapIcon
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: stream.accentColor }}
              />
              <h3 className="font-display font-bold text-foreground text-lg mb-2">
                Ready for Your Roadmap?
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                Turn your progress into a personalized 3–5 year career roadmap
                with actionable milestones.
              </p>
              <Link to="/roadmap">
                <CTAButton
                  type="button"
                  variant="primary"
                  size="lg"
                  showArrow
                  data-ocid="generate-roadmap-btn"
                  style={{ background: stream.accentColor }}
                >
                  Generate My Roadmap
                </CTAButton>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizModal
            quiz={activeQuiz}
            completed={isQuizCompleted(activeQuiz.id)}
            accentColor={stream.accentColor}
            onClose={() => setActiveQuiz(null)}
            onComplete={(quizId) => {
              if (!isQuizCompleted(quizId)) {
                markQuizMutation.mutate(quizId);
              }
              setActiveQuiz(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
