class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static addBook(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '124149'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '9190249'
            }
        ];
        const books = StoredBooks;
        books.forEach(e=>{UI.addBook(e);});
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBooks)

document.querySelector('#book-form').addEventListener('submit',e=>{
    //prevents the default submit action for this project
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    let book = new Book(title,author,isbn);
    UI.addBook(book);
})