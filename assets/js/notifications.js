/**
 * Created by veena on 5/4/2017.
 */
window.onload = function () {
    $.post("http://ec2-34-209-28-166.us-west-2.compute.amazonaws.com:9923/get_all_posts",
        function (data, status) {
            JSON.stringify(data);
            posts = data;
            var i = 0;
            var rows = "";
            var count = 0;
            var accessToken = localStorage.getItem("access_token");
            for (i = 0; i < data.length; i++) {
                if (data.manager_id != accessToken) {
                    rows += "<br/><div class='alert alert-info alert-with-icon' data-notify='container'>"+"<h3 class='title'>" + data[i].title + "</h3>" +
                        "<i data-notify='icon' class='material-icons'>add_alert</i>" +
                        "<span data-notify='message'>" + data[i].desc + "</span></div><br/>"
                    count++;
                }
            }

            var tbody = document.getElementById("notifications_div");
            tbody.innerHTML = rows;
            document.getElementById("notify").innerHTML=count;
        });
}
