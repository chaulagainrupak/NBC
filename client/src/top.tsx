import { useState, useEffect } from 'react';

export default function Top() {
    
    interface Book {
        book_id: string;
        title: string;
        author: string;
        publish_year: number;
        genre?: string;
        cover_url?: string;
        book_url: string;
        description?: string;
      }

  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevMonthLabel, setPrevMonthLabel] = useState('');

  useEffect(() => {
    // Get label for previous month
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    setPrevMonthLabel(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
    
    const fetchTopBooks = async () => {
      try {
        // Fetch books from previous month using the simplified endpoint
        const response = await fetch('http://localhost:8000/api/top-books');
        
        if (!response.ok) {
          throw new Error('Failed to fetch top books');
        }
        
        const data = await response.json();
        setTopBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top books:', err);
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-xl">{error}</p>
        <p className="mt-6">Please try again later.</p>
      </div>
    );
  }

  if (topBooks.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-4xl font-bold mb-8">Top Books from {prevMonthLabel}</h2>
        <p className="text-2xl text-gray-600">No books were added last month.</p>
        <p className="text-xl mt-4">Check back next month for new recommendations!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-8">Top Books from {prevMonthLabel}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topBooks.map((book) => (
          <div key={book.book_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="flex h-64">
              {book.cover_url ? (
                <img 
                  src={book.cover_url} 
                  alt={`Cover of ${book.title}`}
                  className="h-full w-48 object-cover object-center"
                />
              ) : (
                <div className="h-full w-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Cover</span>
                </div>
              )}
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-700 mb-2">by {book.author}</p>
                <p className="text-sm text-gray-600 mb-2">Published: {book.publish_year}</p>
                
                {book.genre && (
                  <div className="mb-3 flex flex-wrap">
                    {book.genre.split(', ').map((genre, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-auto">
                  <a 
                    href={book.book_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
            
            {book.description && (
              <div className="p-4 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Description:</h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}