var deleteBtnCompany = document.getElementById('deleteBtn')
var id = deleteBtnCompany.getAttribute('data-id');
deleteBtnCompany.addEventListener("click",function(){
  fetch('http://localhost:3000/deleteCompany/'+id,{method:'DELETE'})
  .then(response => response.json())
  .then(data => console.log(data));
  console.log("Boton delete clicked"+id);
});


//todo add fetch to delete menu