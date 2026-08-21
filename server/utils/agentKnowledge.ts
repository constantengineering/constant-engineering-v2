/**
 * CONSTANT ENGINEERING PLC — agent knowledge base.
 * Company/behavior context for the engineering consultant agent.
 * Product data lives in data/products.ts (single source of truth).
 */

import {
  getProductKnowledgeList,
  type ProductKnowledge
} from '../../data/products'

export type { ProductKnowledge }

export const COMPANY = {
  name: 'CONSTANT ENGINEERING PLC',
  legalName: 'CONSTANT ENGINEERING plc',
  established: 2017,
  headquarters: 'Addis Ababa, Ethiopia',
  serviceArea: 'Ethiopia and the region',
  tagline: 'Electromechanical Experts — Power, Automation, HVAC Solutions',
  website: 'constanteng.com',
  email: 'info@constanteng.com',
  phones: ['+251 924 909 098', '+251 911 147 101'],
  whatsapp: '+251 924 909 098',
  telegram: 'https://t.me/constantENGINEERING',
  address: {
    building: 'KKare Building',
    street: 'Mozambique Street, Mexico Area',
    city: 'Addis Ababa',
    country: 'Ethiopia'
  },
  mapsUrl: 'https://maps.app.goo.gl/FFS3Wvaz4BxTKAje8'
} as const

export const POSITIONING = {
  mission:
    'Deliver world-class electromechanical engineering solutions that power industries and transform communities.',
  summary:
    'Leading electromechanical engineering company in Ethiopia, established in 2017. Full-scope solutions from design and supply to installation, commissioning, and long-term support.',
  principles: ['Integrity', 'Partnerships', 'Excellence'],
  values: ['Reliability', 'Integrity', 'Technical Excellence'],
  differentiators: [
    'Professional mechanical and electrical engineering team',
    'Turnkey supply, installation, and commissioning',
    'Preventive maintenance and service contracts',
    'Tailored solutions for industrial, commercial, and utility clients',
    'Partnerships with globally respected equipment brands'
  ]
} as const

export const PROCESS = [
  {
    phase: 'Discovery',
    description:
      'Thorough assessment to understand challenges, requirements, and opportunities.'
  },
  {
    phase: 'Design',
    description:
      'Custom engineering solutions using industry best practices and proven technologies.'
  },
  {
    phase: 'Implementation',
    description:
      'Precise installation and integration with attention to every detail.'
  },
  {
    phase: 'Support',
    description:
      'Long-term maintenance and technical support beyond project completion.'
  }
] as const

export const INDUSTRIES_SERVED = [
  'Industrial facilities',
  'Manufacturing plants',
  'Commercial buildings',
  'Data centers',
  'Utilities',
  'Food processing and cold storage',
  'Warehouses and industrial buildings',
  'Remote and off-grid locations',
  'Government and institutional projects'
] as const

export const PARTNER_BRANDS = [
  'Perkins',
  'Cummins',
  'Schneider Electric',
  'Mitsubishi Electric',
  'GREE',
  'ABB',
  'Siemens',
  'ANERN',
  'APC by Schneider',
  'El Sewedy',
  'Pedrollo',
  'Caprari',
  'MIDEA',
  'TCL',
  'Mean Well',
  'ASCO'
] as const

export const PRODUCTS: ProductKnowledge[] = getProductKnowledgeList()

export const CAPABILITIES = [
  'Electromechanical engineering',
  'Industrial installations',
  'Electrical systems design and installation',
  'Mechanical systems (HVAC, pumps, generators)',
  'Engineering design and consultancy',
  'Maintenance and technical support',
  'Load assessment and system sizing',
  'Turnkey supply, installation, and commissioning',
  'Preventive maintenance contracts',
  'Custom control panel and metal fabrication'
] as const

export const QUALIFICATION_FLOW = {
  entryQuestion: 'Want to chat about CONSTANT ENGINEERING?',
  entryOptions: ['New Engineering Project', 'Maintenance Issue'],
  systemTypes: [
    'Electrical Systems',
    'Mechanical Systems',
    'Electromechanical',
    'Industrial Facility'
  ],
  conversionActions: ['Request Quotation', 'Talk to Engineer', 'WhatsApp Consultation'],
  /** Buying signals only — product nouns (generator, hvac, etc.) are not conversion intent. */
  conversionSignals: [
    'price',
    'cost',
    'quote',
    'quotation',
    'how much',
    'request quote',
    'talk to engineer',
    'callback',
    'ready to start',
    'install at my',
    'install for my'
  ]
} as const

