export function setupCarousel(containerId) {
    const track = document.getElementById(containerId);
    const prevBtn = track.parentElement.querySelector(".prev-btn");
    const nextBtn = track.parentElement.querySelector(".next-btn");

    // Use 100% of the viewport width for the container
    track.parentElement.style.width = "99vw"; 
    const cardWidth = window.innerWidth * 0.375; //card width
    
    const scrollStep = cardWidth ; // Move one card at a time
    
    // Calculate the total width of the carousel track based on the container width
    const containerWidth = track.parentElement.offsetWidth;
    const totalWidth = containerWidth;

    // Set track width to the appropriate size
    track.style.width = `${totalWidth + 20}px`; // +20 for padding/gap

    nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: scrollStep, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -scrollStep, behavior: "smooth" });
    });
}


