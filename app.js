class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Store{
    static getBook(){
        let books;
        if(!localStorage.getItem('books')){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBook();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        let books = Store.getBook();
        books.forEach((e,i)=>{
            if(e.isbn === isbn){
                books.splice(i,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
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
        const books = Store.getBook();
        books.forEach(e=>{UI.addBook(e);});
    }

    static showAlert(message,className){
        let div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(()=>div.remove(),3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            UI.showAlert('Book deleted','info');
        }
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit',e=>{
    //prevents the default submit action for this project
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    let book = new Book(title,author,isbn);
    if(!title.trim() || !author.trim() || !isbn.trim()){
        UI.showAlert('Please fill in all fields','danger');
    }else{
        UI.showAlert('Book entered!','success');
        UI.addBook(book);
        Store.addBook(book);
        UI.clearFields();
    }
    
});

document.querySelector('#book-list').addEventListener('click',e=>{
    UI.deleteBook(e.target);
    let isbn = e.target.parentElement.previousElementSibling.innerText;
    //console.dir(isbn)
    Store.removeBook(isbn);
})