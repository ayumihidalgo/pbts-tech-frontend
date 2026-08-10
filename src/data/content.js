// Structured copy for the home, clients, and contact pages. Keeping this
// data separate from the components that render it means editing a stat,
// adding a client, or updating an office address never requires touching
// component logic — same principle as nav-config.js.

// Placeholder content for the Business System & Support page's showcase.
// The "shot" field is just a label for the mockup placeholder — swap in a
// real screenshot path once one exists, and update SystemShowcaseComponent
// to render an <img> instead of the wireframe mockup when it does.
// "brochure" paths point to /brochures/*.pdf, which don't exist yet —
// drop the actual PDF files into public/brochures/ with matching names.
export const SYSTEMS = [
  {
    name: "PBTS ERP Suite",
    description: "Centralized resource planning across construction and manufacturing operations — budgets, procurement, and project timelines in one system.",
    brochure: "/brochures/erp-suite.pdf",
  },
  {
    name: "Field Reporting Portal",
    description: "Site supervisors log daily progress, safety checks, and material usage straight from a mobile device, synced back to the office in real time.",
    brochure: "/brochures/field-reporting.pdf",
  },
  {
    name: "Inventory & Procurement",
    description: "Real-time stock visibility across the Cavite, Bataan, and Cebu offices, with automated reorder alerts for critical materials.",
    brochure: "/brochures/inventory-procurement.pdf",
  },
  {
    name: "Payroll & HR Portal",
    description: "Employee records, time tracking, and payroll processing for both construction crews and manufacturing staff, in one place.",
    brochure: "/brochures/payroll-hr.pdf",
  },
];

export const HERO_STATS = [
  { value: "120+", label: "Projects delivered" },
  { value: String(new Date().getFullYear() - 2006), label: "Years in operation" },
  { value: "0", label: "Time-accident record" },
  { value: "7", label: "Manufacturing lines" },
];

export const DIVISIONS = [
  {
    num: "DIVISION 01",
    tone: "construction",
    title: "Construction",
    desc: "Warehouses, civil &amp; structural, electrical, architecture, mechanical, and landscaping work.",
    route: "/construction/warehouses/",
    linkLabel: "View divisions",
  },
  {
    num: "DIVISION 02",
    tone: "manufacturing",
    title: "Manufacturing",
    desc: "Automation &amp; engineering services, business systems, board engineering, and metal fabrication.",
    route: "/manufacturing/automations-engineering/",
    linkLabel: "View divisions",
  },
  {
    num: "DIVISION 03",
    tone: "projects",
    title: "Projects",
    desc: "A record of completed work and a look at what's currently on-going across sites.",
    route: "/projects/completed/",
    linkLabel: "View projects",
  },
];

export const PROOF_ITEMS = [
  {
    photo: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&auto=format&fit=crop&q=80",
    alt: "Pre-engineered steel warehouse under construction",
    category: "Construction &middot; Warehouses",
    title: "40,000 sqft distribution warehouse",
    desc: "Pre-engineered steel build, delivered on schedule from groundbreaking to occupancy.",
  },
  {
    photo: "https://images.unsplash.com/photo-1746017240064-188b45641552?w=900&auto=format&fit=crop&q=80",
    alt: "Technician performing industrial PCB repair",
    category: "Manufacturing &middot; Board Engineering",
    title: "Industrial PCB repair &amp; retrofit",
    desc: "Custom board-level repair program cutting client downtime across three production lines.",
  },
  {
    photo: "https://images.unsplash.com/photo-1780389098001-e641e50aeebd?w=900&auto=format&fit=crop&q=80",
    alt: "Industrial site civil and structural works",
    category: "Construction &middot; Civil / Structural",
    title: "Industrial site civil works",
    desc: "Full site development and structural work completed with zero time-loss incidents.",
  },
];

export const CLIENT_LOGOS = [
  { name: "Toshiba", logo: "/clients/toshiba.png" },
  { name: "ROHM Semiconductor", logo: "/clients/rohm-semiconductor.png" },
  { name: "Dyson", logo: "/clients/dyson.png" },
  { name: "Suzuki", logo: "/clients/suzuki.png" },
  { name: "Kawasaki", logo: "/clients/kawasaki.png" },
  { name: "Continental", logo: "/clients/continental.png" },
  { name: "Eaton", logo: "/clients/eaton.png" },
  { name: "Pueblo de Oro", logo: "/clients/pueblo-de-oro.png" },
  { name: "Hermosa Ecozone", logo: "/clients/hermosa-ecozone.png" },
  { name: "Amkor Technology", logo: "/clients/amkor-technology.png" },
  { name: "TE Connectivity", logo: "/clients/te-connectivity.png" },
  { name: "Lear Corporation", logo: "/clients/lear-corporation.png" },
  { name: "Joyson Safety Systems", logo: "/clients/joyson-safety-systems.png" },
  { name: "Yamaha", logo: "/clients/yamaha.png" },
  { name: "Vishay", logo: "/clients/vishay.png" },
  { name: "Nexperia", logo: "/clients/nexperia.png" },
];

