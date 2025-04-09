interface BookCardProps {
    bookName: string;
    bookAuthor: string;
    bookGenre: string;
    bookCover: string;
    bookUrl: string;
    bookDescription: string;
    publishYear?: string;
  }
  
  export default function BookCard({
    bookName,
    bookAuthor,
    bookCover,
    bookGenre,
    bookUrl,
    bookDescription,
    publishYear,
  }: BookCardProps) {
    return (
      <div className="flex flex-col md:flex-row w-full md:w-[30vw] h-auto bg-[#FEFEFA] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="w-auto h-full bg-gray-200 rounded-t-lg md:rounded-l-lg shadow-md border-b-2 md:border-r-2 border-[#2C3E50]">
          <img
            src={bookCover}
            alt={`Cover for ${bookName}`}
            className="object-cover h-full w-full shadow-lg rounded-t-lg md:rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-2/3 p-3 md:p-5 flex flex-col justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#800000] truncate flex items-center">
              {bookName}
              <span className="ml-2 text-sm md:text-base text-[#7F8C8D]">| {publishYear}</span>
            </h1>
  
            {/* Updated Author Section */}
            <div className="flex items-center space-x-2 mt-2 md:mt-3">
              <span className="text-md md:text-lg font-bold text-[#2C3E50]">
                {bookAuthor}
              </span>
            </div>
  
            {/* Updated Genre Section */}
            <div className="mt-2 md:mt-1">
              <span className="px-3 py-1 bg-[#F5F5F5] text-[#2C3E50] rounded-full text-xs font-medium border border-[#D0D0D0]">
                {bookGenre}
              </span>
            </div>
  
            {/* Description */}
            <p className="text-sm md:text-md lg:text-lg text-[#2C3E50] line-clamp-3 md:line-clamp-4 lg:line-clamp-6 mt-3">
              {bookDescription}
            </p>
          </div>
          <div className="flex justify-end mt-3 md:mt-0">
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-[#318CE7] hover:bg-[#318CE7] rounded-lg shadow-md font-semibold transition-colors duration-200"
            >
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  