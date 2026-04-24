import { BooksResponse, GoogleBook } from "../types";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = (import.meta as any).env.VITE_GOOGLE_BOOKS_API_KEY;

/**
 * Service to interact with Google Books API
 */
export const googleBooksService = {
  /**
   * Search books with pagination
   */
  async searchBooks(query: string, page: number = 0, maxResults: number = 20): Promise<BooksResponse> {
    const startIndex = page * maxResults;
    let url = `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`;
    
    if (API_KEY) {
      url += `&key=${API_KEY}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.error?.message || response.statusText || `HTTP Error ${response.status}`;
      throw new Error(message);
    }
    return response.json();
  },

  /**
   * Get specific book by ID
   */
  async getBookById(id: string): Promise<GoogleBook> {
    let url = `${BASE_URL}/${id}`;
    
    if (API_KEY) {
      url += `?key=${API_KEY}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.error?.message || response.statusText || `HTTP Error ${response.status}`;
      throw new Error(message);
    }
    return response.json();
  }
};
