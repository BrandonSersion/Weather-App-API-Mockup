function ask_city() {
    var broken = false;
    var url = "";
    $(".quiet").hide();
    $(".quiet2").hide();
    $(".quiet3").hide();
    $(".quiet4").hide();

    if ($("#city").val() == "") {
        broken = true;
        $(".quiet2").show();
    }
    if ($("#country").val().length != 2) {
        broken = true;
        $(".quiet").show();
    }

    if (broken == false) {
        city = $("#city").val();
        if (city == null) {
            $(".quiet3").show();
        } else {
            country = $("#country").val();
            make_url();
            query_api();
        }
    }
}

function make_url() {
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=9ad2dca0dd370f1b2b0a290fac0d1524";
}

function query_api() {
    $.get(url, function(response) {
        var data = response;
        $("#location").html(data.name);
        $("#min").html("Low : " + convert_temp(data.main.temp_min) + " F");
        $("#max").html("High : " + convert_temp(data.main.temp_max) + " F");
        $("#now").html("Temp : " + convert_temp(data.main.temp) + " F");
        $("#desc").html(convert_case(data.weather[0].description));
    });
}

function convert_temp(k) {
    var temp = k * (9 / 5) - 459.67;
    return Math.round(temp);
}

function convert_case(str) {
    for (var i = 0; i < str.length; i++) {
        return str[0].toUpperCase() + str.slice(1);
    }
}
$(".quiet").hide();
$(".quiet2").hide();
$(".quiet3").hide();
$(".quiet4").hide();
$("#btn").click(ask_city);

