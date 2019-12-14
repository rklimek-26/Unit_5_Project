//MEETS EXPECTATIONS

const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
let card = document.getElementsByClassName('card');

let users = [];

function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
}
//Fetch API (12 random users)
fetchData('https://randomuser.me/api/?results=12&nat=ie')
  .then(data => generateUser(data))
  .then(data => randomCard(data))
  //include error catching code
  .catch(error => console.log('Error 404 ', error))

function generateUser(data) {
  users = data.results;
  const randomUsers = users;
  randomUsers.forEach(user => {
    const html = `
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
</div>
`
    gallery.innerHTML += html;
  });
}

//Create a modal window
const div = document.createElement('div');
div.className = "modal-container"
body.append(div);
const modalContainer = document.querySelector('.modal-container');
modalContainer.style.display = 'none';

function fetchModal(i) {
  //variables
  const myUser = users[i];

  //calculate birthday
  const birthMonth = `${myUser.dob.date.substring(5, 7)}`;
  const birthDate = `${myUser.dob.date.substring(8,10)}`;
  const birthYear = `${myUser.dob.date.substring(0, 4)}`;
  const birthday = `Birthday: ${birthMonth}/${birthDate}/${birthYear}`;

  //calculate phone number
  const first3 = `${myUser.phone.substring(0,3)}`;
  const second3 = `${myUser.phone.substring(4,7)}`
  const third3 = `${myUser.phone.substring(8,12)}`;
  const phone = `(${first3})-${second3}-${third3}`;

  //save street address in 'address' constant
  const street = `${myUser.location.street.number} ${myUser.location.street.name}`;
  const state = `${myUser.location.state}`;
  const zip =  `${myUser.location.postcode}`;
  const address = `${street}, ${state} ${zip}`


  //write for modal window HTML
  const modal = `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${myUser.picture.medium}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${myUser.name.first} ${myUser.name.last}</h3>
              <p class="modal-text">${myUser.email}</p>
              <p class="modal-text cap">${myUser.location.city}</p>
              <hr>
              <p class="modal-text">${phone}</p>
              <p class="modal-text">${address}</p>
              <p class="modal-text">${birthday}</p>
          </div>
      </div>
  `;
  modalContainer.innerHTML = modal;

//Add event listener to close button
  const close = document.querySelector('.modal-close-btn');
  close.addEventListener('click', function() {
    modalContainer.style.display = 'none';
  })
}

// Add Event Listener to each Card Element
function randomCard() {
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', function() {
      fetchModal(i);
      modalContainer.style.display = 'block';
    })

  }
}
