// BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.readBook = function() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}


// CARD & BOOKCARD CONSTRUCTOR
function BookCard(book) {
    this.title = book.title;
    this.author = book.author;
    this.pages = book.pages;
    this.read = book.read;

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

    bookCardTitle.textContent = this.title;
    bookCardText.textContent = `by ${this.author}`
    readButton.textContent = "Read";
    deleteButton.textContent = "Delete";

    bookCardPages.innerHTML = `<small>${this.pages} Pages</small>`;
    bookCardFooter.innerHTML = `<span>${this.read ? 'Read' : 'Not Read'}</span>`;

    bookCardBody.appendChild(bookCardTitle);
    bookCardBody.appendChild(bookCardText);
    bookCardBody.appendChild(bookCardPages);
    bookCardBody.appendChild(readButton);
    bookCardBody.appendChild(deleteButton);
    bookCardNode.appendChild(bookCardBody);
    bookCardNode.appendChild(bookCardFooter);

    bookCardNode.updateReadView = function(book) {
        this.lastElementChild.innerText = `${book.read ? 'Read' : 'Not Read'}`
    };

    return bookCardNode;
}


// MVC ARCHITECTURE
const View = {
    createCard: function(book) {
        return new BookCard(book);
    },

    appendCard: function (bookCard, where) {
        if (!where) {
            where = document.getElementById('cardWrapper');
        }
        where.appendChild(bookCard);
    },

    deleteCard: function(card) {
        card.remove();
    },

    // updateReadView: function(card, readState) {
    //     // console.dir(card);
    //     // console.log(readState);
    //     card.lastElementChild.innerText = readState ? 'Read' : 'Not Read';
    // },

    toggleForm: function() {

    }
}

const Model = {
    library: [],

    addBookToLibrary: function(book) {
        book.id = this.library.length;
        this.library.push(book);
    },

    deleteBookFromLibrary: function(id) {
        delete this.library[id];
    },

    updateReadState: function(book) {
        book.readBook();
    }
}

const Controller = {
    processFormSubmission: function(e) {
        e.preventDefault();
        const title = e.target.title.value; 
        const author = e.target.author.value; 
        const pages = e.target.pages.value; 
        const read = e.target.read.checked;
        
        const book = new Book(title, author, pages, read);
        Model.addBookToLibrary(book);
        const bookCard = View.createCard(book);
        View.appendCard(bookCard);
    },

    processBookCardAction: function(e) {
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
