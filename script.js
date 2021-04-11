//bootstrap link added using custom defined function
let linkElement=createDomMani("link","rel=stylesheet","href=https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css","integrity=sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2","crossorigin=anonymous")

document.head.append(linkElement);

//custom defined function
function createDomMani(...arr){
    var element1=document.createElement(arr[0]);
    for(let iter=1;iter<arr.length;iter++){
        if(arr[iter].includes("=")){
        let attreibute,attributename;
        [attreibute,attributename]=arr[iter].split("=");
        element1.setAttribute(attreibute,attributename);
        }
        else{
            element1.innerHTML=arr[iter];
       }    
    }
    return element1;
}
// navigation bar for the top of the web page
let brandLink = createDomMani("a","class=navbar-brand","href=index.html","style=font-size:larger","User Info Org");
    
let buttonlink = createDomMani("button","class=navbar-toggler","type=button","data-toggle=collapse","data-target=#navbarNav", "aria-controls=navbarNav","aria-expanded=false","aria-label=Toggle navigation");
let spanLink=createDomMani("span","class=navbar-toggler-icon");
buttonlink.append(spanLink);

brandLink.append(buttonlink);

let collapseNavBar = createDomMani("div","class=collapse navbar-collapse","id=navbarNav");

let unorderedList = createDomMani("ul","class=navbar-nav");

let listItem1 = createDomMani("li", "class=nav-item active")
let a1 = createDomMani("a","class=nav-link","href=index.html","Home")
    
let span1 = createDomMani("span","class=sr-only","(current)")
    
a1.append(span1);
listItem1.append(a1);

unorderedList.append(listItem1);

collapseNavBar.append(unorderedList);

brandLink.append(collapseNavBar);


// This is for creating a card list 
let nav = createDomMani("nav","class=navbar navbar-expand-lg navbar-light bg-light");
nav.append(brandLink);
document.body.append(nav);

let divContainer=createDomMani("div","class=container");
let rowElement=createDomMani("div","class=row","id=row");
let cardDeckElement=createDomMani("div","class=card-group");
rowElement.append(cardDeckElement);
divContainer.append(rowElement);
document.body.append(divContainer);

fetch('https://restcountries.eu/rest/v2/all')
.then(response => response.json())
.then(data=>{
    
    partOfData=data.slice(100,112);
    
    partOfData.forEach(obj => {
       
        let colElement = createDomMani("div","class=col-sm-4"); //,"style=border-style:none" border-style:none
        let cardElement = createDomMani("div", "class=card","style=padding:20px");
        let h4 = createDomMani("h4",`${obj.name}`);
        let cardHeaderElement = createDomMani("div","class=card-header card-title","id=cardHeader");
        cardHeaderElement.append(h4);

        let flagImage  = createDomMani("img","class=card-img-top","width=100%","height=170px",`src=${obj.flag}`)
        let cardBodyElement = createDomMani("div", "class=card-body",);
        
        var h5 = createDomMani("h5", `Region: ${obj.region}`);
        let h51 = createDomMani("h5",`Lat, Long: ${obj.latlng[0].toFixed(2)}, ${obj.latlng[1].toFixed(2)}`);
        let h52 = createDomMani("h5",`Capital: ${obj.capital}`)
        let h53 = createDomMani("h5",`Country Code: +${obj.callingCodes}`);
        let pelement=createDomMani("p",`id=weatherElement${obj.numericCode}`); 
  
        var cardFooter = createDomMani("div", "class=card-footer");
        var buttonElement=createDomMani("button","class=btn btn-primary",`onclick=weatherData(${obj.latlng[0]},${obj.latlng[1]},${obj.numericCode})`,'data-target=#myModal1','data-toggle=modal',"weather data");
        /*<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-target
  </button>
  <div class="collapse" id="collapseExample">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>*/
        
        cardBodyElement.append(h5,h51,h52,h53,pelement);
        
        cardFooter.append(buttonElement);
        cardElement.append(cardHeaderElement,flagImage,cardBodyElement,cardFooter);
        colElement.append(cardElement);
        cardDeckElement.append(colElement);  
    });

    
    
}).catch(err=>console.log(err));

function weatherData(lat,lng,numericCodeArgu){
   
    let url_weather=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=27919e10a7ca047faaa34fed69e5c05a`;
    fetch(url_weather)
    .then(response=>response.json())
    .then(data=>{
        
        let h55=createDomMani("h5",`Temperature: ${(data.main.temp-273).toFixed(2)} C`)
        let h56=createDomMani("h5",`Feels Like: ${(data.main.feels_like-273).toFixed(2)} C`)
        let h57=createDomMani("h5",`Humidity: ${data.main.humidity}`)
        let h58=createDomMani("h5",`General Weather: ${data.weather[0].description}`)
        let h59 = createDomMani("h5",`Wind speed: ${data.wind.speed}`)
        let button2Element = createDomMani("button",`onclick=weatherDel(${numericCodeArgu})`,"x")
        document.getElementById(`weatherElement${numericCodeArgu}`).append(h55,h56,h57,h58,h59,button2Element)
    })
    .catch(err=>console.log(err))
}

function weatherDel(numericCodeArgu){
    let parentElement=document.getElementById(`weatherElement${numericCodeArgu}`)
   
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    }
}
