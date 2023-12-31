/*start for control coding*/
var registerForm = document.querySelector("#register-form");
var allInput =registerForm.querySelectorAll("INPUT");
var AddBtn = document.querySelector("#add-btn");
var MODULE = document.querySelector(".module");
var closeBtn = document.querySelector(".close-icon");

AddBtn.addEventListener("click", () => {
  console.log("work");
  MODULE.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  MODULE.classList.remove("active");
  var i;
  for(i=0;i<allInput.length;i++){
    allInput[i].value = "";
  }
})



var userData = [];
var idE1 = document.getElementById("id");
var nameE1 = document.querySelector("#name");
var l_nameE1 = document.getElementById("l-name");
var emailE1 = document.querySelector("#email");
var officeE1 = document.querySelector("#office-code");
var jobTitleE1 = document.querySelector("#job-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.querySelector("#register-form");
var imgUrl;
var profile_pic =document.querySelector("#profile-pic");
var uploadpic= document.querySelector("#upload-field");

//start register coding
  registerBtn.addEventListener("click",(e) =>{
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset("");
  closeBtn.click();
});
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    id: idE1.value,
    name: nameE1.value,
    l_name: l_nameE1.value,
    email: emailE1.value,
    office: officeE1.value,
    jobtitle: jobTitleE1.value,
    profilePic: imgUrl == undefined ? "image/th.jpeg":imgUrl
  });
 
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registraion Success!", "success");
}
//start returning data on page from localstorage
var tabledata = document.querySelector("#tableData");

const getDataFromLocal = () => {
    tabledata.innerHTML = "";
  userData.forEach((data, index) => {
    tabledata.innerHTML +=`
    <tr index='${index}'>
                 <td>${index+1}</td>
                 <td><img src="${data.profilePic}" width="40" height="40"></td>
                 <td>${data.id}</td>
                 <td>${data.name}</td>
                 <td>${data.l_name}</td>
                 <td>${data.email}</td>
                 <td>${data.office}</td>
                 <td>${data.jobtitle}</td>
                 <td>
                       <button class="edit_btn"><i class="fa fa-eye"></i></button>
                       <button class="del_btn" style="background-color: #33B5E6;"><i class="fa fa-trash"></i></button>
                       
                   </td>
   
                   </tr>`;
  });


  /*delete coding*/
  var i;
  var allDelBtn = document.querySelectorAll(".del_btn")
  for(i=0;i<allDelBtn.length;i++){
    allDelBtn[i].onclick = function(){
        var tr = this.parentElement.parentElement;
        var id = tr.getAttribute("index");

       
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                 userData.splice(id,1);
                localStorage.setItem("userData",JSON.stringify(userData));
                tr.remove();

              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
          

       
    }
  }
}




getDataFromLocal();

//image 


uploadpic.onchange = function(){
    if(uploadpic.files[0].size<1000000){
        
        var fReader = new FileReader();
        fReader.onload=function(e){
             imgUrl=e.target.result;
            profile_pic.src=imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadpic.files[0]);
    }else{
        alert("file size is too long");
    }
}



//start search coding

var searchEl= document.querySelector("#empID");
searchEl.oninput = function(){
  searchFuc();
}
function searchFuc(){
  var tr = tabledata.querySelectorAll("TR");
  var filter = searchEl.value.toLowerCase();
  var i;
  for(i=0; i<tr.length;i++){
    var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
    var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
    var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
   
    if(id.toLowerCase().indexOf(filter) > -1){

      tr[i].style.display = "";
    }
    else if(name.toLowerCase().indexOf(filter) > -1){

      tr[i].style.display = "";
    }
    else if(email.toLowerCase().indexOf(filter) > -1){

      tr[i].style.display = "";
    }
    else{
      tr[i].style.display ="none";
    }
    
  }
}

//start clear all data
var delAllBtn  = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
  if(allDelBox.checked == true)
{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem("userData");
      window.location = location.href;

       
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
 
}
else{
  swal("check the box", "please check the box to delete data", "warning");
}
})
