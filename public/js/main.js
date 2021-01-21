/*var deleteBtnCompany = document.getElementById('deleteBtn')
var id = deleteBtnCompany.getAttribute('data-id');
deleteBtnCompany.addEventListener("click",function(){
  fetch('http://localhost:3000/deleteCompany/'+id,{method:'DELETE'})
  .then(response => response.json())
  .then(data => console.log(data));
  console.log("Boton delete clicked"+id);
});*/


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}