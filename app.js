// Selectors
const numberFieldValue = document.querySelector('#number');
const getJokesButton = document.querySelector('.get-jokes');
const jokesListContainer = document.querySelector('.jokes');

// Event Listeres
getJokesButton.addEventListener('click', getJokes);


// Functionality
function getJokes(e) {
  e.preventDefault();
  const numberOfJokes = numberFieldValue.value;

  const xhr = new XMLHttpRequest();

  const address = `http://api.icndb.com/jokes/random/${numberOfJokes}`;

  xhr.open("GET", address, true);

  xhr.onload = function () {
    // console.log("READYSTATE", xhr.readyState);
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      const jokesArray = response.value;
      let output = '';

      if (response.type === 'success') {
        for (i in jokesArray) {
          let joke = jokesArray[i].joke;
          output += `
          <div>
            <h4>Joke ${Number(i) + 1}</h4>
            <p>${joke}</p>
          </div>
          `
        }
      } else {
        output += '<p>Something went wrong.</p>'
      }

      jokesListContainer.innerHTML = output;
    }
  }

  xhr.send();

}