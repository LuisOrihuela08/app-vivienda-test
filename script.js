const $ = (selector, node=document) => node.querySelector(selector);
const $$ = (selector, node=document) => node.querySelectorAll(selector);


// Paginación básica
document.addEventListener('DOMContentLoaded', () => {
  const pagination = document.querySelector('.pagination');
  if (pagination) {
    let currentPage = 1;
    const totalPages = 10;

    function renderPagination() {
      pagination.innerHTML = '';
      // Prev button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'pagination-btn prev';
      prevBtn.innerHTML = '&lt;';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderPagination();
        }
      });
      pagination.appendChild(prevBtn);

      // First page
      const firstBtn = document.createElement('button');
      firstBtn.className = 'pagination-btn' + (currentPage === 1 ? ' active' : '');
      firstBtn.textContent = '1';
      firstBtn.addEventListener('click', () => {
        currentPage = 1;
        renderPagination();
      });
      pagination.appendChild(firstBtn);

      // Page 2
      if (currentPage > 2) {
        const page2Btn = document.createElement('button');
        page2Btn.className = 'pagination-btn' + (currentPage === 2 ? ' active' : '');
        page2Btn.textContent = '2';
        page2Btn.addEventListener('click', () => {
          currentPage = 2;
          renderPagination();
        });
        pagination.appendChild(page2Btn);
      }

      // Ellipsis before
      if (currentPage > 3) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        pagination.appendChild(ellipsis);
      }

      // Middle page
      if (currentPage > 2 && currentPage < totalPages - 1) {
        const midBtn = document.createElement('button');
        midBtn.className = 'pagination-btn active';
        midBtn.textContent = currentPage;
        midBtn.addEventListener('click', () => {
          renderPagination();
        });
        pagination.appendChild(midBtn);
      }

      // Ellipsis after
      if (currentPage < totalPages - 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        pagination.appendChild(ellipsis);
      }

      // Last two pages
      if (currentPage < totalPages - 1) {
        const page9Btn = document.createElement('button');
        page9Btn.className = 'pagination-btn' + (currentPage === totalPages - 1 ? ' active' : '');
        page9Btn.textContent = (totalPages - 1).toString();
        page9Btn.addEventListener('click', () => {
          currentPage = totalPages - 1;
          renderPagination();
        });
        pagination.appendChild(page9Btn);
      }
      const lastBtn = document.createElement('button');
      lastBtn.className = 'pagination-btn' + (currentPage === totalPages ? ' active' : '');
      lastBtn.textContent = totalPages.toString();
      lastBtn.addEventListener('click', () => {
        currentPage = totalPages;
        renderPagination();
      });
      pagination.appendChild(lastBtn);

      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'pagination-btn next';
      nextBtn.innerHTML = '&gt;';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPagination();
        }
      });
      pagination.appendChild(nextBtn);
    }

    renderPagination();
  }
});

const swiperEl = $('#ofices-swiper');
if (swiperEl) {
  const swiperParams = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };
  Object.assign(swiperEl, swiperParams);
  swiperEl.initialize();
}

document.addEventListener('DOMContentLoaded', () => {
  const $header = $('.header');
  const $menuBtn = $('.header__menu-btn');
  const $overlay = $('.overlay');
  const $linksHeader = $$('.header__link')

  const toggleMenu = () => {
    $header.classList.toggle('active');
  };

  if ($menuBtn) {
    $menuBtn.addEventListener('click', toggleMenu);
  }
  if ($overlay) {
    $overlay.addEventListener('click', toggleMenu);
  }
  $linksHeader.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Funcionalidad del dropdown de usuario
  const dropdown = document.querySelector('.dropdown');
  const toggle = document.querySelector('.dropdown__toggle');

  if (dropdown && toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // Vista cards <-> tabla
  const $list = document.querySelector('#tickets');       // contenedor fijo
  const $btnCards = document.querySelector('.grid-view'); // botón tarjetas
  const $btnTable = document.querySelector('.view-list'); // botón tabla

  if ($list && $btnCards && $btnTable) {
    const toCards = (e) => {
      e?.preventDefault();
      $list.classList.add('as-cards');
      $list.classList.remove('as-table');
      $btnCards.classList.add('active');
      $btnTable.classList.remove('active');
    };

    const toTable = (e) => {
      e?.preventDefault();
      $list.classList.add('as-table');
      $list.classList.remove('as-cards');
      $btnTable.classList.add('active');
      $btnCards.classList.remove('active');
    };

    // Estado inicial (opcional, según lo que tengas por defecto)
    if ($list.classList.contains('as-cards')) {
      $btnCards.classList.add('active');
    } else {
      $btnTable.classList.add('active');
    }

    $btnCards.addEventListener('click', toCards);
    $btnTable.addEventListener('click', toTable);
  }
});

//# sourceMappingURL=main.js.map

