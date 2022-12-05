// returns a Promise and with Json we transform the date into reusable data .
// In case of error we error we catch the error

function getAllDepartments(date) {
  return fetch(
    `https://coronavirusapifr.herokuapp.com/data/departements-by-date/${date}`
  )
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      console.log(`error on api: ${error}`);
    });
}

// The function gets all the departments and iterates
// line 32 gets the each department numbers
// line 35 gets each departments numbers from html documet it is linked to line 32
// line 36 fills the colors according the hospitalisation cases

getAllDepartments("10-04-2021").then((departments) => {
  departments.forEach((department) => {
    //console.log(department)
    let elementId = `FR-${department.dep}`;
    //console.log(elementId)
    let depHtml = document.getElementById(elementId);
    //SVGToolTip(elementId,department.pos)
    if (depHtml) {
      // console.log(department.pos)
      depHtml.style.fill = covidColors(department.pos);
      //SVGToolTip(department)
    }
  });
});

// this function gives the different colors according to the number of the hospitalisation

function covidColors(numberOfCases) {
  //console.log(numberOfCases)
  let color = "#CECECE";
  if (numberOfCases < 50) {
    color = "#007f5f";
  } else if (numberOfCases < 100) {
    color = "#2b9348";
  } else if (numberOfCases < 150) {
    color = "#80b918";
  } else if (numberOfCases < 200) {
    color = "#aacc00";
  } else if (numberOfCases < 250) {
    color = "#2d4d70";
  } else if (numberOfCases < 300) {
    color = "#eeef20";
  } else if (numberOfCases < 350) {
    color = "#ffba08";
  } else if (numberOfCases < 400) {
    color = "#faa307";
  } else if (numberOfCases < 500) {
    color = "#e85d04";
  } else if (numberOfCases < 600) {
    color = "#dc2f02";
  } else if (numberOfCases < 700) {
    color = "#9d0208";
  } else {
    color = "#6a040f";
  }
  return color;
}
/*
document.getElementById('FR-44').addEventListener('mouseover', function(event) {
    event.target.setAttribute("visibility", "visible")
})

function test(){
document.getElementById('FR-44').addEventListener('mouseover', function(e) {
    e.currentTarget.setAttribute('fill', 'green')
})}
setTimeout(test, 99999999)*/
function toggleDataCreation() {
  toggleData = new Array()
  getAllDepartments("10-04-2021").then((departments) => {
    departments.forEach((department) => {
      obj = new Object()
      Object.assign(obj, { department: department.lib_dep })
      Object.assign(obj, { pos: department.pos })
      toggleData.push(obj)
      //console.log(toggleData)
    })
  })
  return toggleData
}
toggleDataCreation()

function SVGToolTip() {
  const oSVG = document.querySelector("svg");
  // création et ajout élément
  const oInfo = document.createElement("DIV");
  oInfo.id = "info-SVG";
  oSVG.parentNode.append(oInfo);
  toggleDataCreation()
  //console.log(toggleData)

  function _toggleInfo(e) {
    
    for (i=0; i<toggleData.length; i++){
     if (toggleData[i].department==e.target.dataset.title){
    //console.log(e.target.dataset)
    oInfo.innerHTML = "mouseenter" === e.type ? "<h1>" + toggleData[i].department + toggleData[i].pos  + "</h1>" : "";
     }
    }
}

  function _moveInfo(e) {
    oInfo.style.transform =
      "translate3d(" + e.layerX + "px," + e.layerY + "px, 0)";
  }

  // mouse move sur SVG
  oSVG.addEventListener("mousemove", _moveInfo, true);
  // mouse enter/leave sur PATH
  const oElems = document.querySelectorAll("path");
  oElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", _toggleInfo);
    elem.addEventListener("mouseleave", _toggleInfo);
  });
}
// activation
SVGToolTip();
