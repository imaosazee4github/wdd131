document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


const mainNav = document.querySelector(".navigation")
const humButton = document.querySelector('#menu')

humButton.addEventListener('click', () => {
	mainNav.classList.toggle('show');
    humButton.classList.toggle('show');
})