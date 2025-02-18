import { useState, useMemo } from 'react'

interface PaginationResult<T> {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPageData: T[]
  totalPages: number
}

export const usePagination = <T>(
  data: T[],
  itemsPerPage: number
): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data, itemsPerPage])

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage
    const lastPageIndex = firstPageIndex + itemsPerPage
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, itemsPerPage, data])

  return {
    currentPage: currentPage || 1,
    setCurrentPage: setCurrentPage || (() => {}),
    currentPageData: currentPageData || [],
    totalPages: totalPages || 1,
  }
}
