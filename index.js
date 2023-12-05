const allPlayersDiv = document.querySelector(".grid-container"); //searches for  my div with a grid container class 
const singlePlayerDiv = document.querySelector('#playerDetails'); //searches for my div with player details class

let players = []; // array to put all the data I pull from the api


window.addEventListener("hashchange", render); //global event listener that calls the render function when the # changes in the pages url.
                                                // Needed for the SPA to function since its changing the view without reloading the page
window.addEventListener("load", render); //global event listener that calls the render function when it sees the page load. This is uses so that way if a user views
                                        //The page with a # already in the url it will load that players details and not display the view with all players

async function fetchPlayers() {   //any function with await must be async
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310-FTB-ET-WEB-FT/players"); //creates a response variable that sends a network request and
                                                                                                        //pauses (awaits) until the request completes
    const data = await response.json(); //creates a data variable that parses the JSON (i.e converts to) to a java script object
    players = data.data.players; //stores the data found in our data variable from the previous line and puts the data from the object key data.players into the 
                                //players array in line 4 
    render(); //used to update the webpages content this is required because the function is async 
}

function render () {
    const hash = window.location.hash.substring(1); //creates a hash variable. The window.location.hash.substring(1) will return the indentitifer without the # 
                                                    //exmaple (player1 without #). The idenifier is used to show the players details in the render function
    const singlePlayer = players.find(p => encodeURIComponent(p.name) === hash); //creates a singlePlayer variable. This variable uses the find method to search
                                                                                //the players array for a players name it then converts it to a url encoded format 
                                                                                //and makes sure it matches the hash variable. This makes sure that the player's 
                                                                                //name is being match in the same format as it will appear in the # url

    if (singlePlayer) { //if the singlePlayer variable returns a player
        allPlayersDiv.style.display = 'none'; //this hides div that displays all the players. 
        singlePlayerDiv.innerHTML = `        
        <h2>${singlePlayer.name}</h2>
        <div>Breed: ${singlePlayer.breed}</div>
        <img src="${singlePlayer.imageUrl}" 
        <div><a href="#">Back to all players</a></div>
        `; //this marks up the html of the single player div 
        singlePlayerDiv.style.display = 'block'; //makes the singleplayerdiv visble
    }else { //if the singlePlayers variable returns undefined
        singlePlayerDiv.style.display = 'none'; //hides the single player div
        allPlayersDiv.style.display = 'block'; //makes the all players div visible
        //makrs up the html for the all players div
        allPlayersDiv.innerHTML = "<h1>All Players</h1>" + 
            players.map(player => `<div class="grid-item">
            <h4><a href="#${encodeURIComponent(player.name)}">${player.name}</a></h4> 
            <div class="breed">${player.breed}</div> 
            </div>`).join('');
    }
}

fetchPlayers();



// const allPlayersDiv = document.querySelector(".grid-container");
// const singlePlayerDiv = document.querySelector('#playerDetails');
// let players = [];

// window.addEventListener("hashchange", render);
// window.addEventListener("load", render);

// async function fetchPlayers() {
//     const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310-FTB-ET-WEB-FT/players");
//     const data = await response.json();
//     players = data.data.players;
//     render();
// }

// function render() {
//     const hash = window.location.hash.substring(1);
//     const singlePlayer = players.find(p => encodeURIComponent(p.name) === hash);

//     if (singlePlayer) {
//         allPlayersDiv.style.display = 'none';
//         singlePlayerDiv.innerHTML = `
//             <h2>${singlePlayer.name}</h2>
//             <div>Breed: ${singlePlayer.breed}</div>
//             <img src="${singlePlayer.imageUrl}" alt="Image of ${singlePlayer.name}">
//             <div><a href="#">Back to all players</a></div>
//         `;
//         singlePlayerDiv.style.display = 'block';
//     } else {
//         singlePlayerDiv.style.display = 'none';
//         allPlayersDiv.style.display = 'block';
//         allPlayersDiv.innerHTML = "<h1>All Players</h1>" + 
//             players.map(player => `<div class="grid-item">
//                 <h4><a href="#${encodeURIComponent(player.name)}">${player.name}</a></h4>
//                 <div class="breed">${player.breed}</div>
//             </div>`).join('');
//     }
// }

// fetchPlayers();


{/* <div class="img"><img src="${player.imageUrl}"></div>
<button type="button">CLOSE</button>   */}