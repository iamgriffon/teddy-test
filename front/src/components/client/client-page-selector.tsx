import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useClientStore } from 'store'

interface ClientPageSelectorProps {
  total: number
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
}

export function ClientPageSelector({
  total,
  itemsPerPage,
  setItemsPerPage
}: ClientPageSelectorProps) {
  const handleChangeSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value))
    },
    []
  )

  const location = useLocation()
  const { list } = useClientStore()
  const totalLabel = useMemo(() => {
    if (location.search.includes('selected=true')) {
      if (list.total === 1) {
        return 'cliente selecionado'
      }
      return 'clientes selecionados'
    }
    if (list.total === 1) {
      return 'cliente encontrado'
    }
    return 'clientes encontrados'
  }, [location.search, list.total])

  const options = useMemo(() => {
    return Array.from({ length: 11 }, (_, index) => index + 10).map((item) => ({
      label: item,
      value: item
    }))
  }, [])

  return (
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
      <p
        className="flex items-center gap-2 text-lg leading-6"
        data-testid="clients-total-label"
      >
        <strong>{total}</strong>
        <span className="text-theme-black">{totalLabel}:</span>
      </p>
      <div className="flex items-center gap-2.5">
        <p className="text-lg leading-6">Clientes por página:</p>
        <select
          id="itemsPerPage"
          className="rounded-md border border-theme-gray p-2"
          data-testid="items-per-page-select"
          value={itemsPerPage}
          onChange={handleChangeSelect}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
