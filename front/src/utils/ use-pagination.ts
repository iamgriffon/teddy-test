import { useState, useMemo } from 'react'

interface PaginationResult<T> {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPageData: T[]
  totalPages: number
  firstPageIndex: number
  lastPageIndex: number
  total: number
}

export const usePagination = <T>(
  data: T[],
  itemsPerPage: number
): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data, itemsPerPage])

  const firstPageIndex = (currentPage - 1) * itemsPerPage
  const lastPageIndex = firstPageIndex + itemsPerPage

  const currentPageData = useMemo(() => {
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, itemsPerPage, data])

  return {
    firstPageIndex,
    lastPageIndex,
    currentPage: currentPage || 1,
    setCurrentPage: setCurrentPage || (() => {}),
    currentPageData: currentPageData || [],
    totalPages: totalPages || 1,
    total: data.length || 0
  }
}
