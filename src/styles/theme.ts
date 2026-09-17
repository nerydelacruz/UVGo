export const theme = {
  color: {
    // Fondos / superficies
    bg: "#dfe6dc", // fondo general de la página
    surface: "#ffffff", // DashboardPage (Frame), CourierCard
    surfaceMuted: "rgba(255, 255, 255, 0.55)", // DeliveryInfoCard, TopNavbar
    surfaceFaint: "rgba(255, 255, 255, 0.4)", // HistoryCard, CheckoutSummaryCard

    // Texto (de más oscuro a más claro)
    textStrong: "#0a0a0a", // DeliveryInfoCard, CourierCard, TopNavbar, CheckoutSummaryCard
    text: "#171717", // usado en casi todos los componentes (títulos/valores)
    textMuted: "#525252", // DeliveryInfoCard, TopNavbar, HistoryCard, CheckoutSummaryCard
    textFaint: "#737373", // DeliveryInfoCard, CourierCard, HistoryCard
    textDisabled: "#a3a3a3", // DeliveryInfoCard (marker pendiente), TopNavbar (chevron)

    // Bordes
    border: "#d4d4d4", // DeliveryInfoCard (conector), CheckoutSummaryCard (divider)

    // Semántico / estado
    primary: "#0ea5e9", // DeliveryInfoCard (marker completado), HistoryCard (badge wash)
    primaryLight: "#7dd3fc", // DeliveryInfoCard (marker pendiente)
    warning: "#fbbf24", // DeliveryInfoCard (marker activo), HistoryCard (badge delivery)
    danger: "#ef4444", // TopNavbar (dot de notificación), CheckoutSummaryCard (línea "free")
    success: "#d1fae5", // reservado, sin uso todavía

    // Interacción (hover de botones oscuros / íconos)
    neutralDark: "#404040", // CourierCard (hover del chat), CheckoutSummaryCard (ícono)
    neutralDarker: "#262626", // CheckoutSummaryCard (hover de "Pay by Card")
    addAction: "#1d411b", // KitCard (botón "Agregar")
  },
  gradient: {
    avatarWarm: "linear-gradient(to bottom right, #fde68a, #d4d4d4)", // TopNavbar (avatar)
    avatarCool: "linear-gradient(to bottom right, #bae6fd, #d4d4d4)", // CourierCard (avatar)
    photoNeutral: "linear-gradient(to bottom right, #e5e5e5, #d6d3d1)", // HistoryCard (foto "Shirts")
    photoSlate: "linear-gradient(to bottom right, #e2e8f0, #94a3b8)", // HistoryCard (foto "Hoodie")
    mesh: "radial-gradient(at 12% 8%, #dfe6dc 0px, transparent 55%), radial-gradient(at 88% 92%, #b8d4b6 0px, transparent 50%), radial-gradient(at 62% 45%, #f7eee1 0px, transparent 60%), radial-gradient(at 97% 20%, #fbf4ea 0px, transparent 45%)", // KitCard
    layoutBg: "linear-gradient(180deg, #b8d4b6 0%, #f7eee1 55%, #fbf4ea 100%)", // DashboardPage / Layout (fondo del Frame, fuerte arriba y suave abajo)
  },
  radius: {
    sm: "0.6rem",
    md: "1.2rem",
    lg: "1.6rem",
    xl: "2.4rem",
    xxl: "4rem",
    full: "9999px",
  },
  space: {
    xs: "0.4rem",
    sm: "0.8rem",
    md: "1.2rem",
    lg: "1.6rem",
    xl: "2.4rem",
    xxl: "2.8rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    xl: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  font: {
    size: {
      xs: "1.2rem",
      sm: "1.4rem",
      md: "1.5rem",
      lg: "1.8rem",
      xl: "2rem",
      xxl: "2.4rem",
      display: "3.6rem",
    },
    weight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  breakpoint: {
    sm: "38rem", // KitCard (apila las cajas de stats)
    lg: "64rem",
  },
} as const

export type Theme = typeof theme
