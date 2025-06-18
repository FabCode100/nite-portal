    document.querySelectorAll('.carousel').forEach(carousel => {
      let currentIndex = 0;
      const track = carousel.querySelector('.carousel-track');
      const items = carousel.querySelectorAll('.carousel-item');
      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');

      function update() {
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= items.length) currentIndex = items.length - 1;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === items.length - 1 ? 'none' : 'block';
      }

      prevBtn.addEventListener('click', () => {
        currentIndex--;
        update();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex++;
        update();
      });

      update();
    });

    // Filtro de projetos
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");

    let selectedCategory = "";

    searchInput.addEventListener("input", filterProjects);
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCategory = btn.dataset.category;
        filterProjects();
      });
    });

    function filterProjects() {
      const query = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const desc = card.querySelector("p").textContent.toLowerCase();
        const category = card.querySelector("a").href.toLowerCase();
        const matchesQuery = name.includes(query) || desc.includes(query);
        const matchesCategory = selectedCategory === "" || category.includes(selectedCategory);
        card.style.display = matchesQuery && matchesCategory ? "block" : "none";
      });
    }