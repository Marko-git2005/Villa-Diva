const slides = document.querySelectorAll(".slides img"); 
let slideIndex = 0; 

function showSlide(){
    if (slideIndex >= slides.length){
        slideIndex = 0; 

    }
    else if(slideIndex<0){
        slideIndex = slides.length-1; 

    }
    slides.forEach(slide =>{
        slide.style.display = "none"; 

    });
    slides[slideIndex].style.display = "block"; 
    
}
function goNext(){
    slideIndex ++; 
    showSlide(slideIndex); 
    console.log(slideIndex); 
}
function goPrevious(){
    slideIndex --; 
    showSlide(slideIndex); 
}

showSlide(slideIndex); 

