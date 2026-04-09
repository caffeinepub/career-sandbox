import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  Code2,
  ExternalLink,
  Heart,
  HelpCircle,
  Lightbulb,
  Phone,
  Shield,
  Smile,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import PageHeader from "../components/PageHeader";

const FAQS = [
  {
    id: "choose-stream",
    q: "How do I choose the right career stream?",
    a: "Take our mindset quiz — it asks personality-based questions (not academic ones) to understand how you naturally think and work. Based on your results, we'll recommend the stream that fits you best. You can always explore others too!",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    id: "quiz-results",
    q: "What if I'm not sure about my quiz results?",
    a: "That's completely okay! Your quiz result is a starting point, not a final answer. Many students discover they enjoy multiple streams. We recommend exploring at least two paths before deciding. You can retake the quiz anytime from your Account page.",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  {
    id: "multiple-streams",
    q: "Can I explore multiple streams?",
    a: "Absolutely yes! Career Sandbox encourages curiosity. The free plan lets you browse all four streams. With Premium, you unlock the full journey experience — quizzes, micro-projects, and roadmap — for your chosen stream.",
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "roadmap-personalized",
    q: "How is the roadmap personalized for me?",
    a: "Your roadmap is built from your quiz answers, chosen stream, and completed activities. It generates a 3-year action plan with milestones, skill goals, and actionable next steps. Premium members can download it as a beautiful PDF to share with parents or counsellors.",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "overwhelmed",
    q: "I'm feeling overwhelmed — what should I do?",
    a: "First, take a breath — this is totally normal! Career decisions can feel heavy. We recommend visiting the Mental Health & Wellbeing resources below. The iCall helpline and Vandrevala Foundation offer free, confidential support for students in India. You're not alone in this.",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: "upgrade-premium",
    q: "How do I upgrade to Premium?",
    a: "Visit the Pricing page and choose the monthly or annual subscription. Premium unlocks your complete stream journey, personalized roadmap PDF, and micro-project challenges. You can manage or cancel your subscription anytime from the Account page.",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "privacy",
    q: "Is my data private and secure?",
    a: "Yes, completely. Your quiz answers, progress, and roadmap are stored securely on the Internet Computer blockchain — a decentralized platform where only you control your data. We never sell or share your personal information.",
    icon: <Shield className="w-4 h-4" />,
  },
];

interface ResourceLink {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface ResourceCategory {
  id: string;
  title: string;
  tagline: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  badgeClass: string;
  categoryIcon: React.ReactNode;
  links: ResourceLink[];
}

const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "career",
    title: "Career Exploration",
    tagline: "Discover what's out there",
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary bg-primary/10",
    badgeClass: "bg-primary/10 text-primary",
    categoryIcon: <BookOpen className="w-5 h-5" />,
    links: [
      {
        name: "Khan Academy",
        description:
          "Free world-class education across subjects — explore what excites you most.",
        href: "https://www.khanacademy.org/",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        name: "Coursera",
        description:
          "Online courses from top universities — try a subject before committing to it.",
        href: "https://www.coursera.org/",
        icon: <Star className="w-4 h-4" />,
      },
      {
        name: "CareerOneStop",
        description:
          "In-depth career profiles, salary data, and step-by-step career guides.",
        href: "https://www.careeronestop.org/",
        icon: <Lightbulb className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "wellbeing",
    title: "Mental Health & Wellbeing",
    tagline: "Your mind matters most",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    iconColor: "text-destructive bg-destructive/10",
    badgeClass: "bg-destructive/10 text-destructive",
    categoryIcon: <Heart className="w-5 h-5" />,
    links: [
      {
        name: "iCall India",
        description:
          "Free, confidential counselling helpline for students by TISS — call or chat.",
        href: "https://icallhelpline.org/",
        icon: <Phone className="w-4 h-4" />,
      },
      {
        name: "Vandrevala Foundation",
        description:
          "24/7 mental health helpline in India — call 1860-2662-345 anytime.",
        href: "https://www.vandrevalafoundation.com/",
        icon: <Heart className="w-4 h-4" />,
      },
      {
        name: "Headspace for Students",
        description:
          "Guided meditation and mindfulness to reduce stress and improve focus.",
        href: "https://www.headspace.com/students",
        icon: <Smile className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "skills",
    title: "Skill Building",
    tagline: "Level up your abilities",
    color: "text-accent",
    bgColor: "bg-accent/8",
    borderColor: "border-accent/25",
    iconColor: "text-accent bg-accent/12",
    badgeClass: "bg-accent/12 text-accent",
    categoryIcon: <Code2 className="w-5 h-5" />,
    links: [
      {
        name: "Codecademy",
        description:
          "Hands-on coding courses for beginners — learn Python, web, and more.",
        href: "https://www.codecademy.com/",
        icon: <Code2 className="w-4 h-4" />,
      },
      {
        name: "Canva Learn",
        description:
          "Free design tutorials and courses to sharpen your creative skills.",
        href: "https://www.canva.com/learn/",
        icon: <Star className="w-4 h-4" />,
      },
      {
        name: "Google Digital Garage",
        description:
          "Free certification courses in digital marketing, data, and career skills.",
        href: "https://learndigital.withgoogle.com/digitalgarage",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  },
];

function ResourceCard({
  link,
  index,
  iconColor,
}: {
  link: ResourceLink;
  index: number;
  iconColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-card hover:border-border/80 transition-smooth group min-h-[3rem]"
        data-ocid={`resource-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
        >
          {link.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {link.name}
            </p>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
            {link.description}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <PageHeader
        title="Support & Resources"
        subtitle="Find answers to common questions and explore handpicked resources for your journey. You've got this! 💙"
      />

      {/* Warm banner — peach tint */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl p-5 bg-primary/8 border border-primary/20 flex items-start gap-4"
      >
        <div className="text-3xl shrink-0" aria-hidden="true">
          🌱
        </div>
        <div>
          <p className="font-display font-bold text-foreground text-base">
            You're not alone in figuring this out
          </p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Career decisions feel big — and that's completely normal. This page
            is here to guide you step by step, with resources for both your
            career and your wellbeing.
          </p>
        </div>
      </motion.div>

      {/* FAQ Section — peach expand icon */}
      <section className="mb-14" aria-labelledby="faq-heading">
        <div className="flex items-center gap-2 mb-5">
          {/* Peach FAQ icon */}
          <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2
            id="faq-heading"
            className="font-display font-bold text-xl text-foreground"
          >
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          data-ocid="support-faq-accordion"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem
                value={faq.id}
                className="bg-card border border-border rounded-xl px-4 overflow-hidden data-[state=open]:border-primary/30 data-[state=open]:bg-primary/[0.03] transition-smooth"
                data-ocid={`faq-item-${faq.id}`}
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground py-4 hover:no-underline text-left gap-3 min-h-[3rem] [&>svg]:text-primary">
                  <span className="flex items-center gap-2.5">
                    {/* Peach icon chip for FAQ items */}
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {faq.icon}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed pl-9">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>

      {/* Resources Section — sage green section header icon */}
      <section aria-labelledby="resources-heading">
        <div className="flex items-center gap-2 mb-6">
          {/* Sage green resources icon */}
          <Star className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2
            id="resources-heading"
            className="font-display font-bold text-xl text-foreground"
          >
            Helpful Resources
          </h2>
        </div>

        <div className="space-y-8">
          {RESOURCE_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              data-ocid={`resource-category-${category.id}`}
            >
              <Card
                className={`p-5 border ${category.borderColor} ${category.bgColor} shadow-none`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${category.iconColor}`}
                  >
                    {category.categoryIcon}
                  </div>
                  <div>
                    <h3
                      className={`font-display font-bold text-base ${category.color}`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.tagline}
                    </p>
                  </div>
                  <Badge
                    className={`ml-auto text-xs font-medium border-0 ${category.badgeClass}`}
                  >
                    {category.links.length} resources
                  </Badge>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <ResourceCard
                      key={link.name}
                      link={link}
                      index={linkIndex}
                      iconColor={category.iconColor}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Need Help Banner */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 rounded-2xl p-6 bg-muted/40 border border-border text-center"
        aria-labelledby="help-heading"
      >
        <div className="text-3xl mb-3" aria-hidden="true">
          🤝
        </div>
        <h2
          id="help-heading"
          className="font-display font-bold text-lg text-foreground mb-2"
        >
          Still need help?
        </h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          For account, billing, or technical issues, reach out to the Caffeine
          support team — we're happy to help.
        </p>
        <a
          href="https://caffeine.ai/support"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4 min-h-[3rem] py-3 px-4 rounded-lg hover:bg-accent/8 transition-smooth"
          data-ocid="support-caffeine-link"
        >
          Contact Caffeine Support
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.section>
    </div>
  );
}
