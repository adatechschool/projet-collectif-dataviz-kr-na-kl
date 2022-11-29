/*let number = 50 

let allier = document.getElementById('FR-04');

if (number === 50) {
    allier.style.fill ='red'

}*/


function fetchPos(link){
    fetch(link)
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        return console.log(data[0].pos)
    })
}

function createLinkFetch(depname,date){
    let link= String("https://coronavirusapifr.herokuapp.com/data/departement/"+depname+"/"+date)
    fetchPos(link)
}


createLinkFetch("rhone","10-11-2021")