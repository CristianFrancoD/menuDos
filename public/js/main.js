var deleteBtnCompany = document.getElementById('deleteBtn')
var id = deleteBtnCompany.getAttribute('data-id');
deleteBtnCompany.addEventListener("click",function(){
  console.log("Boton delete clicked"+id);
});


//todo add fetch to delete menu