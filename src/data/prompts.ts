// Tüm içerik burada. Yeni prompt eklemek için `prompts` dizisine aynı şekilde
// bir nesne ekleyin; sayfa, kategori sayfası, sitemap ve kapak görseli otomatik oluşur.

export type CategorySlug =
  | 'analysis'
  | 'marketing'
  | 'development'
  | 'content'
  | 'design'
  | 'sales';

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  description: string[];
}

export interface PromptEntry {
  slug: string;
  title: string;
  metaTitle: string;
  category: CategorySlug;
  summary: string;
  intro: string[];
  prompt: string;
  variables: { name: string; hint: string }[];
  steps: string[];
  example: { input: string; output: string };
  variations: { situation: string; change: string }[];
  mistakes: { title: string; detail: string }[];
  faq: { q: string; a: string }[];
  published: string;
  reviewed: string;
}

export const categories: Category[] = [
  {
    slug: 'analysis',
    name: 'Analysis & Research',
    blurb: 'Summarizing reports, pulling out numbers and risks, turning dense documents into decisions.',
    description: [
      'Analysis prompts help when you have more material than time: quarterly reports, contracts, research papers and meeting transcripts. The goal is never a shorter copy of the text, it is a version that makes the next decision easier.',
      'The prompts in this category share a few habits: they name the reader, they limit the output length, and they tell the model to say so when the source does not contain an answer. Those three rules remove most of the vague, confident-sounding summaries people complain about.',
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing & Growth',
    blurb: 'Pricing, positioning and growth planning that start from your inputs instead of generic advice.',
    description: [
      'Marketing prompts are only as good as the facts you feed them. A model can structure a pricing page or a campaign plan well, but it cannot know your costs, your customers or your competitors unless you tell it.',
      'Each prompt here separates what you must supply from what the model should propose, and asks the model to label its assumptions. Treat the output as a set of hypotheses to test, not as a finished strategy.',
    ],
  },
  {
    slug: 'development',
    name: 'Software Development',
    blurb: 'Refactoring, query tuning and component design prompts that return reviewable, explainable code.',
    description: [
      'Development prompts work best when they ask for reasons along with code. A refactor you cannot review is a risk, so these prompts ask the model to list what changed, what behavior might differ and which tests would catch a regression.',
      'Always run model-written code in a safe environment, read it before merging and keep your own tests as the final judge. The prompts below are written to make that review faster, not to replace it.',
    ],
  },
  {
    slug: 'content',
    name: 'Content & SEO',
    blurb: 'Topic planning, outlines and video scripts built around reader intent rather than keyword stuffing.',
    description: [
      'Content prompts are easy to misuse: ask for "an SEO article" and you get filler. The prompts in this category start from reader intent and a concrete promise, then ask for structure, angles and evidence you still have to supply yourself.',
      'Use them to plan and outline, then add your own experience, data and examples. Pages that only repeat what the model produced rarely help a reader, and readers are who the content is for.',
    ],
  },
  {
    slug: 'design',
    name: 'Design & Imagery',
    blurb: 'Image-generation prompts with clear structure: subject, light, lens, background and parameters.',
    description: [
      'Image prompts reward structure. Subject, lighting, lens, background and style each do a different job, and mixing them in one long sentence is the most common reason results look generic or contradictory.',
      'The prompts here are written as templates with named slots, so you can change one element at a time and see what it does. Check the terms of the image tool you use before using results commercially, and avoid prompts that imitate a real, identifiable person.',
    ],
  },
  {
    slug: 'sales',
    name: 'Sales & Outreach',
    blurb: 'Outbound emails and objection handling that stay short, specific and respectful of the reader.',
    description: [
      'Sales prompts tend to produce the same overexcited, feature-heavy copy unless you constrain them. These prompts set word limits, ban filler phrases and ask for one clear question per message.',
      'Outreach is also regulated. Depending on where your recipients live, rules on consent, opt-out and data protection may apply, so check the requirements for your market before you send anything at scale.',
    ],
  },
];

export const prompts: PromptEntry[] = [
  // 1 ---------------------------------------------------------------------
  {
    slug: 'complex-document-summarization',
    title: 'Executive Summary Prompt for Long Reports and Documents',
    metaTitle: 'Executive Summary Prompt for Long Reports (Copy & Paste)',
    category: 'analysis',
    summary:
      'Turn long reports, contracts and research papers into a 5-bullet executive summary with key numbers, risks and one next action.',
    intro: [
      'Long documents hide the two things a decision-maker cares about most: the numbers and the risks. A bare "summarize this" request usually returns a polite retelling of the introduction and leaves out the fine print where the trouble lives.',
      'The prompt below fixes that by asking for a fixed structure: five short bullets, a line of key figures, a short list of risks and open questions, and exactly one recommended action. Because the structure is fixed, you can compare summaries of different documents side by side.',
    ],
    prompt: `Act as a senior business analyst. Read the document below and produce:

1. A 5-bullet executive summary (maximum 25 words per bullet).
2. A "Key numbers" line listing every quantitative metric that matters.
3. A "Risks and open questions" section with up to 3 items.
4. One recommended next action.

Rules:
- Use only information from the document. If something is unclear or missing, say so instead of guessing.
- Keep the original terminology and units.
- Audience: {AUDIENCE}

Document:
"""
{DOCUMENT}
"""`,
    variables: [
      { name: '{AUDIENCE}', hint: 'Who will read the summary, for example CFO, product team or board of directors.' },
      { name: '{DOCUMENT}', hint: 'The full text. For very long files, summarize chapter by chapter first.' },
    ],
    steps: [
      'Paste the prompt into your chat model of choice.',
      'Replace {AUDIENCE}. This single change shifts what the model treats as important.',
      'Paste the document between the triple quotes. If it is very long, split it by chapter and then summarize the summaries.',
      'Read "Risks and open questions" first. It is the quickest way to tell whether the model understood the document.',
      'Check every figure in "Key numbers" against the source before you share the summary.',
    ],
    example: {
      input:
        'Q3 revenue grew 12% year over year to $48.2M, driven by enterprise renewals. Churn in the SMB segment rose from 3.1% to 4.4%. The company plans to raise prices by 8% in Q1. Two key suppliers are located in a single region.',
      output: `- Revenue rose 12% year over year to $48.2M, led by enterprise renewals.
- SMB churn worsened from 3.1% to 4.4%.
- An 8% price increase is planned for Q1.
- Supply is concentrated in one region across two suppliers.
- Growth depends on enterprise customers while SMB weakens.

Key numbers: $48.2M revenue; +12% YoY; SMB churn 4.4% (was 3.1%); +8% planned price rise.
Risks and open questions: The price increase may speed up SMB churn; single-region supplier exposure; no mitigation is described.
Next action: Model SMB churn under the 8% increase before approving the Q1 plan.`,
    },
    variations: [
      { situation: 'Legal contract', change: 'Change the role to "senior contracts attorney" and ask for obligations, deadlines, termination clauses and unusual terms.' },
      { situation: 'Research paper', change: 'Ask for method, sample size, main finding and stated limitations instead of risks.' },
      { situation: 'Meeting transcript', change: 'Ask for decisions, owners and deadlines in a table rather than bullets.' },
      { situation: 'Non-expert reader', change: 'Add "Explain in plain language for someone with no finance background."' },
    ],
    mistakes: [
      { title: 'Leaving out the audience', detail: 'Without a reader in mind the model defaults to a generic one, and the summary becomes vague. Name the role.' },
      { title: 'Trusting numbers blindly', detail: 'Models can misread tables and mix up periods. Verify every figure against the source.' },
      { title: 'Summarizing a huge file in one go', detail: 'Quality tends to drop on very long inputs. Chunk the document and combine the results.' },
      { title: 'Asking for "a short summary"', detail: '"Short" is subjective. Specify the bullet count and a word limit.' },
    ],
    faq: [
      { q: 'Does this work with any chat model?', a: 'It is written to be model-agnostic. Results vary with model size and input length, so try it on a document you already know well first.' },
      { q: 'Can I use it on confidential documents?', a: 'Check your employer\'s policy and your provider\'s data terms before pasting anything sensitive.' },
      { q: 'How do I get a shorter result?', a: 'Lower the word limit per bullet and remove the risks section.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 2 ---------------------------------------------------------------------
  {
    slug: 'cold-email-sales-sequence',
    title: 'Cold Email Sequence Prompt for B2B SaaS Outreach',
    metaTitle: 'Cold Email Sequence Prompt for B2B SaaS (3-Step Template)',
    category: 'sales',
    summary:
      'Generate a short, specific 3-email outreach sequence with strict word limits, one question per email and a polite break-up message.',
    intro: [
      'Most generated cold emails fail for the same reasons human ones do: they open with the sender, list features and end with three different asks. This prompt prevents that with hard constraints on length, structure and call to action.',
      'It produces three emails: a short opener built around one problem, a follow-up that adds a single piece of proof, and a brief closing note that lets the reader say no. You supply the proof, the model does not invent it.',
    ],
    prompt: `Act as an outbound copywriter for B2B software. Write a 3-email sequence.

Product: {PRODUCT}
Recipient role and company type: {PERSONA}
Main problem they have: {PROBLEM}
Proof point I can honestly use: {PROOF}

Constraints:
- Email 1: under 90 words. Start with the recipient's problem, not with us. End with one yes/no question.
- Email 2: under 70 words. Add the proof point above and nothing else new.
- Email 3: under 50 words. A polite break-up that makes it easy to say no.
- Subject lines: 5 words or fewer, lowercase, no punctuation tricks.
- No buzzwords (such as "synergy", "revolutionary", "game-changing") and no exclamation marks.
- Use [First name] and [Company] as placeholders. Do not invent personal details about the recipient.
- Do not invent statistics or customer names.`,
    variables: [
      { name: '{PRODUCT}', hint: 'One sentence: what it does and for whom.' },
      { name: '{PERSONA}', hint: 'For example, finance managers at 50 to 200 person companies.' },
      { name: '{PROBLEM}', hint: 'The pain in the recipient\'s words, not your feature list.' },
      { name: '{PROOF}', hint: 'A true, specific result or fact. If you have none, write "none" and the model will leave it out.' },
    ],
    steps: [
      'Fill in the four variables with real facts, especially the proof point.',
      'Run the prompt and read the first email aloud. If it sounds like a brochure, tighten the problem description and run it again.',
      'Replace placeholders such as [First name] only with details you actually know.',
      'Send emails 1 and 2 a few days apart, and email 3 only to people who have not replied.',
      'Keep a note of which subject lines get replies and adjust the prompt\'s constraints accordingly.',
    ],
    example: {
      input:
        'Product: Ledgerly, invoice matching software for small finance teams. Persona: finance managers at 50-200 person companies. Problem: month-end close takes too long because invoices are matched by hand. Proof: none.',
      output: `Subject: month-end matching

Hi [First name],

Finance teams at companies like [Company] often spend the first days of every month matching invoices to purchase orders by hand. Is that still a manual job for your team?

Ledgerly automates the matching and flags only the exceptions.

Worth a short conversation?

Subject: quick follow-up

Hi [First name], following up on my note about invoice matching. Teams usually tell us the exceptions are the real time sink, not the matching itself. Is that true at [Company]?

Subject: closing the loop

Hi [First name], I will stop here so I do not clutter your inbox. If invoice matching becomes a priority, just reply and I will pick it up. Either way, all the best.`,
    },
    variations: [
      { situation: 'Enterprise buyers', change: 'Lengthen email 1 to about 120 words and ask the model to reference a likely compliance or security concern.' },
      { situation: 'LinkedIn message', change: 'Ask for one message under 60 words with no subject line and no link.' },
      { situation: 'Follow-up after a demo', change: 'Replace the problem with "what was discussed in the demo" and ask for a single recap plus next step.' },
      { situation: 'Non-English market', change: 'Add "Write in natural business Turkish (or your language), not a literal translation" and review with a native speaker.' },
    ],
    mistakes: [
      { title: 'Letting the model invent proof', detail: 'Made-up statistics or customer names damage trust and can be illegal. Supply only true facts.' },
      { title: 'Fake personalization', detail: 'Compliments about "your recent article" that you did not check read as spam. Personalize with real details or not at all.' },
      { title: 'More than one ask', detail: 'A demo, a call and a download in one email gives the reader three reasons to do nothing.' },
      { title: 'Ignoring outreach rules', detail: 'Consent, opt-out and data protection rules differ by country. Check the rules for your recipients before you send at scale.' },
    ],
    faq: [
      { q: 'How many follow-ups are reasonable?', a: 'Two follow-ups after the first email is a common ceiling. Beyond that the return drops and the risk of complaints grows.' },
      { q: 'Will this pass spam filters?', a: 'Short plain-text emails help, but deliverability also depends on your domain setup and list quality, which a prompt cannot fix.' },
      { q: 'Can I use it without proof?', a: 'Yes. Write "none" in the proof field and email 2 will focus on a question instead of a claim.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 3 ---------------------------------------------------------------------
  {
    slug: 'code-refactoring-optimization',
    title: 'TypeScript Refactoring Prompt That Explains Every Change',
    metaTitle: 'TypeScript Code Refactoring Prompt (With Behavior-Change Report)',
    category: 'development',
    summary:
      'Refactor messy TypeScript for readability and type safety, and get an explicit list of behavior changes and tests to add.',
    intro: [
      'The risky part of an AI-assisted refactor is not the new code, it is the changes you did not notice. This prompt asks the model to review before it rewrites, and to list every place where behavior could differ.',
      'That makes the result reviewable. You read a short report, then the diff, instead of comparing two blocks of code by eye.',
    ],
    prompt: `Act as a senior TypeScript engineer doing a careful code review and refactor.

Step 1: List the problems in the code below (naming, duplication, weak types, hidden side effects, unclear control flow).
Step 2: Provide the refactored code. Preserve behavior. Do not add dependencies. Do not change exported names or signatures unless you flag it.
Step 3: List every behavior change, however small (for example loose vs strict equality, changed defaults, error handling).
Step 4: Suggest the tests that would catch a regression in the refactored code.

Context: {CONTEXT}

Code:
{CODE}`,
    variables: [
      { name: '{CONTEXT}', hint: 'Framework, TypeScript strictness, and any style rules, for example "strict mode, no classes".' },
      { name: '{CODE}', hint: 'One function or module at a time gives the best results.' },
    ],
    steps: [
      'Paste one function or small module, not a whole repository.',
      'Describe the context, especially whether strict mode is on.',
      'Read the problem list before the code. If the model misunderstood the intent, correct it and rerun.',
      'Go through the behavior-change list and decide which changes you accept.',
      'Run your existing tests, then add the suggested ones before merging.',
    ],
    example: {
      input: `function getTotals(orders: any) {
  let result: any = {};
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status == 'paid') {
      if (result[orders[i].customerId]) {
        result[orders[i].customerId] += orders[i].amount;
      } else {
        result[orders[i].customerId] = orders[i].amount;
      }
    }
  }
  return result;
}`,
      output: `Problems: "any" types hide mistakes; repeated array indexing; loose equality; the if/else duplicates the assignment; the name does not say what is totaled.

interface Order {
  customerId: string;
  amount: number;
  status: 'paid' | 'pending' | 'refunded';
}

export function getPaidTotalsByCustomer(
  orders: readonly Order[],
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const { customerId, amount, status } of orders) {
    if (status !== 'paid') continue;
    totals[customerId] = (totals[customerId] ?? 0) + amount;
  }
  return totals;
}

Behavior changes: (1) the function is renamed, so callers must be updated; (2) "!==" replaces "==", which only matters if status could be a non-string; (3) a customer with a first amount of 0 is now handled correctly.
Tests to add: no orders; only unpaid orders; two paid orders for one customer; a paid order with amount 0.`,
    },
    variations: [
      { situation: 'Legacy JavaScript', change: 'Ask the model to migrate to TypeScript in two passes: types first, refactor second.' },
      { situation: 'Performance focus', change: 'Add "Identify the time complexity before and after and note any memory trade-offs."' },
      { situation: 'Small safe change', change: 'Add "Make the smallest possible change; do not rename anything."' },
      { situation: 'Code review only', change: 'Remove steps 2 and 3 and ask for a prioritized list of issues.' },
    ],
    mistakes: [
      { title: 'Pasting too much at once', detail: 'Large inputs lead to skipped parts and silent changes. Work function by function.' },
      { title: 'Skipping the behavior list', detail: 'This list is the reason to use the prompt. If you only read the code, you lose the safety it provides.' },
      { title: 'Merging without running tests', detail: 'The model cannot run your code. Your tests are the real verification.' },
      { title: 'Not stating the TypeScript settings', detail: 'Advice that is right in strict mode may be noise or wrong without it. State your configuration.' },
    ],
    faq: [
      { q: 'Is it safe to paste proprietary code?', a: 'Check your company policy and your AI provider\'s data terms first. When in doubt, use a minimal reproduction with names changed.' },
      { q: 'Does this work for other languages?', a: 'Yes. Replace "TypeScript" with your language and adjust the examples in the problem list.' },
      { q: 'Why ask for tests?', a: 'A refactor is only safe if something can fail when behavior changes. The test suggestions point you at the riskiest cases.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 4 ---------------------------------------------------------------------
  {
    slug: 'photorealistic-midjourney-portrait',
    title: 'Photorealistic Studio Portrait Prompt Template for Midjourney',
    metaTitle: 'Photorealistic Studio Portrait Prompt for Midjourney (Template)',
    category: 'design',
    summary:
      'A structured portrait prompt with slots for subject, light, lens and background, so you can change one thing at a time and see what it does.',
    intro: [
      'Photorealistic portraits depend on three things the prompt can control: believable light, a plausible lens and natural skin texture. Long lists of "quality" words such as "8k" or "ultra detailed" add little and often push results toward an artificial, over-smoothed look.',
      'This template spends the words where they matter. Each slot does one job, so when a result is off you know which slot to change.',
    ],
    prompt: `studio portrait of {SUBJECT}, {LIGHTING}, shot on an 85mm lens at f/1.8, shallow depth of field, natural skin texture, subtle film grain, {BACKGROUND} backdrop, editorial photography --ar 4:5 --style raw`,
    variables: [
      { name: '{SUBJECT}', hint: 'A fictional or generic subject, for example "a middle-aged ceramic artist with short grey hair". Avoid real, identifiable people.' },
      { name: '{LIGHTING}', hint: 'For example "soft window light from the left" or "large softbox key light with a faint rim light".' },
      { name: '{BACKGROUND}', hint: 'For example "warm grey seamless paper" or "dark textured wall".' },
    ],
    steps: [
      'Fill the three slots with specific, non-conflicting choices. One light direction, one background.',
      'Generate a first batch and look at light and skin before anything else.',
      'Change one slot per iteration so you can see its effect.',
      'If skin looks plastic, keep "natural skin texture" and try lowering the stylize setting in your tool.',
      'Check your tool\'s current documentation for parameter names and version flags, since these change over time.',
    ],
    example: {
      input:
        'Subject: a middle-aged ceramic artist with short grey hair and a linen apron. Lighting: soft window light from the left. Background: warm grey seamless paper.',
      output: `studio portrait of a middle-aged ceramic artist with short grey hair and a linen apron, soft window light from the left, shot on an 85mm lens at f/1.8, shallow depth of field, natural skin texture, subtle film grain, warm grey seamless paper backdrop, editorial photography --ar 4:5 --style raw

What to expect: a close, softly lit portrait with a blurred neutral background. If the face is too evenly lit, change the lighting slot to name a clear direction such as "from the left, with gentle shadow on the right cheek".`,
    },
    variations: [
      { situation: 'Environmental portrait', change: 'Replace the backdrop with a workplace, and use a 35mm lens with a wider aperture such as f/4.' },
      { situation: 'Moody look', change: 'Use "single low-key light, deep shadows" for lighting and a dark backdrop.' },
      { situation: 'Product-style headshot', change: 'Use "even, soft frontal light" and a clean white backdrop.' },
      { situation: 'Black and white', change: 'Add "black and white, high contrast, fine grain" and remove the color of the backdrop.' },
    ],
    mistakes: [
      { title: 'Stacking quality keywords', detail: 'Words like "8k, ultra, masterpiece" rarely help. Describe light and lens instead.' },
      { title: 'Conflicting light', detail: '"Soft window light" and "hard noon sun" in one prompt gives inconsistent shadows.' },
      { title: 'Prompting for real people', detail: 'Using a real person\'s name raises ethical and legal issues, and platforms may restrict it. Use fictional subjects.' },
      { title: 'Changing everything at once', detail: 'If you edit five slots at a time you will not learn what worked.' },
    ],
    faq: [
      { q: 'Do I need the --style raw flag?', a: 'It tends to reduce the tool\'s own stylization, which suits realistic portraits. Test with and without it.' },
      { q: 'Can I use the images commercially?', a: 'That depends on your plan and the tool\'s terms. Read them before commercial use.' },
      { q: 'Will this work in other image tools?', a: 'The structure carries over. Parameters such as --ar are specific to Midjourney, so adapt them to your tool\'s own settings.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 5 ---------------------------------------------------------------------
  {
    slug: 'seo-content-pillar-generator',
    title: 'SEO Content Pillar and Topic Cluster Planning Prompt',
    metaTitle: 'SEO Content Pillar and Topic Cluster Prompt (Planning Template)',
    category: 'content',
    summary:
      'Plan a pillar page and 8 to 12 supporting articles with search intent, angle and internal links, without invented search volumes.',
    intro: [
      'A topic cluster is a plan: one broad pillar page and a set of narrower articles that each answer a specific question and link back. The hard part is choosing angles that do not overlap and match what searchers actually want.',
      'This prompt asks for intent and a unique angle per article, and tells the model not to make up search volumes. You validate keywords with a real keyword tool afterwards.',
    ],
    prompt: `Act as an SEO content strategist.

Topic: {TOPIC}
Audience: {AUDIENCE}
What we can offer that others cannot (experience, data, tools): {EDGE}

Create a content plan:
1. One pillar page: working title, the question it answers, and a short outline.
2. 8 to 12 cluster articles. For each give: working title, a primary keyword idea, search intent (informational, commercial or transactional), a unique angle, and how it links to the pillar and to one other cluster article.
3. A suggested publishing order with a one-line reason for each.

Rules:
- Do not state search volumes or difficulty scores. Write "validate in a keyword tool" instead.
- No two articles may target the same intent.
- Prefer questions real people would ask over generic keyword variations.`,
    variables: [
      { name: '{TOPIC}', hint: 'A topic broad enough for a pillar page, such as "home composting".' },
      { name: '{AUDIENCE}', hint: 'Who is searching and what they already know.' },
      { name: '{EDGE}', hint: 'Your first-hand experience, data or tools. Be honest; if there is none, write "none".' },
    ],
    steps: [
      'Pick a topic you can genuinely add something to. Plans without an edge produce interchangeable articles.',
      'Run the prompt and remove any cluster article that repeats another intent.',
      'Check the primary keyword ideas in a keyword tool and drop the ones with no real demand.',
      'Write the pillar page last, so it can summarize and link to finished articles.',
      'Add your own examples, photos or data to each piece before publishing.',
    ],
    example: {
      input:
        'Topic: home composting. Audience: apartment dwellers who have never composted. Edge: none.',
      output: `Pillar: "Composting in a Small Apartment: A Beginner's Guide" - answers "Can I compost without a garden?" Outline: methods overview, what to compost, odor control, what to do with the result.

Cluster examples:
1. "Bokashi vs worm bin for small spaces" - commercial intent; compares two methods; links to the pillar and to the odor article.
2. "Why does my compost smell, and how do I fix it?" - informational intent; troubleshooting angle; links to the pillar and to the worm bin article.
3. "What can you not put in a worm bin?" - informational intent; list with reasons; links to the pillar.

Publishing order: start with the troubleshooting article because it targets a specific problem, then the comparison, then the pillar.
All keyword volumes: validate in a keyword tool.`,
    },
    variations: [
      { situation: 'Local business', change: 'Add the city and ask for location-specific questions and a Google Business profile content idea.' },
      { situation: 'E-commerce', change: 'Add "include category page and buying guide opportunities" and ask for product comparison angles.' },
      { situation: 'Refreshing old content', change: 'Paste existing titles and ask the model to find overlaps and gaps.' },
      { situation: 'Short on time', change: 'Ask for 5 cluster articles instead of 8 to 12, prioritized by likely usefulness.' },
    ],
    mistakes: [
      { title: 'Trusting generated keyword data', detail: 'Models cannot see current search data. Validate everything in a real keyword tool.' },
      { title: 'Overlapping articles', detail: 'Two articles for the same intent compete with each other. Merge them.' },
      { title: 'Publishing the plan as content', detail: 'The output is an outline, not an article. Add original experience and evidence.' },
      { title: 'Ignoring intent', detail: 'A transactional keyword answered with a long essay, or the reverse, rarely satisfies the reader.' },
    ],
    faq: [
      { q: 'How many cluster articles do I need?', a: 'There is no fixed number. Cover the real questions readers have, and stop when new ideas become repeats.' },
      { q: 'Should the pillar page be long?', a: 'Make it as long as it needs to be to answer the main question and guide readers to the detail pages.' },
      { q: 'Can I use AI to write the articles?', a: 'You can use it for drafts, but readers and search engines value original experience, accurate facts and clear editing, which are your job.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 6 ---------------------------------------------------------------------
  {
    slug: 'sql-query-performance-tuner',
    title: 'PostgreSQL Query Performance Tuning Prompt',
    metaTitle: 'PostgreSQL Query Performance Tuning Prompt (Index and Rewrite Advice)',
    category: 'development',
    summary:
      'Diagnose a slow PostgreSQL query from the schema and EXPLAIN output, and get index and rewrite suggestions with the trade-offs.',
    intro: [
      'Query tuning needs evidence. A model that sees only the SQL can guess; a model that also sees the table definitions and the EXPLAIN ANALYZE output can point at the actual bottleneck.',
      'This prompt asks for your schema, row counts and plan, and requires the model to explain each suggestion and its cost. Indexes speed up reads but slow down writes, so every recommendation should come with that trade-off.',
    ],
    prompt: `Act as a senior PostgreSQL database administrator.

I will give you a slow query, the relevant table definitions with approximate row counts, and the EXPLAIN (ANALYZE, BUFFERS) output.

Please:
1. Identify the main bottlenecks, quoting the plan nodes that show them.
2. Suggest a rewritten query if one would help, and explain what changes.
3. Suggest indexes with CREATE INDEX statements. For each, explain which part of the query it helps and the write-performance cost.
4. List what I should check before and after the change.

Rules:
- Do not guess about data you cannot see; ask for it or state your assumption.
- Keep the rewritten query semantically identical, or flag any difference.

Schema and row counts:
{SCHEMA}

Query:
{QUERY}

EXPLAIN (ANALYZE, BUFFERS) output:
{PLAN}`,
    variables: [
      { name: '{SCHEMA}', hint: 'CREATE TABLE statements plus approximate row counts and existing indexes.' },
      { name: '{QUERY}', hint: 'The exact slow query, with real parameter values where possible.' },
      { name: '{PLAN}', hint: 'Output of EXPLAIN (ANALYZE, BUFFERS) from a representative environment.' },
    ],
    steps: [
      'Run EXPLAIN (ANALYZE, BUFFERS) on the slow query in a safe environment with realistic data.',
      'Paste schema, query and plan into the prompt.',
      'Read the bottleneck explanation first. If it does not match what you see in the plan, correct the model.',
      'Test each suggested index on a staging copy and compare plans before and after.',
      'Deploy index changes carefully; for large tables consider building them without blocking writes.',
    ],
    example: {
      input: `SELECT c.name, SUM(o.total)
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= '2026-01-01'
  AND LOWER(c.email) LIKE '%@example.com'
GROUP BY c.name;`,
      output: `Bottlenecks (illustrative, without a real plan): wrapping the column in LOWER() with a leading wildcard prevents ordinary index use on customers.email, and GROUP BY c.name merges different customers who share a name.

Rewrite:
SELECT c.id, c.name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= DATE '2026-01-01'
  AND c.email ILIKE '%@example.com'
GROUP BY c.id, c.name;

Indexes to test:
- CREATE INDEX CONCURRENTLY idx_orders_customer_created ON orders (customer_id, created_at) INCLUDE (total); helps the join and the date filter; adds write cost on orders.
- A trigram index (pg_trgm) on customers.email if suffix searches are common; large on disk and slower to update.

Before and after: compare EXPLAIN (ANALYZE, BUFFERS) output and run the query several times, since caching affects timings.`,
    },
    variations: [
      { situation: 'Query without a plan yet', change: 'Ask the model to tell you which EXPLAIN options to run and what to look for first.' },
      { situation: 'Reporting query on a replica', change: 'Add "Read-only workload; materialized views are acceptable" to allow precomputation.' },
      { situation: 'Write-heavy table', change: 'Add "Minimize new indexes; this table has heavy inserts" and ask for the cheapest effective option.' },
      { situation: 'Other database', change: 'Replace PostgreSQL with your engine and ask for its equivalent of EXPLAIN ANALYZE.' },
    ],
    mistakes: [
      { title: 'Sharing only the query', detail: 'Without the plan and row counts the advice is a guess. Include both.' },
      { title: 'Adding every suggested index', detail: 'Each index costs storage and write speed. Add one at a time and measure.' },
      { title: 'Testing on tiny data', detail: 'Plans change with table size. Use data volumes close to production.' },
      { title: 'Ignoring semantic changes', detail: 'A faster rewrite that returns different rows is a bug. Compare results before and after.' },
    ],
    faq: [
      { q: 'Is it safe to run EXPLAIN ANALYZE in production?', a: 'It executes the query, so avoid it on statements that modify data or are very expensive. Use a replica or staging copy when possible.' },
      { q: 'Can the model see my database?', a: 'No. It only knows what you paste, so remove sensitive values and use sample data where needed.' },
      { q: 'Why mention write cost?', a: 'Indexes are a trade-off. Naming the cost helps you decide whether a read improvement is worth it.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 7 ---------------------------------------------------------------------
  {
    slug: 'react-component-clean-architecture',
    title: 'React Component Architecture Prompt With Hooks and TypeScript',
    metaTitle: 'React Component Architecture Prompt (Custom Hooks + TypeScript)',
    category: 'development',
    summary:
      'Design a React feature as small, testable parts: a data hook, a presentational view, typed props and explicit loading, empty and error states.',
    intro: [
      'Components become hard to maintain when data fetching, state and markup live in one place. Splitting them gives you a view that is easy to test and a hook that can be reused.',
      'This prompt asks the model to propose a file structure first, then the typed hook and component, and to cover the states people forget: idle, loading, empty and error. It also asks for an accessibility check and a test plan.',
    ],
    prompt: `Act as a senior React and TypeScript engineer.

Design this feature as clean, testable components: {FEATURE}

Return:
1. A file tree for the feature.
2. TypeScript types for props and state. Model the data states as a discriminated union (idle, loading, success, empty, error).
3. A custom hook that holds data fetching and state, including request cancellation.
4. A presentational component that receives data through props and has no data fetching.
5. A short accessibility checklist for this feature.
6. A list of tests to write, naming what each test proves.

Constraints:
- React function components and hooks only.
- No new libraries unless you explain why they are necessary.
- Existing stack: {STACK}`,
    variables: [
      { name: '{FEATURE}', hint: 'For example "a user search box that shows results as the user types".' },
      { name: '{STACK}', hint: 'For example "React 18, TypeScript strict, Vite, Testing Library".' },
    ],
    steps: [
      'Describe one feature at a time, with the user-facing behavior in a sentence or two.',
      'State your stack so the model does not introduce incompatible libraries.',
      'Review the file tree before reading code. If the split looks wrong, ask for a different one.',
      'Check that the view component has no fetching and that every data state is rendered.',
      'Write the suggested tests first for the hook, then for the view.',
    ],
    example: {
      input:
        'Feature: a user search box that shows results as the user types. Stack: React 18, TypeScript strict, Vite, Testing Library.',
      output: `features/user-search/
  UserSearch.tsx        (connects hook to view)
  UserSearchView.tsx    (presentational, props only)
  useUserSearch.ts      (data hook)
  types.ts
  UserSearch.test.tsx

type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; users: User[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };

export function useUserSearch(query: string): SearchState {
  const [state, setState] = useState<SearchState>({ status: 'idle' });

  useEffect(() => {
    if (query.trim().length < 2) {
      setState({ status: 'idle' });
      return;
    }
    const controller = new AbortController();
    setState({ status: 'loading' });
    fetchUsers(query, controller.signal)
      .then((users) =>
        setState(users.length ? { status: 'success', users } : { status: 'empty' }),
      )
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', message: error.message });
        }
      });
    return () => controller.abort();
  }, [query]);

  return state;
}

Notes: add a debounce in the parent so the hook is not called on every keystroke; give the results list an accessible label and announce the result count to screen readers.`,
    },
    variations: [
      { situation: 'Server components', change: 'Add "Use React Server Components where appropriate and say which parts must be client components."' },
      { situation: 'Form-heavy feature', change: 'Ask for form state, validation rules and error messages as a separate hook.' },
      { situation: 'Design system', change: 'Add your component library name and ask the model to reuse its primitives.' },
      { situation: 'Refactoring', change: 'Paste the existing component and ask for the same structure plus a migration plan in small steps.' },
    ],
    mistakes: [
      { title: 'Forgetting the empty and error states', detail: 'Most bugs users notice are blank screens. Model every state explicitly.' },
      { title: 'Fetching inside the view', detail: 'It makes tests slow and brittle. Keep the view pure.' },
      { title: 'Over-abstracting', detail: 'Not every feature needs several files. Split when the parts change for different reasons.' },
      { title: 'Skipping accessibility', detail: 'Labels, focus and announcements are easier to build in than to retrofit.' },
    ],
    faq: [
      { q: 'Can I use this with a state library?', a: 'Yes. Name the library in the stack and ask the hook to use it instead of local state.' },
      { q: 'Why a discriminated union for state?', a: 'It makes impossible combinations, such as loading together with an error, unrepresentable and helps the compiler catch missing cases.' },
      { q: 'Does the generated code need review?', a: 'Always. Read it, run it and test it as you would any contribution.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 8 ---------------------------------------------------------------------
  {
    slug: 'youtube-viral-video-hook-script',
    title: 'YouTube Video Hook and Script Outline Prompt',
    metaTitle: 'YouTube Hook and Script Outline Prompt (Retention-Focused)',
    category: 'content',
    summary:
      'Draft three opening hooks and a beat-by-beat script outline that keeps its promise to the viewer, with on-screen text and a low-pressure call to action.',
    intro: [
      'The first seconds of a video decide whether people stay, but a hook that promises more than the video delivers hurts retention later. The goal is an opening that is specific, true and gives the viewer a reason to keep watching.',
      'This prompt generates three alternative hooks with different approaches and then builds an outline around the promise you choose. It deliberately avoids guaranteeing results, because no prompt can promise views.',
    ],
    prompt: `Act as a YouTube script editor.

Video topic: {TOPIC}
Viewer: {VIEWER}
Promise of the video (what the viewer will know or be able to do by the end): {PROMISE}
Target length: {LENGTH}

Produce:
1. Three alternative hooks, each speakable in 15 seconds or less, using different approaches (a question, a surprising fact, a mini story). The hook must be true to the video's content.
2. After I choose one, an outline with beats and approximate timestamps. Include where the promise is delivered, where to add a short pattern interrupt such as a visual change, and suggestions for on-screen text.
3. A closing call to action that is helpful rather than pushy.

Rules:
- Do not exaggerate or promise results the video cannot deliver.
- Keep language natural and spoken, not written.
- Mark any fact that I should verify before recording.`,
    variables: [
      { name: '{TOPIC}', hint: 'The subject in a few words.' },
      { name: '{VIEWER}', hint: 'Who watches and what they already know.' },
      { name: '{PROMISE}', hint: 'One sentence the whole video must deliver on.' },
      { name: '{LENGTH}', hint: 'For example "8 minutes" or "under 60 seconds".' },
    ],
    steps: [
      'Write the promise first. If you cannot state it in one sentence, the video is not focused enough yet.',
      'Generate the three hooks and say them out loud; discard any that sound written.',
      'Pick one and ask for the outline, then check that the promise is delivered early enough.',
      'Verify every factual claim before recording.',
      'After publishing, compare retention in your analytics against the hook you chose and learn from it.',
    ],
    example: {
      input:
        'Topic: how to read a nutrition label. Viewer: adults who shop for groceries but never check labels. Promise: by the end you can compare two products in under a minute. Length: 6 minutes.',
      output: `Hook A (question): "Two cereal boxes, both say 'healthy' on the front. How do you know which one actually is?"
Hook B (surprising fact): "The number on the front of the box and the number on the back often describe different serving sizes."
Hook C (mini story): "I stood in the cereal aisle for ten minutes last week, and the label that finally helped was not the one I expected."

Outline (using Hook A):
0:00 Hook and promise: compare two products in under a minute.
0:20 The serving size trap. On-screen text: "Check serving size first."
1:30 Three numbers worth comparing and why.
3:30 Live comparison of two products. Pattern interrupt: split screen.
5:00 Quick recap you can screenshot.
5:30 Call to action: invite viewers to share a product they want compared.

Verify before recording: any specific daily value percentages you quote.`,
    },
    variations: [
      { situation: 'Shorts or vertical video', change: 'Ask for a 30 second script with a hook under 3 seconds and no separate outline.' },
      { situation: 'Tutorial', change: 'Ask for numbered steps and an on-screen checklist at the end.' },
      { situation: 'Storytelling channel', change: 'Add "Use a three-act structure and plant a question in the first 20 seconds that is answered at the end."' },
      { situation: 'Non-native speaker', change: 'Add "Use simple sentences and avoid idioms" to make the script easier to deliver.' },
    ],
    mistakes: [
      { title: 'Clickbait mismatch', detail: 'A hook the video does not fulfil drives viewers away and erodes trust.' },
      { title: 'Reading a written script', detail: 'Scripts written like essays sound stiff. Read it aloud and simplify.' },
      { title: 'Skipping fact checks', detail: 'Models can produce confident errors. Verify claims before recording.' },
      { title: 'Burying the promise', detail: 'If the payoff arrives after the viewer has left, the outline needs reordering.' },
    ],
    faq: [
      { q: 'Can a prompt make a video go viral?', a: 'No. It can help you structure a clear, honest video, but reach depends on many factors outside the script.' },
      { q: 'How long should a hook be?', a: 'Short enough to say in one breath, typically under 15 seconds in longer videos and shorter in vertical clips.' },
      { q: 'Should I use the hook exactly as written?', a: 'Use it as a draft. Rewrite it in your own voice before recording.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },

  // 9 ---------------------------------------------------------------------
  {
    slug: 'saas-pricing-strategy-generator',
    title: 'SaaS Tiered Pricing Strategy Prompt',
    metaTitle: 'SaaS Tiered Pricing Strategy Prompt (Packaging and Tests)',
    category: 'marketing',
    summary:
      'Draft a three-tier pricing structure with a value metric, feature fences and experiments to test it, using only the inputs you provide.',
    intro: [
      'Good pricing connects price to the value customers get. That means choosing a value metric (seats, usage, projects), deciding which features separate tiers and checking the result against your costs and competitors.',
      'This prompt makes the model work from your numbers, label its assumptions and finish with experiments you can run, because a pricing draft is a hypothesis until real customers react to it.',
    ],
    prompt: `Act as a SaaS pricing consultant.

Product: {PRODUCT}
Customer segments: {SEGMENTS}
Cost to serve one customer per month (approximate): {COST}
Competitor prices I have verified: {COMPETITORS}
Current pricing, if any: {CURRENT}

Propose a three-tier pricing structure:
1. The value metric you recommend and why.
2. For each tier: target customer, what is included, what is intentionally excluded (feature fences), and a price range.
3. An annual billing approach.
4. The main risks of this structure.
5. Three experiments to validate it, with what result would change the decision.

Rules:
- Use only the competitor prices I provided. Do not invent competitor data.
- Label every assumption clearly.
- Prices are hypotheses; state what evidence would confirm them.`,
    variables: [
      { name: '{PRODUCT}', hint: 'What it does and the main outcome customers pay for.' },
      { name: '{SEGMENTS}', hint: 'For example freelancers, small teams and larger companies.' },
      { name: '{COST}', hint: 'Hosting, support and other costs per customer; a rough number is fine.' },
      { name: '{COMPETITORS}', hint: 'Prices you looked up yourself. Write "none" if you have none.' },
      { name: '{CURRENT}', hint: 'Your current plans and prices, or "none".' },
    ],
    steps: [
      'Collect your cost estimate and verified competitor prices before running the prompt.',
      'Run it and read the value metric recommendation first; everything else follows from it.',
      'Check that each tier has a clear reason to upgrade, not only more of the same.',
      'Compare the price ranges with your cost to serve to confirm a healthy margin.',
      'Choose one experiment and run it before changing prices for everyone.',
    ],
    example: {
      input:
        'Product: TaskPilot, project planning software. Segments: freelancers, small teams, agencies. Cost: about $3 per active user per month. Competitors: none. Current pricing: none.',
      output: `Value metric: per active user per month, because value grows with the number of people collaborating. Assumption: teams add users gradually.

Starter (freelancers): 1 user, 3 projects, basic views. Excluded: team permissions. Hypothesis: low single-digit dollars per month.
Team (small teams): up to 10 users, unlimited projects, permissions, integrations. Excluded: audit logs. Hypothesis: mid single-digit dollars per user.
Business (agencies): unlimited users, audit logs, priority support. Hypothesis: higher per-user price with an annual contract.

Annual billing: offer a discount for paying yearly and compare retention with monthly plans.
Risks: Starter may be too generous and cannibalize Team; per-user pricing can discourage adding teammates.
Experiments: (1) test two Team prices with new visitors, (2) limit Starter to 2 projects for a cohort, (3) survey churned users about price.
All numbers are hypotheses to validate against competitor research and willingness-to-pay data.`,
    },
    variations: [
      { situation: 'Usage-based product', change: 'Ask the model to compare per-seat and per-usage metrics and explain the trade-offs.' },
      { situation: 'Early-stage startup', change: 'Add "We have under 50 customers; prioritize learning over optimization."' },
      { situation: 'Enterprise sales', change: 'Add a "Contact us" tier and ask for guidance on what triggers it.' },
      { situation: 'Existing customers', change: 'Ask for a migration plan that protects current customers from sudden increases.' },
    ],
    mistakes: [
      { title: 'Using invented competitor data', detail: 'Only compare against prices you verified. Models may state outdated or made-up numbers.' },
      { title: 'Pricing from cost alone', detail: 'Cost sets the floor. Value to the customer sets the price.' },
      { title: 'Too many tiers', detail: 'Three clear options are easier to choose from than six similar ones.' },
      { title: 'Never testing', detail: 'A draft is not a decision. Run small experiments and watch conversion and churn.' },
    ],
    faq: [
      { q: 'Should I publish prices exactly as suggested?', a: 'Treat them as starting hypotheses and adjust them after research and tests.' },
      { q: 'Does this replace customer research?', a: 'No. Talk to customers about the value they receive; the prompt only structures your thinking.' },
      { q: 'What if I have no competitor data?', a: 'Write "none" and gather a few verified price points before finalizing anything.' },
    ],
    published: '2026-10-18',
    reviewed: '2026-10-18',
  },
];

// Yardımcı fonksiyonlar ---------------------------------------------------

export function getCategory(slug: CategorySlug): Category {
  const found = categories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown category: ${slug}`);
  return found;
}

export function promptsByCategory(slug: CategorySlug): PromptEntry[] {
  return prompts.filter((p) => p.category === slug);
}

export function relatedPrompts(entry: PromptEntry, limit = 3): PromptEntry[] {
  const same = prompts.filter((p) => p.slug !== entry.slug && p.category === entry.category);
  const other = prompts.filter((p) => p.slug !== entry.slug && p.category !== entry.category);
  return [...same, ...other].slice(0, limit);
}

export function readMinutes(entry: PromptEntry): number {
  const text = [
    entry.title,
    entry.summary,
    ...entry.intro,
    entry.prompt,
    ...entry.steps,
    entry.example.input,
    entry.example.output,
    ...entry.variations.map((v) => `${v.situation} ${v.change}`),
    ...entry.mistakes.map((m) => `${m.title} ${m.detail}`),
    ...entry.faq.map((f) => `${f.q} ${f.a}`),
  ].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
