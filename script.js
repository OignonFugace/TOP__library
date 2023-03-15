// BOOK CONSTRUCTOR
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    readBook() {
        this.read = !this.read;
    }
}


// CARD & BOOKCARD CONSTRUCTOR
class BookCard {
    constructor(book) {
        this.title = book.title;
        this.author = book.author;
        this.pages = book.pages;
        this.read = book.read;

        return BookCard.createBookCard(book);
    }

    static createBookCard(book) {
        const bookCardNode = document.createElement('div');
        const bookCardBody = document.createElement('div');
        const bookCardTitle = document.createElement('h5');
        const bookCardText = document.createElement('p');
        const bookCardPages = document.createElement('p');
        const readButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        const bookCardFooter = document.createElement('div');

        bookCardNode.setAttribute('data-id', book.id);

        bookCardNode.classList.add('card');
        bookCardBody.classList.add('card-body');
        bookCardTitle.classList.add('card-title');
        bookCardText.classList.add('card-text');
        readButton.classList.add('btn', 'btn-sm', 'btn-success', 'me-2');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'me-2');
        bookCardFooter.classList.add('card-footer');

        readButton.setAttribute('data-type', 'read');
        readButton.onclick = Controller.processBookCardAction;

        deleteButton.setAttribute('data-type', 'delete');
        deleteButton.onclick = Controller.processBookCardAction;

        bookCardTitle.textContent = book.title;
        bookCardText.textContent = `by ${book.author}`
        readButton.textContent = "Read";
        deleteButton.textContent = "Delete";

        bookCardPages.innerHTML = `<small>${book.pages} Pages</small>`;
        bookCardFooter.innerHTML = `<span>${book.read ? 'Read' : 'Not Read'}</span>`;

        bookCardBody.appendChild(bookCardTitle);
        bookCardBody.appendChild(bookCardText);
        bookCardBody.appendChild(bookCardPages);
        bookCardBody.appendChild(readButton);
        bookCardBody.appendChild(deleteButton);
        bookCardNode.appendChild(bookCardBody);
        bookCardNode.appendChild(bookCardFooter);

        bookCardNode.updateReadView = function(book) {
            console.dir(this);
            this.lastElementChild.innerText = `${book.read ? 'Read' : 'Not Read'}`
        };

        return bookCardNode;
    }
}



// MVC ARCHITECTURE
class View {
    static createCard(book) {
        return new BookCard(book);
    }

    static appendCard(bookCard, where) {
        if (!where) {
            where = document.getElementById('cardWrapper');
        }
        where.appendChild(bookCard);
    }

    static deleteCard(card) {
        card.remove();
    }

    // static updateReadView(card, readState) {
    //     // console.dir(card);
    //     // console.log(readState);
    //     card.lastElementChild.innerText = readState ? 'Read' : 'Not Read';
    // }

    static toggleForm() {

    }
}

class Model {
    static library = [];

    static addBookToLibrary(book) {
        book.id = this.library.length;
        this.library.push(book);
    }

    static deleteBookFromLibrary(id) {
        delete this.library[id];
    }

    static updateReadState(book) {
        book.readBook();
    }
}

class Controller {
    static processFormSubmission(e) {
        e.preventDefault();
        const title = e.target.title.value; 
        const author = e.target.author.value; 
        const pages = e.target.pages.value; 
        const read = e.target.read.checked;
        
        const book = new Book(title, author, pages, read);
        Model.addBookToLibrary(book);
        const bookCard = View.createCard(book);
        View.appendCard(bookCard);
    }

    static processBookCardAction(e) {
        const card = e.target.parentElement.parentElement;
        const cardId = card.dataset.id;
        switch (e.target.dataset.type) {
            case 'delete':
                Model.deleteBookFromLibrary(cardId);
                card.remove();
                break;

            case 'read':
                Model.updateReadState(Model.library[cardId]);
                card.updateReadView(Model.library[cardId]);
                
            default:
                break;
        }
    }
}


// APP
const form = document.getElementById('mainForm');
form.addEventListener('submit', Controller.processFormSubmission);
