function hammMenu() {
    var x = document.querySelector("#myupperMenu");
    if (x.className === "upperMenu") {
        x.className += " responsive";
    } else {
        x.className = "upperMenu";
    }
}

function datesPageUpdate() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    document.querySelector('#currentYear').textContent = new Date().getFullYear();
    document.querySelector('#updateDate').textContent = new Date(document.lastModified).toISOString();
    document.querySelector('#currentDate').textContent = new Date().toLocaleDateString();
    
    const d = new Date();
    if ((d.getDay() == 1) || (d.getDay() == 2)) {
        document.querySelector('#bannerInfo').style.display = "block";
    };
}