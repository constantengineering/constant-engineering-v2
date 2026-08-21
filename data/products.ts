/**
 * Single source of truth for product catalog (site pages + AI agent knowledge).
 */

export interface ProductFeature {
  title: string
  description: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductAgentMeta {
  summary: string
  capacityOrScope: string
  applications: string[]
  /** LLM-oriented service list; defaults to feature titles when omitted */
  services?: string[]
  /** LLM-oriented specs; defaults from specifications when omitted */
  specs?: Record<string, string>
}

export interface ProductCatalogEntry {
  id: string
  name: string
  icon: string
  image: string
  description: string
  quickSpecs: string[]
  tags: string[]
  features: ProductFeature[]
  specifications: ProductSpecification[]
  brands: string[]
  agent: ProductAgentMeta
}

export interface ProductKnowledge {
  id: string
  path: string
  name: string
  summary: string
  capacityOrScope: string
  applications: string[]
  brands: string[]
  services: string[]
  specs: Record<string, string>
}

function specsFromRows(rows: ProductSpecification[]): Record<string, string> {
  return Object.fromEntries(rows.map((row) => [row.label, row.value]))
}

export function toProductKnowledge(product: ProductCatalogEntry): ProductKnowledge {
  return {
    id: product.id,
    path: `/products/${product.id}`,
    name: product.name,
    summary: product.agent.summary,
    capacityOrScope: product.agent.capacityOrScope,
    applications: product.agent.applications,
    brands: product.brands,
    services: product.agent.services ?? product.features.map((f) => f.title),
    specs: product.agent.specs ?? specsFromRows(product.specifications)
  }
}

export const PRODUCT_CATALOG: ProductCatalogEntry[] = [
  {
    id: 'diesel-generator-systems',
    name: 'Diesel Generators',
    icon: 'heroicons:bolt',
    image: '/products/diesel-generator-systems.jpg',
    description:
      'Reliable power generation solutions with capacity range from 10 KVA to 2000 KVA. Available in Open & Silent Type (Canopy) for Prime & Standby Power applications.',
    quickSpecs: ['10 KVA – 2000 KVA', 'Open & Silent Type', 'Prime & Standby Power'],
    tags: ['10-2000 KVA', 'Perkins & Cummins', 'Industrial'],
    features: [
      {
        title: 'Load & Capacity Assessment',
        description:
          'Comprehensive analysis to determine your exact power requirements and optimal generator sizing.'
      },
      {
        title: 'Supply, Installation & Commissioning',
        description:
          'Complete turnkey solutions from procurement to full system commissioning and handover.'
      },
      {
        title: 'Synchronization & Load Sharing',
        description:
          'Advanced parallel operation systems for multiple generators with automatic load distribution.'
      },
      {
        title: 'Preventive Maintenance & Service Contracts',
        description:
          'Comprehensive maintenance programs to ensure optimal performance and extended equipment life.'
      }
    ],
    specifications: [
      { label: 'Capacity Range', value: '10 KVA – 2000 KVA' },
      { label: 'Types', value: 'Open & Silent Type (Canopy)' },
      { label: 'Power Modes', value: 'Prime & Standby Power' },
      { label: 'Applications', value: 'Industrial, Commercial & Utility' },
      { label: 'Generator Brands', value: 'GUCBIR & TMG (Turkey), GRUPEL (Portugal)' },
      { label: 'Engine Brands', value: 'Perkins, Cummins' }
    ],
    brands: ['GUCBIR', 'TMG', 'GRUPEL', 'Perkins', 'Cummins', 'ASCO'],
    agent: {
      summary:
        'Reliable backup and prime power from 10 KVA to 2000 KVA. Open and silent canopy types for industrial, commercial, and utility use.',
      capacityOrScope: '10 KVA – 2000 KVA',
      applications: ['Industrial', 'Commercial', 'Utility', 'Prime & standby power'],
      services: [
        'Load and capacity assessment',
        'Supply, installation, and commissioning',
        'Synchronization and load sharing',
        'Preventive maintenance and service contracts',
        'Automatic and manual transfer switches',
        'Generator parts supply (filters, control modules, batteries, starters, alternators)'
      ],
      specs: {
        'Capacity range': '10 KVA – 2000 KVA',
        Types: 'Open & silent canopy',
        'Power modes': 'Prime & standby',
        'Transfer switches': 'ASCO ATS and manual LTS'
      }
    }
  },
  {
    id: 'solar-hybrid-energy',
    name: 'Solar & Hybrid Energy Solutions',
    icon: 'heroicons:sun',
    image: '/products/solar-hybrid-energy.png',
    description:
      'Complete solar and hybrid energy solutions including on-grid & off-grid systems, inverters, charge controllers, and battery banks for sustainable power generation.',
    quickSpecs: ['On-grid & Off-grid', 'Hybrid Systems', 'Battery Banks'],
    tags: ['On-grid & Off-grid', 'ANERN'],
    features: [
      {
        title: 'On-grid & Off-grid Solar Systems',
        description:
          'Grid-connected and standalone solar systems tailored to your energy needs and location requirements.'
      },
      {
        title: 'Hybrid Systems (Solar + Generator)',
        description:
          'Intelligent hybrid solutions combining solar power with backup generators for reliable 24/7 power supply.'
      },
      {
        title: 'Inverters & Charge Controllers',
        description:
          'Advanced inverters and charge controllers for optimal energy conversion and battery management.'
      },
      {
        title: 'Battery Banks (Lead Acid & Lithium-Ion)',
        description:
          'Energy storage solutions using both traditional and modern battery technologies for maximum flexibility.'
      },
      {
        title: 'Energy Analysis & System Design',
        description:
          'Comprehensive energy audits and custom system design to maximize efficiency and ROI.'
      }
    ],
    specifications: [
      { label: 'System Types', value: 'On-grid & Off-grid' },
      { label: 'Hybrid Options', value: 'Solar + Generator' },
      { label: 'Battery Types', value: 'Lead Acid & Lithium-Ion' },
      { label: 'Brands', value: 'ANERN' },
      { label: 'Services', value: 'Energy Analysis & System Design' }
    ],
    brands: ['ANERN'],
    agent: {
      summary:
        'On-grid and off-grid solar, hybrid solar-plus-generator systems, inverters, charge controllers, and battery storage.',
      capacityOrScope: 'On-grid, off-grid, and hybrid systems',
      applications: ['Commercial', 'Industrial', 'Off-grid sites', 'Cost reduction and sustainability']
    }
  },
  {
    id: 'power-quality-protection',
    name: 'Power Quality & Protection Systems',
    icon: 'heroicons:shield-check',
    image: '/products/power-quality-protection.png',
    description:
      'Comprehensive power quality and protection solutions including UPS systems, voltage stabilizers, harmonic filters, and surge protection devices.',
    quickSpecs: ['UPS Systems', 'Voltage Stabilizers', 'Surge Protection'],
    tags: ['UPS Systems', 'APC', 'Schneider'],
    features: [
      {
        title: 'UPS Systems (Online & Offline)',
        description:
          'Uninterruptible power supply systems for critical equipment protection and seamless power backup.'
      },
      {
        title: 'Voltage Stabilizers & AVR',
        description:
          'Automatic voltage regulators to maintain stable power supply and protect sensitive equipment.'
      },
      {
        title: 'Active Harmonic Filters',
        description:
          'Advanced filtering systems to eliminate power quality issues and improve system efficiency.'
      },
      {
        title: 'Capacitor Banks (PFC)',
        description:
          'Power factor correction systems to optimize energy consumption and reduce utility costs.'
      },
      {
        title: 'Surge Protection Devices',
        description:
          'Comprehensive surge protection to safeguard equipment from voltage spikes and electrical surges.'
      }
    ],
    specifications: [
      { label: 'UPS Types', value: 'Online & Offline' },
      { label: 'Voltage Stabilization', value: 'AVR Technology' },
      { label: 'Power Factor Correction', value: 'Capacitor Banks (PFC)' },
      { label: 'Brands', value: 'APC by Schneider, Muda Energy, SURTAS' }
    ],
    brands: ['APC by Schneider', 'Muda Energy', 'SURTAS'],
    agent: {
      summary:
        'UPS, voltage stabilizers, harmonic filters, power factor correction, and surge protection for critical equipment.',
      capacityOrScope: 'Online and offline UPS, AVR, PFC, surge protection',
      applications: ['Critical loads', 'Sensitive equipment', 'Industrial and commercial facilities']
    }
  },
  {
    id: 'electrical-distribution',
    name: 'Electrical Distribution & Switchgear',
    icon: 'heroicons:light-bulb',
    image: '/products/electrical-distribution.png',
    description:
      'Complete electrical distribution solutions including LV power cables, circuit breakers, contactors, panels, and switchgear components.',
    quickSpecs: ['LV Power Cables', 'Circuit Breakers', 'Panels & Enclosures'],
    tags: ['LV Cables', 'El Sewedy', 'Schneider'],
    features: [
      {
        title: 'LV Power Cables',
        description:
          'Comprehensive range from 1×1.5 mm² to 3×300+150 mm² in both copper and aluminum conductors.'
      },
      {
        title: 'Circuit Breakers',
        description: 'MCB, MCCB, ACB circuit breakers for reliable overcurrent protection and system safety.'
      },
      {
        title: 'Contactors & Overload Relays',
        description: 'Motor control components for safe and efficient electrical system operation.'
      },
      {
        title: 'Panels, Enclosures & Accessories',
        description:
          'Custom-designed panels and enclosures with all necessary accessories for complete installations.'
      }
    ],
    specifications: [
      { label: 'Cable Range', value: '1×1.5 mm² – 3×300+150 mm²' },
      { label: 'Conductors', value: 'Copper & Aluminum' },
      { label: 'Circuit Breakers', value: 'MCB, MCCB, ACB' },
      { label: 'Brands', value: 'El Sewedy, BMT, Schneider Electric' }
    ],
    brands: ['El Sewedy', 'BMT', 'Schneider Electric'],
    agent: {
      summary:
        'LV power cables, circuit breakers, contactors, panels, enclosures, and distribution components.',
      capacityOrScope: '1×1.5 mm² to 3×300+150 mm² cables; MCB, MCCB, ACB',
      applications: ['Industrial', 'Commercial', 'Electrical distribution and motor control']
    }
  },
  {
    id: 'hvac-cooling-systems',
    name: 'HVAC & Cooling Systems',
    icon: 'heroicons:adjustments-horizontal',
    image: '/products/hvac-cooling-systems.png',
    description:
      'Complete HVAC and cooling solutions including split, cassette, ducted & central AC, VRF/VRV systems, chillers, and cold rooms.',
    quickSpecs: ['Split & Central AC', 'VRF/VRV Systems', 'Chillers & Cold Rooms'],
    tags: ['GREE', 'MIDEA', 'TCL'],
    features: [
      {
        title: 'Split, Cassette, Ducted & Central AC',
        description:
          'Complete range of air conditioning systems for residential, commercial, and industrial applications.'
      },
      {
        title: 'VRF / VRV Systems',
        description:
          'Variable refrigerant flow systems for efficient multi-zone climate control in large buildings.'
      },
      {
        title: 'Data Center & Commercial AC',
        description:
          'Specialized cooling solutions for data centers and commercial facilities with precise temperature control.'
      },
      {
        title: 'Chillers & Cooling Towers',
        description:
          'Large-scale cooling systems for industrial and commercial applications requiring high capacity.'
      },
      {
        title: 'Cold Rooms & Refrigeration',
        description:
          'Commercial and industrial refrigeration solutions for food storage and processing facilities.'
      },
      {
        title: 'Ducting, Ventilation & Fire Dampers',
        description:
          'Complete air distribution systems including ductwork, ventilation, and fire safety components.'
      }
    ],
    specifications: [
      { label: 'AC Types', value: 'Split, Cassette, Ducted & Central' },
      { label: 'VRF/VRV', value: 'Multi-zone Systems' },
      { label: 'Applications', value: 'Data Center & Commercial' },
      { label: 'Brands', value: 'GREE, MIDEA, TCL' }
    ],
    brands: ['GREE', 'MIDEA', 'TCL'],
    agent: {
      summary:
        'Split, cassette, ducted, central AC, VRF/VRV, chillers, cold rooms, and ventilation systems.',
      capacityOrScope: 'Residential to large commercial and data-center cooling',
      applications: ['Commercial buildings', 'Data centers', 'Industrial cooling', 'Food storage and refrigeration']
    }
  },
  {
    id: 'pumping-solutions',
    name: 'Pumping Solutions',
    icon: 'heroicons:arrow-path',
    image: '/products/pumping-solutions.png',
    description:
      'Comprehensive pumping solutions including submersible, surface, booster, and solar-powered pumps with control panels and maintenance services.',
    quickSpecs: ['Submersible Pumps', 'Solar Powered', 'Pump Control Panels'],
    tags: ['Submersible', 'Pedrollo', 'Caprari'],
    features: [
      {
        title: 'Submersible Pumps',
        description: 'High-performance submersible pumps for deep well and water extraction applications.'
      },
      {
        title: 'Surface & Booster Pumps',
        description:
          'Surface-mounted and booster pumps for water supply, irrigation, and pressure boosting systems.'
      },
      {
        title: 'Solar Powered Pumps',
        description:
          'Eco-friendly solar-powered pumping solutions for remote locations and sustainable water management.'
      },
      {
        title: 'Pump Control Panels',
        description:
          'Advanced control panels with automation features for efficient pump operation and monitoring.'
      },
      {
        title: 'Motor Winding & Maintenance',
        description:
          'Professional motor rewinding and comprehensive maintenance services to keep pumps running efficiently.'
      }
    ],
    specifications: [
      { label: 'Pump Types', value: 'Submersible, Surface & Booster' },
      { label: 'Power Options', value: 'Electric & Solar Powered' },
      { label: 'Services', value: 'Motor Winding & Maintenance' },
      { label: 'Brands', value: 'Pedrollo, Caprari' }
    ],
    brands: ['Pedrollo', 'Caprari'],
    agent: {
      summary:
        'Submersible, surface, booster, and solar-powered pumps with control panels and maintenance.',
      capacityOrScope: 'Water supply, irrigation, pressure boosting, remote solar pumping',
      applications: ['Water supply', 'Irrigation', 'Industrial pumping', 'Remote locations']
    }
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation & Control',
    icon: 'heroicons:cpu-chip',
    image: '/products/electrical-distribution.png',
    description:
      'Advanced industrial automation solutions including PLC systems, control panels, motor control centers, instrumentation, and sensors.',
    quickSpecs: ['PLC Systems', 'Control Panels', 'MCC & Instrumentation'],
    tags: ['PLC', 'Schneider', 'Mitsubishi', 'ABB'],
    features: [
      {
        title: 'PLC & Automation Systems',
        description:
          'Programmable logic controllers and automation systems for process control and optimization.'
      },
      {
        title: 'Control Panel Design & Manufacturing',
        description:
          'Custom-designed control panels built to your specifications with professional engineering and manufacturing.'
      },
      {
        title: 'Motor Control Centers (MCC)',
        description:
          'Centralized motor control systems for efficient management of multiple motors and equipment.'
      },
      {
        title: 'Instrumentation & Measurement',
        description:
          'Precise measurement and monitoring equipment for process control and quality assurance.'
      },
      {
        title: 'Sensors (Proximity, Temp, Pressure, Level)',
        description:
          'Comprehensive range of industrial sensors for various measurement and detection applications.'
      },
      {
        title: 'CT & PT Transformers',
        description:
          'Current and potential transformers for accurate electrical measurement and protection systems.'
      }
    ],
    specifications: [
      { label: 'PLC Systems', value: 'Schneider, Mitsubishi Electric, ABB, Siemens' },
      { label: 'Control Panels', value: 'Custom Design & Manufacturing' },
      { label: 'MCC', value: 'Motor Control Centers' },
      { label: 'Instrumentation', value: 'Measurement & Sensors' },
      { label: 'Brands', value: 'Schneider, Mitsubishi Electric, ABB, Siemens, Mean Well' }
    ],
    brands: ['Schneider', 'Mitsubishi Electric', 'ABB', 'Siemens', 'Mean Well'],
    agent: {
      summary:
        'PLC systems, custom control panels, motor control centers, instrumentation, and sensors.',
      capacityOrScope: 'Process control, MCC, custom panel manufacturing',
      applications: ['Factories', 'Process plants', 'Motor control and automation']
    }
  },
  {
    id: 'metal-ENGINEERING',
    name: 'Metal ENGINEERING & Fabrication',
    icon: 'heroicons:wrench-screwdriver',
    image: '/products/metal-engineering.png',
    description:
      'Precision metal ENGINEERING and fabrication services including steel structures, storage tanks, lighting poles, and stainless steel fabrication.',
    quickSpecs: ['Steel Structures', 'Storage Tanks', 'Stainless Steel'],
    tags: ['Steel Structures', 'Storage Tanks', 'Welding'],
    features: [
      {
        title: 'Steel Structures (Warehouses, Trusses)',
        description:
          'Custom-designed steel structures for warehouses, industrial buildings, and architectural applications.'
      },
      {
        title: 'Fuel & Industrial Storage Tanks',
        description:
          'Fabricated storage tanks for fuel, water, and industrial liquids with various capacities and specifications.'
      },
      {
        title: 'Lighting Poles & Supports',
        description:
          'Manufactured lighting poles and support structures for street lighting and outdoor illumination.'
      },
      {
        title: 'Stainless Steel Fabrication',
        description:
          'Precision stainless steel fabrication for food processing, pharmaceutical, and specialized industrial applications.'
      },
      {
        title: 'MIG / TIG / Arc Welding',
        description: 'Professional welding services using multiple techniques for various materials and applications.'
      }
    ],
    specifications: [
      { label: 'Structures', value: 'Warehouses, Trusses' },
      { label: 'Storage Solutions', value: 'Fuel & Industrial Tanks' },
      { label: 'Materials', value: 'Steel, Stainless Steel' },
      { label: 'Welding', value: 'MIG / TIG / Arc' }
    ],
    brands: [],
    agent: {
      summary:
        'Steel structures, fuel and industrial storage tanks, lighting poles, and stainless steel fabrication.',
      capacityOrScope: 'Warehouses, trusses, tanks, poles, custom metalwork',
      applications: ['Industrial buildings', 'Fuel storage', 'Outdoor lighting', 'Food and pharmaceutical fabrication']
    }
  }
]

const catalogById = Object.fromEntries(PRODUCT_CATALOG.map((p) => [p.id, p])) as Record<
  string,
  ProductCatalogEntry
>

export function getProductById(id: string): ProductCatalogEntry | null {
  return catalogById[id] ?? null
}

export function getProductListings() {
  return PRODUCT_CATALOG.map(({ id, name, icon, image, description, tags }) => ({
    id,
    name,
    icon,
    image,
    description,
    tags
  }))
}

export function getProductKnowledgeList(): ProductKnowledge[] {
  return PRODUCT_CATALOG.map(toProductKnowledge)
}

export function getProductByIdForPage(id: string) {
  const product = getProductById(id)
  if (!product) return null
  const { agent: _agent, tags: _tags, ...pageProduct } = product
  return pageProduct
}
