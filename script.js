// async function changeColor(){
//     let[tab] = await chrome.tabs.query({active: true});
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         args: [color],
//         function: (color) => {
//             document.body.style.backgroundColor = "lightblue";
//             console.log("Changing color");
//             alert("Changing color");
//         } 
//     })
// }

// const button = document.getElementById("changeColor");
// button.addEventListener("click", changeColor);