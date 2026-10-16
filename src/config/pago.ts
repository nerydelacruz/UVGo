// Cuenta a la que el estudiante transfiere el total de la cotización.
// TODO: reemplazar por los datos reales de la cuenta de UVGo (estos son de ejemplo, como en el diseño).
export const CUENTA_TRANSFERENCIA = {
  banco: "Banco Industrial (BI)",
  tipo: "Monetaria",
  numero: "0000-000-000",
  titular: "UVGo",
} as const

// Comprobante de pago: foto o PDF de la transferencia (los mismos tipos que acepta el backend)
export const COMPROBANTE_TIPOS = ["image/jpeg", "image/png", "application/pdf"]
export const COMPROBANTE_MAX_MB = 5
