class GeradorBoxShadow {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur1,
    blurRef,
    spread,
    spreadRef,
    cor,
    corRef,
    opacidade,
    opacidadeRef,
    inset,
    caixaRef,
    regras,
    webkitRegras,
    mozRegras,
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur1 = blur1;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.cor = cor;
    this.corRef = corRef;
    this.opacidade = opacidade;
    this.opacidadeRef = opacidadeRef;
    this.inset = inset;
    this.insetRef = inset.checked;
    this.caixaRef = caixaRef;
    this.regras = regras;
    this.webkitRegras = webkitRegras;
    this.mozRegras = mozRegras;
  }

  inicializar() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur1.value;
    this.spreadRef.value = this.spread.value;
    this.corRef.value = this.cor.value;
    this.opacidadeRef.value = this.opacidade.value;

    this.aplicarRegras();
    this.mostrarRegras();
  }

  aplicarRegras() {
    const valorRgb = this.hexParaRgb(this.corRef.value);

    const regrasHTML = `${this.insetRef ? 'inset' : ''} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${valorRgb},${this.opacidadeRef.value})`;

    this.caixaRef.style.boxShadow = regrasHTML;
    this.regraAtual = regrasHTML;
  }

  mostrarRegras() {
    this.regras.innerText = this.regraAtual;
    this.webkitRegras.innerText = this.regraAtual;
    this.mozRegras.innerText = this.regraAtual;
  }

  atualizarValor(type, value) {
    switch (type) {
      case 'horizontal':
        this.horizontalRef.value = value;
        break;
      case 'vertical':
        this.verticalRef.value = value;
        break;
      case 'blur1':
        this.blurRef.value = value;
        break;
      case 'spread':
        this.spreadRef.value = value;
        break;
      case 'cor':
        this.corRef.value = value;
        break;
      case 'opacidade':
        this.opacidadeRef.value = value;
        break;
      case 'inset':
        this.insetRef = value;
        break;
    }

    this.aplicarRegras();
    this.mostrarRegras();
  }

  hexParaRgb(hex) {
    return `${('0x' + hex[1] + hex[2]) | 0}, ${('0x' + hex[3] + hex[4]) | 0}, ${('0x' + hex[5] + hex[6]) | 0}`;
  }
}

// elementos

const horizontal = document.querySelector('#horizontal');
const horizontalRef = document.querySelector('#valor-horizontal');
const vertical = document.querySelector('#vertical');
const verticalRef = document.querySelector('#valor-vertical');
const blur1 = document.querySelector('#blur');
const blurRef = document.querySelector('#valor-blur');
const spread = document.querySelector('#spread');
const spreadRef = document.querySelector('#valor-spread');

const cor = document.querySelector('#color');
const corRef = document.querySelector('#valor-color');

const opacidade = document.querySelector('#opacidade');
const opacidadeRef = document.querySelector('#valor-opacidade');

const inset = document.querySelector('#inset');

const caixaRef = document.querySelector('.caixa');

const regras = document.querySelector('#regras span');
const webkitRegras = document.querySelector('#webkit-regras span');
const mozRegras = document.querySelector('#moz-regras span');

const boxShadow = new GeradorBoxShadow(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur1,
  blurRef,
  spread,
  spreadRef,
  cor,
  corRef,
  opacidade,
  opacidadeRef,
  inset,
  caixaRef,
  regras,
  webkitRegras,
  mozRegras,
);

boxShadow.inicializar();

// Eventos

horizontal.addEventListener('input', (e) => {
  const value = e.target.value;

  boxShadow.atualizarValor('horizontal', value);
});
vertical.addEventListener('input', (e) => {
  const value = e.target.value;

  boxShadow.atualizarValor('vertical', value);
});
blur1.addEventListener('input', (e) => {
  const value = e.target.value;

  boxShadow.atualizarValor('blur1', value);
});
spread.addEventListener('input', (e) => {
  const value = e.target.value;

  boxShadow.atualizarValor('spread', value);
});

cor.addEventListener('input', (e) => {
  const value = e.target.value;
  boxShadow.atualizarValor('cor', value);
});

opacidade.addEventListener('input', (e) => {
  const value = e.target.value;
  boxShadow.atualizarValor('opacidade', value);
});

inset.addEventListener('input', (e) => {
  const value = e.target.checked;
  boxShadow.atualizarValor('inset', value);
});

// Copiar area

const areaGerada = document.querySelector('.area-gerada');
const infoCopiar = document.querySelector('#info-copiar');

areaGerada.addEventListener('click', () => {
  const regras = areaGerada.innerText.replace(/^\s*\n/gm, '');

  navigator.clipboard.writeText(regras).then(() => {
    infoCopiar.innerText = 'Regra copiada com sucesso';
  });

  setTimeout(() => {
    infoCopiar.innerText = 'Clique no quadro acima para copiar.';
  }, 1000);
});
