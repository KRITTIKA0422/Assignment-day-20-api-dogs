

"use strict";
// Creating HTML Elements using DOM
const heading=document.createElement("header");
document.body.appendChild(heading);
heading.innerHTML=`<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcPMCuS8v1t1iyX6qIvtvKO352_LlxmhILcKNW9R28BylHDRii3sYkllGREZeBqlAZ03g&usqp=CAU"height=100px width=100px>Beware of Dogs<img src="https://previews.123rf.com/images/elena3567/elena35671805/elena3567180500004/100759213-cute-dog-paw-icon-symbol-protect-sign-illustration-.jpg"height=100px width=100px>`;
heading.id="title";
const description=document.createElement("p");
document.body.appendChild(description);
description.id="description";
description.innerHTML="Check out the latest pictures of dogs";
const division1=document.createElement("div");
division1.class="container";
division1.id="div1";
document.body.appendChild(division1);
const table=document.createElement("table");
table.id="our-table";
document.getElementById("div1").appendChild(table);
const tableBody=document.createElement("tbody");
tableBody.id="table-body";
document.getElementById("our-table").appendChild(tableBody);
const division2=document.createElement("div");
division2.class="container";
division2.id="div2";
document.body.appendChild(division2);
const division3=document.createElement("div");
division3.id="paraOfChange";
document.getElementById("div2").appendChild(division3);
const division4=document.createElement("div");
division4.id="button";

document.getElementById("div2").appendChild(division4);


const url = "https://dog.ceo/api/breed/hound/images";
// Fetch API()
async function hound(url) {
  const response = await fetch(url);
  var data=await response.json();
  console.log(data);
  view(data)                                 //calling function view() to display the data
 } 
let houndobject=hound(url);
houndobject
  .try(function (value) {                       //try and catch are used to check for errors
    console.log(JSON.stringify(value));
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    console.log("fetch api ran successfully !");   //promise ran successfully
  });
 
function view(data){ 
  const list=[];
  for(let i=0;i<data.message.length;i++){
    list[i] =data.message[i];                            //storing the data in another array list[]
  }
  
  
let state={
  'querySet':list,
  'page':1,
  'rows':6,
  'window':list.length,
}

buildTable();
function pagination(querySet,page,rows)                     //trimming the data and dividing the data in pages
{
    let trimStart=(page-1)*rows;
    let trimEnd=trimStart+rows;
    let trimmedData=querySet.slice(trimStart,trimEnd);
    let pages=Math.ceil(querySet.length/rows);
    return{
        'querySet':trimmedData,
        'pages':pages,
    }
  }

  function pageButtons(pages){
      var wrapper=document.getElementById('button');
      wrapper.innerHTML='';
      let maxLeft=(state.page-Math.floor(state.window/2));
      let maxRight=(state.page+Math.floor(state.window/2));
      if(maxLeft<1)
      {
          maxLeft=1;
          maxRight=state.window;
      }
      if(maxRight>pages)
      {
          maxLeft=pages-(state.window-1);
          maxRight=pages;
          if(maxLeft<1)
          {
              maxLeft=1;
          }

      }
      for(var page=maxLeft;page<=pages;page++)  //setting the button values to view different data in different pages
      {
        if(page==1)
        wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">First</button>`;

        else if(page!=1 && page!=pages)
          wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">${page}</button>`;
      else if(page==pages)
      wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">Last</button>`;
      
    }
             
          if(state.page!=1){
            wrapper.innerHTML=`<button value=${state.page-1} class="page btn btn-sm btn-info">Previous</button>`+wrapper.innerHTML;
            division3.innerHTML="Change: "+state.page;
        }
        if(state.page!=pages){
          wrapper.innerHTML+=`<button value=${state.page+1} class="page btn btn-sm btn-info">Next</button>`;
          division3.innerHTML="Change: "+state.page;
      }
     
         
      
      $('.page').on('click',function(){
          $('#table-body').empty()
          state.page=Number($(this).val());
          buildTable();
          
      })
   
  }
function buildTable(){                       //to view the data in table format in webpage
  let table=$('#table-body');
  let info=pagination(state.querySet,state.page,state.rows);
  console.log('Data:',info);
  var myList=info.querySet;
  for(let r of myList){
      let row=`<tr><td>
      <img src="${r}" width=500px height=500px></td>`
      table.append(row);
  }
  pageButtons(info.pages);
}
}