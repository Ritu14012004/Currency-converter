const starting_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
   const msg =document.querySelector(".msg");

 


for (let select of dropdown) {
  for(currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText=currcode;
    newoption.value = currcode;
    if (select.name =="from" && currcode == "USD"){
      newoption.selected= "selected";
    }else if (select.name =="to" && currcode == "INR"){
      newoption.selected= "selected";

    }
    select.append(newoption);
    select.addEventListener("change" , (evt) =>{
      updateFlag(evt.target);
    })
  }
}

const updateExchangeRate = async()=>{
  let amount = document.querySelector(".amount input");
  let amtval =amount.value;
  if(amtval =="" || amtval <1){
   amtval=1;
   amount.value="1";
  }
  const url =`${starting_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let respose = await fetch(url);
  let data = await respose.json();
  let rate = data[tocurr.value.toLowerCase()];
  let finalAmount = amtval*rate;
  console.log(finalAmount);
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
}
const updateFlag = (element) => {
     let currcode = element.value;
     let countryCode = countryList[currcode];
     let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
     let img = element.parentElement.querySelector("img");
     img.src = newsrc;
}
 btn.addEventListener("click" ,   (evt)=>{
     evt.preventDefault();
     updateExchangeRate();
     
 });
 window.addEventListener("load" , () => {
  updateExchangeRate();
});

   