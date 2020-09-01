let data_row = document.getElementById('data_row');
let para = "100";

genrateurl = () => {
    const baseURl = "https://api.spacexdata.com/v3/launches?limit=";
    return baseURl + para;
}

genrateurlclick = (year,ele) => {
    const baseURl = "https://api.spacexdata.com/v3/launches?limit=10&launch_success=true&land_success=true&launch_year=";
    return baseURl + year;
}

genrateurltyp = (success , islaunch ) => {   
    const baseURl = islaunch ? 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' : 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success='
    if(success === 'true' || success === 'false'){
        return baseURl + success;
    }else {
        alert("Please Enter True or false to apply the filter.");
        return;
    }
}

function loadDoc(dataurL) {
    if(!dataurL){return;}
    data_row.style.opacity = "0";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var launchesData = JSON.parse(this.responseText);
           if(launchesData.length > 0){
            data_row.innerHTML = "";
             loadtamplat(launchesData);
           }else{
               alert("No data avelable for this Input !!!");
           }
           
           data_row.style.opacity = "1";
        }
    };
    xhttp.open("GET", dataurL , true);
    xhttp.send();
}

loadDoc(genrateurl(para));

loadtamplat = (data) => {

     for(let key in data){
         randerTamplet(key , data[key]);
     }
}

randerTamplet = (index , section) => {

    window.innnerArray = "";
    for(let i of section.mission_id){
        window.innnerArray += '<li>' + i + '</li>';
    }
  
    var missiondatatamp = [
        '<div class="col-sm-3">',
        '<article>',
            '<header>',
                '<img  class="img img-responsive" src="'+ section.links.mission_patch +'"/>',
            '</header>',
            '<div id="mission_data" class="data-field">',
                '<span class="misson_name">' + section.mission_name +' #'+section.flight_number + '</span>',
                '<ul id="mission_id">' + window.innnerArray + '</ul>',
                '<p><b>Launch Year:</b>'+ section.launch_year +'</b></p>',
                '<p><b>Successful Launch: </b> ' + section.launch_success + '</b></p>',
                '<p><b>Successful Landing: </b> ' + section.launch_success + '</b></p>',
            '</div>',
        '</article>',
    '</div>'
    ].join('\n');
  
    data_row.innerHTML += missiondatatamp;
} 