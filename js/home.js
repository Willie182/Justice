function GetClients(){
    $.ajax({

        url : 'http://justice.service.cleverapps.io/data.php',
        type : 'GET',
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
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i].replace("_", " ");
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < result.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = result[i][col[j]];
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