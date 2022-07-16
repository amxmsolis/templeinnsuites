/*Monica Solis WDD230 */
function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("menuHamburger").classList.toggle("open");
}
const x = document.getElementById("menuHamburger");
x.onclick = toggleMenu;



const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
document.querySelector('#currentDate').textContent = new Date().toLocaleDateString('en-US', options);
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.getElementById('updateDate').textContent = new Date(document.lastModified).toISOString();

const d = new Date();
if ((d.getDay() == 1) || (d.getDay() == 2)) {
    document.querySelector('#bannerInfo').style.display = "block";
};