var ifConnected = window.navigator.onLine;
if (ifConnected) {
  document.getElementById('search-inp').style.display = 'block';
} else {
    document.getElementById('manual-inp').style.display = 'block';
}

const searchInput = document.getElementById('isbn-input');
const searchSubmitBtn = document.getElementById('search-submit');
const statusP = document.getElementById('status-msg');

searchSubmitBtn.addEventListener('click', () => {
    let inputValue = searchInput.value;

    if (inputValue) {
        searchBooksApi(inputValue);

    } else {
        statusP.innerHTML = 'Enter valid number in field';
    }

    searchInput.value = '';
});

const searchBooksApi = input => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + input)
    .then(response => {
        return response.json()
    })
    .then(data => {
        
        if(data['totalItems'] < 1) {
            statusP.innerHTML = 'No results found.';
        } else {
            statusP.innerHTML = `Found: ${data['items'][0]['volumeInfo']['title']}`;
        }

    })
    .catch(err => {
        // Do something for an error here
        console.log('Error w/ fetch API/Function');
    });
};
