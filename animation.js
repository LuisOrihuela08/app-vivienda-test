function animateLetters(selector, options = {}) {
  const opts = { staggerMs: 50, durMs: 200, phase: "normal", className: "item-infinite", ...options };
  const els = document.querySelectorAll(selector);

  els.forEach(el => {
    if (el.dataset.lettersReady === "1") return;

    const raw = el.innerHTML
      .replace(/\n/g, " ")
      .replace(/<br\s*\/?>/gi, "⏎");

    let i = 0;
    const out = [];
    for (const ch of raw) {
      if (ch === "⏎") { out.push("<br>"); continue; }
      if (ch === " ")  { out.push(" ");  continue; }   // ← espacio normal, sin span
      out.push(`<span class="${opts.className}" style="--i:${i++}">${ch}</span>`);
    }

    el.style.setProperty("--stagger", `${opts.staggerMs}ms`);
    el.style.setProperty("--dur", `${opts.durMs}ms`);
    el.style.setProperty("--count", i);
    el.classList.add("items");
    if (opts.phase === "reverse")   el.classList.add("phase-reverse");
    if (opts.phase === "alternate") el.classList.add("phase-alternate");

    el.innerHTML = out.join("");
    el.dataset.lettersReady = "1";
  });
}


// Inicializa cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Título con alternancia (arriba/abajo)
  animateLetters(".div-title .title", {
    staggerMs: 60,
    durMs: 220,
    phase: "alternate"
  });

  // Subtítulo en reversa
  animateLetters(".div-title .subtitle", {
    staggerMs: 50,
    durMs: 200,
    phase: "reverse"
  });
});






/*-------------------------------*/

function titlePart(titulo) {
    const words = titulo.split('');
    const middleIndex = Math.floor(words.length / 2);

    const wordsTransform = words.map(word => {
      if(word === ' ') return '&nbsp;'
      return word;
    });

    return wordsTransform.map((word, index) => {
      return `<span class="item" style="--index: ${ index + 1 }">${word}</span>`;
    }).join(' ');
}
document.querySelector('#titulo-vivienda').innerHTML = titlePart('Bono de Arrendamiento de Viviendas para Emergencias”')
