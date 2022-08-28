/* eslint-disable */ /* global Handlebars, utils */

const select = {
  templateOf: {
    book: '#template-book',
    coverImage: '.book__image', //cover --> okładka
  },
  containerOf: {
    booksPanel: '.books-list',
  },
  // book: {
  //   image: '.book__image',
  // },
  menuProduct: {
    filters: '.filters',
  },
};

const backgroundColor = {
  colors: {
    colorOne:
      'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);', // Rating < 6
    colorTwo:
      'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);', // Rating > 6 && <= 8
    colorThree:
      'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);', // Rating > 8 && <= 9
    colorFour:
      'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);', // Rating > 9
  },
};

// const favoriteBooks = []; //tablica z identyfikatorami książek, które dodano do ulubionych
// const filters = [];

class BookList {
  constructor() {
    const thisBookList = this;
    // console.log('thisBookListList:', thisBookList);

    thisBookList.data = dataSource; // jak to działa
    thisBookList.renderBooks();
    thisBookList.getElements();
    thisBookList.initActions();

    thisBookList.favoriteBooks = [];
  }

  initData() {
    /*
    // dlaczego tutaj tak nie mozebyć

    const thisData = this
    thisData.data = dataSource.books;
    */

    this.data = dataSource.books;
  }

  getElements() {
    const thisBookList = this;

    thisBookList.dom = {};

    thisBookList.element = document.querySelector(
      select.containerOf.booksPanel
    );

    // referencję do listy wszystkich elementów .book__image w liście .booksList
    thisBookList.dom.coverImage = thisBookList.element.querySelector(
      select.templateOf.coverImage
    );

    // thisBookList.dom.image = thisBookList.element.querySelector(
    //   select.book.image
    // );

    // thisApp.filters = document.querySelector(select.menuProduct.filters); // z app
    // // lista ksiazek
  }

  renderBooks() {
    const thisBookList = this;
    // console.log('newBook:', thisBookList);

    //referencja do listy .book-list a raczej do pojedynczego ul
    // const BookList = document.querySelector(select.containerOf.booksPanel);
    // console.log(BookList);

    //referrencja do szablonu
    const templates = {
      menuProduct: Handlebars.compile(
        document.querySelector(select.templateOf.book).innerHTML
      ),
    };

    for (const book of thisBookList.data.books) {
      /* this.data z initData nie działa jak sie do tego odnosze */

      //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
      const generatedHtml = templates.menuProduct(book);
      // console.log(generatedHtml); //li pojednynczych ksiązek ale  w html

      //Na postawie tego kodu HTML wygeneruj element DOM
      const element = utils.createDOMFromHTML(generatedHtml);
      // console.log(element); //li pojednynczych ksiązek ale aktywne linki

      const booksContainter = document.querySelector(
        select.containerOf.booksPanel
      );

      //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
      booksContainter.appendChild(element);
      // console.log(book);
    }

    /* co pokazuje console.log, to jest chyba z constructora a wskazujena initData */
    // console.log(thisBookList.data);
  }

  initActions() {
    const thisBookList = this;

    thisBookList.element.addEventListener('dblclick', function (event) {
      event.preventDefault(); //zatrzyma domyślne zachowanie przeglądarki
      const eventParent = event.target.offsetParent;

      console.log(eventParent);

      if (eventParent.classList.contains('book__image')) {
        eventParent.classList.toggle('favorite');
        const bookId = eventParent.getAttribute('data-id');
        // console.log('bookId: ', bookId);

        if (thisBookList.favoriteBooks.constains(bookId)) {
          thisBookList.favoriteBooks.remove(bookId); //zapisuje  id książki w tablicy
          console.log(
            'tablica polubionych książek',
            thisBookList.favoriteBooks
          );
        } else {
          thisBookList.favoriteBooks.push(bookId);
        }
      }
    });
  }

  // filerBooks() {}

  // determineRatingBgc(rating) {
  //   if (rating < 6) {
  //   }
  // }
}

const app = new BookList(); // instncja klasy
