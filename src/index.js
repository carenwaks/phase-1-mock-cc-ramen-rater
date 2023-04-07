// write your code here

const ramenMenu = document.getElementById('ramen-menu');
const ramenDetails = document.getElementById('ramen-detail');
const detailImage = document.querySelector('img.detail-image');
const detailName = document.querySelector('h2.name');
const detailRestaurant = document.querySelector('h3.restaurant');
const ratingDisplays = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');
const form = document.querySelector('form');

document.addEventListener("DOMContentLoaded",function (event) {
    event.preventDefault();
    fetchAllRamen('http://localhost:3000/ramens');
}) 

// Function to get data from server
function fetchAllRamen (url) {
    return fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(ramen => ramenCard(ramen)))
    .catch(error => console.log("error",error))
}

// Function to display all ramen in ramen menu
function ramenCard(ramen) {
    let card = document.createElement('div')
    card.className = "card"
    let image = document.createElement('img')
    image.src = ramen.image
    card.append(image)

    ramenMenu.appendChild(card)

    // Adding event listener to the menu
    card.addEventListener('click', function (event) {
        event.preventDefault()       
        fetchRamen(`http://localhost:3000/ramens/${ramen.id}`)              
    })
}

function fetchRamen (url) {
            return fetch(url)
            .then(res => res.json())
            .then(ramen =>  detailsRamen(ramen))
            .catch(error => console.log("error",error))
}

// Function to display ramen details
function detailsRamen(ramen) {
  detailImage.src = ramen.image;
  detailName.innerHTML = ramen.name;
  detailRestaurant.innerHTML = ramen.restaurant;
  ratingDisplays.innerHTML = ramen.rating;
  commentDisplay.innerHTML = ramen.comment;
}

// Adding a new ramen
form.addEventListener('submit',function (event) {
    event.preventDefault();

    // Getting data from form
    let dataForm = {
        name:event.target.name.value,
        restaurant:event.target.restaurant.value,
        image:event.target.image.value,
        rating:event.target.rating.value,
        comment:event.target.comment.innerHTML,
    }

    // POST request for new data from form
    const addRamen = {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(dataForm)
    }

    let url = 'http://localhost:3000/ramens'
    fetch(url, addRamen)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log('error2',error))

    // Adding the new ramen to the DOM
    ramenCard(dataForm);

    form.reset();
})

