function GetClients(){
    $.ajax({

        url : 'http://justice.service.cleverapps.io/Remove.php',
            type : 'POST',
            data: {'action' : 'Get'},
        success : function (resultstring) {
            const result = JSON.parse(resultstring);
            //console.log (result); 
            var col = [];
            
            for (var i = 0; i < result.length; i++) {
                for (var key in result[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var table = document.createElement("table");
            
            table.classList.add("table");
            table.classList.add("table-striped");
            table.classList.add("table-dark");
            table.style.width = "70%";
            table.setAttribute("align", "center");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th"); 
                if (col[i] == "ID")
                {
                    th.innerHTML = "Delete";
                } 
                else{
                th.innerHTML = col[i].replace("_", " ");
                }
                tr.appendChild(th);
            }
            var th = document.createElement("th");      // TABLE HEADER.
                
                

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < result.length; i++) {
                
                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    
                    if (j == 0){
                        var val = result[i][col[j]];
                        let btn = document.createElement("button");
                        btn.innerHTML = "Delete";
                        btn.className="btn btn-danger btn-sm";
                        btn.value = val;
                        btn.onclick = function () {
                            //console.log(result[i][col[j]]);
                            DeleteClient(this.value);
                        };
                        //btn.attachEvent('OnClick',DeleteClient(val));

                        tabCell.appendChild(btn);
                    }
                    else{
                        tabCell.innerHTML = result[i][col[j]];
                    }
                }


            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

        },
    error : function () {
    console.log ('error');
    }

    });
}

function DeleteClient(id){
var result = confirm("Are you sure you want to delete?");
if (result) {
$.ajax({

    url : 'http://justice.service.cleverapps.io/Remove.php',
    type : 'POST',
    data: {'action' : 'Delete', 'ID' : id},
    success : function (result) {
        ShowMsg(result);
        GetClients();
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