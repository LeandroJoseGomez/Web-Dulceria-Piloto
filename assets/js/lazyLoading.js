document.addEventListener("DOMContentLoaded", () => {
    const lazyBackgrounds = document.querySelectorAll("[data-bg]");

    // Función para establecer la imagen de fondo
    const loadBackgroundImage = (element) => {
        const bgImage = element.getAttribute("data-bg");
        if (bgImage) {
            element.setAttribute("style", `background-image: url(${bgImage});`);
            element.removeAttribute("data-bg"); // Eliminar el atributo para evitar recargas
        }
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadBackgroundImage(entry.target);
                    observer.unobserve(entry.target); // Dejar de observar el elemento una vez cargado
                }
            });
        });

        lazyBackgrounds.forEach(element => observer.observe(element));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyBackgrounds.forEach(loadBackgroundImage);
    }
});