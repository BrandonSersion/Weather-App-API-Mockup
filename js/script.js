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
    .then((resp) => resp.json())
    .then(function(resp) 
    {
        let min = convert_temp(resp.main.temp_min);
        document.getElementById('low').innerHTML = "Low: " + min;

        let max = convert_temp(resp.main.temp_max);
        document.getElementById('high').innerHTML = "High: " + max;

        let now = convert_temp(resp.main.temp);
        document.getElementById('now').innerHTML = "Now: " + now;

        let desc = resp.weather[0].description;
        document.getElementById('desc').innerHTML = desc;
    });
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
}
    
function validate_country_code(country_code)
{
    if(country_code.length == 0)
    {
        return "Country code can't be empty.";
    }
    else if(country_code.length != 2)
    {
        return "Country code should be 2 characters long (i.e. US). ";
    }
}

// helper functions
function convert_temp(kelvin)
{
    let farenheit = kelvin * (9 / 5) - 459.67;
    return Math.round(farenheit);
}

function capitalize_first_letters(str)
{
    for (var i = 0; i < str.length; i++) 
    {
        return str[0].toUpperCase() + str.slice(1);
    }
}


// main
function get_weather(url)
{   
    var elements = [];
    var city_error = undefined;
    var country_code_error = undefined;

    elements = get_elements();
    city_error = validate_city(elements[0]);
    country_code_error = validate_country_code(elements[1]);

    console.log(city_error);
    console.log(country_code_error);

    if(city_error == undefined && country_code_error == undefined)
    {
        var url = create_url(elements[0], elements[1]);
        fetch_weather(url);
    }
}