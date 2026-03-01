import { all_routes } from "@/data/all_routes";

const route = all_routes;

export const SidebarData = [
  {
    label: "Main",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Main",
    submenuItems: [
      {
        label: "Super Admin",
        icon: "user-edit",
        submenu: true,
        showSubRoute: false,

        submenuItems: [
          { label: "Dashboard", link: "/dashboard" },
           
        ],
      },
      {
        label: "Leads",
        icon: "brand-apple-arcade",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
           
          { label: "Online", link: `${route.leadsDashboard}?tab=online`, showSubRoute: false },
          { label: "System Generated", link: `${route.leadsDashboard}?tab=system`, showSubRoute: false },
          { label: "Follow Up", link: `${route.leadsDashboard}?tab=follow`, showSubRoute: false },
            
        ],
      },
       
    ],
  },
  {
    label: "Sales",
    submenuOpen: true,
    submenuHdr: "Sales",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Sales",
        icon: "layout-grid",
        showSubRoute: false,
        submenu: true,
        submenuItems: [
          {
            label: "Online Orders",
            link: route.onlineorder,
            showSubRoute: false,
          },
          { label: "POS Orders", link: route.posorder, showSubRoute: false },
        ],
      },
      {
        label: "Invoices",
        link: route.invoice,
        icon: "file-invoice",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Sales Return",
        link: "/sales-returns",
        icon: "receipt-refund",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Quotation",
        link: "/quotation-list",
        icon: "files",
        showSubRoute: false,
        submenu: false,
      },
       
    ],
  },
  {
    label: "Finance & Accounts",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Finance & Accounts",
    submenuItems: [
      {
        label: "Expenses",
        submenu: true,
        showSubRoute: false,
        icon: "file-stack",
        submenuItems: [
          { label: "Expenses", link: "/expense-list", showSubRoute: false },
          {
            label: "Expense Category",
            link: "/expense-category",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "Income",
        submenu: true,
        showSubRoute: false,
        icon: "file-pencil",
        submenuItems: [
          { label: "Income", link: "/income", showSubRoute: false },
          {
            label: "Income Category",
            link: "/income-category",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "Bank Accounts",
        link: route.accountlist,
        icon: "building-bank",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Money Transfer",
        link: "/money-transfer",
        icon: "moneybag",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Balance Sheet",
        link: "/balance-sheet",
        icon: "report-money",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Trial Balance",
        link: "/trial-balance",
        icon: "alert-circle",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Cash Flow",
        link: "/cash-flow",
        icon: "zoom-money",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Account Statement",
        link: "/account-statement",
        icon: "file-infinity",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
 
  {
    label: "User Management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "User Management",
    submenuItems: [
      {
        label: "Users",
        link: "/users",
        icon: "shield-up",
        showSubRoute: false,
      },
      {
        label: "Roles & Permissions",
        link: "/roles-permissions",
        icon: "jump-rope",
        showSubRoute: false,
      },
      {
        label: "Delete Account Request",
        link: "/delete-account",
        icon: "trash-x",
        showSubRoute: false,
      },
    ],
  },
   

  {
    label: "Settings",
    submenu: true,
    showSubRoute: false,
    submenuHdr: "Settings",
    submenuItems: [
      {
        label: "General Settings",
        submenu: true,
        showSubRoute: false,
        icon: "settings",
        submenuItems: [
          { label: "Profile", link: "/general-settings" },
          { label: "Security", link: "/security-settings" },
          { label: "Notifications", link: "/notification" },
          { label: "Connected Apps", link: "/connected-apps" },
        ],
      },
      {
        label: "Website Settings",
        submenu: true,
        showSubRoute: false,
        icon: "world",
        submenuItems: [
          {
            label: "System Settings",
            link: "/system-settings",
            showSubRoute: false,
          },
          {
            label: "Company Settings",
            link: "/company-settings",
            showSubRoute: false,
          },
          {
            label: "Localization",
            link: "/localization-settings",
            showSubRoute: false,
          },
          { label: "Prefixes", link: "/prefixes", showSubRoute: false },
          { label: "Preference", link: "/preference", showSubRoute: false },
          { label: "Appearance", link: "/appearance", showSubRoute: false },
          {
            label: "Social Authentication",
            link: "/social-authentication",
            showSubRoute: false,
          },
          {
            label: "Language",
            link: "/language-settings",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "App Settings",
        submenu: true,

        showSubRoute: false,
        icon: "device-mobile",
        submenuItems: [
          {
            label: "Invoice",
            link: "/invoice-settings",
            showSubRoute: false,
            submenu: true,
            submenuItems: [
              { label: "Invoice Settings", link: "/invoice-settings" },
              { label: "Invoice Template", link: "/invoice-template" },
            ],
          },
          { label: "Printer", link: "/printer-settings", showSubRoute: false },
          { label: "POS", link: "/pos-settings", showSubRoute: false },
          {
            label: "Custom Fields",
            link: "/custom-fields",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "System Settings",
        submenu: true,
        showSubRoute: false,
        icon: "device-desktop",
        submenuItems: [
          {
            label: "Email",
            link: "/email-settings",
            showSubRoute: false,
            submenu: true,
            submenuItems: [
              { label: "Email Settings", link: "/email-settings" },
              { label: "Email Template", link: "/email-template" },
            ],
          },
          {
            label: "SMS Gateways",
            link: "/sms-gateway",
            showSubRoute: false,
            submenu: true,
            submenuItems: [
              { label: "SMS Settings", link: "/sms-settings" },
              { label: "SMS Template", link: route.smstemplate },
            ],
          },
          { label: "OTP", link: "/otp-settings", showSubRoute: false },
          {
            label: "GDPR Cookies",
            link: "/gdpr-settings",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "Financial Settings",
        submenu: true,
        showSubRoute: false,
        icon: "settings-dollar",
        submenuItems: [
          {
            label: "Payment Gateway",
            link: "/payment-gateway-settings",
            showSubRoute: false,
          },
          {
            label: "Bank Accounts",
            link: "/bank-settings-grid",
            showSubRoute: false,
          },
          { label: "Tax Rates", link: "/tax-rates", showSubRoute: false },
          {
            label: "Currencies",
            link: "/currency-settings",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "Other Settings",
        submenu: true,
        showSubRoute: false,
        icon: "settings-2",
        submenuItems: [
          { label: "Storage", link: "/storage-settings", showSubRoute: false },
          {
            label: "Ban IP Address",
            link: "/ban-ip-address",
            showSubRoute: false,
          },
        ],
      },
      {
        label: "Logout",
        link: "/signin",
        icon: "logout",
        showSubRoute: false,
      },
    ],
  },

  // {
  //   label: "UI Interface",
  //   submenuOpen: true,
  //   showSubRoute: false,
  //   submenuHdr: "UI Interface",
  //   submenuItems: [
  //     {
  //       label: "Base UI",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "vector-bezier",
  //       submenuItems: [
  //         { label: "Alerts", link: "/ui-alerts", showSubRoute: false },
  //         { label: "Accordion", link: "/ui-accordion", showSubRoute: false },
  //         { label: "Avatar", link: "/ui-avatar", showSubRoute: false },
  //         { label: "Badges", link: "/ui-badges", showSubRoute: false },
  //         { label: "Border", link: "/ui-borders", showSubRoute: false },
  //         { label: "Buttons", link: "/ui-buttons", showSubRoute: false },
  //         {
  //           label: "Button Group",
  //           link: "/ui-buttons-group",
  //           showSubRoute: false,
  //         },
  //         { label: "Breadcrumb", link: "/ui-breadcrumb", showSubRoute: false },
  //         { label: "Card", link: "/ui-cards", showSubRoute: false },
  //         { label: "Carousel", link: "/ui-carousel", showSubRoute: false },
  //         { label: "Colors", link: "/ui-colors", showSubRoute: false },
  //         { label: "Dropdowns", link: "/ui-dropdowns", showSubRoute: false },
  //         { label: "Grid", link: "/ui-grid", showSubRoute: false },
  //         { label: "Images", link: "/ui-images", showSubRoute: false },
  //         { label: "Lightbox", link: "/ui-lightbox", showSubRoute: false },
  //         { label: "Media", link: "/ui-media", showSubRoute: false },
  //         { label: "Modals", link: "/ui-modals", showSubRoute: false },
  //         { label: "Offcanvas", link: "/ui-offcanvas", showSubRoute: false },
  //         { label: "Pagination", link: "/ui-pagination", showSubRoute: false },
  //         { label: "Popovers", link: "/ui-popovers", showSubRoute: false },
  //         { label: "Progress", link: "/ui-progress", showSubRoute: false },
  //         {
  //           label: "Placeholders",
  //           link: "/ui-placeholders",
  //           showSubRoute: false,
  //         },
  //         {
  //           label: "Range Slider",
  //           link: "/ui-rangeslider",
  //           showSubRoute: false,
  //         },
  //         { label: "Spinner", link: "/ui-spinner", showSubRoute: false },
         
  //         { label: "Tabs", link: "/ui-nav-tabs", showSubRoute: false },
  //         { label: "Toasts", link: "/ui-toasts", showSubRoute: false },
  //         { label: "Tooltips", link: "/ui-tooltips", showSubRoute: false },
  //         { label: "Typography", link: "/ui-typography", showSubRoute: false },
  //         { label: "Video", link: "/ui-video", showSubRoute: false },
  //         { label: "Sortable", link: "/sortable", showSubRoute: false },
  //         { label: "SwiperJs", link: "/swiper-js", showSubRoute: false },
  //       ],
  //     },
  //     {
  //       label: "Advanced UI",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "stack-forward",
  //       submenuItems: [
  //         { label: "Ribbon", link: "/ui-ribbon", showSubRoute: false },
  //         { label: "Clipboard", link: "/ui-clipboard", showSubRoute: false },
  //         { label: "Drag & Drop", link: "/ui-drag-drop", showSubRoute: false },
  //         {
  //           label: "Range Slider",
  //           link: "/ui-rangeslider",
  //           showSubRoute: false,
  //         },
  //         { label: "Rating", link: "/ui-rating", showSubRoute: false },
  //         {
  //           label: "Text Editor",
  //           link: "/ui-text-editor",
  //           showSubRoute: false,
  //         },
  //         { label: "Counter", link: "/ui-counter", showSubRoute: false },
  //         { label: "Scrollbar", link: "/ui-scrollbar", showSubRoute: false },
        
  //         { label: "Timeline", link: "/ui-timeline", showSubRoute: false },
  //       ],
  //     },
  //     {
  //       label: "Charts",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "chart-infographic",
  //       submenuItems: [
  //         { label: "Apex Charts", link: "/chart-apex", showSubRoute: false },
         
  //       ],
  //     },
  //     {
  //       label: "Icons",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "icons",
  //       submenuItems: [
  //         {
  //           label: "Fontawesome Icons",
  //           link: "/icon-fontawesome",
  //           showSubRoute: false,
  //         },
  //         {
  //           label: "Remix Icon",
  //           link: "/remix-icon",
  //           showSubRoute: false,
  //         },
  //         {
  //           label: "Bootstrap Icon",
  //           link: "/bootstrap-icon",
  //           showSubRoute: false,
  //         },
         
        
  //         { label: "Ionic Icons", link: "/icon-ionic", showSubRoute: false },
  //         {
  //           label: "Material Icons",
  //           link: "/icon-material",
  //           showSubRoute: false,
  //         },
  //         { label: "Pe7 Icons", link: "/icon-pe7", showSubRoute: false },
         
  //         {
  //           label: "Themify Icons",
  //           link: "/icon-themify",
  //           showSubRoute: false,
  //         },
         
  //         {
  //           label: "Typicon Icons",
  //           link: "/icon-typicon",
  //           showSubRoute: false,
  //         },
  //         {
  //           label: "Tabler Icons",
  //           link: "/icon-tabler",
  //           showSubRoute: false,
  //         },
       
  //         { label: "Flag Icons", link: "/icon-flag", showSubRoute: false },
  //       ],
  //     },
  //     {
  //       label: "Forms",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "input-search",
  //       submenuItems: [
  //         {
  //           label: "Form Elements",
  //           submenu: true,
  //           showSubRoute: false,
  //           submenuItems: [
  //             {
  //               label: "Basic Inputs",
  //               link: "/form-basic-inputs",
  //               showSubRoute: false,
  //             },
  //             {
  //               label: "Checkbox & Radios",
  //               link: "/form-checkbox-radios",
  //               showSubRoute: false,
  //             },
  //             {
  //               label: "Input Groups",
  //               link: "/form-input-groups",
  //               showSubRoute: false,
  //             },
  //             {
  //               label: "Grid & Gutters",
  //               link: "/form-grid-gutters",
  //               showSubRoute: false,
  //             },
  //             {
  //               label: "Form Select",
  //               link: "/form-select",
  //               showSubRoute: false,
  //             },
           
  //             {
  //               label: "File Uploads",
  //               link: "/form-fileupload",
  //               showSubRoute: false,
  //             },
  //           ],
  //         },
  //         {
  //           label: "Layouts",
  //           submenu: true,
  //           showSubRoute: false,
  //           submenuItems: [
  //             { label: "Horizontal Form", link: "/form-horizontal" },
  //             { label: "Vertical Form", link: "/form-vertical" },
  //             { label: "Floating Labels", link: "/form-floating-labels" },
  //           ],
  //         },
  //         { label: "Form Validation", link: "/form-validation" },
  //         { label: "Select", link: "/form-select2" },
  //         { label: "Form Wizard", link: "/form-wizard" },
  //         { label: "Form Picker", link: "/form-picker" },
  //       ],
  //     },
  //     {
  //       label: "Tables",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "table",
  //       submenuItems: [
  //         { label: "Basic Tables", link: "/tables-basic" },
  //         { label: "Data Table", link: "/data-tables" },
  //       ],
  //     },
  //     {
  //       label: "Map",
  //       submenu: true,
  //       showSubRoute: false,
  //       icon: "map-pin-pin",
  //       submenuItems: [{ label: "Leaflet", link: "/leaflet" }],
  //     },
  //   ],
  // },
  {
    label: "Pages",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Pages",
    submenuItems: [
       
      {
        label: "Pricing",
        link: route.pricing,
        icon: "currency-dollar",
        showSubRoute: false,
      },
       
    ],
  },

  {
    label: "Help",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Help",
    submenuItems: [
      {
        label: "Documentation",
        link: "#",
        icon: "file-text",
        showSubRoute: false,
      },
      {
        label: "Changelog v2.0.7",
        link: "#",
        icon: "exchange",
        showSubRoute: false,
      },
      {
        label: "Multi Level",
        showSubRoute: false,
        submenu: true,
        icon: "menu-2",
        submenuItems: [
          { label: "Level 1.1", link: "#", showSubRoute: false },
          {
            label: "Level 1.2",
            submenu: true,
            showSubRoute: false,
            submenuItems: [
              { label: "Level 2.1", link: "#", showSubRoute: false },
              {
                label: "Level 2.2",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Level 3.1", link: "#", showSubRoute: false },
                  { label: "Level 3.2", link: "#", showSubRoute: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
