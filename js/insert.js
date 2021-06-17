function AddClient(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var phone = document.getElementById("phone").value;
    var aphone = document.getElementById("aphone").value;
    var email = document.getElementById("email").value;
    var err = "F";
    if (email == ""){
        ShowMsg("Please add a email");
        err = "T";
    }
    if (phone == ""){
        ShowMsg("Please add a phone number");
        err = "T";
    }
    if (lname == ""){
        ShowMsg("Please add last name");
        err = "T";
    }
    if (fname == ""){
        ShowMsg("Please add first name");
        err = "T";
    }

    if (err == "F"){
        $.ajax({

            url : 'http://justice.service.cleverapps.io/insert.php',
            type : 'POST',
            data: {'fname' : fname, 'lname' : lname, 'phone' : phone, 'aphone' : aphone, 'email' : email},
            success : function (result) {
                ShowMsg(result);
                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("aphone").value = "";
                document.getElementById("email").value = "";
            }
        });
    }
}


function ShowMsg(msg){
var x = document.getElementById("snackbar");
            x.innerHTML = msg;
              x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}