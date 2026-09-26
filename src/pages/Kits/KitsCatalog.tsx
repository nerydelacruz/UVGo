import { useMemo, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { normalize } from "@/utilities/text"
import KitCard from "./components/KitCard/KitCard"
import { useKits } from "@/hooks/useKits"
import { Count, Grid, GridScroll, List, Page, SearchBox, Toolbar } from "./Dashboard.styles"

const KitsCatalog = () => {
  const { data: kits = [], isLoading, isError } = useKits()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const filteredKits = useMemo(() => {
    if (!Array.isArray(kits)) return []

    const term = normalize(search.trim())
    if (!term) return kits
    return kits.filter((kit) =>
      [kit.name, kit.course, kit.description].some((field) => normalize(field).includes(term)),
    )
  }, [kits, search])

  return (
    <Page>
      <List>
        <Toolbar>
          <Count>
            {filteredKits.length} <span>Kits</span>
          </Count>
          <SearchBox>
            <FiSearch size={18} />
            <input
              placeholder="Buscar kit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
        </Toolbar>

        <GridScroll>
          {isLoading && <p>Cargando kits...</p>}
          {isError && <p>Error al cargar los kits</p>}
          {!isLoading && !isError && search.trim() && filteredKits.length === 0 && (
            <p>No se encontraron kits para "{search.trim()}"</p>
          )}
          {!isError && (
            <Grid>
              {filteredKits.map((kit) => (
                <KitCard
                  key={kit.kitId}
                  kit={kit}
                  onDetail={() => navigate(`/kits/${kit.kitId}`)}
                />
              ))}
            </Grid>
          )}
        </GridScroll>
      </List>
    </Page>
  )
}

export default KitsCatalog
