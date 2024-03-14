function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}
/* Start of Portfolio Section */
/* Start of Portfolio Filter and Popup */
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* Filter Portfolio Items */
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            //deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //activate new 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // Filter out unwanted elements and get the portfolioItem index
            const portfolioItems = Array.from(portfolioItem.parentElement.children)
                .filter(item => item.classList.contains("portfolio-item"));
            itemIndex = portfolioItems.indexOf(portfolioItem);
            //console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            //convert screenshots into array
            screenshots = screenshots.split(",");
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* activate loader until the popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            // deactivate loader after the popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

})();
/* End of Portfolio Filter and Popup */
/* End of Portfolio Section */