export const AGENT_BEHAVIOR = {
  role: 'Senior engineering coordinator for CONSTANT ENGINEERING PLC',
  primaryGoal: 'Get visitors to leave contact details so sales can follow up — brief answers only',
  tone: ['Professional', 'Direct', 'Minimal', 'Confident'],
  rules: [
    'Ask at most one follow-up question in the whole conversation, then stop',
    'Keep replies to 1–2 short sentences',
    'Do not ask new project vs maintenance, application type, or backup vs prime — sales qualifies on callback',
    'When product or capacity is known, stop chatting — the contact form appears next',
    'Do not over-explain company history or services unless asked',
    'Never invent prices, timelines, or certifications',
    'Answer product questions in chat using the knowledge base — never cite page URLs',
    'Never include URLs, links, or paths in replies',
    'If outside scope, offer to connect the visitor with an engineer via the contact form'
  ],
  trustSignals: [
    'Established in 2017',
    'Professional engineering team',
    'Serving clients across Ethiopia',
    'Partnerships with Perkins, Cummins, Schneider Electric, Mitsubishi Electric, and others'
  ],
  conversionMessage:
    'This looks like a project our engineering team should review directly. We can prepare accurate technical guidance and costing after a quick consultation.',
  leadFields: ['Full Name', 'Phone Number', 'Company (optional)'],
  routes: {
    home: '/',
    products: '/products',
    about: '/about',
    contact: '/contact',
    product: (id: string) => `/products/${id}`
  }
} as const

/** Lightweight keyword retrieval — top matching products for the user query. */
export function retrieveRelevantProducts(query: string, limit = 3): ProductKnowledge[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)

  if (!terms.length) return []

  const scored = PRODUCTS.map((product) => {
    const haystack = [
      product.id,
      product.name,
      product.summary,
      product.capacityOrScope,
      ...product.applications,
      ...product.brands,
      ...product.services,
      ...Object.values(product.specs)
    ]
      .join(' ')
      .toLowerCase()

    let score = 0
    for (const term of terms) {
      if (haystack.includes(term)) score += 1
    }
    return { product, score }
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((row) => row.product)
}

export function formatProductDetail(product: ProductKnowledge): string {
  return [
    product.name,
    product.summary,
    `Scope: ${product.capacityOrScope}`,
    `Brands: ${product.brands.join(', ') || 'In-house'}`,
    `Applications: ${product.applications.join(', ')}`,
    `Services: ${product.services.join('; ')}`,
    `Specs: ${Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join('; ')}`
  ].join('\n')
}

/** Compact text block for LLM system prompts. */
export function formatAgentKnowledgePrompt(): string {
  const productLines = PRODUCTS.map(
    (p) =>
      `- ${p.name}: ${p.summary} | Scope: ${p.capacityOrScope} | Brands: ${p.brands.join(', ') || 'In-house fabrication'}`
  ).join('\n')

  return `
COMPANY
-------
Name: ${COMPANY.name}
Established: ${COMPANY.established}
Location: ${COMPANY.headquarters}
Tagline: ${COMPANY.tagline}
Email: ${COMPANY.email}
Phone: ${COMPANY.phones.join(' / ')}
WhatsApp: ${COMPANY.whatsapp}
Address: ${COMPANY.address.building}, ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.country}

POSITIONING
-----------
${POSITIONING.summary}

Values: ${POSITIONING.values.join(', ')}
Differentiators: ${POSITIONING.differentiators.join('; ')}

CAPABILITIES
------------
${CAPABILITIES.join('\n')}

PRODUCTS (answer about these in chat — never cite page URLs)
--------
${productLines}

INDUSTRIES SERVED
-----------------
${INDUSTRIES_SERVED.join(', ')}

PARTNER BRANDS
--------------
${PARTNER_BRANDS.join(', ')}

LEAD CAPTURE (chat widget)
--------------------------
After at most one brief product question, the visitor fills a contact form (name + phone). Sales follows up within business hours. Do not run multi-step qualification in chat.

AGENT RULES
-----------
Role: ${AGENT_BEHAVIOR.role}
Goal: ${AGENT_BEHAVIOR.primaryGoal}
Tone: ${AGENT_BEHAVIOR.tone.join(', ')}
${AGENT_BEHAVIOR.rules.map((r) => `- ${r}`).join('\n')}
`.trim()
}

/** JSON-serializable export for external tools, RAG indexing, or CRM sync. */
export function exportAgentKnowledgeJson() {
  return {
    company: COMPANY,
    positioning: POSITIONING,
    process: PROCESS,
    capabilities: CAPABILITIES,
    products: PRODUCTS,
    industriesServed: INDUSTRIES_SERVED,
    partnerBrands: PARTNER_BRANDS,
    qualificationFlow: QUALIFICATION_FLOW,
    agentBehavior: AGENT_BEHAVIOR,
    generatedFrom: 'constant-engineering website codebase',
    version: '1.0.0'
  }
}
