function GetInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--"
    // console.log (newName,cityName)

    // will want to move getItem outside of GetInfo function
    const historyFromLocalStorage = localStorage.getItem('searchHistory');
    console.log(historyFromLocalStorage);

    const searchHistory = document.getElementById("searchHistory");
    const historyElement = document.createElement("div");
    historyElement.innerHTML = newName.value;
    searchHistory.appendChild(historyElement);

    localStorage.setItem('searchHistory', newName.value);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName.value}&appid=856b01217cf89d90d669f3ee122a823e`)
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min - 273.77).toFixed(1) + "°";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max - 273.77).toFixed(1) + "°";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            }

        })

        .catch(err => alert("Something Went Wrong"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Seattle";
    GetInfo();
}

var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}