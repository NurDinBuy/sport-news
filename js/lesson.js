// Phone check

const phoneInput = document.querySelector("#phone_input")
const phoneButton = document.querySelector("#phone_button")
const phoneSpan = document.querySelector("#phone_result")

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener("click", () =>{
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = "correct number";
        phoneSpan.style.color = "green"
    }else {
        phoneSpan.innerHTML = "not correct number";
        phoneSpan.style.color = "red";
    }
})

//Tab slider

const tabsContentCards = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const tabsItemsParent = document.querySelector('.tab_content_items')

let index = 0
const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) =>{
        tabItem.classList.remove('tab_content_item_active')
    })
}
// hideTabsContentCards()

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'flex'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

const changeTabAuto = () => {
    hideTabsContentCards()
    showTabsContentCards(index)

    index= (index+1) % tabsContentCards.length
}

hideTabsContentCards()
showTabsContentCards(0)

const intervalId = setInterval(changeTabAuto, 3000)

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hideTabsContentCards()
                showTabsContentCards(tabItemIndex)

                clearInterval(intervalId)
            }
        })
    }
}


//Converter

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const fetchData2 = async () => {
    try {
        const response = await fetch('../data/converter.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const convertCurrency = (amount, exchangeRate) => {
    return amount * exchangeRate;
};

const converter = async (element, targetElement1, targetElement2, type) => {
    element.oninput = async () => {
        try {
            const data = await fetchData2();

            switch (type) {
                case 'som':
                    targetElement1.value = convertCurrency(element.value, data.som / data.usd).toFixed(2);
                    targetElement2.value = convertCurrency(element.value, data.som / data.eur).toFixed(2);
                    break;
                case 'usd':
                    targetElement1.value = convertCurrency(element.value, data.usd * data.som).toFixed(2);
                    targetElement2.value = convertCurrency(element.value, data.usd / data.eur).toFixed(2);
                    break;
                case 'eur':
                    targetElement1.value = convertCurrency(element.value, data.eur / data.usd).toFixed(2);
                    targetElement2.value = convertCurrency(element.value, data.eur * data.som).toFixed(2);
                    break;
                default:
                    break;
            }

            element.value === "" && (targetElement1.value = targetElement2.value = "");
        } catch (error) {
            console.error('Error converting currency:', error);
        }
    };
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, usdInput, somInput, 'eur');


//
// const somInput = document.querySelector("#som");
// const usdInput = document.querySelector("#usd");
// const eurInput = document.querySelector("#eur");
// const converter = (element, targetElement1, targetElement2, type) => {
//     element.oninput = () => {
//         const request = new XMLHttpRequest();
//         request.open('GET', '../data/converter.json');
//         request.setRequestHeader('Content-type', 'application/json');
//         request.send();
//
//         request.onload = () => {
//             const data = JSON.parse(request.response);
//             switch (type) {
//                 case 'som':
//                     targetElement1.value = convertCurrency(element.value, data.som / data.usd).toFixed(2);
//                     targetElement2.value = convertCurrency(element.value, data.som / data.eur).toFixed(2);
//                     break;
//                 case 'usd':
//                     targetElement1.value = convertCurrency(element.value, data.usd * data.som).toFixed(2);
//                     targetElement2.value = convertCurrency(element.value, data.usd / data.eur).toFixed(2);
//                     break;
//                 case 'eur':
//                     targetElement1.value = convertCurrency(element.value, data.eur / data.usd).toFixed(2);
//                     targetElement2.value = convertCurrency(element.value, data.eur * data.som).toFixed(2);
//                     break;
//                 default:
//                     break;
//             }
//
//             element.value === "" && (targetElement1.value = targetElement2.value = "");
//         };
//     };
// };
//
// const convertCurrency = (amount, exchangeRate) => {
//     return amount * exchangeRate;
// };
//
// converter(somInput, usdInput, eurInput, 'som', 'usd', 'eur');
// converter(usdInput, somInput, eurInput, 'usd', 'som', 'eur');
// converter(eurInput, usdInput, somInput, 'eur', 'usd', 'som');




// CARD switcher

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 0;
async function fetchNum(direction) {
    direction === 'next' ? count++ : count--;

    if (count > 200) {
        count = 1;
    } else if (count < 1) {
        count = 200;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();

        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.log(error);
    }
}
// function fetchNum(direction) {
//     direction === 'next' ? count++ : count--;
//
//     if (count > 200) {
//         count = 1;
//     } else if (count < 1) {
//         count = 200;
//     }
//
//
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//         .then(response => response.json())
//         .then(data => {
//             card.innerHTML = `
//                          <p>${data.title}</p>
//                          <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
//                          <span>${data.id}</span>
//                     `;
//                 });
// }

btnNext.onclick = () => {
    fetchNum('next');
};

btnPrev.onclick = () => {
    fetchNum('prev');
};

fetchNum('next');


// 2) Так же сделать отдельный fetch запрос на эту
// ссылку: 'https://jsonplaceholder.typicode.com/posts' и отобразить данные просто в консоли

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then( (response) => response.json())
//     .then((data) => {
//     console.log (data)
// })

const URL = ('https://jsonplaceholder.typicode.com/posts');

const fetchData = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log (data)
    } catch (error){
        console.log (error)
    }
}
fetchData()


//SEARCH WEATHER
// optional chaining - ?.
//query params

const cityNameInput = document.querySelector('.cityName'),
    // searchButton = document.querySelector('#search'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

// cityNameInput.oninput = (event) => {
//     fetch( `${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
//         .then(response => response.json())
//         .then(data => {
//             city.innerHTML = data?.name  ?  data?.name : 'Город'
//             temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
//
//         })
// }

cityNameInput.oninput = async (event) => {
    try {
        const response = await fetch (`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json ()
        city.innerHTML = data?.name ? data?.name : 'Город не найден ...'
        temp.innerHTML = data?.main?.temp ? Math.round (data?.main?.temp - 273) + '&deg;C' : '...'
    } catch (error){
        console.log (error)
    }
}