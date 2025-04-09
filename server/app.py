import sqlite3
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

import requests

from bs4 import BeautifulSoup
import re 

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'en-US,en;q=0.9,it;q=0.8,es;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br'
}

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database = "./data.db"

@app.on_event("startup")
def startup():
    connection = sqlite3.connect(database)
    db = connection.cursor()
    db.execute("""
        CREATE TABLE IF NOT EXISTS books (
            book_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            cover_url TEXT,
            book_url TEXT,
            description TEXT,
            publish_year TEXT,
            added_at TEXT
        )
    """)
    connection.commit()
    connection.close()

@app.get("/api/books")
async def get_books():
    connection = sqlite3.connect(database)
    db = connection.cursor()

    # Current month and year in format 'mm/yyyy'
    current_month_year = datetime.now().strftime("%m/%Y")
    
    # Match the pattern '*/<month>/<year>' in the 'added_at' field (e.g., */04/2025)
    books = db.execute("""
        SELECT * FROM books WHERE added_at LIKE ?
    """, (current_month_year,)).fetchall()

    connection.close()

    books_list = []
    for book in books:
        books_list.append({
            "book_id": book[0],
            "title": book[1],
            "author": book[2],
            "genre": book[3],
            "cover_url": book[4],
            "book_url": book[5],
            "description": book[6],
            "publish_year": book[7],
            "added_at": book[8]
        })

    return books_list

@app.post("/api/add")
async def add_book(request: Request):
    body = await request.json()

    book_url = body.get("book_url")
    if not book_url:
        raise HTTPException(status_code=400, detail="Book URL is required")

    try:
        addBookToDb(book_url)
        return {"message": "Book added successfully"}
    except Exception as e:
        return {"message": f"Error adding book: {str(e)}"}


def getBookData(url):
    res = requests.get(url, headers=headers).content
    soup = BeautifulSoup(res, 'html5lib')

    genreList = []


    imageDiv = soup.find("div", {"class" : "BookCover__image"})
    imageUrl = imageDiv.find('img')["src"]
    
    descriptionDiv = soup.find("div", {"class" : "BookPageMetadataSection__description"}).find("span")
    description = descriptionDiv.text 

    pubDiv = soup.find("p", {"data-testid" : "publicationInfo"})
    pubDate = extractDateToDDMMYYYY(pubDiv.text)
    
    genreSection = soup.find("div", {'class': "BookPageMetadataSection__genres"})

    if genreSection:
        # Get all <a> tags (each contains a <span class="Button__labelItem">GenreName</span>)
        for aTag in genreSection.find_all("a", class_="Button"):
            label = aTag.find("span", class_="Button__labelItem")
            if label:
                text = label.get_text(strip=True)
                if text and text.lower() != "...more":
                    genreList.append(text)

    # Deduplicate and sort
    genreList = sorted(set(genreList))


    # Title and author from <title> tag
    htmlTitle = soup.find('title').text
    match = re.match(r'^(.*?) by (.*?) \|', htmlTitle)

    if match:
        bookTitle = match.group(1)
        authorName = match.group(2)
        return bookTitle, authorName, genreList, imageUrl, description, pubDate

    return None, None, genreList, imageUrl, description, pubDate



def extractDateToDDMMYYYY(dateString):
    # Use regex to extract just the date portion
    match = re.search(r'([A-Za-z]+ \d{1,2}, \d{4})', dateString)
    if match:
        datePart = match.group(1)
        # Parse the date string
        parsedDate = datetime.strptime(datePart, "%B %d, %Y")
        # Return in ddmmyyyy format
        return str(parsedDate.strftime("%d/%m/%Y"))
    return None


def addBookToDb(bookUrl):
    title, author, genreList, coverUrl, description, publishYear = getBookData(bookUrl)

    if not title or not author:
        print("❌ Failed to extract book data.")
        return

    # Get current month and year
    addedAt = datetime.now().strftime("%m/%Y")

    # Check if the book title already exists for the current month
    connection = sqlite3.connect(database)
    db = connection.cursor()
    existing_books = db.execute("""
        SELECT * FROM books WHERE added_at = ? AND title = ?
    """, (addedAt, title)).fetchall()

    # If the book already exists for this month, skip insertion
    if existing_books:
        print(f"❌ '{title}' is already added for {addedAt}.")
        connection.close()
        return

    # Format the genres as a comma-separated string
    genreFormatted = ", ".join([g.lower() for g in genreList])  # "one, two, three"

    # Insert the book into the database
    db.execute("""
        INSERT INTO books (title, author, genre, cover_url, book_url, description, publish_year, added_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        title,
        author,
        genreFormatted,
        coverUrl,
        bookUrl,
        description,
        publishYear,
        addedAt
    ))

    connection.commit()
    connection.close()
    print(f"✅ Added '{title}' by {author} to the database.")
    


