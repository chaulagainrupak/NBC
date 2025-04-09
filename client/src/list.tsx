import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import BookCard from "./components/bookCard";

// Type definitions
interface Book {
  book_url: string;
  title: string;
  author: string;
  genre: string;
  cover_url: string;
  description: string;
  publish_year: string;
}

export default function MainList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [goodReadsUrl, setGoodReadsUrl] = useState<string>("");
  
  const quotes = [
    "A book is a dream that you hold in your hand. - Neil Gaiman",
    "Reading is a discount ticket to everywhere. - Mary Schmich",
    "There is no friend as loyal as a book. - Ernest Hemingway",
    "Books are a uniquely portable magic. - Stephen King",
    "The only thing you absolutely have to know is the location of the library. - Albert Einstein",
    "A room without books is like a body without a soul. - Marcus Tullius Cicero",
    "Good friends, good books, and a sleepy conscience: this is the ideal life. - Mark Twain",
    "The man who does not read has no advantage over the man who cannot read. - Mark Twain",
    "There is no Frigate like a Book - Emily Dickinson",
    "I cannot live without books. - Thomas Jefferson",
    "We lose ourselves in books, we find ourselves there too. - Anonymous",
    "Books are the mirrors of the soul. - Virginia Woolf",
    "A book is a gift you can open again and again. - Garrison Keillor",
    "The only limit to our realization of tomorrow is the doubts of today. - Franklin D. Roosevelt",
    "Reading brings us unknown friends. - Honore de Balzac",
    "A book is a friend that never lets you down. - Anonymous",
    "The best books... are those that tell you what you know already. - George Orwell",
    "Books are the bees which carry the quickening pollen from one to another mind. - James Russell Lowell",
    "It is a great thing to start life with a small number of really good books. - Sir Thomas More",
    "Books serve to show a man that those original thoughts of his aren’t very new after all. - Abraham Lincoln",
    "A book is a friend that keeps you company on lonely days. - Anonymous",
    "So many books, so little time. - Frank Zappa",
    "Books are the windows through which the soul looks out. - Henry Ward Beecher",
    "Books give a soul to the universe, wings to the mind, flight to the imagination, and life to everything. - Plato",
    "Reading is a form of escape for those seeking knowledge. - Anonymous",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
    "A book is a dream that you hold in your hand. - Neil Gaiman",
    "Books are lighthouses erected in the great sea of time. - E.P. Whipple",
    "A good book is the best of friends, the same today and forever. - Martin Farquhar Tupper",
    "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. - Charles W. Eliot",
    "The world was hers for the reading. - Betty Smith",
    "Books open the doors to limitless adventures. - Anonymous",
    "No man can be called friendless who has God and the companionship of good books. - Elizabeth Barrett Browning",
    "Books are a uniquely portable magic. - Stephen King",
    "A good book is an event in my life. - Stendhal",
    "Books are the most faithful companions; they bring us joy, teach us lessons, and offer solace. - Anonymous",
    "Reading is an adventure that never ends. - Anonymous",
    "In a good book, the story never ends. - Anonymous",
    "A library is not a luxury but one of the necessities of life. - Henry Ward Beecher",
    "You can never get a cup of tea large enough or a book long enough to suit me. - C.S. Lewis",
    "Books are the treasured wealth of the world and the fit inheritance of generations and nations. - Henry David Thoreau",
    "The best way to predict the future is to create it. - Peter Drucker",
    "A book is the most effective way to escape reality. - Anonymous",
    "Life is what happens between book chapters. - Anonymous",
    "Books make great gifts because they have whole worlds inside of them. - Neil Gaiman",
    "A good book is a friend you can never let go of. - Anonymous",
    "Books give us an infinite number of lives. - Anonymous",
    "I find books to be one of the best escapes from reality. - Anonymous",
    "Books are the foundation of society. - Anonymous",
    "Books are a treasure trove of wisdom. - Anonymous",
    "Reading is a gateway to endless possibilities. - Anonymous",
    "Books can take you anywhere, any time. - Anonymous",
    "A book is a journey that takes you to another world. - Anonymous",
    "Books are like mirrors: if a fool looks in, you cannot expect a genius to look out. - Anonymous",
    "A book is a friend that speaks to you and never judges you. - Anonymous",
    "Books bring wisdom, and wisdom brings peace. - Anonymous",
    "Books are like friends; they can take you to places you've never been. - Anonymous",
    "A great book will leave you with memories that last a lifetime. - Anonymous",
    "Books are a way to travel without leaving your home. - Anonymous",
    "Reading takes you to places you can never imagine. - Anonymous",
    "Books are a portal to endless adventures. - Anonymous",
    "Books allow us to travel through time. - Anonymous",
    "Reading gives you wings. - Anonymous",
    "A book is a friend who never betrays you. - Anonymous",
    "Books have the power to change lives. - Anonymous",
    "Books help us learn and grow. - Anonymous",
    "Reading is a form of self-care. - Anonymous",
    "Books are the passport to freedom. - Anonymous",
    "A book is a key that opens doors to new worlds. - Anonymous",
    "The right book can change the course of your life. - Anonymous",
    "Books bring you joy, wisdom, and comfort. - Anonymous",
    "Reading enriches your mind and soul. - Anonymous",
    "A book is a world you can live in. - Anonymous",
    "Books are the path to enlightenment. - Anonymous",
    "A good book can make you forget the world around you. - Anonymous",
    "Books are the best friends you can have. - Anonymous",
    "Reading is the window to new worlds. - Anonymous",
    "A great book opens your mind to new ideas. - Anonymous",
    "Books help you find your own voice. - Anonymous",
    "Books are a sanctuary for the soul. - Anonymous",
    "Books are the best form of travel. - Anonymous",
    "Books allow you to live a thousand lives. - Anonymous",
    "A book is an adventure you can have over and over again. - Anonymous",
    "Books create bridges to other cultures. - Anonymous",
    "A good book is the best escape from the ordinary. - Anonymous",
    "Books help us make sense of the world. - Anonymous",
    "Reading makes life richer. - Anonymous",
    "Books broaden your perspective. - Anonymous",
    "A good book can make you feel seen and understood. - Anonymous",
    "Books are the most valuable tools for self-improvement. - Anonymous",
    "Reading is a journey to a better self. - Anonymous",
    "Books bring us comfort and solace. - Anonymous",
    "A good book is like a window into someone else's life. - Anonymous",
    "Books speak to the soul in ways words cannot. - Anonymous",
    "Books can change the way you see the world. - Anonymous",
    "Reading is a timeless escape. - Anonymous",
    "Books are the compass of the human spirit. - Anonymous",
    "Books can heal the mind and heart. - Anonymous",
    "Reading is an art form that never grows old. - Anonymous",
    "Books bring light to the darkest places. - Anonymous",
    "A great book can change your life. - Anonymous",
    "Reading is the best kind of therapy. - Anonymous",
    "Books can take you to the stars and back. - Anonymous",
    "The best books are those that challenge your thinking. - Anonymous",
    "Books are the timeless companions that never let you down. - Anonymous",
    "A book is a story waiting to be told. - Anonymous"
  ];
  

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const currentDomain = window.location.hostname;
  const apiUrl = `https://api.${currentDomain}`;

  // Fetch books from the API on component mount
  useEffect(() => {
    fetch(`${apiUrl}/api/books`)
      .then((response) => response.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle the URL change in the form
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setGoodReadsUrl(event.target.value);
  };

  // Handle form submission for adding a new book
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const response = await fetch(`${apiUrl}/api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_url: goodReadsUrl,
      }),
    });

    if (response.ok) {
      setGoodReadsUrl(""); // Clear the input field
      window.location.reload(); // Reload the page to show the new list
    } else {
      console.error("Error adding the book");
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Left side: Book Cards */}
        <div className="flex flex-wrap gap-8 justify-center w-full lg:w-2/3">
          {books.map((book) => (
            <BookCard
              key={book.book_url}
              bookName={book.title}
              bookAuthor={book.author}
              bookGenre={book.genre}
              bookCover={book.cover_url}
              bookUrl={book.book_url}
              bookDescription={book.description}
              publishYear={book.publish_year}
            />
          ))}
        </div>

        {/* Right side: Add Book Form */}
        <div className="sticky top-5 w-full lg:w-1/3 p-6 bg-white shadow-lg rounded-lg z-10">
          <h2 className="text-2xl font-semibold mb-4">Add a Book</h2>

          {/* Display random quote */}
          <blockquote className="text-gray-700 italic mb-4 border-l-4 pl-4 border-blue-500">
            "{randomQuote}"
          </blockquote>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="goodreads-url"
                className="block text-sm font-medium text-gray-700"
              >
                GoodReads URL
              </label>
              <input
                type="url"
                id="goodreads-url"
                value={goodReadsUrl}
                onChange={handleUrlChange}
                placeholder="Enter the GoodReads book URL"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out transform hover:scale-105"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition transform hover:scale-105 cursor-pointer"
            >
              Add Book
            </button>
          </form>

          {/* Stats Section: Display the number of books */}
          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-gray-700">
              Total Books: <span className="font-bold">{books.length}</span>
            </p>
          </div>

          {/* Cat Image */}
          <div className="mt-8 text-center">
            <img
              src="src/assets/cat-read.webp"
              alt="Cat reading a book"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
