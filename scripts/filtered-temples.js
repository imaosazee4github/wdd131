
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Ghana_Mission_247.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Johannesburg_Temple_from_skyline.jpeg"
  },
  {
    templeName: "Kinshasa DR Congo",
    location: "Kinshasa, Democratic Republic of Congo",
    dedicated: "2019, April, 14",
    area: 12000,
    imageUrl: "https://churchofjesuschrist.org/imgs/129596d37fe88a5062c10f4b8ca84ddd6e0535f9/full/3840%2C/0/default"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay (Versailles), France",
    dedicated: "2017, May, 27",
    area: 44175,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Temple_mormon_de_Paris_au_Chesnay_le_8_avril_2017_-_36.jpg/1024px-Temple_mormon_de_Paris_au_Chesnay_le_8_avril_2017_-_36.jpg"
  }
 
];

const templeContainer = document.querySelector("#templeContainer");
const pageTitle = document.querySelector("#pageTitle");
const navLinks = document.querySelectorAll(".navigation a");


// function to render temples

function renderTemplates(filteredTemples){
    templeContainer.innerHTML = "";

    filteredTemples.forEach(temple => {
        const card = document.createElement("div");
        card.classList.add("temple-card");


        card.innerHTML = `
        <h3>${temple.templeName}</h3>
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
        <p><strong>Location: </strong> ${temple.location}</p>
        <p><strong>Dedicated: </strong> ${temple.dedicated}</p>
        <p><strong>Area: </strong> ${temple.area.toLocaleString()} sq ft</p>
        `;

        templeContainer.appendChild(card);
    });
}

function getYear(dedicateDate){
    return parseInt(dedicateDate.split(",")[0]);
}
// Function to filer temples

const filteredTemples = (criteria) => {
    let filtered;
switch (criteria) {
    case "old":
      pageTitle.textContent = "Old Temples"
      filtered = temples.filter((t) => getYear(t.dedicated) < 1900);
      break;
    case "new":
        pageTitle.textContent = "New Temples";
        filtered = temples.filter((t) => getYear(t.dedicated) > 2000);
        break;
    case "large":
        pageTitle.textContent = "Large Temples";
        filtered = temples.filter((t) => t.area > 90000);
        break;
    case "small":
        pageTitle.textContent = "Small Temples";
        filtered = temples.filter((t) => t.area < 10000);
        break
    default:
        pageTitle.textContent = "Home"
        filtered = temples;
    
 }
  renderTemplates(filtered);

}

// Event listeners for nav

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const  filter = link.dataset.filter;
        filteredTemples(filter);
        })
})

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

const nav = document.querySelector(".navigation")
const humButton = document.querySelector('#menu')

humButton.addEventListener('click', () => {
	nav.classList.toggle('show');
    humButton.classList.toggle('show');
})

filteredTemples("home")
