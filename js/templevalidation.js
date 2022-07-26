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
        //document.querySelector('#bannerInfo').style.display = "block";
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
            let length = temples.length;
            if (length <= howManyTemples) {
                howManyTemples = length;
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
        //console.log(like);
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
        if (howManyTemples > 1) {
            card.setAttribute('class', 'templeStyle');
        }else{
            card.setAttribute('class', 'templeStyleBig');
        }
        
       

        card.appendChild(portrait);
        card.appendChild(likearea);
        card.appendChild(h2);
        if (howManyTemples > 1) {
            card.appendChild(h3);
            card.appendChild(parrafofirst);
            card.appendChild(parrafosecond);
            card.appendChild(parrafothird);
            card.appendChild(parrafofourth);
            card.appendChild(email);
            card.appendChild(breakline);
            card.appendChild(phone);
        }


        // Add/append the existing HTML div with the cards class with the section(card)
        document.querySelector('section.cards').appendChild(card);
    }
}


function likesLocalStore(t) {
    //console.log(t);
    let likes = Number(window.localStorage.getItem(t));
    //console.log(likes);
    if (likes !== 0) {
        likes = 0;
        document.getElementById(t).textContent = "🤍";
    } else {
        likes = 1;
        document.getElementById(t).textContent = "💗";
    }
    localStorage.setItem(`${t}`, likes);
}

function closeForecast() {
    let closeyn = document.querySelector('#closeForecast').textContent;

    if (closeyn === '🔼') {
        document.querySelector('#forecastWeater').style.display = "none";
        document.querySelector('#closeForecast').textContent = "🔽";
    } else {

        document.querySelector('#forecastWeater').style.display = "block";
        document.querySelector('#closeForecast').textContent = "🔼";
    }
}



function weatherinformation(lat, lon) {
    const currentTempTitle = document.querySelector('#tempTitle');
    const currentTemp = document.querySelector('#tempVar');
    const currentHumidity = document.querySelector('#humidityVar');
    const currentSpeed = document.querySelector('#speedVar');
    const currentWind = document.querySelector('#windVar');
    const weatherIcon = document.querySelector('#weatherIcon');
    const captionDesc = document.querySelector('#currentWeatherImage');

    //exclude=hourly,minutely&
    const weatherurl =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=b0f8553cf7734d56c5b1f0112382bbb7`;

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
        //console.log(weatherData);
        const imageSrc = `https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`;
        const imageDescription = weatherData.current.weather[0].description;
        const speedVar = weatherData.current.wind_speed;
        const tempVar = weatherData.current.temp;
        let windVar;
        if (tempVar > 50) {
            windVar = "NA";
        } else {
            windVar = (35.74 + (0.6215 * tempVar)) - (35.75 * Math.pow(speedVar, 0.16)) + (0.4275 * tempVar * Math
                .pow(speedVar, 0.16));
            windVar = Math.round(windVar);
        }


        weatherIcon.setAttribute('src', imageSrc);
        weatherIcon.setAttribute('alt', `A ${imageDescription} icon is shown`);

        captionDesc.setAttribute('class', 'capitalizeClass');
        captionDesc.innerHTML = `${imageDescription}`;

        currentTempTitle.innerHTML = `Mexico City`;
        currentTemp.innerHTML = `${weatherData.current.temp} °C `;
        currentHumidity.innerHTML = `Humidity: <strong>${weatherData.current.humidity}</strong> % `;
        currentSpeed.innerHTML = `Winds <strong>${speedVar}</strong> mph `;
        currentWind.innerHTML = `Wind Chill: <strong>${windVar}</strong> `;

        document.querySelector('#weatherTemp0').innerHTML =
            ` ${weatherData.daily[0].temp.min}-${weatherData.daily[0].temp.max}°C `;
        document.querySelector('#weatherTemp1').innerHTML =
            ` ${weatherData.daily[1].temp.min}-${weatherData.daily[1].temp.max}°C `;
        document.querySelector('#weatherTemp2').innerHTML =
            ` ${weatherData.daily[2].temp.min}-${weatherData.daily[2].temp.max}°C `;
        document.querySelector('#weatherTemp3').innerHTML =
            ` ${weatherData.daily[3].temp.min}-${weatherData.daily[3].temp.max}°C `;

        document.querySelector('#weatherHumi0').innerHTML = ` Humidity ${weatherData.daily[0].temp.day}% `;
        document.querySelector('#weatherHumi1').innerHTML = ` Humidity ${weatherData.daily[1].temp.day}% `;
        document.querySelector('#weatherHumi2').innerHTML = ` Humidity ${weatherData.daily[2].temp.day}% `;
        document.querySelector('#weatherHumi3').innerHTML = ` Humidity ${weatherData.daily[3].temp.day}% `;

        document.querySelector('#weatherImg0').setAttribute('src',
            `https://openweathermap.org/img/w/${weatherData.daily[0].weather[0].icon}.png`);
        document.querySelector('#weatherImg0').setAttribute('alt',
            `A ${weatherData.daily[0].weather[0].description} icon is shown`);
        document.querySelector('#weatherImg1').setAttribute('src',
            `https://openweathermap.org/img/w/${weatherData.daily[1].weather[0].icon}.png`);
        document.querySelector('#weatherImg1').setAttribute('alt',
            `A ${weatherData.daily[1].weather[0].description} icon is shown`);
        document.querySelector('#weatherImg2').setAttribute('src',
            `https://openweathermap.org/img/w/${weatherData.daily[2].weather[0].icon}.png`);
        document.querySelector('#weatherImg2').setAttribute('alt',
            `A ${weatherData.daily[2].weather[0].description} icon is shown`);
        document.querySelector('#weatherImg3').setAttribute('src',
            `https://openweathermap.org/img/w/${weatherData.daily[3].weather[0].icon}.png`);
        document.querySelector('#weatherImg3').setAttribute('alt',
            `A ${weatherData.daily[3].weather[0].description} icon is shown`);

        document.querySelector('#weatherDesc0').innerHTML = `${weatherData.daily[0].weather[0].description}`;
        document.querySelector('#weatherDesc1').innerHTML = `${weatherData.daily[1].weather[0].description}`;
        document.querySelector('#weatherDesc2').innerHTML = `${weatherData.daily[2].weather[0].description}`;
        document.querySelector('#weatherDesc3').innerHTML = `${weatherData.daily[3].weather[0].description}`;

    }
}

