import { GoogleBook } from "../types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import React from "react";

interface BookCardProps {
  book: GoogleBook;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  const { title, authors, imageLinks } = book.volumeInfo;
  const thumbnail = imageLinks?.thumbnail?.replace("http:", "https:");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="book-card-container p-3 group bg-white shadow-[2px_2px_0px_rgba(15,23,42,0.05)] hover:shadow-[8px_8px_0px_rgba(15,23,42,1)]"
    >
      <Link 
        to={`/book/${book.id}`} 
        className="block"
        aria-label={`View details for ${title} by ${authors?.join(", ") || "Unknown Author"}`}
      >
        <div className="aspect-[3/4] bg-slate-100 mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
          {thumbnail ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <span className="type-label opacity-30">No Image</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="type-label text-[9px] mb-1 group-hover:text-swiss-red transition-colors">
            {book.volumeInfo.categories?.[0] || "Architecture"}
          </p>
          <h3 className="font-bold text-sm leading-tight group-hover:text-slate-900 transition-colors line-clamp-2 uppercase">
            {title}
          </h3>
          <p className="text-[12px] text-slate-500 italic truncate group-hover:text-slate-700">
            {authors?.join(", ") || "Unknown"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
