const myLibrary = [];
const booksContainer = document.querySelector(".books-container");
const newBookButton = document.querySelector(".new-book");
const newBookDialog = document.querySelector(".book-details-dialog");
const newBookForm = document.querySelector(".book-details-form");
const bookNameInput = document.querySelector("#name");
const bookAuthorInput = document.querySelector("#author");
const bookPagesInput = document.querySelector("#pages");
const closeDialogButton = document.querySelector(".close-dialog");
const addBookButton = document.querySelector(".add-book");

class Book {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
    }
}

function addBookToLibrary(name, author, pages) {
    book = new Book(name, author, pages);
    myLibrary.push(book);
    displayBook(book);
}

function removeBookById(id) {
    for (let book of myLibrary) {
        if (book.id == id) {
            idx = myLibrary.indexOf(book);
            myLibrary.splice(idx, 1);
        }
    }
}

function displayBook(book) {
    let bookCover = document.createElement("div");
    bookCover.classList.add('book-cover');
    let bookDetails = document.createElement("div");
    let removeBook = document.createElement("button");
    let name = document.createElement("p");
    let author = document.createElement("p");
    let pages = document.createElement("p");

    bookCover.id = book.id;

    name.textContent = book.name;
    author.textContent = (book.author) ? book.author: "";
    pages.textContent = (book.pages) ? `${book.pages} pages`: "";

    bookDetails.appendChild(name);
    bookDetails.appendChild(author);
    bookDetails.appendChild(pages);

    removeBook.textContent = "Remove";

    removeBook.addEventListener("click", (e)=>{
        e.preventDefault();
        removeBookById(e.target.parentElement.id)
        booksContainer.removeChild(e.target.parentElement);
    });

    bookCover.appendChild(bookDetails);
    bookCover.appendChild(removeBook);

    booksContainer.append(bookCover);
}

// function displayBooks() {
//     for (let book of myLibrary) {
//         displayBook(book);
//     }
// }

newBookButton.addEventListener("click", (e) =>{
    newBookDialog.showModal();
});

addBookButton.addEventListener("click", (e)=>{
    if (bookNameInput.value) {
        e.preventDefault();

        addBookToLibrary(
            bookNameInput.value,
            bookAuthorInput.value,
            bookPagesInput.value
        )
        
        newBookForm.reset();
        newBookDialog.close();
    }
})

closeDialogButton.addEventListener("click", (e) =>{
    e.preventDefault();
    newBookDialog.close();
});

addBookToLibrary("Wings of fire", "Dr. A.P.J. Abdul Kalam", 180);
addBookToLibrary("Tuesdays with Morrie", "Mitch Albom", 192);
addBookToLibrary("Ikigai", "Hector Garcia", 208);