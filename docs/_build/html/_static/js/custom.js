document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper(".profile-carousel", {
        autoHeight: true,
        rewind: true,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            colour: "#000",
        },
    });
});