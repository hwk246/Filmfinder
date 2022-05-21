const parentUl = document.getElementById("movie-list"); // universal variable

// function to create child elements to DOM
addMoviesToDom = (movieTitlesArray, moviePosterArray, movieImdbId) => {
  // -----> create li to ul
  movieTitlesArray.forEach((title) => {
    title = document.createElement("li");
    parentUl.appendChild(title);
  });

  // -----> create an 'a' to 'li' including attribute href with Url
  const lis = Array.from(document.querySelectorAll(".movie-container li"));

  for (liCounter = 0; liCounter < lis.length; liCounter++) {
    const parentLi = document.querySelectorAll(".movie-container li")[
      liCounter
    ];
    const newA = document.createElement("a");
    newA.setAttribute(
      "href",
      "https://www.imdb.com/title/" + movieImdbId[liCounter]
    );
    newA.setAttribute("target", "blank");
    parentLi.appendChild(newA);
  }
  // -----> create img to a including attribute src with Url
  const as = Array.from(document.getElementsByTagName("a"));
  for (aCounter = 0; aCounter < as.length; aCounter++) {
    const parentA = document.getElementsByTagName("a")[aCounter];
    const newImg = document.createElement("img");
    newImg.setAttribute("src", moviePosterArray[aCounter]);
    parentA.appendChild(newImg);
  }
};

/* ad eventlistener to filterbuttons and use switch cases to initiate next action */
const filterbtns = document.querySelectorAll("input.filterbtn");
Array.from(filterbtns).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.value) {
      case (e.target.value = "Latest"):
        filterMovies("Latest");
        break;
      case (e.target.value = "Avengers"):
        filterMovies("Avengers");
        break;
      case (e.target.value = "X-Men"):
        filterMovies("X-Men");
        break;
      case (e.target.value = "Princess"):
        filterMovies("Princess");
        break;
      case (e.target.value = "Batman"):
        filterMovies("Batman");
        break;
      default:
        console.log("Action does not work properly");
    }
  });
});

/*Funtion to remove all img/ a/ li elements from DOM*/
const removeChildren = () => {
  parentUl.innerHTML = "";
};

// function to read input text
const textInput = document.getElementById("search-input");
textInput.addEventListener("keyup", (e) => {
  // push possible choices in new list (newSearchItems)
  const input = document.getElementById("search-input").value.toLowerCase();
  let newSearchItems = [];
  const searchItems = ["Batman", "Avengers", "Princess", "Latest", "X-Men"];
  // empty unordered list
  Array.from(document.querySelectorAll(".search-list ul")).forEach((ul) => {
    ul.innerHTML = "";
  });
  // go through list and find a match. insert it in a new list
  searchItems.forEach((name) => {
    if (name.toLowerCase().match(input) && input != "") {
      newSearchItems.push(name);
    }
  });
  // if no match is found message wil be no-items found
  if (newSearchItems.length === 0 && input != "") {
    newSearchItems.push("no-items found");
  }
  // append the list li items to the parent ul in DOM
  newSearchItems.forEach((choice) => {
    const searchListUl = document.querySelector(".search-list ul");
    const searchListLi = document.createElement("li");
    searchListUl.appendChild(searchListLi).innerHTML = choice;
  });

  // add eventlistener to menu list items so they can be selected
  const chosenLi = document.querySelectorAll(".search-list li");

  Array.from(chosenLi).forEach((chosen) => {
    chosen.addEventListener("click", (e) => {
      const selectedMovie = chosen.textContent;
      document.querySelector(".search-list").classList.add("hidden");
      document.querySelector(".search-movie input").value = "";
      //--- turn all radiobuttons off
      const radioBtns = document.querySelectorAll("input.filterbtn");
      Array.from(radioBtns).forEach((radioBtn) => {
        radioBtn.checked = false;
      });

      filterMovies(selectedMovie);
    });
  });
});

const textInputField = document.querySelector(".search-movie input");
textInputField.addEventListener("click", () => {
  Array.from(document.querySelectorAll(".search-list ul")).forEach((ul) => {
    ul.innerHTML = "";
  });
  document.querySelector(".search-list").classList.remove("hidden");
});

/* function to find al the movies (title poster and filmcode) based on target-value from filter buttons en text input*/
const filterMovies = (wordInMovie) => {
  const movieTitlesArray = [];
  const moviePostersArray = [];
  const movieImdbId = [];

  if (wordInMovie === "Latest") {
    movies.forEach((movie) => {
      if (movie.year >= "2014") {
        movieTitlesArray.push(movie.title);
        moviePostersArray.push(movie.poster);
        movieImdbId.push(movie.imdbID);
      }
    });
  } else {
    movies.forEach((movie) => {
      if (movie.title.match(wordInMovie)) {
        movieTitlesArray.push(movie.title);
        moviePostersArray.push(movie.poster);
        movieImdbId.push(movie.imdbID);
      }
    });
  }

  removeChildren();
  addMoviesToDom(movieTitlesArray, moviePostersArray, movieImdbId);
};

// Eventlisteners for main-menu
const menu = Array.from(document.querySelectorAll("div.nav-buttons div"));
const start = document.querySelector(".hamburger");
const buttons = Array.from(document.querySelectorAll("nav input.filterbtn"));

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    menu.forEach((item) => {
      item.classList.toggle("show");
    });
  });
});

start.addEventListener("mouseenter", () => {
  menu.forEach((item) => {
    item.classList.toggle("show");
  });
});
