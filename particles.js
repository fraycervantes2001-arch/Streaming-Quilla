const particlesContainer = document.getElementById("particles");

for(let i=0; i<60; i++){
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (3 + Math.random() * 5) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
}