export const VALUES = [
  {
    icon: "target",
    title: "Mission",
    body: "To continuously exceed customer expectations by delivering innovative solutions and fostering a culture of service dedication and excellence.",
  },
  {
    icon: "eye",
    title: "Vision",
    body: "To be an industry leader in technical engineering and construction services, empowering business to achieve its fullest potential.",
  },
  {
    icon: "badge",
    title: "Quality policy",
    body: "The best quality service, at the lowest possible cost, in the fastest possible time. To uphold this, PBTS ensures:",
    list: ["Compliance with specifications", "Efficiency in delivery", "Completion targets are met"],
  },
];

export const CLIENTS = [
  {
    group: "Semiconductors and Electronics",
    clients: [
      { name: "ROHM Semiconductor",        logo: "/clients/rohm-semiconductor.png" },
      { name: "Amkor Technology",           logo: "/clients/amkor-technology.png" },
      { name: "Toshiba",                    logo: "/clients/toshiba.png" },
      { name: "First Sumiden Circuits Inc.",logo: "/clients/first-sumiden-circuits.png" },
      { name: "Vishay",                     logo: "/clients/vishay.png" },
      { name: "Nexperia",                   logo: "/clients/nexperia.png" },
      { name: "Microchip",                  logo: "/clients/microchip.png" },
      { name: "Ampleon",                    logo: "/clients/ampleon.png" },
      { name: "STMicroelectronics",         logo: "/clients/stmicroelectronics.png" },
      { name: "Microsemi",                  logo: "/clients/microsemi.png" },
      { name: "Dyson",                      logo: "/clients/dyson.png" },
      { name: "Aisin",                      logo: "/clients/aisin.png" },
      { name: "TE Connectivity",            logo: "/clients/te-connectivity.png" },
      { name: "Eaton",                      logo: "/clients/eaton.png" },
      { name: "AcBel",                      logo: "/clients/acbel.png" },
      { name: "Bell Electronics",           logo: "/clients/bell-electronics.png" },
      { name: "EMS Group",                  logo: "/clients/ems-group.png" },
      { name: "Excelitas Technologies",     logo: "/clients/excelitas-technologies.png" },
      { name: "Furukawa Electric Group",    logo: "/clients/furukawa-electric-group.png" },
      { name: "Maxeon",                     logo: "/clients/maxeon.png" },
      { name: "ams OSRAM",                  logo: "/clients/ams-osram.png" },
      { name: "Varex Imaging",              logo: "/clients/varex-imaging.png" },
    ],
  },
  {
    group: "Beverages, Health and Beauty",
    clients: [
      { name: "Watsons",               logo: "/clients/watsons.png" },
      { name: "Alfamart",              logo: "/clients/alfamart.png" },
      { name: "La Croesus Pharma",     logo: "/clients/la-croesus-pharma.png" },
      { name: "Lamoiyan Corporation",  logo: "/clients/lamoiyan-corporation.png" },
    ],
  },
  {
    group: "Transportation and Automotives",
    clients: [
      { name: "Suzuki",                       logo: "/clients/suzuki.png" },
      { name: "Kawasaki",                     logo: "/clients/kawasaki.png" },
      { name: "Lear Corporation",             logo: "/clients/lear-corporation.png" },
      { name: "Continental",                  logo: "/clients/continental.png" },
      { name: "EMI (EDS Manufacturing, Inc.)",logo: "/clients/emi-eds-manufacturing.png" },
      { name: "JTEKT",                        logo: "/clients/jtekt.png" },
      { name: "SNPW",                         logo: "/clients/snpw.png" },
      { name: "Fuji",                         logo: "/clients/fuji.png" },
      { name: "SDMI",                         logo: "/clients/sdmi.png" },
      { name: "Yamaha",                       logo: "/clients/yamaha.png" },
    ],
  },
  {
    group: "Land Developer, Condominium",
    clients: [
      { name: "Pueblo de Oro Development Corporation", logo: "/clients/pueblo-de-oro.png" },
      { name: "Hermosa Ecozone Industrial Park",        logo: "/clients/hermosa-ecozone.png" },
      { name: "Joyson Safety Systems",                  logo: "/clients/joyson-safety-systems.png" },
      { name: "Brixton Place",                          logo: "/clients/brixton-place.png" },
    ],
  },
  {
    group: "Other Industries",
    clients: [
      { name: "Majestic Packaging Products Corp.",   logo: "/clients/majestic-packaging.png" },
      { name: "Majestic Press Inc.",                 logo: "/clients/majestic-press.png" },
      { name: "TOMC",                                logo: "/clients/tomc.png" },
      { name: "Zenith",                              logo: "/clients/zenith.png" },
      { name: "Amelco",                              logo: "/clients/amelco.png" },
      { name: "ROHM Mechatech",                      logo: "/clients/rohm-mechatech.png" },
      { name: "Diamond Precision Engineering",       logo: "/clients/diamond-precision-engineering.png" },
      { name: "JM Precision",                        logo: "/clients/jm-precision.png" },
      { name: "TaskUs",                              logo: "/clients/taskus.png" },
      { name: "AccuPrint",                           logo: "/clients/accuprint.png" },
      { name: "Engtek",                              logo: "/clients/engtek.png" },
      { name: "Pioneer",                             logo: "/clients/pioneer.png" },
      { name: "Enomoto",                             logo: "/clients/enomoto.png" },
      { name: "Metalcast Corporation",               logo: "/clients/metalcast-corporation.png" },
      { name: "Veltrup Technik Philippines Inc.",    logo: "/clients/veltrup-technik.png" },
      { name: "Converge ICT Solutions Inc.",         logo: "/clients/converge-ict.png" },
      { name: "Knoll Prestige Packaging",            logo: "/clients/knoll-prestige-packaging.png" },
    ],
  },
];

