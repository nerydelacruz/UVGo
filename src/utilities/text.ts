// minúsculas y sin tildes: "quimica" encuentra "Química"
export const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
