





























// let up_btn = document.getElementById('up');
// let left_btn = document.getElementById('left');
// let rit_btn = document.getElementById('rit');
// let down_btn = document.getElementById('down');

// let canvas = document.getElementById("canvas");
// let point = canvas.getContext("2d");

// let i=225;
// let j=225;
// let step_point = 25;
// point.fillStyle = "rgb(255,105,180)";
// point.fillRect(225, 225, 50, 50);    

// console.log(
//     'before addEventListener: ' +
//     'i: ' + i +
//     ', j: ' + j
// )
 
// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowUp') {
//         console.log(
//             'keydown ArrowUp begin: ' +
//             'i: ' + i +
//             ', j: ' + j + 
//             ', j-25<=0: ' + (j-25<=0)
//         )
//         if(j<=0){
//             // i+=0 
//             return;   
//             }
//             else{
//             j-=step_point;
//             point.clearRect(0,0,600,600)
//             point.fillRect(i,j, 50, 50); 
//             }  
//         console.log(
//             'keydown ArrowUp end: ' +
//             'i: ' + i +
//             ', j: ' + j
//         )
//     }
// })

// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowDown') {
//         console.log(
//             'keydown ArrowDown begin: ' +
//             'i: ' + i +
//             ', j: ' + j + 
//             ', 25+j>=499: ' + (25+j>=499)
//         )
//         if(j>=450){
//             // i+=0 
//             return;   
//             }
//             else{
//             j+=step_point;
//             point.clearRect(0,0,600,600)
//             point.fillRect(i,j, 50, 50); 
//             }        
//         console.log(
//             'keydown ArrowDown end: ' +
//             'i: ' + i +
//             ', j: ' + j
//         )
//     }
// })

// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowLeft') {
//         console.log(
//             'keydown ArrowLeft begin: ' +
//             'i: ' + i +
//             ', j: ' + j + 
//             ', i-25<=0: ' + (i-25<=0)
//         )
  
//         if(i<=0){
//         // i+=0 
//         return;   
//         }
//         else{
//         i-=step_point;
//         point.clearRect(0,0,600,600)
//         point.fillRect(i,j, 50, 50); 
//         }     

//         console.log(
//             'keydown ArrowLeft end: ' +
//             'i: ' + i +
//             ', j: ' + j
//         )
//     }
// })

// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowRight') {
//         console.log(
//             'keydown ArrowRight begin: ' +
//             'i: ' + i +
//             ', j: ' + j + 
//             ', i+25>=500: ' + (i+25>=500)
//         )

//         if(i>=450){
//             // i+=0 
//             return;   
//             }
//             else{
//             i+=step_point;
//             point.clearRect(0,0,600,600)
//             point.fillRect(i,j, 50, 50); 
//             } 
        
//         console.log(
//             'keydown ArrowRight end: ' +
//             'i: ' + i +
//             ', j: ' + j
//         )
//     }
// })


