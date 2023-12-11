// Contents of dynamic-title.js
const csgTitle = document.getElementById("csg-title");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

csgTitle.onlo
csgTitle.onmouseover = event => {
    let iteration = 0;
  
    clearInterval(interval);
  
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / .5;
    }, 30);
}

const aboutCsg = document.getElementById("about-csg");

aboutCsg.onmouseover = event => {
    let iteration = 0;
  
    clearInterval(interval);
  
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / .8;
    }, 30);
}

const ourVision = document.getElementById("our-vision");

ourVision.onmouseover = event => {
    let iteration = 0;
  
    clearInterval(interval);
  
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / .8;
    }, 30);
}

const researchAreas = document.getElementById("research-areas");

researchAreas.onmouseover = event => {
    let iteration = 0;
  
    clearInterval(interval);
  
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / .8;
    }, 30);
}

const coursesOffered = document.getElementById("course-offered");

// coursesOffered.onmouseover = event => {
//     let iteration = 0;
  
//     clearInterval(interval);
  
//     interval = setInterval(() => {
//       event.target.innerText = event.target.innerText
//         .split("")
//         .map((letter, index) => {
//           if(index < iteration) {
//             return event.target.dataset.value[index];
//           }
        
//           return letters[Math.floor(Math.random() * 26)];
//         })
//         .join("");
      
//       if(iteration >= event.target.dataset.value.length){ 
//         clearInterval(interval);
//       }
      
//       iteration += 1 / .8;
//     }, 30);
// }
// const notableAlumni = document.getElementById("notable-alumni");

// notableAlumni.onmouseover = event => {
//     let iteration = 0;
  
//     clearInterval(interval);
  
//     interval = setInterval(() => {
//       event.target.innerText = event.target.innerText
//         .split("")
//         .map((letter, index) => {
//           if(index < iteration) {
//             return event.target.dataset.value[index];
//           }
        
//           return letters[Math.floor(Math.random() * 26)];
//         })
//         .join("");
      
//       if(iteration >= event.target.dataset.value.length){ 
//         clearInterval(interval);
//       }
      
//       iteration += 1 / .8;
//     }, 30);
// }



