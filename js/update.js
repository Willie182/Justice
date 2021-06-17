function SelectClients(){
    $.ajax({

        url : 'http://justice.service.cleverapps.io/GetEdit.php',
        type : 'POST',
        data: {'action' : 'Select'},
        success : function (resultstring) {
            const result = JSON.parse(resultstring);
            var x = document.getElementById("ClientSelect");
            var option = document.createElement("option");
                option.text = "";
                option.value = 0;
                x.add(option);
            for (var i = 0; i < result.length; i++) {
                console.log(result[i].First_Name);
                var option = document.createElement("option");
                option.text = result[i].First_Name + " " + result[i].Last_Name;
                option.value = result[i].ID;
                x.add(option);
            }
        }
    });
}

function GetClients(){
    var id = document.getElementById("ClientSelect").value;
    $.ajax({

        url : 'http://justice.service.cleverapps.io/GetEdit.php',
        type : 'POST',
        data: {'action' : 'GetClient', 'ID' : id},
        success : function (resultstring) {
            console.log(resultstring);
            const result = JSON.parse(resultstring);
            console.log(result);
            document.getElementById("fname").value = result[0].First_Name;
            document.getElementById("lname").value = result[0].Last_Name;
            document.getElementById("phone").value = result[0].Phone;
            document.getElementById("aphone").value = result[0].Alternate_Phone;
            document.getElementById("email").value = result[0].Email;

        }
    });
}

function EditClient(){
    var id = document.getElementById("ClientSelect").value;
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
    if (id == 0){
        ShowMsg("Please select a Client");
        err = "T";
    }

    if (err == "F"){
        $.ajax({

            url : 'http://justice.service.cleverapps.io/GetEdit.php',
            type : 'POST',
            data: {'action' : 'Update', 'ID' : id, 'fname' : fname, 'lname' : lname, 'phone' : phone, 'aphone' : aphone, 'email' : email},
            success : function (result) {
                ShowMsg(result);
                ClearSelect();
                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("aphone").value = "";
                document.getElementById("email").value = "";
                
            }
        });
    }
}

function ClearSelect(){
var select = document.getElementById("ClientSelect");
var length = select.options.length;
for (i = length-1; i >= 0; i--) {
select.options[i] = null;
}
SelectClients();
}


function ShowMsg(msg){
var x = document.getElementById("snackbar");
            x.innerHTML = msg;
              x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}