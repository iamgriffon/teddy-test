import ReactPaginate from 'react-paginate'
import { cn } from 'utils'

interface PaginatorProps {
  pageCount: number
  handlePageClick: (selectedItem: { selected: number }) => void
  className?: string
  currentPage: number
}

export function Paginator({
  pageCount,
  handlePageClick,
  className,
  currentPage
}: PaginatorProps) {
  return (
    <section
      className={cn(
        'flex items-center justify-center gap-5 font-bold text-sm',
        className
      )}
      data-testid="paginator"
    >
      <ReactPaginate
        breakLabel="..."
        nextLabel={null}
        forcePage={currentPage}
        className="flex items-center justify-center gap-5 font-bold text-sm"
        activeClassName="bg-theme-primary flex items-center justify-center w-8 h-8 text-white rounded-lg"
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={null}
        renderOnZeroPageCount={null}
      />
    </section>
  )
}
