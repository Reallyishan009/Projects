import { createInterface } from 'readline';

class Book {
    constructor(bookId, title, author, genre) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.availability = true;
    }

    // Method to get book details as a formatted string
    getDetails() {
        return `Book ID: ${this.bookId}
Title: ${this.title}
Author: ${this.author}
Genre: ${this.genre}
Availability: ${this.availability ? 'Available' : 'Not Available'}`;
    }
}

class LibraryManagementSystem {
    constructor() {
        this.books = new Map();
        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Promisified method to get user input
    askQuestion(query) {
        return new Promise(resolve => {
            this.rl.question(query, resolve);
        });
    }

    // Add a new book
    async addBook() {
        console.log('\n--- Add New Book ---');
        
        try {
            const bookId = await this.askQuestion('Enter Book ID: ');
            
            // Check if book ID already exists
            if (this.books.has(bookId)) {
                console.log('Book with this ID already exists!');
                return;
            }

            const title = await this.askQuestion('Enter Title: ');
            const author = await this.askQuestion('Enter Author: ');
            const genre = await this.askQuestion('Enter Genre: ');

            // Create and add new book
            const newBook = new Book(bookId, title, author, genre);
            this.books.set(bookId, newBook);
            console.log('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    }

    // View all books
    viewAllBooks() {
        console.log('\n--- Library Book Catalog ---');
        
        if (this.books.size === 0) {
            console.log('No books in the library.');
            return;
        }

        this.books.forEach(book => {
            console.log(book.getDetails());
            console.log('--------------------');
        });
    }

    // Search book by ID or Title
    async searchBook() {
        console.log('\n--- Search Book ---');
        console.log('1. Search by Book ID');
        console.log('2. Search by Title');
        
        try {
            const choice = await this.askQuestion('Choose search option: ');

            switch (choice) {
                case '1':
                    await this.searchBookById();
                    break;
                case '2':
                    await this.searchBookByTitle();
                    break;
                default:
                    console.log('Invalid option!');
            }
        } catch (error) {
            console.error('Error searching book:', error);
        }
    }

    // Search book by ID
    async searchBookById() {
        try {
            const bookId = await this.askQuestion('Enter Book ID: ');
            const book = this.books.get(bookId);

            if (book) {
                console.log('\nBook Found:');
                console.log(book.getDetails());
            } else {
                console.log('Book not found!');
            }
        } catch (error) {
            console.error('Error searching by ID:', error);
        }
    }

    // Search book by Title
    async searchBookByTitle() {
        try {
            const searchTitle = await this.askQuestion('Enter Book Title: ');
            const normalizedSearchTitle = searchTitle.toLowerCase();

            let found = false;
            this.books.forEach(book => {
                if (book.title.toLowerCase().includes(normalizedSearchTitle)) {
                    console.log('\nBook Found:');
                    console.log(book.getDetails());
                    console.log('--------------------');
                    found = true;
                }
            });

            if (!found) {
                console.log('No books found matching the title.');
            }
        } catch (error) {
            console.error('Error searching by title:', error);
        }
    }

    // Update book details
    async updateBook() {
        console.log('\n--- Update Book Details ---');
        
        try {
            const bookId = await this.askQuestion('Enter Book ID to update: ');
            const book = this.books.get(bookId);

            if (!book) {
                console.log('Book not found!');
                return;
            }

            console.log('Current Book Details:');
            console.log(book.getDetails());

            console.log('\nSelect what to update:');
            console.log('1. Title');
            console.log('2. Author');
            console.log('3. Genre');
            console.log('4. Availability Status');

            const choice = await this.askQuestion('Enter your choice: ');

            switch (choice) {
                case '1':
                    book.title = await this.askQuestion('Enter new Title: ');
                    break;
                case '2':
                    book.author = await this.askQuestion('Enter new Author: ');
                    break;
                case '3':
                    book.genre = await this.askQuestion('Enter new Genre: ');
                    break;
                case '4':
                    book.availability = !book.availability;
                    console.log(`Availability updated to: ${book.availability ? 'Available' : 'Not Available'}`);
                    break;
                default:
                    console.log('Invalid option!');
                    return;
            }

            console.log('Book details updated successfully!');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }

    // Delete a book
    async deleteBook() {
        console.log('\n--- Delete Book ---');
        
        try {
            const bookId = await this.askQuestion('Enter Book ID to delete: ');
            const removedBook = this.books.get(bookId);

            if (removedBook) {
                this.books.delete(bookId);
                console.log('Book deleted successfully:');
                console.log(removedBook.getDetails());
            } else {
                console.log('Book not found!');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    // Display main menu
    async displayMenu() {
        while (true) {
            console.log('\n--- Library Management System ---');
            console.log('1. Add a Book');
            console.log('2. View All Books');
            console.log('3. Search Book');
            console.log('4. Update Book Details');
            console.log('5. Delete Book');
            console.log('6. Exit');

            try {
                const choice = await this.askQuestion('Enter your choice: ');

                switch (choice) {
                    case '1':
                        await this.addBook();
                        break;
                    case '2':
                        this.viewAllBooks();
                        break;
                    case '3':
                        await this.searchBook();
                        break;
                    case '4':
                        await this.updateBook();
                        break;
                    case '5':
                        await this.deleteBook();
                        break;
                    case '6':
                        console.log('Exiting Library Management System. Goodbye!');
                        this.rl.close();
                        return;
                    default:
                        console.log('Invalid option. Please try again.');
                }
            } catch (error) {
                console.error('Error in menu:', error);
            }
        }
    }

    // Start the application
    start() {
        this.displayMenu();
    }
}

// Create and start the library management system
const librarySystem = new LibraryManagementSystem();
librarySystem.start();