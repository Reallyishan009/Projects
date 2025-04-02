import java.util.*;

// Book class to represent individual book details
class Book {
    private String bookId;
    private String title;
    private String author;
    private String genre;
    private boolean availability;

    // Constructor
    public Book(String bookId, String title, String author, String genre) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.availability = true;
    }

    // Getters and Setters
    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public boolean isAvailable() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    // toString method for easy printing
    @Override
    public String toString() {
        return "Book ID: " + bookId + 
               "\nTitle: " + title + 
               "\nAuthor: " + author + 
               "\nGenre: " + genre + 
               "\nAvailability: " + (availability ? "Available" : "Not Available");
    }
}

// Library Management System class
class LibraryManagementSystem {
    private Map<String, Book> bookCollection;
    private Scanner scanner;

    // Constructor
    public LibraryManagementSystem() {
        bookCollection = new HashMap<>();
        scanner = new Scanner(System.in);
    }

    // Method to add a new book
    public void addBook() {
        System.out.println("\n--- Add New Book ---");
        
        // Get book details from user
        System.out.print("Enter Book ID: ");
        String bookId = scanner.nextLine();

        // Check if book ID already exists
        if (bookCollection.containsKey(bookId)) {
            System.out.println("Book with this ID already exists!");
            return;
        }

        System.out.print("Enter Title: ");
        String title = scanner.nextLine();

        System.out.print("Enter Author: ");
        String author = scanner.nextLine();
        
        System.out.print("Enter Genre: ");
        String genre = scanner.nextLine();

        // Create and add new book
        Book newBook = new Book(bookId, title, author, genre);
        bookCollection.put(bookId, newBook);
        System.out.println("Book added successfully!");
    }

    // Method to view all books
    public void viewAllBooks() {
        System.out.println("\n--- Library Book Catalog ---");
        
        if (bookCollection.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }

        for (Book book : bookCollection.values()) {
            System.out.println(book);
            System.out.println("--------------------");
        }
    }

    // Method to search book by ID or Title
    public void searchBook() {
        System.out.println("\n--- Search Book ---");
        System.out.println("1. Search by Book ID");
        System.out.println("2. Search by Title");
        System.out.print("Choose search option: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                searchBookById();
                break;
            case 2:
                searchBookByTitle();
                break;
            default:
                System.out.println("Invalid option!");
        }
    }

    // Search book by ID
    private void searchBookById() {
        System.out.print("Enter Book ID: ");
        String bookId = scanner.nextLine();

        Book book = bookCollection.get(bookId);
        if (book != null) {
            System.out.println("\nBook Found:");
            System.out.println(book);
        } else {
            System.out.println("Book not found!");
        }
    }

    // Search book by Title
    private void searchBookByTitle() {
        System.out.print("Enter Book Title: ");
        String searchTitle = scanner.nextLine().toLowerCase();

        boolean found = false;
        for (Book book : bookCollection.values()) {
            if (book.getTitle().toLowerCase().contains(searchTitle)) {
                System.out.println("\nBook Found:");
                System.out.println(book);
                System.out.println("--------------------");
                found = true;
            }
        }

        if (!found) {
            System.out.println("No books found matching the title.");
        }
    }

    // Method to update book details
    public void updateBook() {
        System.out.println("\n--- Update Book Details ---");
        System.out.print("Enter Book ID to update: ");
        String bookId = scanner.nextLine();

        Book book = bookCollection.get(bookId);
        if (book == null) {
            System.out.println("Book not found!");
            return;
        }

        System.out.println("Current Book Details:");
        System.out.println(book);

        System.out.println("\nSelect what to update:");
        System.out.println("1. Title");
        System.out.println("2. Author");
        System.out.println("3. Genre");
        System.out.println("4. Availability Status");
        System.out.print("Enter your choice: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                System.out.print("Enter new Title: ");
                book.setTitle(scanner.nextLine());
                break;
            case 2:
                System.out.print("Enter new Author: ");
                book.setAuthor(scanner.nextLine());
                break;
            case 3:
                System.out.print("Enter new Genre: ");
                book.setGenre(scanner.nextLine());
                break;
            case 4:
                book.setAvailability(!book.isAvailable());
                System.out.println("Availability updated to: " + 
                    (book.isAvailable() ? "Available" : "Not Available"));
                break;
            default:
                System.out.println("Invalid option!");
                return;
        }

        System.out.println("Book details updated successfully!");
    }

    // Method to delete a book
    public void deleteBook() {
        System.out.println("\n--- Delete Book ---");
        System.out.print("Enter Book ID to delete: ");
        String bookId = scanner.nextLine();

        Book removedBook = bookCollection.remove(bookId);
        if (removedBook != null) {
            System.out.println("Book deleted successfully:");
            System.out.println(removedBook);
        } else {
            System.out.println("Book not found!");
        }
    }

    // Main menu method
    public void displayMenu() {
        while (true) {
            System.out.println("\n--- Library Management System ---");
            System.out.println("1. Add a Book");
            System.out.println("2. View All Books");
            System.out.println("3. Search Book");
            System.out.println("4. Update Book Details");
            System.out.println("5. Delete Book");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    addBook();
                    break;
                case 2:
                    viewAllBooks();
                    break;
                case 3:
                    searchBook();
                    break;
                case 4:
                    updateBook();
                    break;
                case 5:
                    deleteBook();
                    break;
                case 6:
                    System.out.println("Exiting Library Management System. Goodbye!");
                    return;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }

    // Main method to run the application  
    public static void main(String[] args) {
        LibraryManagementSystem librarySystem = new LibraryManagementSystem();
        librarySystem.displayMenu();
    }
}