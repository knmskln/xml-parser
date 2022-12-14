const xhr = new XMLHttpRequest();
const content = document.getElementById('content');
const modalContent = document.querySelector('.modal-content');
const tvShows = {};

xhr.onload = () => {
    console.log(xhr.responseXML);
    const response = xhr.responseXML;
    const events = response.querySelectorAll('Event');

    let previousDateElementText = '';
    events.forEach(element => {
        const eventDate = element.querySelector('Date');
        const eventStart = element.querySelector('Start');
        const eventTitle = element.querySelector('Title');
        const eventInfo = element.querySelector('Info');
        const eventName = element.querySelector('Name');
        if(previousDateElementText === eventDate.textContent){
            tvShows[`${eventDate.textContent}`].push({
                name: eventName.textContent,
                start: eventStart.textContent,
                title: eventTitle.textContent,
                info: eventInfo.textContent,
            });
        } else {
            tvShows[`${eventDate.textContent}`] = [];
            tvShows[`${eventDate.textContent}`].push({
                name: eventName.textContent,
                start: eventStart.textContent,
                title: eventTitle.textContent,
                info: eventInfo.textContent,
            });
        }
        previousDateElementText = eventDate.textContent;
    });
    console.log(tvShows);
    Object.keys(tvShows).forEach(date => {
        content.appendChild(createButton(date));
    });
}

function createButton(text) {
    const button = document.createElement("a");
    button.setAttribute('class', 'waves-effect waves-light btn modal-trigger');
    button.setAttribute('href', `#modal`);
    button.textContent = text;
    return button;
}

function createListOfTVShows(shows){
    const list = document.createElement('ul');
    list.setAttribute('class', 'collection');
    shows.forEach(tvShow => {
        const element = document.createElement('li');
        element.setAttribute('class', 'collection-item');
        // element.textContent = `${tvShow.name} Начало: ${tvShow.start}, описание: ${tvShow.info}`;
        element.textContent = `${tvShow.name} Начало: ${tvShow.start}`;
        list.appendChild(element);
    });
    return list;
}

xhr.open("GET", "tv.xml");
xhr.send();

content.addEventListener('click', function(event){
    if(event.target.classList.contains('btn')){
        event.preventDefault();
        console.log(event.target.textContent);
        const listOfShows = document.querySelector('ul');
        if(listOfShows) modalContent.removeChild(listOfShows);
        modalContent.appendChild(createListOfTVShows(tvShows[event.target.textContent]));
    }
});
