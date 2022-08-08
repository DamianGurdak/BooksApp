/* eslint-disable */ /* global Handlebars, utils */

const select = {
  tamplateOf: {
    menuProduct: '#template-book',
  },
  containerOf: {
    menu: '.books-list',
  },
  book: {
    image: '.book__image',
  },
  menuProduct: {
    form: '.filters',
  },
};

//referencje
const templates = {
  menuProduct: Handlebars.compile(
    //referrencja do szablonu
    document.querySelector(select.tamplateOf.menuProduct).innerHTML
  ),
  // robić referencje do listy .books-list.?
};

const favouriteBooks = [];
const filters = [];

class Book {
  constructor(id, data) {
    // skąd te argumnty
    const thisBook = this;
    console.log('thisBook:', thisBook);

    thisBook.id = id; // ?
    thisBook.data = data; // ?
    thisBook.renderInMenu();
    thisBook.getElements(); // getElement moze być pierwsze wywołane? nie bo bierze elementy z render menu
    thisBook.initActions(); // ma być uruchamiana po funkcji render
  }

  getElements() {
    const thisBook = this;

    thisBook.dom = {};
    thisBook.dom.image = thisBook.element.querySelector(select.book.image);
    thisBook.dom.form = thisBook.element.querySelector(select.menuProduct.form);
  }

  renderInMenu() {
    const thisBook = this;
    console.log('newBook:', thisBook);

    //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce. // data to konkretna ksiązka?
    const generatedHtml = templates.menuProduct(thisBook.data);
    // console.log(generatedHtml);

    //Na postawie tego kodu HTML wygeneruj element DOM
    thisBook.element = utils.createDOMFromHTML(generatedHtml);
    console.log(thisBook.element);

    //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    const menuContainer = document.querySelector(select.containerOf.menu);
    console.log(menuContainer);
    menuContainer.appendChild(thisBook.element);
  }

  initActions() {
    const thisBook = this;

    thisBook.dom.image.addEventListener('dblclick', function (event) {
      event.preventDefault();
      thisBook.initFavoriteBooks(thisBook);
    });

    // thisBook.dom.form.addEventListener('event', function (event) {
    //   event.preventDefault();
    // });

    // for(let checkbox of everyCheckbox) {
    //   if(checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter') {
    //     checkbox.value.innerHTML
    //   };
    // };
  
  }

  initFavoriteBooks(book) {
    // kiedy dajemy a kiedy nie dajemy argumnet w funkcji/metodzie
    const thisBook = this;

    const index = favouriteBooks.indexOf(book); // argument book czym on jest skąd wiemy ze jest to pojeduncza ksiązak skoro nie ma tego zdefiniowanego
    //czy to book a app z funkcji init menu czy to tosamo?
    //w poradniku jesr argument w cudzysłwoie a tu nie ??

    if (!favouriteBooks.includes(book)) {
      favouriteBooks.push(book); //zapisać id książki w tablicy wiev book to nie book ale id to przeciez thisbook id // dlaczego book sie dodaje i usówa a book tylko dodaje?
      thisBook.dom.image.classList.add('favorite'); // dodać klasę favorite
    } else if (index > -1) {
      favouriteBooks.splice(index, 1);
      thisBook.dom.image.classList.remove('favorite');
    }
    console.log('Favorite books: ', favouriteBooks);
  }
}

const app = {
  initData: function () {
    const thisApp = this;

    thisApp.data = dataSource;
    console.log('data: ', thisApp.data);
  },

  initMenu: function () {
    const thisApp = this;
    console.log(thisApp);

    for (const book in thisApp.data.books) {
      new Book(thisApp.data.books[book].id, thisApp.data.books[book]);
    }
  },

  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initMenu();
  },
};

app.init();
