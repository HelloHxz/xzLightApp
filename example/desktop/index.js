import ReactDOM from 'react-dom';
import React from 'react';
import DeskTop from './desktop';
import style from '../../utils/style' 
import Fetch from '../../utils/fetch' 



async function getData(){
	try {
	  let response = await Fetch('./getJSON',{timeout:10000});
	  let data = response.json();
	  data.then((re)=>{
			console.log(re);
	  });
	} catch(e) {
	  console.error(e);
	}
}


getData();

async function f() {
  return await 123;
}

f().then(v => console.log(v))

style._shipei();
ReactDOM.render(<DeskTop/>,
   		 document.getElementById('xz-lightapp-root'));