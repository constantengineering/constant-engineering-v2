# CONSTANT ENGINEERING plc - Website

A high-end industrial website built with Nuxt 3, Tailwind CSS, and Framer Motion, following the Tailwind Studio design aesthetic.

## Features

- **Studio-Style Design**: Bordered wrapper with rounded corners and sophisticated app-like feel
- **Apple-Style Mega Menu**: Full-width dropdown menu with smooth animations
- **Scroll Animations**: All sections animate on scroll using @vueuse/motion
- **Responsive Design**: Fully responsive across all device sizes
- **Modern Stack**: Nuxt 3, Tailwind CSS, and nuxt-icon

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
constant/
├── assets/
│   └── css/
│       └── main.css          # Global styles
├── components/
│   └── Navbar.vue            # Navigation with mega menu
├── pages/
│   ├── index.vue             # Landing page
│   ├── about.vue              # About page
│   ├── contact.vue            # Contact page
│   └── products/
│       ├── index.vue          # Products listing
│       └── [id].vue           # Product detail page
├── app.vue                    # Main app wrapper
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## Design System

- **Primary Color**: #D11800 (International Orange/Red)
- **Typography**: Inter (Google Fonts)
- **Layout**: Studio-style bordered wrapper with rounded-3xl/4xl corners
- **Background**: Gray-100 outer, white inner container

## Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme.

### Content
Update product information in:
- `components/Navbar.vue` (mega menu products)
- `pages/products/index.vue` (product listings)
- `pages/products/[id].vue` (product details)

### Contact Information
Update contact details in `pages/contact.vue`.

## Email Configuration (Formspree)

The chatbot lead form uses Formspree to deliver submissions. To set up:

1. **Create a Formspree account** at [https://formspree.io](https://formspree.io)

2. **Create a form** and copy its endpoint URL (for example `https://formspree.io/f/xxxxabcd`)

3. **Create a `.env` file** in the project root with the following variable:
```env
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

4. **Test lead delivery** by submitting the assistant lead form

**Note**: The `.env` file is already in `.gitignore` and will not be committed to version control.

## License

Proprietary - CONSTANT ENGINEERING plc
