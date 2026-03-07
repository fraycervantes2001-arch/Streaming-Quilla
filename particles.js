const particlesContainer=document.getElementById("particles");

for(let i=0;i<80;i++){

const particle=document.createElement("div");

particle.classList.add("particle");

particle.style.left=Math.random()*100+"vw";

particle.style.animationDuration=(4+Math.random()*6)+"s";

particle.style.animationDelay=Math.random()*5+"s";

particlesContainer.appendChild(particle);

}