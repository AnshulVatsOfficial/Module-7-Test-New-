//Displaying IP Address
let top_text = document.getElementById("my_top_text");
let ip_address = "";
$.getJSON("https://api.ipify.org?format=json", function (data) {
  ip_address = ip_address + "MY Public IP Address: " + data.ip;
  // console.log(ip_address);
  top_text.innerHTML = ip_address;
});

//Displaying IP Address in another field also
let get_data = document.getElementById("get_data_btn");
let flag = false;

get_data.addEventListener("click", () => {
  if (flag == false) {
    document.getElementById("fetched_data").style.display = "block";
    document.getElementById("fetched_data_ip").innerText = ip_address;
    document.getElementById("po-div").style.display = "block";
    flag = true;
  } else {
    document.getElementById("fetched_data").style.display = "none";
    document.getElementById("po-div").style.display = "none";
    flag = false;
  }
});

//Displaying geolocation information and location on google map
let time_zone = "";
let our_time = "";
let my_loc = "",
    lat = "",
    long = "";
let latitude = document.getElementById("lat");
let longitude = document.getElementById("long");
let date_time = document.getElementById("date_and_time");
let my_map = document.getElementById("my_map");
let pin_code = "";

$.getJSON(
  `https://ipinfo.io/${ip_address}?token=f85f11d3118d5b`,
  function (data) {
    console.log(data);
    my_loc = data.loc.split(",");
    lat = my_loc[0];
    long = my_loc[1];
    latitude.innerHTML = "Lat: " + lat;
    document.getElementById("city").innerHTML = "City: " + data.city;
    longitude.innerHTML = "Long: " + long;
    my_map.setAttribute("src", `https://maps.google.com/maps?q=${lat},${long}&output=embed`);
    document.getElementById("region").innerHTML = "Region: " + data.region;
    document.getElementById("org").innerHTML = "Organisation: " + data.asn.asn;
    document.getElementById("timezone").innerHTML = "TimeZone: " + data.timezone;
    document.getElementById("hostname").innerHTML = "Hostname: " + data.asn.name;
    our_time = data.timezone;
    document.getElementById("pincode").innerHTML = "Pincode: " + data.postal;
    pin_code += data.postal;
  },
  "json"
);

let user_time = "";
let getTime = function () {
  user_time = new Date().toLocaleString("en-US", { time_zone: our_time });
  document.getElementById("date_and_time").innerHTML = "Date and Time: " + user_time;
};
setInterval(getTime, 1000);

setTimeout(() => {
  fetch(`https://api.postalpincode.in/pincode/${pin_code}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("message").innerHTML = "Message: Number of pincode(s) found: " + data[0].Message;
      let post_office_details = "";
      data[0].PostOffice.map((value) => {
        post_office_details += `<div class="col-12 col-md-6 box mb-5 mx-3">
            <div>
                <p>Name : <span id="name">${value.Name}</span></p>
                <p>Branch Type : <span id="Branch Type"> ${value.BranchType}</span></p>
                <p>Delivery Status : <span id="Delivery Status"> ${value.DeliveryStatus}</span></p>
                <p>District : <span id="District"> ${value.District}</span></p>
                <p>Division : <span id=Division"> ${value.Division}</span></p>
            </div>
            </div>`;
        document.getElementById("post-offices").innerHTML = post_office_details;
      });
    });
}, 1500);

document.querySelector(".filter_box").addEventListener("keyup", ()=>{
  debugger;
  let input, filter, li, i;
  input = document.querySelector(".filter_box");
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName("box");
  for (i = 0; i < li.length; i++) {
    let title = li[i].querySelector(".postValues");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      li[i].classList.remove("d-none");
    } else {
      li[i].classList.add("d-none");
    }
  }
});
