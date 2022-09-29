function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function AddNavBar() {
  document.getElementById("navBar").innerHTML = "<div w3-include-html=\"commonLIB/navbar.html\"></div>";
  includeHTML();
}

function UpdateROSStatus(Color, StateMsg) {
  StatusUI = document.getElementById("ROSStatus");
  StatusUI.style.color = Color;
  StatusUI.innerHTML = StateMsg;
}

function AddROSStatusIndicator() {
  ros.on("connection", function () {
    UpdateROSStatus("green", "Connected");
  });

  ros.on("error", function () {
    UpdateROSStatus("red", "ERROR");
  });

  ros.on("close", function () {
    UpdateROSStatus("orange", "Disconnected");
  });
}

const poll = ({ fn, disable, interval }) => {
  console.log('Start poll...');
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    const result = await fn();

    if (disable()) {
      setTimeout(executePoll, interval, resolve, reject);
    } else {
      return resolve(result);
    }
  };

  return new Promise(executePoll);
};
