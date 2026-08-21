export interface ClientProject {
  name: string
  logo: string
  category: string
  services: string
}

export const clientProjects: ClientProject[] = [
  {
    name: 'BGI Ethiopia',
    logo: '/clients/client-b.png',
    category: 'Beverages',
    services:
      'Supply and installation of air conditioning, industrial automation & control products, and generator parts.',
  },
  {
    name: 'Coca-Cola Beverages',
    logo: '/clients/client-f.webp',
    category: 'Beverages',
    services: 'Supply of industrial automation & control products.',
  },
  {
    name: 'Awash Bank',
    logo: '/clients/client-e.webp',
    category: 'Banking',
    services: 'Supply & installation of air conditioning and generator parts.',
  },
  {
    name: 'Allied Chemicals',
    logo: '/clients/client-a.png',
    category: 'Chemicals',
    services: 'Installation of 1,500 KVA generator, service and parts supply.',
  },
  {
    name: 'Salesian Sisters',
    logo: '/clients/client-d.png',
    category: 'Education',
    services:
      'Supply & installation of generator, solar lights, and submersible pump.',
  },
]
