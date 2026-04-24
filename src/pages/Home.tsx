import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { BookSkeleton } from "../components/Skeleton";
import { googleBooksService } from "../services/googleBooks";
import { GoogleBook } from "../types";
import { motion, AnimatePresence } from "motion/react";

const PAGE_SIZE = 20;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States derived from URL or defaults
  const query = useMemo(() => searchParams.get("q") || "Morgan Housel", [searchParams]);
  const currentPage = useMemo(() => parseInt(searchParams.get("page") || "0"), [searchParams]);

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (searchQuery: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await googleBooksService.searchBooks(searchQuery, page, PAGE_SIZE);
      setBooks(response.items || []);
      setTotalItems(response.totalItems || 0);
    } catch (err: any) {
      setError(err.message || "FAILED TO RETRIEVE BOOKS. CHECK YOUR CONNECTION.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(query, currentPage);
  }, [fetchBooks, query, currentPage]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === "" || newQuery === query) return;
    setSearchParams({ q: newQuery, page: "0" });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-10 py-12"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <p className="type-label mb-2">Current View</p>
          <h1 className="text-4xl font-bold italic font-serif tracking-tight text-slate-900">Gallery Overview</h1>
        </div>
        <div className="flex space-x-12">
          <div className="text-right">
            <p className="type-label">Archive Count</p>
            <p className="font-bold text-xl tracking-tighter">
              {totalItems > 0 ? totalItems.toLocaleString() : "..."}
            </p>
          </div>
          <div className="text-right">
            <p className="type-label">Index</p>
            <p className="font-bold text-xl tracking-tighter">
              {String(currentPage + 1).padStart(2, '0')} / {String(Math.ceil(totalItems / PAGE_SIZE)).padStart(2, '0') || '--'}
            </p>
          </div>
        </div>
      </header>
      
      <section className="mb-20">
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </section>

      <div className="relative min-h-[600px]">
        {error && (
          <div className="bg-swiss-red text-white p-8 font-bold uppercase tracking-widest text-center mb-12 rounded-sm shadow-xl shadow-swiss-red/20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [...Array(8)].map((_, i) => <BookSkeleton key={i} />)
            ) : books.length > 0 ? (
              books.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))
            ) : !isLoading && (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-200">
                <p className="type-label opacity-40">Zero Results indexed for "{query}"</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!isLoading && books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </motion.div>
  );
}
