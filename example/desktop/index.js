import ReactDOM from 'react-dom';
import React from 'react';
import DeskTop from './desktop';
import style from '../../utils/style' 
import Fetch from '../../utils/fetch' 



// async function getData(){
// 	try {
// 	  let response = await Fetch('./getJSON',{timeout:10000});
// 	  response.json().then((re)=>{
// 			console.log(re);
// 	  });
// 	} catch(e) {
// 	  console.error(e);
// 	}
// }


// getData();

Fetch('./getJSON',{timeout:10000})
.then((res)=>{return res.json()})
.then((data)=>{
	console.log(data)
}).catch((e)=>{
	console.log(e);
});


Fetch('./postJSON',{method:"POST",body:JSON.stringify({s:"ss","name":"huxiaozhong"})})
.then((res)=>{return res.json()})
.then((data)=>{
	console.log(data)
}).catch((e)=>{
	console.log(e);
});;





style._shipei();
ReactDOM.render(<DeskTop/>,
   		 document.getElementById('xz-lightapp-root'));