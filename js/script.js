// main functions

function get_elements()
{
    var city = document.getElementById("city").value;
    var country_code = document.getElementById("country-code").value;
    return [city, country_code];
}

function create_url(city, country_code)
{
    const base_url = "http://api.openweathermap.org/data/2.5/weather?q=";
    const token = "&appid=9ad2dca0dd370f1b2b0a290fac0d1524";
    return base_url + city + "," + country_code + token;
}

function fetch_weather(url)
{
    fetch(url)
    .then((resp) =>
    {
        if (resp.ok)
        {
            return resp.json();
        }
        else
        {
            document.getElementById("error").innerHTML = "City not on record (check country code).";
        }
    })
    .then(function(resp) 
    {
        document.getElementsByTagName("h2")[0].innerHTML = resp.name + ", " + resp.sys.country;
        document.getElementById("low").innerHTML = "Low: " + convert_temp(resp.main.temp_min) + "&#176;F";
        document.getElementById("high").innerHTML = "High: " + convert_temp(resp.main.temp_max) + "&#176;F";
        document.getElementById("now").innerHTML = "Now: " + convert_temp(resp.main.temp) + "&#176;F";
        document.getElementById("desc").innerHTML = resp.weather[0].description;
    });
}

function clear_error()
{
    document.getElementById('error').innerHTML = "";
}

function push_error(city_error, country_code_error)
{
    document.getElementById('error').innerHTML = city_error + country_code_error;
}

// validators
function validate_city(city)
{
    if(city.length == 0)
    {
        return "City can't be empty. ";
    }
    else if(city.length > 30)
    {
        return "City too long. ";
    }
    else
    {
        return "";
    }
}
    
function validate_country_code(country_code)
{
    if(country_code.length == 0)
    {
        return "Country code can't be empty. ";
    }
    else if(country_code.length != 2)
    {
        return "Country code must be 2 characters long (i.e. US). ";
    }
    else
    {
        return "";
    }
}

// helper functions
function convert_temp(kelvin)
{
    let farenheit = kelvin * (9 / 5) - 459.67;
    return Math.round(farenheit);
}


// main
function get_weather(url)
{   
    var elements = get_elements();
    var city_error = validate_city(elements[0]);
    var country_code_error = validate_country_code(elements[1]);

    if(city_error == "" && country_code_error == "")
    {
        var url = create_url(elements[0], elements[1]);
        fetch_weather(url);
        clear_error();                
    }
    else
    {
        clear_error();
        push_error(city_error, country_code_error);
    }
}