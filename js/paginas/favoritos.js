/* Favoritos (antes ficavam num cookie lido pelo PHP). */
(function () {
    function desenhar() {
        const ids = Loja.favoritos();
        const grade = document.getElementById('grade');
        document.getElementById('contagem').textContent = ids.length
            ? `${ids.length} ${ids.length === 1 ? 'joia salva' : 'joias salvas'}. Toque no coração para tirar da lista.`
            : 'As joias que você amou e salvou para ver depois.';
        grade.innerHTML = ids.length ? ids.map(id => Loja.cartao(Loja.produto(id))).join('') : `
            <div class="vazio" style="grid-column:1/-1">${Loja.icone('coracao')}
                <h2>Nenhum favorito ainda</h2>
                <p>Toque no coração das joias que você gostar para guardar aqui.</p>
                <a class="botao botao-escuro" href="colecao.html">Explorar joias</a>
            </div>`;
    }
    desenhar();
    Loja.aoMudar((chave) => { if (['eclat_favoritos', 'eclat_produtos', 'tudo'].includes(chave)) desenhar(); });
})();
