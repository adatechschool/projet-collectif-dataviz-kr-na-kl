
// returns a Promise and with Json we transform the date into reusable data .
// In case of error we error we catch the error 

function getAllDepartments(date) {
    return fetch(`https://coronavirusapifr.herokuapp.com/data/departements-by-date/${date}`)
        .then(result => {
            return result.json()
        }).catch(error => { 
            console.log(`error on api: ${error}`)
        })
}


// The function gets all the departments and iterates
// line 32 gets the each department numbers 
// line 35 gets each departments numbers from html documet it is linked to line 32
// line 36 fills the colors according the hospitalisation cases 
/*
getAllDepartments('10-04-2021').then(departments => {
    for(department of departments) {
        let elementId = `FR-${department.dep}`;
        console.log(elementId)
        let depHtml = document.getElementById(elementId);
        if(depHtml) {
            depHtml.style.fill = covidColors(department.hosp);
        }
    }
})
*/

getAllDepartments('10-04-2021').then(departments => {
    departments.forEach(department => {//console.log(department)
        let elementId = `FR-${department.dep}`;
        console.log(elementId)
        let depHtml = document.getElementById(elementId);
        if(depHtml) {
            depHtml.style.fill = covidColors(department.hosp);
        }
    })
    
})

// this function gives the different colors according to the number of the hospitalisation
/*
function covidColors (numberOfCases) {
    console.log(numberOfCases)
    let color = '#CECECE'
    if (numberOfCases < 50) {

        color = '#007f5f'
    }
    else if (numberOfCases < 100) {
        color = '#2b9348'
    }
    else if (numberOfCases < 150) {
        color = '#80b918'
    }
    else if (numberOfCases < 200) {
        color = '#aacc00'
    }
    else if (numberOfCases < 250) {
        color = '#2d4d70'
    }
    else if (numberOfCases < 300) {
        color = '#eeef20'
    }
    else if (numberOfCases < 350) {
        color = '#ffba08'
    }
    else if (numberOfCases < 400) {
        color = '#faa307'
    }
    else if (numberOfCases < 500) {
        color = '#e85d04'
    }
    else if (numberOfCases < 600) {
        color = '#dc2f02'
    }
    else if (numberOfCases < 700) {
        color = '#9d0208'
    }
    else {
        color = '#6a040f'

    }
    return color
}
*/

function covidColors (numberOfCases) {
    console.log(numberOfCases)
    switch(numberOfCases){
        case (numberOfCases>0 && numberOfCases<=50): color = '#007f5f';
            break;
        case (numberOfCases>50 && numberOfCases<=100): color = '#2b9348';
            break;
        case (numberOfCases>100 && numberOfCases<=150): color = '#80b918';
            break;
        case (numberOfCases>150 && numberOfCases<=200): color = '#aacc00';
            break;
        case (numberOfCases>200 && numberOfCases<=250): color = '#2d4d70';
            break;
        case (numberOfCases>250 && numberOfCases<=300): color = '#eeef20';
            break;        
        case (numberOfCases>300 && numberOfCases<=350): color = '#ffba08';
            break;
        case (numberOfCases>350 && numberOfCases<=400): color = '#faa307';
            break;
        case (numberOfCases>400 && numberOfCases<=500): color = '#e85d04';
            break;
        case (numberOfCases>500 && numberOfCases<=600): color = '#dc2f02';
            break;
        case (numberOfCases>600 && numberOfCases<=700): color = '#9d0208';
            break;
        case (numberOfCases)>700: color = '#9d0208';
            break;
        default: color = '#CECECE';
   }
   return color;
}