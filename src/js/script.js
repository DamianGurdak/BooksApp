/* eslint-disable */ /* global Handlebars, utils */

const select = {
  templateOf: {
    book: '#template-book',
    coverImage: '.book__image', //cover --> okładka
  },
  containerOf: {
    booksPanel: '.books-list',
  },
  book: {
    image: '.book__image',
  },
  filters: {
    form: '.filters',
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

class BookList {
  constructor() {
    const thisBookList = this;
    // console.log('thisBookListList:', thisBookList);

    thisBookList.initData();
    thisBookList.renderBooks();
    thisBookList.getElements();
    thisBookList.initActions();

    thisBookList.favoriteBooks = []; //tablica z identyfikatorami książek, które dodano do ulubionych
    thisBookList.filteres = []; //będziemy przechowywać informacje, jakie aktualnie filtry są wybrane w aplikacji
  }

  initData() {
    this.data = dataSource;
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

    thisBookList.dom.form = document.querySelector(select.filters.form);
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

      // const ratingBgc = determineRatingBgc(data.rating);

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
        console.log('bookId: ', bookId);

        if (thisBookList.favoriteBooks.includes(bookId)) {
          const indexOfDeletedBook = thisBookList.favoriteBooks.indexOf(bookId);
          thisBookList.favoriteBooks.splice(indexOfDeletedBook, 1); //zapisuje  id książki w tablicy
        } else {
          thisBookList.favoriteBooks.push(bookId);
        }

        console.log('tablica polubionych książek', thisBookList.favoriteBooks);
      }
    });

    thisBookList.dom.form.addEventListener('click', function (event) {
      // event.preventDefault();

      const checkbox = event.target;
      // console.log(event.target);
      // const checkboxes = thisBookList.dom.form.querySelectorAll('input');
      // for (const checkbox of checkboxes) {
      if (
        checkbox.tagName === 'INPUT' &&
        checkbox.type === 'checkbox' &&
        checkbox.name === 'filter'
      ) {
        console.log('formCheckbox.value:', checkbox.value);
      }
      console.log(checkbox.value);
      if (checkbox.checked) {
        thisBookList.filteres.push(checkbox.value);
        console.log('thisBookList.filteres:', thisBookList.filteres);
        thisBookList.filerBooks(); //wywoływana każdorazowo przy zmianie checkboxa w formularzu.
      } else {
        const indexOfDeleted = thisBookList.filteres.indexOf(checkbox.value);
        thisBookList.filteres.splice(indexOfDeleted, 1);
        console.log('thisBookList.filteres:', thisBookList.filteres);
        thisBookList.filerBooks(); //wywoływana każdorazowo przy zmianie checkboxa w formularzu.
      }

      // }
    });
  }

  filerBooks() {
    const thisBookList = this;

    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of thisBookList.filteres) {
        // console.log('filter: ', filter);
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = thisBookList.element.querySelector(
        '[data-id="' + book.id + '"]'
      );
      console.log(book.name, thisBookList.dom.image);

      if (shouldBeHidden === true) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      backgroundColor.colors.colorOne;
    } else if (rating > 6 && rating <= 8) {
      backgroundColor.colors.colorTwo;
    } else if (rating > 8 && rating <= 9) {
      backgroundColor.colors.colorThree;
    } else if (rating > 9) {
      backgroundColor.colors.colorFour;
    }

    return ratingBgc;
  }
}

const app = new BookList(); // instncja klasy
