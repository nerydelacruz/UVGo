import { FiImage } from "react-icons/fi"
import { Box, Caption } from "./ImagePlaceholder.styles"

// Espacio reservado para una imagen que todavía no existe
const ImagePlaceholder = ({ label, selected = false }: { label?: string; selected?: boolean }) => (
  <Box selected={selected}>
    <FiImage size={label ? 28 : 20} />
    {label && <Caption>{label}</Caption>}
  </Box>
)

export default ImagePlaceholder
