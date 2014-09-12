//variables
var clicks = 0; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially
var upgrade_speed = 0; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it

//functions
function update_total_clicks() { //updates the number of clicks   
    var e = document.getElementById("total_clicks");
    e.innerHTML = clicks;
}
function buy_something(c, button) {
    if (clicks < c) {
        button.className = 'btn btn-danger';
        setTimeout(function () {
            var e = document.getElementsByClassName("btn-danger")[0];
            e.className = 'btn btn-success';
        }, 1000);
        return false;
    }
    clicks -= c;
    return true;
}
function update_workers() {
    var e2 = document.getElementById("time_period");
    e2.innerHTML = parseFloat(click_rate/1000.0).toFixed(2);
    clearInterval(interval_auto);
    interval_auto = setInterval(function () { 
        clicks += auto_clicks;
           update_total_clicks(); 
    }, click_rate);
}

//click events
document.getElementById("click").onclick =    function() {  
    clicks++; 
    update_total_clicks(); //updates the text
};
document.getElementById("buy_click").onclick =    function() {  
    if (!buy_something(cost, this)) return;
    auto_clicks++; 
    cost = Math.pow(2, auto_clicks); //new cost
    update_total_clicks();

    var e = document.getElementById("clicks_per_second");
    e.innerHTML = auto_clicks; 
    var e2 = document.getElementById("buy_click");
    e2.innerHTML = 'Buy for ' + cost;
    var e2 = document.getElementById("autoclicker_level");
    e2.innerHTML = 'lvl  ' + auto_clicks;
};
document.getElementById("upgrade_speed").onclick =    function() {
    var upgrade_cost =  (Math.pow(3, upgrade_speed)) * 100;
    if (!buy_something(upgrade_cost, this)) return;
    upgrade_speed++; 
    click_rate = click_rate * .90;
    update_workers();

    var e2 = document.getElementById("upgrade_speed");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, upgrade_speed)) * 100);
    var e2 = document.getElementById("speed_level");
    e2.innerHTML = 'lvl  ' + upgrade_speed;
};

//start our autoclickers
update_workers();
