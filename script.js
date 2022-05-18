const parentUl = document.getElementById("movie-list"); // universal variable

// function to create child elements to DOM
addMoviesToDom = (movieTitlesArray, moviePosterArray, movieImdbId) => {
  // -----> create li to ul
  movieTitlesArray.forEach((title) => {
    title = document.createElement("li");
    parentUl.appendChild(title);
  });

  // -----> create a to li including attribute hreft with Url
  const lis = Array.from(document.getElementsByTagName("li"));
  for (liCounter = 0; liCounter < lis.length; liCounter++) {
    const parentLi = document.getElementsByTagName("li")[liCounter];
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
  const adultA = Array.from(document.getElementsByTagName("a"));
  const childImg = Array.from(document.querySelectorAll("main img"));
  const adultLi = Array.from(document.getElementsByTagName("li"));

  for (let i = 0; i < adultA.length; i++) {
    adultA[i].removeChild(childImg[i]);
    adultLi[i].removeChild(adultA[i]);
    parentUl.removeChild(adultLi[i]);
  }
};

// function to read input text
const textInput = document.getElementById("search");
textInput.addEventListener("click", (e) => {
  const input = document.getElementById("search-input").value;
  if (
    input === "Latest" ||
    input === "Batman" ||
    input === "Avengers" ||
    input === "X-Men" ||
    input === "Princess"
  ) {
    filterMovies(input);
  } else {
    const message = document.getElementById("search-input");
    message.value = "";
  }
  //--- turn all radiobuttons off
  const radioBtns = document.querySelectorAll("input.filterbtn");
  Array.from(radioBtns).forEach((radioBtn) => {
    radioBtn.checked = false;
  });
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

// Eventlisteners for menu
const menu = Array.from(document.querySelectorAll("div.nav-buttons div"));
const start = document.querySelector(".hamburger");
const buttons = Array.from(document.querySelectorAll("nav input.filterbtn"));
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    menu.forEach((item) => {
      item.classList.toggle("show");
      console.log(item);
    });
  });
});

start.addEventListener("mouseenter", () => {
  menu.forEach((item) => {
    item.classList.toggle("show");
    console.log(item);
  });
});
