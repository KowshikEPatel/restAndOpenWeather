let linkElement=createDomMani("link","rel=stylesheet","href=https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css","integrity=sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2","crossorigin=anonymous")

document.head.append(linkElement);


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

    let nav = createDomMani("nav","class=navbar navbar-expand-lg navbar-light bg-light");
    nav.append(brandLink);
    document.body.append(nav);

    let divContainer=createDomMani("div","class=container");
    let rowElement=createDomMani("div","class=row","id=row");
    divContainer.append(rowElement);
    document.body.append(divContainer);


fetch('https://restcountries.eu/rest/v2/all')
.then(response => response.json())
.then(data=>{console.log(data);
    console.log(data[0].name,data[0].region,data[0].capital,data[0].latlng,data[0].callingCodes[0],data[0].flag)
    partOfData=data.slice(0,10);
    partOfData.forEach(obj => {
        
        let colElement = createDomMani("div", "class=col-4 mb-4");

        let cardElement = createDomMani("div", "class=card h-100");

        let cardBodyElement = createDomMani("div", "class=card-body");

        var img = createDomMani("img", `src=${obj.flag}`);
        
        var h4 = createDomMani("h4", "class=card-title",`${obj.name}`);
        
        var h5 = createDomMani("h5", `${obj.region}`);
        h5.innerHTML = obj.product_price;
  
        var pTag = createBootstrapCard("p", "card-text");
        pTag.innerHTML = obj.product_description;
  
        cardBodyElement.append(h4, h5, pTag);
  
    var cardFooter = createBootstrapCard("div", "card-footer");
    cardFooter.innerHTML = obj.rating;

        
        colElement.append(cardElement);
        
        rowElement.append(colElement);
        
        rowElement.append("Hello world!!");
    });

    
    
}).catch(err=>console.log(err));

function weatherData(lat,long){
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=33&lon=65&appid=27919e10a7ca047faaa34fed69e5c05a')
    .then(response=>response.json())
    .then(data=>{console.log(data)
    console.log(data.main.temp-273)}).catch(err=>console.log(err))
    .catch(err=>console.log(err));
}

/*
data.forEach((obj) => {
    var col = createBootstrapCard("div", "col-4 mb-4 ");
  
    var card = createBootstrapCard("div", "card h-100");
  
    var cardBody = createBootstrapCard("div", "card-body");
  
    var img = createBootstrapCard("img", "card-img-top");
    img.setAttribute("src", obj.img);
    var a = createBootstrapCard("a");
    a.append(img);
    var h4 = createBootstrapCard("h4", "card-title");
    h4.innerHTML = obj.product_name;
  
    var h5 = createBootstrapCard("h5");
    h5.innerHTML = obj.product_price;
  
    var pTag = createBootstrapCard("p", "card-text");
    pTag.innerHTML = obj.product_description;
  
    cardBody.append(h4, h5, pTag);
  
    var cardFooter = createBootstrapCard("div", "card-footer");
    cardFooter.innerHTML = obj.rating;
  
    card.append(a, cardBody, cardFooter);
  
    col.append(card);
  
    row.append(col);
  });
  
  function createBootstrapCard(elemName, elemClass = "", elemId = "") {
    var element = document.createElement(elemName);
    element.setAttribute("class", elemClass);
    element.setAttribute("id", elemId);
    return element;
  }*/
