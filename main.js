var width = 10;
var elem = document.getElementById("myBar1");
var url = "http://pb-api.herokuapp.com/bars";
var xmlhttpObject = new XMLHttpRequest();
xmlhttpObject.open("GET", url);
xmlhttpObject.send();
xmlhttpObject.addEventListener("load", function(e) {
  console.log("load...", e);
  var response = JSON.parse(e.target.response);
  for (i = 0; i <= response.buttons.length; i++) {
    limit = response.limit;
    console.log("Limit", response.limit);
    document.getElementsByTagName("button")[i].innerHTML = response.buttons[i];
  }
});

function sel() {
  var item = document.getElementById("prg").value;
  if (item === "Progress1") {
    width=10;
    elem = document.getElementById("myBar1");
  } else if (item === "Progress2") {
    width = 10;
    elem = document.getElementById("myBar2");
  } else {
    width =10;
    elem = document.getElementById("myBar3");
  }
}
function frame(i) {
  i = parseInt(i);
  width = width + i;
  elem.style.width = width + "%";
  elem.innerHTML = width * 1 + "%";
  console.log("in frame:", limit);
  if (width >= limit) {
    elem.style.width = limit + "%";
    elem.innerHTML = limit * 1 + "%";
    elem.className = "red-bar";
  } else if (width <= 0) {
    width = 0;
    elem.style.width = width + "%";
    elem.innerHTML = width * 1 + "%";
  }
}
