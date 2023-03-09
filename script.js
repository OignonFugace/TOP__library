// BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// CARD & BOOKCARD CONSTRUCTOR
function BookCard(title, author, pages, read) {
    this.bookCardNode = document.createElement('div');
    this.bookCardBody = document.createElement('div');
    this.bookCardTitle = document.createElement('h5');
    this.bookCardText = document.createElement('p');
    this.bookCardPages = document.createElement('p');
    this.readButton = document.createElement('button');
    this.deleteButton = document.createElement('button');
    this.bookCardFooter = document.createElement('div');

    this.bookCardNode.classList.add('card');
    this.bookCardBody.classList.add('card-body');
    this.bookCardTitle.classList.add('card-title');
    this.bookCardText.classList.add('card-text');
    this.readButton.classList.add('btn', 'btn-sm', 'btn-success', 'me-2');
    this.deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'me-2');
    this.bookCardFooter.classList.add('card-footer');

    this.bookCardTitle.textContent = title;
    this.bookCardText.textContent = `by ${author}`
    this.readButton.textContent = "Read";
    this.deleteButton.textContent = "Delete";

    this.bookCardPages.innerHTML = `<small>${pages} Pages</small>`;
    this.bookCardFooter.innerHTML = `<span>${read}</span>`;

    this.bookCardBody.appendChild(this.bookCardTitle);
    this.bookCardBody.appendChild(this.bookCardText);
    this.bookCardBody.appendChild(this.bookCardPages);
    this.bookCardBody.appendChild(this.readButton);
    this.bookCardBody.appendChild(this.deleteButton);
    this.bookCardNode.appendChild(this.bookCardBody);
    this.bookCardNode.appendChild(this.bookCardFooter);
}


// MVC ARCHITECTURE
const View = {
    createCard: function(book) {
        return new BookCard(book.title, book.author, book.pages, book.read);
    },

    appendCard: function (bookCard, where) {
        if (!where) {
            where = document.getElementById('cardWrapper');
        }
        where.appendChild(bookCard.bookCardNode);
    },

    deleteCard: function(card) {

    },

    updateReadView: function(card) {

    },

    toggleForm: function() {

    }
}

const Model = {
    library: [],

    addBookToLibrary: function(bookElement) {
        this.library.push(bookElement);
    },

    deleteBookFromLibrary: function(bookElement) {

    },

    updateReadState: function(bookElement) {

    }
}

const Controller = {
    processFormSubmission: function() {

    },

    processBookCardAction: function() {

    }
}






const newBook = new Book("H2G2", "Douglas Adams", 244, "read");

const newCard = View.createCard(newBook);
View.appendCard(newCard);


