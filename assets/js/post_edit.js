/**
 * Created by avinash on 5/3/17.
 */

window.onload = function () {
    accessToken = localStorage.getItem("access_token");
    var obj = new Object();
    obj.manager_id = accessToken;

    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/get_all_posts",
        obj,
        function (data, status) {
            JSON.stringify(data);
            posts = data;
            var i = 0;
            var rows = "";
            for (i = 0; i < data.length; i++) {
                rows += "<div class='alert alert-info' data-notify='container'><h3 class='title'>"
                    + data[i].title + "</h3><span data-notify='message'>"+ data[i].desc +"</span></div><br/>"
            }

            var tbody = document.getElementById("response_data");
            tbody.innerHTML = rows;

        });
}