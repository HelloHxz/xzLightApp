import ReactDOM from 'react-dom';
import React from 'react';
import DeskTop from './desktop';
import style from '../../utils/style' 
import Fetch from '../../utils/fetch' 





// function deleteData() {
//   return fetch("./getJSON", {
//     method: 'GET',
//   })
//   .then(function(response) { return response.json(); })
//   .then(response => {
//   	console.log(response);
//   });
// }

// deleteData();




// async function getData(){
// 	try {
		
// 	  let response = await Fetch('./getJSON');

// 	  console.log("--->>");

// 	  let data = response.json();
// 	  console.log(data);
// 	  return response;
// 	} catch(e) {
// 	  console.log("Oops, error", e);
// 	}
// }


// getData();

// async function f() {
//   return await 123;
// }

// f().then(v => console.log(v))

style._shipei();
ReactDOM.render(<DeskTop/>,
   		 document.getElementById('xz-lightapp-root'));