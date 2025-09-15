const $ = (selector, node=document) => node.querySelector(selector);
const $$ = (selector, node=document) => node.querySelectorAll(selector);

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

  // Inicializar Flatpickr para el filtro de fecha
  const dateButton = document.getElementById('date-filter');
  const dateInput = document.getElementById('date-picker');
  const dateText = document.getElementById('date-text');

  if (dateButton && dateInput) {
    const fp = flatpickr(dateInput, {
      mode: "range", // Permite seleccionar rango de fechas
      dateFormat: "d/m/Y",
      locale: "es", // Español
      allowInput: false,
      clickOpens: false,
      position: "below",
      positionElement: dateButton,
      onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 0) {
          dateText.textContent = 'Fecha';
          dateButton.classList.remove('active');
        } else if (selectedDates.length === 1) {
          dateText.textContent = instance.formatDate(selectedDates[0], "d/m/Y");
          dateButton.classList.add('active');
        } else if (selectedDates.length === 2) {
          const startDate = instance.formatDate(selectedDates[0], "d/m/Y");
          const endDate = instance.formatDate(selectedDates[1], "d/m/Y");
          dateText.textContent = `${startDate} - ${endDate}`;
          dateButton.classList.add('active');
        }
        
        // Aquí puedes agregar lógica para filtrar los datos
        console.log('Fechas seleccionadas:', selectedDates);
        filterByDate(selectedDates);
      },
      onClose: function(selectedDates, dateStr, instance) {
        // Opcional: lógica cuando se cierra el calendario
      }
    });

    // Abrir calendario al hacer click en el botón
    dateButton.addEventListener('click', (e) => {
      e.preventDefault();
      fp.open();
    });

    // Función para limpiar el filtro de fecha
    function clearDateFilter() {
      fp.clear();
      dateText.textContent = 'Fecha';
      dateButton.classList.remove('active');
    }

    // Función para filtrar por fecha (ejemplo)
    function filterByDate(selectedDates) {
      if (selectedDates.length === 0) {
        // Mostrar todos los datos
        console.log('Mostrando todos los datos');
        return;
      }

      // Lógica de filtrado según las fechas seleccionadas
      const startDate = selectedDates[0];
      const endDate = selectedDates[1] || selectedDates[0];
      
      console.log('Filtrando desde:', startDate, 'hasta:', endDate);
      
      // Aquí puedes implementar la lógica para filtrar tus cards/tabla
      // Por ejemplo, filtrar los datos de la paginación
    }

    // Exponer función para limpiar filtro globalmente
    window.clearDateFilter = clearDateFilter;
  }

  // Funcionalidad de cambio de vista Cards <-> Tabla
  const cardsView = document.getElementById('cards-view');
  const tableView = document.getElementById('table-view');
  
  const containerSecond = document.querySelector('.container-second');
  const buttons = containerSecond ? containerSecond.querySelectorAll('button') : [];
  const btnCards = buttons[0];
  const btnTable = buttons[1];

  function showCardsView() {
    if (cardsView) cardsView.style.display = 'grid';
    if (tableView) tableView.style.display = 'none';
    if (btnCards) btnCards.classList.add('active');
    if (btnTable) btnTable.classList.remove('active');
    console.log('Vista cards activada');
  }

  function showTableView() {
    if (cardsView) cardsView.style.display = 'none';
    if (tableView) tableView.style.display = 'block';
    if (btnTable) btnTable.classList.add('active');
    if (btnCards) btnCards.classList.remove('active');
    console.log('Vista tabla activada');
  }

  if (btnCards && btnTable) {
    btnCards.addEventListener('click', (e) => {
      e.preventDefault();
      showCardsView();
    });
    
    btnTable.addEventListener('click', (e) => {
      e.preventDefault();
      showTableView();
    });
    
    showCardsView();
  } else {
    console.log('No se encontraron los botones de vista');
  }
});