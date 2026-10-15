document.addEventListener("DOMContentLoaded", () => {
    const row = document.querySelector(".row");

    function createFirstCard() {
        const card = document.createElement("article");
        card.classList.add("fact-card");

        const imageWrap = document.createElement("div");
        imageWrap.classList.add("fact-image");

        const image = document.createElement("img");
        image.alt = "";

        const body = document.createElement("div");
        body.classList.add("fact-body");

        const meta = document.createElement("div");
        meta.classList.add("fact-meta");

        const number = document.createElement("span");
        number.classList.add("fact-number");

        const category = document.createElement("span");
        category.classList.add("fact-category");

        const title = document.createElement("h3");
        const text = document.createElement("p");

        meta.append(number, category);
        body.append(meta, title, text);
        imageWrap.append(image);
        card.append(imageWrap, body);

        return card;
    }

    function fillCard(card, fact, index) {
        const image = card.querySelector("img");
        const number = card.querySelector(".fact-number");
        const category = card.querySelector(".fact-category");
        const title = card.querySelector("h3");
        const text = card.querySelector("p");

        image.src = fact.image;
        image.alt = fact.title;

        number.textContent = String(index + 1).padStart(2, "0");
        category.textContent = fact.category;
        title.textContent = fact.title;
        text.textContent = fact.text;
    }

    const firstCard = createFirstCard();
    fillCard(firstCard, facts[0], 0);
    row.append(firstCard);

    for (let i = 1; i < facts.length; i++) {
        const clonedCard = firstCard.cloneNode(true);

        fillCard(clonedCard, facts[i], i);

        row.append(clonedCard);
    }

    const animatedElements = document.querySelectorAll(
        ".fact-card, .reveal"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    const cards = document.querySelectorAll(".fact-card");

    cards.forEach((card, index) => {
        card.style.setProperty("--delay", `${(index % 3) * 90}ms`);
    });

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            const target = document.querySelector(selector);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const topButton = document.querySelector(".to-top");

    window.addEventListener("scroll", () => {
        topButton.classList.toggle(
            "show",
            window.scrollY > 500
        );
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });
}); 