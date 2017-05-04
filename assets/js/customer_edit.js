var customers = "";

function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
// document.getElementById("save_button"+no).style.display="block";

    var name = document.getElementById("name" + no);
    var email = document.getElementById("email" + no);
    var details = document.getElementById("details" + no);

    var name_data = name.innerHTML;
    var email_Data = email.innerHTML;
    var details_Data = details.innerHTML;

    name.innerHTML = "<input type='text' id='name_text" + no + "' value='" + name_data + "'>";
    email.innerHTML = "<input type='text' id='email_text" + no + "' value='" + email_Data + "'>";
    details.innerHTML = "<input type='text' id='details_text" + no + "' value='" + details_Data + "'>";
}

function save_row(no) {
    var name_val = document.getElementById("name_text" + no).value;
    var email_val = document.getElementById("email_text" + no).value;
    var details_val = document.getElementById("details_text" + no).value;

    var updateObj = new Object();
    updateObj.username = name_val;
    updateObj.email = email_val;
    updateObj.details = details_val;
    updateObj.manager_id = localStorage.getItem("access_token");
    updateObj.customer_id = customers[no]._id;

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/update_customer",
        updateObj, function (data, status) {
            if (data.result) {
                document.getElementById("name" + no).innerHTML = name_val;
                document.getElementById("email" + no).innerHTML = email_val;
                document.getElementById("details" + no).innerHTML = details_val;

                document.getElementById("edit_button" + no).style.display = "block";
            }
        });
// document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no) {
    var deleteObj = new Object();
    deleteObj.customer_id = customers[no]._id;
    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/delete_customer",
        deleteObj, function (data, status) {
            if (data.result) {
                document.getElementById("row" + no + "").outerHTML = "";
            }
        });
}

window.onload = function () {
    accessToken = localStorage.getItem("access_token");
    var obj = new Object();
    obj.manager_id = accessToken;
    obj.project_id = localStorage.getItem("project_id");

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/get_all_customers",
        obj,
        function (data, status) {
            JSON.stringify(data);
            customers = data;
            var i = 0;
            var rows = "";
            for (i = 0; i < data.length; i++) {
                rows += "<tr id='row" + i + "'><td id='name" + i + "'>" + data[i].username + "</td><td id='email" + i + "'>" +
                    data[i].email + "</td><td id='details" + i + "'>" + data[i].details + "</td>" + "<td>" + "<img style='display: block;width:30px;height:30px;' id='edit_button"
                    + i + "'" + "value='Edit' src='assets/img/ic_edit.png' onclick='edit_row(" + i + ")'>"
                    + "<img style='display: block;width:30px;height:30px;' id='save_button"
                    + i + " 'value='Save' src='assets/img/ic_save.png' onclick='save_row(" + i + ")'>"
                    + "<img style='display: block;width:30px;height:30px;' src='assets/img/ic_delete.png' value='Delete' onclick='delete_row(" + i + ")'>"
                    + "</td></tr>";
            }
            var tbody = document.getElementById('itemlist');
            tbody.innerHTML = rows;

        });
}