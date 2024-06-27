// Get the modal
var modal = document.getElementById("adModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal and open a new tab
span.onclick = function() {
  modal.style.display = "none";
  window.open('thubanoa.com/1?z=7651228', '_blank');
}

// Display the modal ad when the page loads
window.onload = function() {
  modal.style.display = "block";
}
