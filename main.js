//on declare le dom qu'on veut manipuler
var body = document.querySelector('body');

// on declare le lien http vers l'api
var requestTeddiesURL = 'http://localhost:3000/api/teddies';

// on crée un instance d'une requete AJAX vers l'api
var request = new XMLHttpRequest();
// on ouvre une requete get avec le lien http vers l'api
request.open('GET', requestTeddiesURL);
//on déclare le type de reponse attendu
request.responseType = 'json';
//on renvoi la reponse
request.send();

//au chargement de la page on envoi la requete vers l'api
request.onload = function() {
  //on met la reponse de la requete dans une variable
  let teddies = request.response;
  // on start la function showteddies et on lui passe la reponse de la requete en argument
  showTeddies(teddies);
}

function showTeddies(jsonObj) {
  let teddies = jsonObj;
  
  //on boucle sur l'objet json teddies
  for(let i = 0; i < teddies.length; i++) {
    //on crée tte les balises dont on a besoin pour créer une Card
    let myCard = document.createElement('div');
    let myCardRow = document.createElement('div');
    let myCardColImg = document.createElement('div');
    let myCardImg = document.createElement('img');
    let myCardColText = document.createElement('div');
    let myCardBody = document.createElement('div');
    let myH5 = document.createElement('h5');
    let myDescription = document.createElement('p');
    let myPrice = document.createElement('p');
    let myList = document.createElement('ul');

    myCard.className = "card mb-03";
    myCard.style = "max-width: 540px";
    myCardRow.className = "row g-0";
    myCardColImg.className = "col-md-4";
    myCardColText.className = "col-md-8";
    myCardBody.className = "card-body";
    myH5.className = "card-title";
    myDescription.className = "card-text";
    myPrice.className = "card-text";
    myCardImg.src = teddies[i].imageUrl;
    myH5.textContent = teddies[i].name;
    myDescription.textContent = 'description: ' + teddies[i].description;
    myPrice.textContent = 'Prix: ' + teddies[i].price;
    
    //on boucle dans l'objet colors qui se situe dans l'objet teddies
    let teddiesColor = teddies[i].colors;
    for(let j = 0; j < teddiesColor.length; j++) {
      let listColor = document.createElement('li');
      listColor.textContent = teddiesColor[j];
      myList.appendChild(listColor);
    }
    //la list des enfants qui vont être afficher dans mon body
    myCard.appendChild(myCardRow);
    myCardRow.appendChild(myCardColImg);
    myCardColImg.appendChild(myCardImg)
    myCardRow.appendChild(myCardColText);
    myCardColText.appendChild(myCardBody);
    myCardBody.appendChild(myH5);
    myCardBody.appendChild(myDescription);
    myCardBody.appendChild(myPrice);
    myCardBody.appendChild(myList);

    body.appendChild(myCard);
  }
}