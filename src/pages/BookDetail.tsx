import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Globe, Bookmark, Calendar, Building2 } from "lucide-react";
import { googleBooksService } from "../services/googleBooks";
import { GoogleBook } from "../types";
import { DetailSkeleton } from "../components/Skeleton";
import { motion } from "motion/react";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<GoogleBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      setIsLoading(true);
      setErrorStatus(null);
      try {
        const data = await googleBooksService.getBookById(id);
        setBook(data);
      } catch (err: any) {
        console.error(err);
        setErrorStatus(err.message || "Archive Link Broken");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (isLoading) return <DetailSkeleton />;

  if (errorStatus || !book) {
    return (
      <div className="max-w-7xl mx-auto px-10 py-20">
        <h1 className="type-display mb-8 opacity-10">ERROR</h1>
        <p className="type-label mb-12">{errorStatus || "THE BOOK YOU ARE LOOKING FOR HAS BEEN ARCHIVED OR DELETED."}</p>
        <button onClick={() => navigate("/")} className="swiss-button">Return to Gallery</button>
      </div>
    );
  }

  const { title, authors, publisher, publishedDate, description, categories, averageRating, imageLinks, pageCount, language } = book.volumeInfo;
  const thumbnail = imageLinks?.large || imageLinks?.medium || imageLinks?.thumbnail;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-10 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 hover:text-swiss-red transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Archives
        </button>

        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Cover Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <div className="sticky top-32">
              <div className="aspect-[3/4] bg-slate-50 p-10 border-2 border-slate-900 group relative">
                {thumbnail ? (
                  <img
                    src={thumbnail.replace("http:", "https:")}
                    alt={title}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-20">
                    <BookOpen size={48} className="mb-4" />
                    <span className="type-label">NOT ARCHIVED</span>
                  </div>
                )}
                <div 
                  title="Rating of the Book"
                  className="absolute -bottom-4 -right-4 bg-swiss-red text-white p-4 font-display font-bold text-lg leading-none cursor-help hover:scale-110 transition-transform"
                >
                  {averageRating || "?.?"}
                </div>
              </div>
              
              <div className="mt-12 grid grid-cols-2 border-t border-slate-900">
                <div className="border-r border-slate-900 px-4 py-5">
                  <p className="type-label text-[10px] mb-2">Structure</p>
                  <p className="font-bold text-lg tracking-tighter">{pageCount || "???"} PP</p>
                </div>
                <div className="px-4 py-5 overflow-hidden">
                  <p className="type-label text-[10px] mb-2">Category</p>
                  <p className="font-bold text-lg tracking-tighter leading-tight">
                    {categories?.[0]?.toUpperCase() || "GENERAL"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-16 pb-20"
          >
            <div className="space-y-6">
              <p className="type-label tracking-[0.3em] text-swiss-red font-bold">Catalog Entry: {id}</p>
              <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                {title}
              </h1>
              <div className="h-1 w-20 bg-slate-900" />
              <p className="text-2xl font-bold tracking-tight text-slate-600">
                {authors?.join(" / ")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 border-y-2 border-slate-900 py-12">
              <div className="space-y-2">
                <p className="type-label text-slate-400">Institutional Publisher</p>
                <p className="font-bold tracking-tight uppercase">{publisher || "Independent"}</p>
              </div>
              <div className="space-y-2">
                <p className="type-label text-slate-400">Chronology</p>
                <p className="font-bold tracking-tight uppercase">{publishedDate || "Unknown"}</p>
              </div>
              <div className="space-y-2">
                <p className="type-label text-slate-400">Alphabet / Region</p>
                <p className="font-bold tracking-tight uppercase">{language === 'en' ? 'English (Global)' : language}</p>
              </div>
              <div className="space-y-2">
                <p className="type-label text-slate-400">Global Index</p>
                <p className="font-bold tracking-tight uppercase truncate">Google_v1_{id}</p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="type-label tracking-[0.3em] font-bold">Volume Abstract // Analysis</h3>
              <div 
                className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-headings:type-label"
                dangerouslySetInnerHTML={{ __html: description || "DOCUMENTATION NOT AVAILABLE FOR THIS RECORD." }}
              />
            </div>

            <div className="pt-12">
              <a 
                href={book.volumeInfo.infoLink} 
                target="_blank" 
                rel="noreferrer"
                className="swiss-button px-10 py-5 text-xs hover:tracking-[0.2em] transition-all"
              >
                Access Original Volume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
