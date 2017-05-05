var projects = "";
var accesstoken = "";

function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    // document.getElementById("save_button"+no).style.display="block";

    var name = document.getElementById("projectname" + no);
    var version = document.getElementById("version" + no);
    var template = document.getElementById("template" + no);
    var desc = document.getElementById("desc" + no);

    var name_data = name.innerHTML;
    var version_Data = version.innerHTML;
    var template_Data = template.innerHTML;
    var desc_Data = desc.innerHTML;

    name.innerHTML = "<input type='text' id='projectname_text" + no + "' value='" + name_data + "'>";
    version.innerHTML = "<input type='text' id='version_text" + no + "' value='" + version_Data + "'>";
    template.innerHTML = "<input type='text' id='template_text" + no + "' value='" + template_Data + "'>";
    desc.innerHTML = "<input type='text' id='desc_text" + no + "' value='" + desc_Data + "'>";
}

function save_row(no) {
    var name_val = document.getElementById("projectname_text" + no).value;
    var version_val = document.getElementById("version_text" + no).value;
    var template_val = document.getElementById("template_text" + no).value;
    var desc_val = document.getElementById("desc_text" + no).value;

    var updateObj = new Object();
    updateObj.projectname = name_val;
    updateObj.version = version_val;
    updateObj.template = template_val;
    updateObj.desc = desc_val;
    updateObj.manager_id = localStorage.getItem("access_token");
    updateObj.project_id = projects[no]._id;

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/update_project",
        updateObj, function (data, status) {
            if (data.result) {
                document.getElementById("projectname" + no).innerHTML = name_val;
                document.getElementById("version" + no).innerHTML = version_val;
                document.getElementById("template" + no).innerHTML = template_val;
                document.getElementById("desc" + no).innerHTML = desc_val;

                document.getElementById("edit_button" + no).style.display = "block";
            }
        });
    // document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no) {
    var deleteObj = new Object();
    deleteObj.project_id = projects[no]._id;
    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/delete_project",
        deleteObj, function (data, status) {
            if (data.result) {
                document.getElementById("row" + no + "").outerHTML = "";
            }
        });
}

function testerClicked(no) {
    localStorage.setItem("project_id", projects[no]._id);
    window.location.href = "customers.html";
}

window.onload = function () {
    accessToken = localStorage.getItem("access_token");
    var obj = new Object();
    obj.manager_id = accessToken;

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/get_all_projects",
        obj,
        function (data, status) {
            JSON.stringify(data);
            projects = data;
            var i = 0;
            var rows = "";
            for (i = 0; i < data.length; i++) {
                rows += "<tr id='row" + i + "'><td id='projectname" + i + "'>" + data[i].projectname + "</td><td id='version" + i + "'>" +
                    data[i].version + "</td><td id='template" + i + "'>" + data[i].template + "</td><td id='desc" + i + "'>" +
                    data[i].desc + "</td>" + "<td>" + "<img style='display: block;width:30px;height:30px;' id='edit_button"
                    + i + "'" + "value='Edit' src='assets/img/ic_edit.png' onclick='edit_row(" + i + ")'>"
                    + "<img style='display: block;width:30px;height:30px;' id='save_button"
                    + i + " 'value='Save' src='assets/img/ic_save.png' onclick='save_row(" + i + ")'>"
                    + "<img style='display: block;width:30px;height:30px;' src='assets/img/ic_delete.png' value='Delete' onclick='delete_row(" + i + ")'>"
                    + "</td>"
                    + "<th>"
                        +"<img style='display: block;width:40px;height:40px;' src='assets/img/ic_tester.png' value='Delete' onclick='testerClicked(" + i + ")'>"
                    +"</th>"
                    +"</tr>";
            }
            //document.getElementById("edit_button").style.display="none";
            var tbody = document.getElementById('itemlist');
            tbody.innerHTML = rows;

        });

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/get_all_posts",
        function (data, status) {
            JSON.stringify(data);
            posts = data;
            var i = 0;
            var count = 0;
            var accessToken = localStorage.getItem("access_token");
            for (i = 0; i < data.length; i++) {
                if (data.manager_id != accessToken) {
                    count++;
                }
            }
            document.getElementById("notify").innerHTML = count;
        });
}