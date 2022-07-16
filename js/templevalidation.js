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

function templesListreview() {
    const requestURL = 'json/data.json';
    const cards = document.querySelector('.cards');

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            console.table(jsonObject); // temporary checking for valid response and data parsing

            const temples = jsonObject['temples'];

            temples.forEach(displaytemples);
        });

    function displaytemples(temple) {
        // Create elements to add to the document
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3');
        let parrafofirst = document.createElement('p');
        let parrafosecond = document.createElement('p');
        let parrafothird = document.createElement('p');
        let portrait = document.createElement('img');
        let website = document.createElement('a');
        let phone = document.createElement('p');
        let likearea = document.createElement('span');
        let like = Number(window.localStorage.getItem(temple.templeshortname));
        if (like !== 0) {
            likearea.textContent = "💗";
        } else {
            likearea.textContent = "🤍";
        }

        h2.textContent = `${temple.templename}`;
        h3.textContent = `${temple.membership}`;
        parrafofirst.textContent = `${temple.street}`;
        parrafosecond.textContent = `${temple.city}`;
        parrafothird.textContent = `CP ${temple.cp}`;
        website.textContent = `${temple.website}`;
        phone.textContent = `${temple.phone}`;

        // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
        portrait.setAttribute('src', temple.imageurl);
        portrait.setAttribute('alt', `Logo of ${temple.templename}`);
        portrait.setAttribute('loading', 'eager');
        website.setAttribute('href', temple.website);
        likearea.setAttribute('id', temple.templeshortname);
        likearea.setAttribute('class', 'likeNo');
        likearea.setAttribute('onclick', likesLocalStore(temple.templeshortname));

        // Add/append the section(card) with the h2 element
        //card.setAttribute('class', 'templeStyle');
        //h3.setAttribute('class', temple.membership);

        card.appendChild(h2);
        card.appendChild(portrait);
        card.appendChild(h3);
        card.appendChild(parrafofirst);
        card.appendChild(parrafosecond);
        card.appendChild(parrafothird);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(likearea);


        // Add/append the existing HTML div with the cards class with the section(card)
        document.querySelector('section.cards').appendChild(card);
    }
}

function likesLocalStore(templeshortname) {
    const tobeornotobe = document.querySelector(`#${templeshortname}`);
    let likes = Number(window.localStorage.getItem(templeshortname));
    if (likes !== 0) {
        likes = 0;
    } else {
        likes = 1;
    }
    localStorage.setItem("${templeshortname}", likes);

}

function weatherinformation(q) {
    const currentTempTitle = document.querySelector('#tempTitle');
    const currentTemp = document.querySelector('#tempVar');
    const currentSpeed = document.querySelector('#speedVar');
    const currentWind = document.querySelector('#windVar');
    const weatherIcon = document.querySelector('#weatherIcon');
    const captionDesc = document.querySelector('figcaption');

    
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=mexico,mx&units=imperial&appid=b0f8553cf7734d56c5b1f0112382bbb7`;

    async function apiFetch() {
        try {
            const response = await fetch(weatherurl);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayResults(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    apiFetch();

    function displayResults(weatherData) {
        const imageSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const imageDescription = weatherData.weather[0].description;
        const speedVar = weatherData.wind.speed;
        const tempVar = weatherData.main.temp;
        let windVar;
        if (tempVar > 50) {
            windVar = "NA";
        } else {
            windVar = (35.74 + (0.6215 * tempVar)) - (35.75 * Math.pow(speedVar, 0.16)) + (0.4275 * tempVar * Math.pow(speedVar, 0.16));
            windVar = Math.round(windVar);
        }


        weatherIcon.setAttribute('src', imageSrc);
        weatherIcon.setAttribute('alt', `A ${imageDescription} icon is shown`);

        captionDesc.setAttribute('class', 'capitalizeClass');
        captionDesc.innerHTML = `${imageDescription}`;

        currentTempTitle.innerHTML = `${weatherData.name}`;
        currentTemp.innerHTML = `Temp: <strong>${weatherData.main.temp.toFixed(0)}</strong>°F `;
        currentSpeed.innerHTML = `Speed: <strong>${speedVar}</strong> mph `;
        currentWind.innerHTML = `Wind Chill: <strong>${windVar}</strong> `;


        //document.querySelector("#speedVar").textContent = speedVar;
        //document.querySelector("#windVar").textContent = windVar;


    }

}