export const OFFICES_DETAIL = [
  {
    name: "Main Office",
    phones: ["+63-2-8552-5131 to 32", "+63-46-430-2890"],
    mapLabel: "Map — Cavite",
  },
  {
    name: "Bataan Branch",
    phones: ["+63-917-179-7377"],
    mapLabel: "Map — Bataan",
  },
  {
    name: "Cebu Branch",
    phones: ["+63-905-038-1443"],
    mapLabel: "Map — Cebu",
  },
];

// Eyebrow/breadcrumb/title/intro for every subpage's PageHeaderComponent,
// plus the label used in that subpage's generic mock content section.
export const PAGE_META = {
  "/construction/warehouses/": { eyebrow: "Construction", breadcrumb: ["Construction", "Warehouses"], title: "Warehouses", intro: "Pre-engineered metal building solutions for industrial and logistics clients." },
  "/construction/civil-structural/": { eyebrow: "Construction", breadcrumb: ["Construction", "Civil / Structural"], title: "Civil / Structural", intro: "Site development, foundations, and structural steel work built to last." },
  "/construction/electrical/": { eyebrow: "Construction", breadcrumb: ["Construction", "Electrical"], title: "Electrical", intro: "Industrial and commercial electrical systems, from panel to point of use." },
  "/construction/architecture/": { eyebrow: "Construction", breadcrumb: ["Construction", "Architecture"], title: "Architecture", intro: "Design and planning services that turn a brief into a buildable set of drawings." },
  "/construction/mechanical/": { eyebrow: "Construction", breadcrumb: ["Construction", "Mechanical"], title: "Mechanical", intro: "HVAC, piping, and mechanical systems engineered for industrial facilities." },
  "/construction/landscaping/": { eyebrow: "Construction", breadcrumb: ["Construction", "Landscaping"], title: "Landscaping", intro: "Site grading, planting, and hardscape work that finishes a project properly." },
  "/manufacturing/automations-engineering/": { eyebrow: "Manufacturing", breadcrumb: ["Manufacturing", "Automations & Engineering Services"], title: "Automations & Engineering Services", intro: "Automation and controls engineering for modern production lines." },
  "/manufacturing/business-system-support/": { eyebrow: "Manufacturing", breadcrumb: ["Manufacturing", "Business System & Support"], title: "Business System & Support", intro: "Business systems, IT infrastructure, and support for manufacturing operations." },
  "/manufacturing/board-engineering/": { eyebrow: "Manufacturing", breadcrumb: ["Manufacturing", "Board Engineering Solution"], title: "Board Engineering Solution", intro: "Board-level design, repair, and retrofit for industrial electronics." },
  "/manufacturing/tooling-metal-fabrication/": { eyebrow: "Manufacturing", breadcrumb: ["Manufacturing", "Tooling and Metal Sheet Fabrication"], title: "Tooling and Metal Sheet Fabrication", intro: "Custom tooling and metal sheet fabrication, built to spec." },
  "/projects/completed/": { eyebrow: "Projects", breadcrumb: ["Projects", "Completed Projects"], title: "Completed Projects", intro: "A record of projects delivered on schedule, from groundbreaking to occupancy." },
  "/projects/ongoing/": { eyebrow: "Projects", breadcrumb: ["Projects", "On-going Projects"], title: "On-going Projects", intro: "A look at what's currently underway across our active sites." },
};
