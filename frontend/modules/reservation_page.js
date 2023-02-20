import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  const url = `${config.backendEndpoint}` +'/reservations/'
  // Place holder for functionality to work in the Stubs
  const data = await fetch(url);
  const rs =await data.json();
  console.log(rs);
  return rs;
  
}
catch(v)
{
  return null;
}
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  let nobann = document.getElementById('no-reservation-banner');
  if(reservations.length >0)
  {
    nobann.style.display = "none";
    document.getElementById('reservation-table-parent').style.display="block"
  }
  else{
    nobann.style.display = "block";
    document.getElementById('reservation-table-parent').style.display="none"
  }

    let table = document.getElementById("reservation-table");
    reservations.forEach(ele =>{
      console.log(ele);
      var date=new Date(ele.date);
      var time=new Date(ele.time);
      var month=time.toLocaleString(undefined,{month:"long"})
      var day=time.getDate();
      var year=time.getFullYear();
      var booktime=time.toLocaleString("en-IN").split(" ");

      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${ele.id}</td>
      <td>${ele.name}</td>
      <td>${ele.adventureName}</td>
      <td>${ele.person}</td>
      <td>${date.toLocaleDateString("en-IN")}</td>
      <td>${ele.price}</td>
      <td>${day} ${month} ${year}, ${booktime[1]} ${booktime[2]}</td>
      
      <td id="${ele.id}"><a href="../detail/?adventure=${ele.adventure}">
    <button class="reservation-visit-button">Visit Adventure</button>
   </a></td>
      `

      table.append(tr)
    })
  
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
