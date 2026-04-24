/**
 * Google Books API Interfaces
 */

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      medium?: string;
      large?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
  };
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBook[];
}

export interface AppState {
  books: GoogleBook[];
  isLoading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
  searchQuery: string;
}