function lastPageValuesValidation() {
    const params = new URL(document.location).searchParams;
    const destination = params.get("destination");
    const fromdate = params.get("fromdate");
    const todate = params.get("todate");
    const email = params.get("email");
    const name = params.get("name");
    const phone = params.get("phone");
    const personas = params.get("personas");
    const kids = params.get("kids");
    const room = params.get("room");
    const evento = params.get("evento");
    const ThankYouLetter = document.querySelector("#ThankYouLetter");


    document.querySelector("#destination").value = destination;
    document.querySelector("#fromdate").value = fromdate;
    document.querySelector("#todate").value = todate;
    document.querySelector("#email").value = email;
    document.querySelector("#name").value = name;
    document.querySelector("#personas").value = personas;
    document.querySelector("#kids").value = kids;

    if ((evento === 'Wedding') && (ThankYouLetter === null)) {
        document.querySelector("#wedding").checked = true;
    } else if ((evento === 'Fulltime') && (ThankYouLetter === null)) {
        document.querySelector("#fulltime").checked = true;
    } else if (ThankYouLetter === null) {
        document.querySelector("#accomodation").checked = true;
    }

    if ((room === 'Suite') && (ThankYouLetter === null)) {
        document.querySelector("#suite").checked = true;
    } else if (ThankYouLetter === null) {
        document.querySelector("#singleroom").checked = true;
    }


    document.querySelector("#destination").innerHTML = destination;
    document.querySelector("#fromdate").innerHTML = fromdate;
    document.querySelector("#todate").innerHTML = todate;
    document.querySelector("#email").innerHTML = email;
    document.querySelector("#name").innerHTML = name;
    document.querySelector("#phone").innerHTML = phone;
    document.querySelector("#personas").innerHTML = personas;
    document.querySelector("#kids").innerHTML = kids;
    if (ThankYouLetter !== null) {
        document.querySelector("#room").innerHTML = room;
        document.querySelector("#evento").innerHTML = evento;
    }

}


function indexJobs() {
    datesPageUpdate();
    weatherinformation("19.386808","-99.1938216");
    templesListreview(1);
}

function reservationsJobs() {
    datesPageUpdate();
    lastPageValuesValidation();
}