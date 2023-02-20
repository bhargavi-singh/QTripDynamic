
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);

  const param  = new URLSearchParams(search);
 const city = (param.get('city'));
  // console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const adv = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
  const data = await adv.json();
  // console.log(data);
  return data;
}
  catch(v){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(card =>{
    var div = document.createElement('div');

    div.setAttribute("class"," col-12 col-lg-3 col-sm-6 mb-3");
    var a=document.createElement('a');
    a.setAttribute('id',`${card.id}`)
    a.href = `detail/?adventure=${card.id}`;
    var div1 = document.createElement('div');
    
    var img = document.createElement('img');
    img.src = `${card.image}`;
    var div2 = document.createElement('div');
    div1.setAttribute('class','card activity-card');
    div2.setAttribute('class' ,"card-body mt-2 col-md-12");
    var category = document.createElement("div");
    category.innerText = `${card.category}`;
    category.setAttribute('class','category-banner')
    var div3 = document.createElement('div');
    div3.setAttribute('class','d-flex justify-content-between');
    var p1= document.createElement('p');
    p1.innerText = `${card.name}`;

    var p2= document.createElement('p');
    p2.innerText = "₹" + `${card.costPerHead}`;
    var div4 = document.createElement('div');
    
    div4.setAttribute('class','d-flex justify-content-between')
    var p3= document.createElement('p');
    p3.innerText = "Duration";
    var p4= document.createElement('p');
    p4.innerText = `${card.duration}` +" Hours";

    div4.append(p3);
    div4.append(p4)
    div3.append(p1);
    div3.append(p2);


    div2.append(div3)
    div2.append(div4);
    div1.append(img);
    div1.append(category);
    div1.append(div2);
    a.append(div1);
    div.append(a);
    document.getElementById('data').append(div);
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(high);
  // console.log(list);
  let filterlist = [];
  list.filter(li =>{
    if(li.duration >= low && li.duration<=high)
    filterlist.push(li);
  })
  return filterlist
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(list);

  let array = [];
  // console.log(list);
  list.filter(fun => {
    // console.log(fun.category);
    if(categoryList.includes(fun.category))
    // if(fun.category.includes(categoryList))
    array.push(fun);
  })
  // console.log(array);
  return array;
  // let filterByCategory = 

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let arraylist = [];
  // console.log(filters["category"]);
  let array =filters["duration"].split("-");
  
  if(filters["duration"].length > 0 && filters['category'].length> 0)
  {
    
    arraylist = filterByCategory(list,filters.category);
    arraylist = filterByDuration(arraylist,parseInt(array[0]),parseInt( array[1]));
  }
  else if(filters["duration"].length > 0)
  {
    arraylist = filterByDuration(list,array[0],array[1]);
    // console.log(array[0]);
  }
  else if(filters.category.length > 0)
  {
    arraylist = filterByCategory(list,filters.category);
  }
  else{
    return list;
  }


  // console.log(filters);
  // console.log(list);

  
  // Place holder for functionality to work in the Stubs
  return arraylist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return (JSON.parse(window.localStorage.getItem('filters')));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let listofCat = filters['category'];
  // console.log(listofCat);


  let newarray = [];
  for(let i=0;i<listofCat.length;i++)
  {
    newarray.push(listofCat[i]);
  }
  for(let i=0;i<newarray.length;i++)
  {
    // console.log(newarray[i]);
    let div = document.createElement('div');
    div.setAttribute('class','category-filter');

    div.innerText = newarray[i];

    document.getElementById('category-list').append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
