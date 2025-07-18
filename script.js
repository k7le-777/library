const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title.trim();
    this.author = author.trim();
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// DOM references
const bookDialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");
const bookContainer = document.getElementById("bookContainer");

// Open dialog
newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// Close dialog
cancelBtn.addEventListener("click", () => {
  bookDialog.close();
  bookForm.reset();
});

// Handle form submission
bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page refresh

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  renderBooks();
  bookForm.reset();
  bookDialog.close();
});

// Render all books
function renderBooks() {
  // Clear without innerHTML
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement("p");
    read.textContent = `Read: ${book.read ? "Yes" : "No"}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeBook(book.id));

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      renderBooks();
    });

    card.append(title, author, pages, read, toggleBtn, removeBtn);
    bookContainer.appendChild(card);
  });
}

// Remove book by id
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderBooks();
  }
}
