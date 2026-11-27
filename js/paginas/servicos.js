/* Serviços: gravação, presente, guia de tamanhos (com calculadora) e atendimento. */
(function () {
    document.querySelectorAll('[data-icone]').forEach(el => el.insertAdjacentHTML('afterbegin', Loja.icone(el.dataset.icone)));
    document.querySelectorAll('.lista-fina li').forEach(li => { li.innerHTML = li.innerHTML.replace('${PRECO}', Loja.real(Loja.PRECO_GRAVACAO)); });
    const guia = document.getElementById('guia');
    guia.innerHTML = Loja.guiaTamanhosHtml();
    Loja.iniciarGuia(guia);
})();
