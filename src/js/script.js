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
    filters: '.filters',
  },
};

const templates = {
  menuProduct: Handlebars.compile(
    //referrencja do szablonu
    document.querySelector(select.tamplateOf.menuProduct).innerHTML
  ),
  // robić referencje do listy .books-list.?
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

const favouriteBooks = [];
const filters = [];

class Book {
  constructor() {
    const thisBook = this;
    console.log('thisBook:', thisBook);

    thisBook.data = dataSource;
    thisBook.renderInMenu();
    thisBook.getElements();
    thisBook.initActions(); 
  }

  getElements() {
    const thisBook = this;

    thisBook.dom = {};
    thisBook.dom.image = thisBook.element.querySelector(select.book.image);
    thisApp.filters = document.querySelector(select.menuProduct.filters); // z app
    //lista ksiazek
    thisBook.dom.bookList = thisBook.element.querySelector(select.containerOf.menu);
  }

  renderInMenu() {
    const thisBook = this;
    console.log('newBook:', thisBook);

    const menuContainer = document.querySelector(select.containerOf.menu);
    console.log(menuContainer);

    for (const book of thisBook.data.books) {
      //wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce. // data to konkretna ksiązka?
      const generatedHtml = templates.menuProduct(book);
      // console.log(generatedHtml);
      console.log(thisBook.data);

      //Na postawie tego kodu HTML wygeneruj element DOM
      const element = utils.createDOMFromHTML(generatedHtml);
      // console.log(element);

      //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
      menuContainer.appendChild(element);
      console.log(book);
    }
  }

  initActions() {
    const thisBook = this;

    thisBook.dom.image.addEventListener('dblclick', function (event) {
      event.preventDefault();
      thisBook.initFavoriteBooks(thisBook.id);
    });
    //petla po obrazkah w wraperze
    // for() {};
  }

  initFavoriteBooks(bookId) {
    // kiedy dajemy a kiedy nie dajemy argumnet w funkcji/metodzie
    const thisBook = this;

    const index = favouriteBooks.indexOf(bookId); // argument book czym on jest skąd wiemy ze jest to pojeduncza ksiązak skoro nie ma tego zdefiniowanego
    //czy to book a app z funkcji init menu czy to tosamo?
    // console.log('index:', index);

    if (!favouriteBooks.includes(bookId)) {
      favouriteBooks.push(bookId); //zapisać id książki w tablicy
      thisBook.dom.image.classList.add('favorite'); // dodać klasę favorite
    } else if (index > -1) {
      favouriteBooks.splice(index, 1); //usuwaa id takiej książki z tablicy favoriteBooks
      thisBook.dom.image.classList.remove('favorite');
    }
    console.log('Favorite books: ', favouriteBooks);
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
    }
  }
}

const app = new Book();
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// const app = {
 

// initActions: function () {

//     const thisApp = this;

//     thisApp.filters.addEventListener('click', function (event) {
//       event.preventDefault();
//       // thisBook.toggleFavorite();
//       const checkbox = event.target;
//       if (
//         checkbox.tagName === 'INPUT' &&
//         checkbox.type === 'checkbox' &&
//         checkbox.name === 'filter'
//       ) {
//         console.log(checkbox.value);
//       }

//       const indexOf = thisApp.filters.indexOf(checkbox.value);

//       if (checkbox === -1) {
//         thisApp.filters.push(checkbox.value);
//         thisApp.filterBooks();
//         console.log(thisApp.filters);
//       } else {
//         thisApp.filters.splice(indexOf, 1);
//         thisApp.filterBooks();
//         console.log(thisApp.filters);
//       }
//     });
//   },

//   // filterBooks: function () {
//   //   const thisApp = this;

//   //   for (let book of dataSource.books) {

//   //     let shouldBeHidden = false;

//   //     for(const filter of filters) {
//   //       if(!book.details[filter]) {
//   //         shouldBeHidden = true;
//   //         break;
//   //       };

//   //         if(shouldBeHidden === true) {

//   //         };

//   //     };
//   //   }
//   // },

//   init: function () {
//     const thisApp = this;

//     thisApp.initData();
//     thisApp.initMenu();
//     thisApp.getElements();
//     thisApp.initActions();
//   },
// };

// app.init();
