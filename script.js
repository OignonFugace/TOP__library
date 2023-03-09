
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const newBook = new Book("H2G2", "Douglas Adams", 244, "read");

function addBookToLibrary(book) {
    myLibrary.push(book);
}
addBookToLibrary(newBook);

function addBookToDisplay(book) {
    const cardWrapper = document.getElementById('cardWrapper');
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    const bookCardBody = document.createElement('div');
    bookCardBody.classList.add('card-body');
    const bookCardTitle = document.createElement('h5');
    bookCardTitle.classList.add('card-title');
    bookCardTitle.textContent = book.title;
    const bookCardText = document.createElement('p');
    bookCardText.classList.add('card-text');
    bookCardText.textContent = `by ${book.author}`
    const bookCardPages = document.createElement('p');
    bookCardPages.innerHTML = `<span>${book.pages} Pages</span>`
    const readButton = document.createElement('button');
    readButton.classList.add('btn', 'btn-sm', 'btn-success', 'me-2');
    readButton.textContent = "Read";
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'me-2');
    deleteButton.textContent = "Delete";
    const bookCardFooter = document.createElement('div');
    bookCardFooter.classList.add('card-footer');
    bookCardFooter.innerHTML = `<span>${book.read}</span>`

    bookCardBody.appendChild(bookCardTitle);
    bookCardBody.appendChild(bookCardText);
    bookCardBody.appendChild(bookCardPages);
    bookCardBody.appendChild(readButton);
    bookCardBody.appendChild(deleteButton);
    bookCard.appendChild(bookCardBody);
    bookCard.appendChild(bookCardFooter)
    cardWrapper.appendChild(bookCard);
}

addBookToDisplay(newBook);
