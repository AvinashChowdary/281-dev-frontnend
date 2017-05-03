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
                rows += "<tr id='row" + i + "'><th id='projectname" + i + "'>" + data[i].projectname + "</th><th id='version" + i + "'>" +
                    data[i].version + "</th><th id='template" + i + "'>" + data[i].template + "</th><th id='desc" + i + "'>" +
                    data[i].desc + "</th>" + "<td>" + "<input style='display: block;' type='button' id='edit_button" + i + "'" + "value='Edit' class='edit btn btn-primary' onclick='edit_row(" + i + ")'>" + "<input style='display: block;' type='button' id='save_button" + i + " 'value='Save' class='save btn btn-primary' onclick='save_row(" + i + ")'>" + "<input style='display: block;'type='button' value='Delete' class='delete btn btn-primary' onclick='delete_row(" + i + ")'>" + "</td></tr>";
            }
            //document.getElementById("edit_button").style.display="none";
            var tbody = document.getElementById('itemlist');
            tbody.innerHTML = rows;

        });
}