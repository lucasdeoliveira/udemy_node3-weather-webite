const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    message1.textContent = 'Loading...'
    message2.textContent = ''

    e.preventDefault()      // prevent default refresh to avoid refreshing the page

    const location = search.value

    fetch('/weather?addr=' + location).then((res) => {

        res.json().then((data) => {

            console.log(data);
            if (data.error) {
                message1.textContent = 'Error...'
                message2.textContent = data.error
            } else {
                message1.textContent = 'Done!'
                message2.textContent = data.forecast.location+': '+ data.forecast.forecastText
            }
        })
    })
})