/*
 * Entrar e criar conta (demonstração). A versão anterior tinha só o visual:
 * o login não fazia nada e o cadastro mandava os dados por e-mail (FormSubmit).
 */
(function () {
    const $ = (id) => document.getElementById(id);
    const url = new URLSearchParams(location.search);
    const admin = url.has('admin');
    // só aceita voltar para uma página deste site
    const volta = /^[\w\-/]+\.html(#\w+)?$/.test(url.get('volta') || '') ? url.get('volta') : null;

    if (Loja.ehAdmin()) { location.replace(`${Loja.RAIZ}admin/index.html`); return; }
    if (Loja.usuarioAtual() && !admin) { location.replace(volta || 'conta.html'); return; }

    function aba(qual) {
        const criar = qual === 'criar';
        $('abaEntrar').setAttribute('aria-selected', !criar);
        $('abaCriar').setAttribute('aria-selected', criar);
        $('formEntrar').hidden = criar;
        $('formCriar').hidden = !criar;
        $('tituloEntrar').textContent = admin ? 'Acesso administrador' : criar ? 'Crie sua conta' : 'Bem-vinda de volta';
        (criar ? $('nome') : $('email')).focus();
    }
    $('abaEntrar').addEventListener('click', () => aba('entrar'));
    $('abaCriar').addEventListener('click', () => aba('criar'));

    const D = admin ? { email: Loja.ADMIN.email, senha: Loja.ADMIN.senha, texto: 'Painel administrativo' } : { email: Loja.CLIENTE_DEMO.email, senha: '123456', texto: 'Cliente de demonstração' };
    $('demoAcesso').innerHTML = `<strong>${D.texto}</strong>E-mail: ${D.email} · Senha: ${D.senha}<br><button type="button" id="preencher">Preencher para mim</button>${admin ? '' : ' · <a class="link" href="entrar.html?admin=1">Acesso administrador</a>'}`;
    $('preencher').addEventListener('click', () => { aba('entrar'); $('email').value = D.email; $('senha').value = D.senha; $('senha').focus(); });
    if (admin) {
        $('tituloEntrar').textContent = 'Acesso administrador';
        $('subEntrar').textContent = 'Gerencie o estoque e os pedidos da loja.';
        document.querySelector('.troca').hidden = true;
    }

    function erro(id, msg) {
        $(id).setAttribute('aria-invalid', msg ? 'true' : 'false');
        $('erro-' + id).textContent = msg || '';
        return !msg;
    }
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

    $('formEntrar').addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = erro('email', emailOk($('email').value) ? '' : 'Digite um e-mail válido.');
        ok = erro('senha', $('senha').value ? '' : 'Digite sua senha.') && ok;
        if (!ok) return document.querySelector('[aria-invalid="true"]').focus();
        const r = Loja.entrar($('email').value, $('senha').value);
        if (!r.ok) { erro(r.campo, r.msg); $(r.campo).focus(); return; }
        location.href = r.admin ? `${Loja.RAIZ}admin/index.html` : (volta || 'conta.html');
    });

    $('telefone').addEventListener('input', (e) => {
        const n = e.target.value.replace(/\D/g, '').slice(0, 11);
        e.target.value = n.length > 6 ? `(${n.slice(0, 2)}) ${n.slice(2, n.length - 4)}-${n.slice(-4)}` : n.length > 2 ? `(${n.slice(0, 2)}) ${n.slice(2)}` : n;
    });
    $('formCriar').addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = erro('nome', $('nome').value.trim().length >= 3 ? '' : 'Digite seu nome.');
        ok = erro('emailNovo', emailOk($('emailNovo').value) ? '' : 'Digite um e-mail válido.') && ok;
        ok = erro('senhaNova', $('senhaNova').value.length >= 6 ? '' : 'A senha precisa ter pelo menos 6 caracteres.') && ok;
        if (!ok) return document.querySelector('#formCriar [aria-invalid="true"]').focus();
        const r = Loja.cadastrar({ nome: $('nome').value, email: $('emailNovo').value, senha: $('senhaNova').value, telefone: $('telefone').value });
        if (!r.ok) { erro('emailNovo', r.msg); $('emailNovo').focus(); return; }
        location.href = volta || 'conta.html';
    });

    if (url.get('aba') === 'criar') aba('criar');
})();
