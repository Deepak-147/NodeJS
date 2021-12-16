console.log('Client side JS file loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     // console.log(response)
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

/**Web APIs provide you with a way to make HTTP requests from JavaScript in the browser, using fetch function.
 * This will allow the web application to request the forecast from the Node.js server.
**/
// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     // console.log(response)
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Prevent page re-render

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response) => {
        // console.log(response)
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});