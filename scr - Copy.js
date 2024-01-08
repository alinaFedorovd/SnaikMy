let up_btn = document.getElementById('up');
let left_btn = document.getElementById('left');
let rit_btn = document.getElementById('rit');
let down_btn = document.getElementById('down');

let canvas = document.getElementById("canvas");
let point = canvas.getContext("2d");

let i=225;
let j=225;
point.fillStyle = "rgb(255,105,180)";
point.fillRect(225, 225, 50, 50);    

 
document.addEventListener('keydown', event => {
    if(event.key === 'ArrowUp') {
        point.clearRect(0,0,600,600)
        point.fillRect(i,j-25, 50, 50); 
        if(j-25<=0){
        j+=0    
        }
        else{j-=25;} 
    }
})

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowDown') {
        point.clearRect(0,0,600,600)
        point.fillRect(i,j+25, 50, 50); 
        if(25+j>=499){
        j+=0    
        }
        else{j+=25;}    
    }
})

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft') {
        point.clearRect(0,0,600,600)
        point.fillRect(i-25,j, 50, 50); 
        if(i-25<=0){
        i+=0    
        }
        else{i-=25;} 
    }
})

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowRight') {
        point.clearRect(0,0,600,600)
        point.fillRect(i+25,j, 50, 50); 
        if(i+25>=500){
        i+=0    
        }
        else{i+=25;
        } 
    }
})





// let up_btn = document.getElementById('up');
// let left_btn = document.getElementById('left');
// let rit_btn = document.getElementById('rit');
// let down_btn = document.getElementById('down');

// let canvas = document.getElementById("canvas");
// let point = canvas.getContext("2d");
// let i=1;
// let j=25;
// point.fillStyle = "rgb(255,105,180)";
// point.fillRect(225, 225, 50, 50);    

 
// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowUp') {
//         point.clearRect(0,0,600,600)
//         point.fillRect(225,225-j, 50, 50); 
//         if(225-j<=0){
//         j+=0    
//         }
//         else{j+=25;}   
//     }
// })

// document.addEventListener('keydown', event => {
//     if(event.key === 'ArrowDown') {
//         point.clearRect(0,0,600,600)
//         point.fillRect(225,225+j, 50, 50); 
//         if(225+j>=500){
//         j+=0    
//         }
//         else{j+=25;} 
//         debugger;   
//     }
// })