function CreateBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read: read,


    getDescription() {
      console.log(`${this.title} was written by ${this.author}. I ${this.read ? 'have' : 'haven\'t'} read it.`);
    },

    readBook() {
      this.read = true;
    },
  }
}

let book = CreateBook('me talk pretty one day', 'David Sedaris');

book.getDescription();