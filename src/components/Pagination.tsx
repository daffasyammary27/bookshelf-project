import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const maxPages = 50; 
  const effectiveTotalPages = Math.min(totalPages, maxPages);

  if (effectiveTotalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between border-t border-slate-200 pt-12 mt-20 pb-10" aria-label="Pagination">
      <div className="flex space-x-2">
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
          className={`px-4 py-1 border border-slate-900 font-bold text-[11px] uppercase tracking-widest transition-all ${
            currentPage === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-slate-900 hover:text-white"
          }`}
        >
          Prev
        </button>
        
        {[...Array(Math.min(5, effectiveTotalPages))].map((_, i) => {
          const pageNum = i;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Go to page ${pageNum + 1}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
              className={`px-3 py-1 font-bold text-[11px] transition-all ${
                currentPage === pageNum
                  ? "border border-slate-900 bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {pageNum + 1}
            </button>
          );
        })}
        {effectiveTotalPages > 5 && <span className="px-2 text-slate-300" aria-hidden="true">...</span>}

        <button
          disabled={currentPage >= effectiveTotalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
          className={`px-4 py-1 border border-slate-900 font-bold text-[11px] uppercase tracking-widest transition-all ${
            currentPage >= effectiveTotalPages - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-slate-900 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>

      <div className="type-label text-slate-500 hidden md:block">
        Viewing {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems.toLocaleString()} archives
      </div>
    </nav>
  );
}
