function edit_row(no)
{
    document.getElementById("edit_button"+no).style.display="none";
    // document.getElementById("save_button"+no).style.display="block";

    var name=document.getElementById("projectname"+no);
    var version=document.getElementById("version"+no);
    var template=document.getElementById("template"+no);
    var desc=document.getElementById("desc"+no);

    var name_data=name.innerHTML;
    var version_Data=version.innerHTML;
    var template_Data=template.innerHTML;
    var desc_Data = desc.innerHTML;

    name.innerHTML="<input type='text' id='projectname_text"+no+"' value='"+name_data+"'>";
    version.innerHTML="<input type='text' id='version_text"+no+"' value='"+version_Data+"'>";
    template.innerHTML="<input type='text' id='template_text"+no+"' value='"+template_Data+"'>";
    desc.innerHTML="<input type='text' id='desc_text"+no+"' value='"+desc_Data+"'>";
}

function save_row(no)
{
    var name_val=document.getElementById("projectname_text"+no).value;
    var version_val=document.getElementById("version_text"+no).value;
    var template_val=document.getElementById("template_text"+no).value;
    var desc_val=document.getElementById("desc_text"+no).value;

    document.getElementById("projectname"+no).innerHTML=name_val;
    document.getElementById("version"+no).innerHTML=version_val;
    document.getElementById("template"+no).innerHTML=template_val;
    document.getElementById("desc"+no).innerHTML=desc_val;

    document.getElementById("edit_button"+no).style.display="block";
    // document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
    document.getElementById("row"+no+"").outerHTML="";
}