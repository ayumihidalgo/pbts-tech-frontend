// Single source of truth for the site's navigation.
// Edit labels, add divisions, or reorder items here — every page picks it up
// automatically on next build, since nav.js and mobile-nav.js both read from
// this file rather than having markup duplicated per page.

export const NAV = [
  { label: "Home", route: "/" },
  {
    label: "Construction",
    children: [
      { label: "Warehouses", route: "/construction/warehouses/" },
      { label: "Civil / Structural", route: "/construction/civil-structural/" },
      { label: "Electrical", route: "/construction/electrical/" },
      { label: "Architecture", route: "/construction/architecture/" },
      { label: "Mechanical", route: "/construction/mechanical/" },
      { label: "Landscaping", route: "/construction/landscaping/" },
    ],
  },
  {
    label: "Manufacturing",
    children: [
      { label: "Automations & Engineering Services", route: "/manufacturing/automations-engineering/" },
      { label: "Business System & Support", route: "/manufacturing/business-system-support/" },
      { label: "Board Engineering Solution", route: "/manufacturing/board-engineering/" },
      { label: "Tooling and Metal Sheet Fabrication", route: "/manufacturing/tooling-metal-fabrication/" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Completed Projects", route: "/projects/completed/" },
      { label: "On-going Projects", route: "/projects/ongoing/" },
    ],
  },
  { label: "Clients", route: "/clients/" },
  { label: "Career", route: "/career/" },
  { label: "Contact Us", route: "/#contact" },
];
