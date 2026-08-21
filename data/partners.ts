export interface PartnerLogo {
  name: string
  src: string
  /** Optical height — keep visual weight even across wordmarks */
  heightClass?: string
}

export const DEFAULT_PARTNER_HEIGHT_CLASS = 'h-12 sm:h-24'

export const partnerLogos: PartnerLogo[] = [
  { name: 'Perkins', src: '/partners/perkins.png', heightClass: 'h-12 sm:h-24' },
  { name: 'Cummins', src: '/partners/cummins.png', heightClass: 'h-12 sm:h-24' },
  { name: 'Schneider Electric', src: '/partners/schneider-electric.png', heightClass: 'h-12 sm:h-24' },
  { name: 'Siemens', src: '/partners/siemens.jpeg', heightClass: 'h-12 sm:h-24' },
  { name: 'Mitsubishi', src: '/partners/mitsubishi.png', heightClass: 'h-12 sm:h-24' },
  { name: 'GREE', src: '/partners/gree.png', heightClass: 'h-12 sm:h-24' },
  { name: 'Meanwell', src: '/partners/meanwell.png', heightClass: 'h-12 sm:h-24' },
]
