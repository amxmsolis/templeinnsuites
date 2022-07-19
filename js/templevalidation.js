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

function templesListreview(howManyTemples) {
    const requestURL = 'json/data.json';
    const cards = document.querySelector('.cards');

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const temples = jsonObject['temples'];
            // temples.forEach(displaytemples);
            let length =  temples.length;
            if (length <= howManyTemples ){
                howManyTemples=length;
            }

            for (let i = 0; i < howManyTemples; i++) {
                displaytemples(temples[i]);
            }
        });

    function displaytemples(temple) {
        // Create elements to add to the document
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3');
        let breakline = document.createElement('br');
        let parrafofirst = document.createElement('p');
        let parrafosecond = document.createElement('p');
        let parrafothird = document.createElement('p');
        let parrafofourth = document.createElement('p');
        let portrait = document.createElement('img');
        let maplocationurl = document.createElement('iframe');
        let phone = document.createElement('a');
        let email = document.createElement('a');
        let likearea = document.createElement('button');
        let like = Number(window.localStorage.getItem(temple.templeshortname));
        console.log(like);
        if (like == 1) {
            likearea.textContent = "💗";
        } else {
            likearea.textContent = "🤍";
        }

        h2.textContent = `${temple.templename}`;
        h3.textContent = `${temple.history}`;
        parrafofirst.textContent = `Address: ${temple.address}`;
        parrafosecond.textContent = `${temple.schedule}`;
        parrafothird.textContent = `Temple services: ${temple.services}`;
        parrafofourth.textContent = `Near services: ${temple.nearservices}`;
        phone.setAttribute('href', `tel: ${temple.phone}`);
        phone.textContent = `${temple.phone}`;
        
        email.setAttribute('href', `mailto:${temple.email}`);
        email.textContent = `${temple.email}`;

        // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
        portrait.setAttribute('src', temple.imageurl);
        portrait.setAttribute('alt', `Logo of ${temple.templename} `);
        portrait.setAttribute('loading', 'eager');
        maplocationurl.setAttribute('src', temple.maplocationurl);
        likearea.setAttribute('id', temple.templeshortname);
        likearea.setAttribute('class', 'likeNo');
        likearea.setAttribute('onclick', `likesLocalStore(\"${temple.templeshortname}\")`);

        // Add/append the section(card) with the h2 element

        maplocationurl.setAttribute('style', 'display: none');
        card.setAttribute('class', 'templeStyle');

        card.appendChild(portrait);
        card.appendChild(likearea);
        card.appendChild(h2);
        card.appendChild(h3);
        card.appendChild(parrafofirst);
        card.appendChild(parrafosecond);
        card.appendChild(parrafothird);
        card.appendChild(parrafofourth);
        card.appendChild(email);
        card.appendChild(breakline);
        card.appendChild(phone);
        //card.appendChild(maplocationurl);

        // Add/append the existing HTML div with the cards class with the section(card)
        document.querySelector('section.cards').appendChild(card);
    }
}

function likesLocalStore(t) {
    console.log(t);
    let likes = Number(window.localStorage.getItem(t));
    console.log(likes);
    if (likes !== 0) {
        likes = 0;
        document.getElementById(t).textContent = "🤍";
    } else {
        likes = 1;
        document.getElementById(t).textContent = "💗";
    }
    localStorage.setItem(`${t}`, likes);
}






function weatherinformation(place) {
    const currentTempTitle = document.querySelector('#tempTitle');
    const currentTemp = document.querySelector('#tempVar');
    const currentSpeed = document.querySelector('#speedVar');
    const currentWind = document.querySelector('#windVar');
    const weatherIcon = document.querySelector('#weatherIcon');
    const captionDesc = document.querySelector('figcaption');


    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${place},mx&units=imperial&appid=b0f8553cf7734d56c5b1f0112382bbb7`;

    async function apiFetch() {
        try {
            const response = await fetch(weatherurl);
            if (response.ok) {
                const data = await response.json();
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


    }

}

