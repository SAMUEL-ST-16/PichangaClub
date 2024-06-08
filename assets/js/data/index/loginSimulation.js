// loginSimulation.js

document.addEventListener("DOMContentLoaded", function() {
    // Check if the userId cookie is already set
    let userId = getCookie("userId");
    
    if (!userId) {
      // Generate a random userId for simulation
      userId = Math.floor(Math.random() * 30) + 1; // Random userId between 1 and 100
      setCookie("userId", userId, 7); // Set cookie with userId for 7 days
    }
  });
  
  // Function to set a cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Function to get a cookie by name
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }
  