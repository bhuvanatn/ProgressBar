var width, prgbarNumber;
var url = "http://pb-api.herokuapp.com/bars";
var xmlhttpObject = new XMLHttpRequest();
xmlhttpObject.open("GET", url);
xmlhttpObject.send();
xmlhttpObject.addEventListener("load", function(e) {
  var response = JSON.parse(e.target.response);

  var mainid = document.getElementById("main");

  // to crete ProgressBars
  for (j = 0; j < response.bars.length; j++) {
    width = parseInt(response.bars[0]); // setting initial width for progress bar 1
    prgbarNumber = 0;

    var pr = document.createElement("div");
    pr.classList.add("myProgress", "space");
    pr.style.width = response.bars[j] + "%";
    pr.innerHTML = response.bars[j] * 1 + "%";

    mainid.appendChild(pr);
  }
  /// To create Buttons
  for (i = 0; i < response.buttons.length; i++) {
    limit = response.limit;
    var but = document.createElement("button");
    but.innerHTML = response.buttons[i];
    mainid.appendChild(but);
  }
  //To create select with option
  var sel = document.createElement("select");
  for (i = 1; i <= response.bars.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = "Progress " + i;
    sel.appendChild(opt);
    mainid.appendChild(sel);
  }
  //To set width and progress bar number
  document.activeElement.addEventListener("change", function() {
    if (document.activeElement.tagName == "SELECT") {
      for (j = 0; j < response.bars.length; j++) {
        if (document.activeElement.value === "Progress " + (j + 1)) {
          width = parseInt(response.bars[j]);
          prgbarNumber = j;
        }
      }
    }
  });

  document.activeElement.addEventListener("click", function() {
    if (document.activeElement.tagName == "BUTTON") {
      buttonValue = parseInt(document.activeElement.innerHTML);
      newProgressbar(buttonValue);
    }
  });

  var myProgress = document.getElementsByClassName("myProgress");
  function newProgressbar(buttonValue) {
     width = width + buttonValue;
     myProgress[prgbarNumber].style.width = width + "%";
     myProgress[prgbarNumber].innerHTML = width + "%";
    if (width >= limit) {
      console.log(
        "my: ",
        myProgress[prgbarNumber],
        "prgbarNumber:",
        prgbarNumber
      );
      myProgress[prgbarNumber].style.width = limit + "%";
      myProgress[prgbarNumber].innerHTML = limit + "%";
      myProgress[prgbarNumber].className = "myProgress red-bar space";
    } else if(width <= 0 ){
      width = 0;
      myProgress[prgbarNumber].style.width = width + "%";
      myProgress[prgbarNumber].innerHTML = width + "%";
    }
  }
});
