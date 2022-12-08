let button = document.getElementById("button");

function getValue() {
  // Gets the value of the input element
  inputDate = document.getElementById("inputDate").value;
  console.log("la date entrée est : " + inputDate);
  // Returns its value
  return inputDate;
}

// Returns a Promise, Json transforms the result in reusable data
// Then it catches errors
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

// This function gets the number of positive covid cases for each French department :
function fetchValuesWith(date) {
  getAllDepartments(date).then((departments) => {
    departments.forEach((department) => {
      //console.log(department);
      let elementId = `FR-${department.dep}`;
      //console.log(elementId);
      let depHtml = document.getElementById(elementId);
      if (depHtml) {
        depHtml.style.fill = covidColors(department.pos);
      }
    });
  });
}

// This function attributes a color code depending on the number of covid cases :
function covidColors(numberOfCases) {
  //console.log(numberOfCases);
  let color = "#746c6c	";
  if (numberOfCases < 50) {
    color = "#007f5f";
  } else if (numberOfCases < 100) {
    color = "#2b9348";
  } else if (numberOfCases < 150) {
    color = "#80b918";
  } else if (numberOfCases < 200) {
    color = "#aacc00";
  } else if (numberOfCases < 250) {
    color = "#eeef20";
  } else if (numberOfCases < 300) {
    color = "#fcfc5f";
  } else if (numberOfCases < 350) {
    color = "#ffba08";
  } else if (numberOfCases < 400) {
    color = "#faa307";
  } else if (numberOfCases < 450) {
    color = "#e85d04";
  } else if (numberOfCases < 500) {
    color = "#dc2f02";
  } else if (numberOfCases < 550) {
    color = "#9d0208";
  } else if (numberOfCases > 550) {
    color = "#6a040f";
  } else {
    color = "#746c6c	";
  }
  return color;
}

function toggleDataCreation(date) {
  //This function allow to reuse the result of the fetch and create an array of objects with the departments and positive cases
  toggleData = new Array();                                     //Creation of the array
  getAllDepartments(date).then((departments) => {               //When the fetch is available do
    

    departments.forEach((department) => {                       //For each object of the response do


      obj = new Object();                                       //Creation of the obj
      Object.assign(obj, { department: department.lib_dep });   //Push the name with the key departement
      Object.assign(obj, { pos: department.pos });              //Push the positives cases num with the key pos
      toggleData.push(obj);                                     //Push the obj into the array
    });
  });
  return toggleData;
}

function SVGToolTip(date) {
  //This function handle every thing that relate too the tooltip(info-bulle)
  //scr :https://nosmoking.developpez.com/demos/rep-forum/d2072572.html
  const oSVG = document.querySelector("svg");                   //Create a function that contain all the html svg
  const oInfo = document.createElement("DIV");                  //Create a div in the html
  oInfo.id = "info-SVG";                                        //create a infraclass info-SVG
  oSVG.parentNode.append(oInfo);                                //Not sure about this one
  toggleDataCreation(date);                                     //Call for the data needed for the tooltip


  function _toggleInfo(e) {
    //This function handle the text that must be written in the tooltip
    for (i = 0; i < toggleData.length; i++) {                   //Go trough the array to make connection between the svg and the pos data


      if (toggleData[i].department == e.target.dataset.title) {//If the name in a array match the title of the svg in html


        oInfo.innerHTML =                                      //The text of the toolpic =
          "mouseenter" === e.type                              //Not my syntax but if the event type === mouseenter do show dep name and positives cases
            ? "<h1>" +
              toggleData[i].department +
              "<br>" +
              toggleData[i].pos +
              " cas positif </h1>"
            : "";
      }
    }
  }

  function _moveInfo(e) {
    //This function tracs the position of the mouse, and replicate the movement onto css
    oInfo.style.transform =                                    //Change trough the css
      "translate3d(" + e.layerX + "px," + e.layerY + "px, 0)"; //Tans3D is a proprety of css
  }

  oSVG.addEventListener("mousemove", _moveInfo, true);         // Check if the mouse is on the svg and call moveInfo
  const oElems = document.querySelectorAll("path");            //Check if mouse is on PATH
  oElems.forEach(function (elem) {                             //For each time the mouse moove check if toggle info is true

    elem.addEventListener("mouseenter", _toggleInfo);
    elem.addEventListener("mouseleave", _toggleInfo);
  });
}

button.onclick = function () {
  let myNewDate = getValue();
  fetchValuesWith(myNewDate);
  SVGToolTip(myNewDate);
};
