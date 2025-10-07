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