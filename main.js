var width = 10;
var elem = document.getElementById("myBar1");
var url = "http://pb-api.herokuapp.com/bars";
var xmlhttpObject = new XMLHttpRequest();
xmlhttpObject.open("GET", url);
xmlhttpObject.send();
xmlhttpObject.addEventListener("load", function(e) {
  console.log("load...", e);
  var response = JSON.parse(e.target.response);
  var mainid = document.getElementById("main");

  // to crete ProgressBars
  for (j = 0; j < response.bars.length; j++) {
    var pr = document.createElement("div");
    pr.classList.add("myProgressC", "space");
    pr.style.width = response.bars[j] + "%";
    var innerpr = document.createElement("div");
    innerpr.classList.add("myBar1C");
    innerpr.innerHTML = response.bars[j] * 1 + "%";

    pr.appendChild(innerpr);
    mainid.appendChild(pr);
  }
  /// To create Buttons
  for (i = 0; i < response.buttons.length; i++) {
    limit = response.limit;
    console.log("Limit", response.limit);
    var but = document.createElement("button");
    but.innerHTML = response.buttons[i];
    mainid.appendChild(but);
  }

  // On changing select option setting default progress bar value
  // document.getElementById("prg").addEventListener("change", function() {
  //   for (j = 0; j < response.bars.length; j++) {
  //     if (selprg === "Progress1") {
  //       selectPrg = response.bars[0];
  //     } else if (selprg === "Progress2") {
  //       selectPrg = response.bars[1];
  //     } else if (selprg === "Progress3") {
  //       selectPrg = response.bars[2];
  //     }
  //   }
  // });
  var myProgressC = document.getElementsByClassName("myProgressC");
  var myBar1C = document.getElementsByClassName("myBar1C");

  document.activeElement.addEventListener("click", function() {
    if (document.activeElement.tagName == "BUTTON") {
      var selprg = document.getElementById("prg").value;
      buttonValue = parseInt(document.activeElement.innerHTML);
      for (j = 0; j < response.bars.length; j++) {
        if (selprg === "Progress1") {
          myProgressC[0].style.width = response.bars[0];
          myProgressC[0].style.width = parseInt(myProgressC[0].style.width) + buttonValue + "%";
          myBar1C[0].innerHTML = parseInt(myProgressC[0].style.width) + buttonValue + "%";
        } else if (selprg === "Progress2") {
          selectPrg = response.bars[1];
          myProgressC[1].style.width = parseInt(selectPrg) + buttonValue + "%";
          myBar1C[1].innerHTML = parseInt(selectPrg) + buttonValue + "%";
        } else if (selprg === "Progress3") {
          selectPrg = response.bars[2];
          myProgressC[2].style.width = parseInt(selectPrg) + buttonValue + "%";
          myBar1C[2].innerHTML = parseInt(selectPrg) + buttonValue + "%";
        }
      }
      // var width = pr.style.width.slice(0, pr.style.width.length - 1);
      // var width = parseInt(selectPrg) + parseInt(document.activeElement.innerHTML);
      // pr.style.width = width + "%";
      // innerpr.innerHTML = width + "%";
    }
  });
});

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
