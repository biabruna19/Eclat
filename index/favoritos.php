<?php
// ARQUIVO: index/favoritos.php
// Página que lista os produtos favoritos salvos no cookie.

// Define o nome da chave para o cookie (CRÍTICO: DEVE SER IGUAL em todos os scripts)
define("FAVORITES_KEY", "eclat_favoritos");

// ----------------------------------------------------------------------------------
// 1. Lógica para Obter Favoritos e o Catálogo de Produtos (DEVE SER COMPLETO!)
// ----------------------------------------------------------------------------------

/**
 * Função para obter a lista de IDs de favoritos armazenados no cookie.
 * @return array A lista de IDs de produtos favoritos.
 */
function getFavoritesFromCookie() {
    // Garante que o cookie existe e não é nulo
    if (isset($_COOKIE[FAVORITES_KEY])) {
        // Tenta decodificar o JSON
        $favoritos = json_decode($_COOKIE[FAVORITES_KEY], true);
        // Garante que o resultado é um array para evitar erros
        return is_array($favoritos) ? array_values($favoritos) : [];
    }
    return [];
}

// Catálogo de TODOS os produtos (Lista completa e unificada por ID)
// ATENÇÃO: Verifiquei e Corrigi alguns IDs duplicados e adicionei os produtos faltantes (Braceletes Dourados).
$PRODUTOS_CATALOGO_COMPLETO = [
    // === COLARES PRATA - Versailles (12 produtos) ===
    [
        "id" => "colar_prata_etoile", 
        "nome" => "Étoile", 
        "descricao" => "Colar em Prata 900. Cravejado com safiras azuis", 
        "preco" => "899,90",
        "img" => "../imagens/Colares/colares_prata/étoile.png"
    ],
    [
        
        "id" => "colar_prata_coeur", 
        "nome" => "Coeur", 
        "descricao" => "Colar Romântico em Prata 825. Pingente central de coração", 
        "preco" => "880,00",
        "img" => "../imagens/Colares/colares_prata/coeur.png"
    ],
    [
        "id" => "colar_prata_brillant", 
        "nome" => "Brillant", 
        "descricao" => "Colar em Prata 925 Pingente de cristal", 
        "preco" => "900,00",
        "img" => "../imagens/Colares/colares_prata/brillant.png"
    ],
    [
        "id" => "colar_prata_diamant", 
        "nome" => "Diamant", 
        "descricao" => "Colar em Prata 900 Pingente central de pedra gota rosada", 
        "preco" => "1.199,00",
        "img" => "../imagens/Colares/colares_prata/diamant.png"
    ],
    [
        "id" => "colar_prata_mure", 
        "nome" => "Mûre", 
        "descricao" => "Colar em Prata 800 Pingente de ametista quadrada de zircônias.", 
        "preco" => "799,99",
        "img" => "../imagens/Colares/colares_prata/mûre.png"
    ],
    [
        "id" => "colar_prata_perles", 
        "nome" => "Perles", 
        "descricao" => "Colar Clássico em Prata 900 Com fio de pérolas de cultura delicadas", 
        "preco" => "900,00",
        "img" => "../imagens/Colares/colares_prata/perles.png"
    ],
    [
        "id" => "colar_prata_eblouissant", 
        "nome" => "Éblouissant", 
        "descricao" => "Colar Choker Duplo em Prata 800 Pingente de leque de esmeraldas e pérola.", 
        "preco" => "899,00",
        "img" => "../imagens/Colares/colares_prata/éblouissant.png"
    ],
    [
        "id" => "colar_prata_charmant", 
        "nome" => "Charmant", 
        "descricao" => "Colar em Prata 925 Com Safira gota e pontos de luz", 
        "preco" => "699,00",
        "img" => "../imagens/Colares/colares_prata/charmant.png"
    ],
    [
        "id" => "colar_prata_precieux", 
        "nome" => "Précieux", 
        "descricao" => "Colar em Prata 850 Com Ônix preto central", 
        "preco" => "999,00",
        "img" => "../imagens/Colares/colares_prata/précieux.png"
    ],
    [
        "id" => "colar_prata_fleur", 
        "nome" => "Fleur", 
        "descricao" => "Colar em Prata 925 Com flor central de turmalina rosa", 
        "preco" => "895,00",
        "img" => "../imagens/Colares/colares_prata/fleur.png"
    ],
    [
        "id" => "colar_prata_luxe", 
        "nome" => "Luxe", 
        "descricao" => "Colar em Prata 925 Com ônix e pérolas", 
        "preco" => "899,00",
        "img" => "../imagens/Colares/colares_prata/luxe.png"
    ],
    [
        "id" => "colar_prata_ciel", 
        "nome" => "Ciel", 
        "descricao" => "Colar Choker em Prata 925 Com estrela e pedras azuis.", 
        "preco" => "499,00",
        "img" => "../imagens/Colares/colares_prata/Ciel.png"
    ],
// === COLARES DOURADOS - Étoile Royale (12 produtos) ===
    [
        "id" => "colar_dourado_courant", 
        "nome" => "Courant", 
        "descricao" => "Colar em ouro 15K de design múltiplo", 
        "preco" => "799,00",
        "img" => "../imagens/Colares/colares_dourado/courant.png"
    ],
    [
        "id" => "colar_dourado_joie", 
        "nome" => "Joie", 
        "descricao" => "Colar em Ouro 18K de duas voltas com pingentes coloridos", 
        "preco" => "495,00",
        "img" => "../imagens/Colares/colares_dourado/joie.png"
    ],
    [
        "id" => "colar_dourado_argent", 
        "nome" => "Argent", 
        "descricao" => "Gargantilha Choker de Elos Grossos em Ouro 14K", 
        "preco" => "999,00",
        "img" => "../imagens/Colares/colares_dourado/argent.png"
    ],
    [
        "id" => "colar_dourado_monde", 
        "nome" => "Monde", 
        "descricao" => "Colar Choker em Ouro 18K com mini pingentes de coração", 
        "preco" => "890,99",
        "img" => "../imagens/Colares/colares_dourado/monde.png"
    ],
    [
        "id" => "colar_dourado_eclaire", 
        "nome" => "Éclairé", 
        "descricao" => "Gargantilha Choker Fita em Ouro 10K", 
        "preco" => "599,99",
        "img" => "../imagens/Colares/colares_dourado/éclairé.png"
    ],
    [
        "id" => "colar_dourado_dore", 
        "nome" => "Doré", 
        "descricao" => "Colar em Ouro 16K com pingente de coração único", 
        "preco" => "900,00",
        "img" => "../imagens/Colares/colares_dourado/doré.png"
    ],
    [
        "id" => "colar_dourado_battement", 
        "nome" => "Battement", 
        "descricao" => "Colar em Ouro 15K com pingente de coração de zircônia", 
        "preco" => "790,00",
        "img" => "../imagens/Colares/colares_dourado/battement.png"
    ],
    [
        "id" => "colar_dourado_univers", 
        "nome" => "Univers", 
        "descricao" => "Colar Choker Celestial em Ouro 18K com luas e estrelas de zircônia", 
        "preco" => "699,00",
        "img" => "../imagens/Colares/colares_dourado/univers.png"
    ],
    [
        "id" => "colar_dourado_etoile", 
        "nome" => "Étoilé", 
        "descricao" => "Colar Choker Estrela Solitária em Ouro 14K.", 
        "preco" => "679,90",
        "img" => "../imagens/Colares/colares_dourado/étoilé.png"
    ],
    [
        "id" => "colar_dourado_fantaisie", 
        "nome" => "Fantaisie", 
        "descricao" => "Colar Choker em Ouro 18K com pequenas contas de rubi.", 
        "preco" => "889,90",
        "img" => "../imagens/Colares/colares_dourado/fantaisie.png"
    ],
    [
        "id" => "colar_dourado_lumiere", 
        "nome" => "Lumiere", 
        "descricao" => "Colar Choker em Ouro 15K com pérolas e pingentes de folha", 
        "preco" => "600,00",
        "img" => "../imagens/Colares/colares_dourado/lumière.png"
    ],
    [
        "id" => "colar_dourado_lune", 
        "nome" => "Lune", 
        "descricao" => "Colar Ponto de Luz em Ouro 14K com pedra redonda.", 
        "preco" => "699,00",
        "img" => "../imagens/Colares/colares_dourado/lune.png"
    ],
    // ==================================================================================
    // === BRINCOS PRATA - Monaco (12 produtos) ===
    // ==================================================================================
       [
        "id" => "brinco_prata_salidou", 
        "nome" => "Salidou", 
        "descricao" => "Prata 925 Argola Lisa 20mm", 
        "preco" => "299,00",
        "img" => "../imagens/Brincos/Prata/Brinco Salidou.png"
    ],
    [
        "id" => "brinco_prata_gateau", 
        "nome" => "Gâteau Basque", 
        "descricao" => "Prata 925 Coração Vazado 12mm", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Prata/Brinco Gâteau Basque.png"
    ],
    [
        "id" => "brinco_prata_cugneaux", 
        "nome" => "Cugneaux", 
        "descricao" => "Prata 925 Pêndulo Oval Polido", 
        "preco" => "319,00",
        "img" => "../imagens/Brincos/Prata/Brinco Cugneaux.png"
    ],
    [
        "id" => "brinco_prata_tourton", 
        "nome" => "Tourton", 
        "descricao" => "Prata 925 Geométrico Minimalista", 
        "preco" => "799,00",
        "img" => "../imagens/Brincos/Prata/Brinco Tourton.png"
    ],
    [
        "id" => "brinco_prata_niflettes", 
        "nome" => "Niflettes", 
        "descricao" => "Prata 925 Argolinha com Ponto de Luz", 
        "preco" => "299,00",
        "img" => "../imagens/Brincos/Prata/Brinco Niflettes.png"
    ],
    [
        "id" => "brinco_prata_pogne", 
        "nome" => "Pogne", 
        "descricao" => "Prata 925 Gota com Detalhe Texturizado", 
        "preco" => "1.199,00",
        "img" => "../imagens/Brincos/Prata/Brinco Pogne.png"
    ],
    [
        "id" => "brinco_prata_fiadone", 
        "nome" => "Fiadone", 
        "descricao" => "Prata 925 com Zircônia Redonda 4mm", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Prata/Brinco Fiadone.png"
    ],

    [
        "id" => "brinco_prata_Sablé", 
        "nome" => "Sablé", 
        "descricao" => "Ouro 18k com pedras cintilantes", 
        "preco" => "1.399,00",
        "img" => "../imagens/Brincos/Prata/Brinco Sablé.png"
    ],
    [
        "id" => "brinco_prata_Rousquille", 
        "nome" => "Rousquille'", 
        "descricao" => "Ouro 18k com design inspirado na natureza", 
        "preco" => "1.399,00",
        "img" => "../imagens/Brincos/Prata/Brinco Rousquille.png"
    ],
    [
        "id" => "brinco_prata_Pompe", 
        "nome" => "Pompe á huile", 
        "descricao" => "Ouro 18k com safiras azuis", 
        "preco" => "1.799,00",
        "img" => "../imagens/Brincos/Prata/Brinco Pompe à huile.png"
    ],
    [
        "id" => "brinco_prata_pets", 
        "nome" => "Pets de nonne", 
        "descricao" => "Ouro 18k com rubis refinados", 
        "preco" => "2.199,00",
        "img" => "../imagens/Brincos/Prata/Brinco Pets de nonne Prata.png"
    ],
     [
        "id" => "brinco_prata_Craquelin", 
        "nome" => "Craquelin", 
        "descricao" => "Ouro 18k com rubis refinados", 
        "preco" => "2.199,00",
        "img" => "../imagens/Brincos/Prata/Brinco Craquelin.png"
    ],
  // === BRINCOS DOURADOS - Claire (12 produtos) ===
    [
        "id" => "brinco_dourado_montecaos", 
        "nome" => "Montécaos", 
        "descricao" => "Dourado 18k Argola Clássica 18mm", 
        "preco" => "250,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Montécaos.png"
    ],
    [
        "id" => "brinco_dourado_pastis", 
        "nome" => "Pastis", 
        "descricao" => "Dourado 18k Quadrado Liso Moderno", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pastis.png"
    ],
    [
        "id" => "brinco_dourado_bugnes", 
        "nome" => "Bugnes", 
        "descricao" => "Dourado 18k com Pérola Natural Pequena", 
        "preco" => "360,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Bugnes.png"
    ],
    [
        "id" => "brinco_dourado_nougat", 
        "nome" => "Nougat", 
        "descricao" => "Dourado 18k Argola Texturizada 20mm", 
        "preco" => "199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Nougat.png"
    ],
    [
        "id" => "brinco_dourado_bourdaloue", 
        "nome" => "Bourdaloue", 
        "descricao" => "Dourado 18k Redondo Fosco Minimalista", 
        "preco" => "469,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Bourdaloue.png"
    ],
    [
        "id" => "brinco_dourado_teurgoule", 
        "nome" => "Teurgoule", 
        "descricao" => "Dourado 18k com Corrente Fina e Cristal Branco", 
        "preco" => "799,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Teurgoule.png"
    ],
    [
        "id" => "brinco_dourado_calisson", 
        "nome" => "Calisson", 
        "descricao" => "Dourado 18k Argola com Detalhe Torcidos", 
        "preco" => "2.199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Calisson.png"
    ],
    [
        "id" => "brinco_dourado_dragee", 
        "nome" => "Dragée", 
        "descricao" => "Dourado 18k com Zircônias Cravejadas", 
        "preco" => "469,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Dragée.png"
    ],
    [
        "id" => "brinco_dourado_perouges", 
        "nome" => "Pérouges", 
        "descricao" => "Dourado 18k com Pêndulo Alongado", 
        "preco" => "499,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pérouges.png"
    ],
    [
        "id" => "brinco_dourado_croquant", 
        "nome" => "Croquant", 
        "descricao" => "Dourado 18k com Ponto de Luz 4mm", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Croquant.png"
    ],
    [
        "id" => "brinco_dourado_florentin", 
        "nome" => "Toulon", // Nome 'Toulon' mantido do seu código original
        "descricao" => "Dourado 18k, com laços 6mm", 
        "preco" => "349,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Florentin.png"
    ],
    [
        "id" => "brinco_dourado_pain_depi", 
        "nome" => "Toulouse", // Nome 'Toulouse' mantido do seu código original
        "descricao" => "Dourado 18k longo com Detalhe Vazado", 
        "preco" => "199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pain d'épi.png"
    ],

   // Catálogo ANÉIS PRATA para favoritos.php (de aneisPratas.php)
// Adicionar ou substituir no array $PRODUTOS_CATALOGO_COMPLETO:

// === ANÉIS PRATA - Caprice (12 produtos) ===
 [
        "id" => "anel_prata_agréable", 
        "nome" => "Agréable", 
        "descricao" => "Prata 925 com zircônia cravejada, Solitário", 
        "preco" => "299,00",
       "img" => "../imagens/Aneis/pratas/Agréable.png"
    ],
    [
        "id" => "anel_prata_courageux", 
        "nome" => "Courageux", 
        "descricao" => "Prata 925 com detalhe em Ouro 18k", 
        "preco" => "495,00",
       "img" => "../imagens/Aneis/pratas/Courageux.png"
    ],
    [
        "id" => "anel_prata_énergique", 
        "nome" => "Énergique", 
        "descricao" => "Prata 925 Corrente Clássica", 
        "preco" => "999,00",
      "img" => "../imagens/Aneis/pratas/Énergique.png"
    ],
    [
        "id" => "anel_prata_le_fabuleux", 
        "nome" => "Fabuleux", 
        "descricao" => "Prata 925 Pingente Estelar com zircônias", 
        "preco" => "1.199,00",
       "img" => "../imagens/Aneis/pratas/Fabuleux.png"
    ],
    [
        "id" => "anel_prata_fidèle", 
        "nome" => "Fidèle", 
        "descricao" => "Prata 925 com design inspirado na natureza", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/pratas/Fidèle.png"
    ],
    [
        "id" => "anel_prata_honnête", 
        "nome" => "Honnête", 
        "descricao" => "Prata 925 com safiras azuis", 
        "preco" => "1.799,00",
        "img" => "../imagens/Aneis/pratas/Honnête.png"
    ],
    [
        "id" => "anel_prata_ouvert", 
        "nome" => "Ouvert", 
        "descricao" => "Prata 925 Elegância Real com rubis", 
        "preco" => "2.199,00",
        "img" => "../imagens/Aneis/pratas/Ouvert.png"
    ],
    [
        "id" => "anel_prata_passionné", 
        "nome" => "Passionné", 
        "descricao" => "Prata 925 com pedras cintilantes", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/pratas/Passionné.png"
    ],
    [
        "id" => "anel_prata_patient", 
        "nome" => "Patient", 
        "descricao" => "Prata 925 com design inspirado na natureza", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/pratas/Patient.png"
    ],
    [
        "id" => "anel_prata_polie", 
        "nome" => "Polie", 
        "descricao" => "Prata 925 com safiras azuis", 
        "preco" => "1.799,00",
        "img" => "../imagens/Aneis/pratas/Polie.png"
    ],
    [
        "id" => "anel_prata_superbe", 
        "nome" => "Superbe", 
        "descricao" => "Prata 925 com rubis refinados", 
        "preco" => "2.199,00",
        "img" => "../imagens/Aneis/pratas/Superbe.png"
    ],
    [
        "id" => "anel_prata_travailleur", 
        "nome" => "Travailleur", 
        "descricao" => "Prata 925 com pedras cintilantes", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/pratas/Travailleur.png"
    ],
  // Catálogo ANÉIS DOURADOS para favoritos.php (de aneisDourado.php)
// Adicionar ou substituir no array $PRODUTOS_CATALOGO_COMPLETO:

// === ANÉIS DOURADOS - Riviera (12 produtos) ===
  [
        "id" => "anel_dourado_bonne", 
        "nome" => "Bonne", 
        "descricao" => "Ouro 18k com diamantes incrustados", 
        "preco" => "299,00",
        "img" => "../imagens/Aneis/dourados/Bonne.png"
    ],
    [
        "id" => "anel_dourado_calme", 
        "nome" => "Calme", 
        "descricao" => "Ouro 18k com pérolas naturais", 
        "preco" => "495,00",
        "img" => "../imagens/Aneis/dourados/Calme.png"
    ],
    [
        "id" => "anel_dourado_chaleureux", 
        "nome" => "Chaleureux", 
        "descricao" => "Ouro 18k puro e atemporal", 
        "preco" => "999,00",
        "img" => "../imagens/Aneis/dourados/Chaleureux.png"
    ],
    [
        "id" => "anel_dourado_créatif", 
        "nome" => "Créatif", 
        "descricao" => "Ouro 18k com zircônias", 
        "preco" => "1.199,00",
        "img" => "../imagens/Aneis/dourados/Créatif.png"
    ],
    [
        "id" => "anel_dourado_drôle", 
        "nome" => "Drôle", 
        "descricao" => "Ouro 18k com design inspirado na natureza", 
        "preco" => "1.399,00",
         "img" => "../imagens/Aneis/dourados/Drôle.png"
    ],
    [
        "id" => "anel_dourado_dynamique", 
        "nome" => "Dynamique", 
        "descricao" => "Ouro 18k com safiras azuis", 
        "preco" => "1.799,00",
        "img" => "../imagens/Aneis/dourados/Dynamique.png"
    ],
    [
        "id" => "anel_dourado_gentille", 
        "nome" => "Gentille", 
        "descricao" => "Ouro 18k com rubis refinados", 
        "preco" => "2.199,00",
         "img" => "../imagens/Aneis/dourados/Gentille.png"
    ],
    [
        "id" => "anel_dourado_heureuse", 
        "nome" => "Heureuse", 
        "descricao" => "Ouro 18k com pedras cintilantes", 
        "preco" => "1.399,00",
         "img" => "../imagens/Aneis/dourados/Heureuse.png"
    ],
    [
        "id" => "anel_dourado_joyeuse", 
        "nome" => "Joyeuse", 
        "descricao" => "Ouro 18k com design inspirado na natureza", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/dourados/Joyeuse.png"
    ],
    [
        "id" => "anel_dourado_loyal", 
        "nome" => "Loyal", 
        "descricao" => "Ouro 18k com safiras azuis", 
        "preco" => "1.799,00",
      "img" => "../imagens/Aneis/dourados/Loyal.png"
    ],
    [
        "id" => "anel_dourado_sérieux", 
        "nome" => "Sérieux", 
        "descricao" => "Ouro 18k com rubis refinados", 
        "preco" => "2.199,00",
       "img" => "../imagens/Aneis/dourados/Sérieux.png"
    ],
    [
        "id" => "anel_dourado_sympathique", 
        "nome" => "Sympathique", 
        "descricao" => "Ouro 18k com pedras cintilantes", 
        "preco" => "1.399,00",
        "img" => "../imagens/Aneis/dourados/Sympathique.png"
    ],
    // === RELÓGIOS DOURADOS==================================================================================
    [
        "id" => "relogio_dourado_admiration", 
        "nome" => "Admiration", 
        "descricao" => "Banhado a Ouro 18k, Detalhes em Zircônia.", 
        "preco" => "899,00",
       "img" => "../imagens/Relogios/Feminino/Admiration.png"
    ],
    [
        "id" => "relogio_dourado_amour", 
        "nome" => "Amour", 
        "descricao" => "Pulseira em Aço Dourado Polido.", 
        "preco" => "1.050,00",
        "img" => "../imagens/Relogios/Feminino/Amour.png"
    ],
    [
        "id" => "relogio_dourado_charme", 
        "nome" => "Charme", 
        "descricao" => "Design Slim com Mostrador Pérola.", 
        "preco" => "1.390,00",
          "img" => "../imagens/Relogios/Feminino/Charme.png"
    ],
    [
        "id" => "relogio_dourado_confidence", 
        "nome" => "Confidence", 
        "descricao" => "Caixa Quadrada Retrô.", 
        "preco" => "999,00",
         "img" => "../imagens/Relogios/Feminino/Confidence.png"
    ],
    [
        "id" => "relogio_dourado_douceur", 
        "nome" => "Douceur", 
        "descricao" => "Ouro Rosa com Pulseira de Couro.", 
        "preco" => "1.150,00",
         "img" => "../imagens/Relogios/Feminino/Douceur.png"
    ],
    [
        "id" => "relogio_dourado_élégance", 
        "nome" => "Élégance", 
        "descricao" => "Clássico com Borda Cravejada.", 
        "preco" => "1.699,00",
        "img" => "../imagens/Relogios/Feminino/Élégance.png"
    ],
    [
        "id" => "relogio_dourado_félicité", 
        "nome" => "Félicité", 
        "descricao" => "Minimalista com Fundo Escuro.", 
        "preco" => "750,00",
        "img" => "../imagens/Relogios/Feminino/Félicité.png"
    ],
    [
        "id" => "relogio_dourado_grace", 
        "nome" => "Grace", 
        "descricao" => "Mostrador de Madre-Pérola.", 
        "preco" => "1.450,00",
        "img" => "../imagens/Relogios/Feminino/Grace.png"
    ],
    [
        "id" => "relogio_dourado_joie", 
        "nome" => "Joie", 
        "descricao" => "Retangular e Sofisticado.", 
        "preco" => "1.099,00",
         "img" => "../imagens/Relogios/Feminino/Joie.png"
    ],
    [
        "id" => "relogio_dourado_légéreté", 
        "nome" => "Légéreté", 
        "descricao" => "Luxo com Diamantes na Borda.", 
        "preco" => "2.599,00",
        "img" => "../imagens/Relogios/Feminino/Légéreté.png"
    ],
    [
        "id" => "relogio_dourado_relorelogio", 
        "nome" => "Relorelogio", 
        "descricao" => "Edição Especial Limitada.", 
        "preco" => "3.199,00",
          "img" => "../imagens/Relogios/Feminino/relorelogio.png"
    ],
    [
        "id" => "relogio_dourado_volupté", 
        "nome" => "Volupté", 
        "descricao" => "Clássico com Cronógrafo Dourado.", 
        "preco" => "1.599,00",
          "img" => "../imagens/Relogios/Feminino/Volupté.png"
    ],
    // ==================================================================================
    // === RELÓGIOS PRATA ==================================================================================
        [
        "id"=>"relogio_prata_émerveillement", 
        "nome" => "Émerveillement", 
        "descricao" => "Aço Inox Escovado, Clássico.", 
        "preco" => "799,00",
       "img" => "../imagens/Relogios/Masculino/Émerveillement.png"
    ],
    [
        "id" => "relogio_prata_espoir", 
        "nome" => "Espoir", 
        "descricao" => "Aço Inox com Detalhes em Safira.", 
        "preco" => "1.199,00",
       "img" => "../imagens/Relogios/Masculino/Espoir.png"
    ],
    [
        "id" => "relogio_prata_frisson", 
        "nome" => "Frisson", 
        "descricao" => "Cronógrafo Funcional Prata.", 
        "preco" => "1.490,00",
         "img" => "../imagens/Relogios/Masculino/Frisson.png"
    ],
    [
        "id" => "relogio_prata_ivresse", 
        "nome" => "Ivresse", 
        "descricao" => "Design Esportivo em Titânio Polido.", 
        "preco" => "1.899,00",
        "img" => "../imagens/Relogios/Masculino/Ivresse.png"
    ],
    [
        "id" => "relogio_prata_mystère", 
        "nome" => "Mystère", 
        "descricao" => "Pulseira Mesh Minimalista.", 
        "preco" => "650,00",
         "img" => "../imagens/Relogios/Masculino/Mystère.png"
    ],
    [
        "id" => "relogio_prata_nostalgie", 
        "nome" => "Nostalgie", 
        "descricao" => "Mostrador Preto com Marcadores em Prata.", 
        "preco" => "950,00",
         "img" => "../imagens/Relogios/Masculino/Nostalgie.png"
    ],
    [
        "id" => "relogio_prata_passion", 
        "nome" => "Passion", 
        "descricao" => "Fino e Elegante com Borda Slim.", 
        "preco" => "880,00",
       "img" => "../imagens/Relogios/Masculino/Passion.png"
    ],
    [
        "id" => "relogio_prata_plaisir", 
        "nome" => "Plaisir", 
        "descricao" => "Aço Inox com Indicador de Data.", 
        "preco" => "1.250,00",
        "img" => "../imagens/Relogios/Masculino/Plaisir.png"
    ],
    [
        "id" => "relogio_prata_rêverie", 
        "nome" => "Rêverie", 
        "descricao" => "Design Quadrado Retrô.", 
        "preco" => "1.050,00",
         "img" => "../imagens/Relogios/Masculino/Rêverie.png"
    ],
    [
        "id" => "relogio_prata_sérénité", 
        "nome" => "Sérénité", 
        "descricao" => "Pulseira Metálica Grossa.", 
        "preco" => "1.320,00",
         "img" => "../imagens/Relogios/Masculino/Sérénité.png"
    ],
    [
        "id" => "relogio_prata_tendresse", 
        "nome" => "Tendresse", 
        "descricao" => "Edição Especial Limitada.", 
        "preco" => "2.999,00",
       "img" => "../imagens/Relogios/Masculino/Tendresse.png"
    ],
    [
        "id" => "relogio_prata_tristesse", 
        "nome" => "Tristesse", 
        "descricao" => "Modelo Ultra Slim.", 
        "preco" => "780,00",
       "img" => "../imagens/Relogios/Masculino/Tristesse.png"
    ],
    
    // === BRACELETES PRATA - Aurore (12 produtos) ===
    //
        [
        "id" => "bracelete_prata_amaryllis_dÉclat", 
        "nome" => "Amaryllis dÉclat", 
        "descricao" => "Prata 925 com Banho de Ródio, Cravejado em Zircônia.", 
        "preco" => "780,00",
         "img" => "../imagens/Braceletes/Prata/Amaryllis dÉclat.png"
    ],
    [
        "id" => "bracelete_prata_azalée", 
        "nome" => "Azalée Rose", 
        "descricao" => "Prata 925 com Acabamento Polido e Liso.", 
        "preco" => "450,00",
         "img" => "../imagens/Braceletes/Prata/Azalée Rose.png"
    ],
    [
        "id" => "bracelete_prata_camomille_douce", 
        "nome" => "Camomille Douce", 
        "descricao" => "Prata Maciça 950, Design Ergonômico.", 
        "preco" => "1.120,00",
        "img" => "../imagens/Braceletes/Prata/Camomille Douce.png"
    ],
    [
        "id" => "bracelete_prata_coquelicot", 
        "nome" => "Coquelicot Lumière", 
        "descricao" => "Prata 925, Elos Interligados.", 
        "preco" => "699,00",
         "img" => "../imagens/Braceletes/Prata/Coquelicot Lumière.png"
    ],
    [
        "id" => "bracelete_prata_fleur_de_cristal", 
        "nome" => "Fleur de Cristal", 
        "descricao" => "Prata 925, Design Ondulado Inspirado em Serpentes.", 
        "preco" => "945,00",
        "img" => "../imagens/Braceletes/Prata/Fleur de Cristal.png"
    ],
    [
        "id" => "bracelete_prata_fleur_de_reverie", 
        "nome" => "Fleur de Rêverie", 
        "descricao" => "Prata Pura, Modelo Trançado Fino.", 
        "preco" => "550,00",
         "img" => "../imagens/Braceletes/Prata/Fleur de Rêverie.png"
    ],
    [
        "id" => "bracelete_prata_fleur_de_soleil", 
        "nome" => "Fleur de Soleil", 
        "descricao" => "Prata Pura, Modelo Trançado Fino.", 
        "preco" => "550,00",
         "img" => "../imagens/Braceletes/Prata/Fleur de Soleil.png"
    ],
    [
        "id" => "bracelete_prata_fleur_sauvage", 
        "nome" => "Fleur Sauvage", 
        "descricao" => "Prata Pura, Modelo Trançado Fino.", 
        "preco" => "550,00",
         "img" => "../imagens/Braceletes/Prata/Fleur Sauvage.png"
    ],
    [
        "id" => "bracelete_prata_gardénia_blanche", 
        "nome" => "Gardénia Blanche", 
        "descricao" => "Prata Maciça, com Textura Diamantada.", 
        "preco" => "1.490,00",
      "img" => "../imagens/Braceletes/Prata/Gardénia Blanche.png"
    ],
    [
        "id" => "bracelete_prata_iris_dorée", 
        "nome" => "Iris Dorée", 
        "descricao" => "Design de Coroa em Miniatura em Prata.", 
        "preco" => "999,00",
       "img" => "../imagens/Braceletes/Prata/Iris Dorée.png"
    ],
    [
        "id" => "bracelete_prata_lotus_éternel", 
        "nome" => "Lotus Éternel", 
        "descricao" => "Corrente Fina com Pingente de Ponto de Luz.", 
        "preco" => "399,00",
            "img" => "../imagens/Braceletes/Prata/Lotus Éternel.png"
    ],
    [
        "id" => "bracelete_prata_muguet_dAmour", 
        "nome" => "Muguet dAmour", 
        "descricao" => "Dois Fios de Prata 925 Torcidos.", 
        "preco" => "720,00",
           "img" => "../imagens/Braceletes/Prata/Muguet dAmour.png"
    ],

    // === BRACELETES DOURADOS - Essence (12 produtos - Incluídos os IDs do arquivo que você corrigiu) ===
    [
        "id" => "bracelete_dourado_camélia", 
        "nome" => "Camélia Parisienne", 
        "descricao" => "Ouro 18k, Design Fino e Rígido.", 
        "preco" => "1.890,00",
         "img" => "../imagens/Braceletes/Dourado/Camélia Parisienne.png"
    ],
    [
        "id" => "bracelete_dourado_dahlia", 
        "nome" => "Dahlia dAmour", 
        "descricao" => "Ouro 18k com Zircônias Cravejadas.", 
        "preco" => "2.550,00",
         "img" => "../imagens/Braceletes/Dourado/Dahlia dAmour.png"
    ],
    [
        "id" => "bracelete_dourado_fleur", 
        "nome" => "Fleur de Lune", 
        "descricao" => "Banhado a Ouro, com Zircônias em todo o aro.", 
        "preco" => "990,00",
        "img" => "../imagens/Braceletes/Dourado/Fleur de Lune.png"
    ],
    [
        "id" => "bracelete_dourado_jasmin", 
        "nome" => "Jasmin de Nuit", 
        "descricao" => "Ouro 18k, Acabamento Espelhado.", 
        "preco" => "1.650,00",
        "img" => "../imagens/Braceletes/Dourado/Jasmin de Nuit.png"
    ],
    [
        "id" => "bracelete_dourado_lavande", 
        "nome" => "Lavande Étoilée", 
        "descricao" => "Ouro 18k, Malha Flexível.", 
        "preco" => "2.100,00",
         "img" => "../imagens/Braceletes/Dourado/Lavande Étoilée.png"
    ],
    [
        "id" => "bracelete_dourado_lys", 
        "nome" => "Lys Blanc", 
        "descricao" => "Ouro 18k, Design Minimalista.", 
        "preco" => "1.450,00",
         "img" => "../imagens/Braceletes/Dourado/Lys Blanc.png"
    ],
    [
        "id" => "bracelete_dourado_magnolia", 
        "nome" => "Magnolia de Rêve", 
        "descricao" => "Ouro 18k, Fecho Esculpido.", 
        "preco" => "2.900,00",
        "img" => "../imagens/Braceletes/Dourado/Magnolia de Rêve.png"
    ],
    [
        "id" => "bracelete_dourado_pivoine", 
        "nome" => "Pivoine Lumière", 
        "descricao" => "Ouro 18k com Safiras Azuis.", 
        "preco" => "3.800,00",
        "img" => "../imagens/Braceletes/Dourado/Pivoine Lumière.png"
    ],
    [
        "id" => "bracelete_dourado_orchidée", 
        "nome" => "Orchidée", 
        "descricao" => "Ouro 18k, Efeito Trançado.", 
        "preco" => "1.990,00",
      "img" => "../imagens/Braceletes/Dourado/Orchidée.png"
    ],
    [
        "id" => "bracelete_dourado_rose", 
        "nome" => "Rose d Or", 
        "descricao" => "Ouro 18k, Detalhes Filigrana.", 
        "preco" => "2.350,00",
        "img" => "../imagens/Braceletes/Dourado/Rose d Or.png"
    ],
    [
        "id" => "bracelete_dourado_tulipe_argentée", 
        "nome" => "Tulipe Argentée", 
        "descricao" => "Ouro 18k, Fios Cruzados com Zircônia.", 
        "preco" => "1.790,00",
        "img" => "../imagens/Braceletes/Dourado/Tulipe Argentée.png"
    ],
    [
        "id" => "bracelete_dourado_violette_douce", 
        "nome" => "Violette Douce", 
        "descricao" => "Ouro 18k, com Pingentes Estelares.", 
        "preco" => "1.599,00",
         "img" => "../imagens/Braceletes/Dourado/Violette Douce.png"
    ],
];

// IDs dos produtos salvos no cookie
$favoritos_ids = getFavoritesFromCookie();

// Array final que conterá APENAS os produtos favoritos
$produtos_favoritos = [];

// Filtra o catálogo completo para encontrar apenas os produtos favoritos
foreach ($PRODUTOS_CATALOGO_COMPLETO as $produto) {
    // Verifica se o ID do produto está na lista de IDs favoritos
    if (in_array($produto['id'], $favoritos_ids)) {
        $produtos_favoritos[] = $produto;
    }
}

// ----------------------------------------------------------------------------------
// 2. HTML e Exibição (Ajustado o loop para usar as classes corretas)
// ----------------------------------------------------------------------------------
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Favoritos - Éclat Joias</title>
    <link rel="stylesheet" href="../css/joias.css"> 
    <link rel="stylesheet" href="../css/favoritos.css"> 
    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
    rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>


     <header class="top-nav">

    <button class="hamburger-menu">☰</button>
    <script>document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navbar = document.querySelector('.navbar');

        hamburger.addEventListener('click', () => {
          navbar.classList.toggle('open');
        });
      });</script>

    <a href="../index/home.php" class="logo">
      <img src="../imagens/home/logo_oficial-removebg-preview.png" alt="logo">
    </a>
    <nav class="navbar">
      <div class="dropdown">
        <a href="#">Colares</a>
        <ul class="submenu">
          <li><a href="../index/colararesPrata.php">Versailles</a></li>
          <li><a href="../index/colaresDourado.php">Étoile Royale</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Brincos</a>
        <ul class="submenu">
          <li><a href="../index/brincosPratas.php">Monaco</a></li>
          <li><a href="../index/brincoDourado.php">Claire</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Anéis</a>
        <ul class="submenu">
          <li><a href="../index/aneisPratas.php">Caprice</a></li>
          <li><a href="../index/aneisDourado.php">Riviera</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Relógios</a>
        <ul class="submenu">
          <li><a href="../index/relogiosPrata.php">robuste</a></li>
          <li><a href="../index/relogioDourado.php">délicate</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Braceletes</a>
        <ul class="submenu">
          <li><a href="../index/braceletesPrata.php">Aurore</a></li>
          <li><a href="../index/braceletesDourado.php">Essence</a></li>
        </ul>
      </div>
    </nav>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
          const link = dropdown.querySelector('a');

          link.addEventListener('click', function (e) {
            // 1. Previne o link de navegar (só queremos mostrar/esconder o menu)
            e.preventDefault();

            // 3. Oculta todos os outros submenus abertos
            dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('show-submenu');
              }
            });

            // 2. Alterna a classe 'show-submenu' para mostrar/esconder o menu atual
            dropdown.classList.toggle('show-submenu');

            // Impede que o clique no link ative o detector de 'click-away' (passo 4)
            e.stopPropagation();
          });
        });

        // 4. Oculta o menu quando o usuário clica em qualquer lugar FORA do .dropdown
        document.addEventListener('click', function () {
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show-submenu');
          });
        });
      });
    </script>

   <div class="icones">
    <a href="../index/favoritos.php" title="Favoritos">
        <i class="fas fa-heart"></i>
    </a>
    <a href="../index/usuario.php">
    <i class="fas fa-user"></i></a>
    
     <a href="../index/carrinho.php">
    <i class="fas fa-shopping-cart"></i></a>
</div>
  </header>

  <body>
    <main class="page-content">
        <div class="favoritos-header">
            <h1>Seus Produtos Favoritos</h1>
            <p>Os itens que você amou e salvou para ver depois.</p>
        </div>

        <?php if (empty($produtos_favoritos)): ?>
            <div class="empty-state">
                <i class="far fa-heart fa-3x mb-3" style="color: #ccc;"></i>
                <p>Você ainda não adicionou nenhum item aos favoritos.</p>
                <p>Navegue em nossas coleções e clique no ícone de coração para começar!</p>
            </div>
        <?php else: ?>
            <div class="cards-grid" role="list" aria-label="Lista de Produtos Favoritos">
                
                <?php foreach ($produtos_favoritos as $produto): 
                    // Lógica para determinar a cor do card (se for dourado, usa a classe dourada)
                    // Verifica se o ID contém "dourado"
                    $is_dourado = strpos($produto['id'], 'dourado') !== false;
                    $card_class = $is_dourado ? 'card-dourado' : 'card-prata';
                ?>

                <div class="card <?= $card_class ?>" 
                    role="listitem"
                    data-id="<?= htmlspecialchars($produto['id']) ?>"
                    data-nome="<?= htmlspecialchars($produto['nome']) ?>"
                    data-descricao="<?= htmlspecialchars($produto['descricao']) ?>"
                    data-preco="<?= htmlspecialchars($produto['preco']) ?>"
                    data-img="<?= htmlspecialchars($produto['img']) ?>">

                    <img src="<?= htmlspecialchars($produto['img']) ?>" alt="Produto Favorito: <?= htmlspecialchars($produto['nome']) ?>" loading="lazy">
                    <div class="card-content">
                        <h3><?= htmlspecialchars($produto['nome']) ?></h3>
                        <p><?= htmlspecialchars($produto['descricao']) ?></p>
                        <p class="preco">R$ <?= htmlspecialchars($produto['preco']) ?></p>
                          <form action="carrinho.php" method="POST" style="margin-top: 10px;">
                            <input type="hidden" name="action" value="add">
                            <input type="hidden" name="id" value="<?= htmlspecialchars($produto['id']) ?>">
                            <input type="hidden" name="nome" value="<?= htmlspecialchars($produto['nome']) ?>">
                            <input type="hidden" name="preco" value="<?= str_replace(',', '.', str_replace('.', '', $produto['preco'])) ?>"> 
                            <input type="hidden" name="img" value="<?= htmlspecialchars($produto['img']) ?>">
                            <input type="hidden" name="variant" value="unidade-padrao"> 

                            <button type="submit" class="btn-comprar">Comprar</button>
                        </form>
                        
                        <button class="add-fav js-toggle-favorite favorited" title="Remover dos favoritos">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>

                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>

    <script src="../js/favoritos_script.js" defer></script>


<style>
        /* CSS para a página de Favoritos */
        .page-content {
            padding-top: 120px; 
            min-height: 80vh;
            max-width: 1200px;
            margin: 0 auto; /* Centraliza o conteúdo */
            padding: 120px 20px 50px 20px;
        }
        .favoritos-header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        /* CORREÇÃO APLICADA: Restaurando a cor do subtítulo (p) que pode ter sido perdida */
       .favoritos-header {
    text-align: center; /* ISSO CENTRALIZA TUDO DENTRO DO HEADER */
    margin-bottom: 40px;
}
.favoritos-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem; /* ESTE É UM BOM TAMANHO */
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    color: var(--color-text-dark, #3a1e10);
}

.favoritos-header p {
    font-family: 'Playfair Display', serif;
    text-align: center;
     font-size: 1.2rem;
}




        .empty-state {
            text-align: center;
            padding: 50px 0;
            color: #666;
        }
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding-bottom: 50px;
        }
        .card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            position: relative;
            transition: transform 0.2s;
            background-color: #fff; /* Fundo branco para cards */
        }
        .card:hover {
            transform: translateY(-5px);
        }
.card-dourado {
    border-top: 5px solid var(--color-primary);
    /* Usa o Dourado para a borda */
}

.card-dourado button:hover {
    background: var(--color-primary);
    color: var(--color-dark-button);
}

.card-prata {
    border-top: 5px solid var(--color-primary);
    /* Usa o Dourado para a borda */
}

.card-prata button:hover {
    background: var(--color-primary);
    color: var(--color-dark-button);
}

.card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: var(--color-text-light);
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    flex-shrink: 0;
}
        /* Definição de bordas mais claras para prata/dourado - Importante para visualização */
       
        .card img {
            width: 100%;
            height: auto;
            display: block;
        }
        .card-content {
            padding: 15px;
            text-align: center;
        }
      
        .card-content p {
            font-size: 0.9rem;
            color: #555;
            text-align: center;
            margin-bottom: 10px;
        }
        .card-content .preco {
            font-weight: 600;
            color: #cfa266; /* Cor dourada para o preço */
            margin-bottom: 15px;
        }
        .card-content button {
            width: 100%;
            padding: 10px;
            background-color: #333;
            color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .card-content button:hover {
            background-color: #555;
        }
        .add-fav {
            position: absolute;
            top: 10px;
            **left: 10px; /* CORRIGIDO: Move para o lado esquerdo */**
            **right: auto; /* ADICIONADO: Garante que 'left' funcione */**
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            padding: 0;
            width: 30px;
            height: 30px;
        }
        /* Estilo para o coração (SEMPRE PREENCHIDO nesta página) */
        .add-fav i {
            color: red; /* O favorito sempre está ativo nesta página */
        }
        
    </style>

 <div class="secao-separador-sutil">
    <hr>

    <footer class="footer-minimal">
      <div class="container footer-content-wrapper-three-cols">

        <div class="footer-col footer-col-logo">
          <a href="../index/home.php" class="footer-logo">
            <img src="../imagens/home/logo_oficial-removebg-preview.png" alt="Logo Éclat Joias" loading="lazy">
          </a>
          <p>Elegância. Tradição. Significado.</p>
        </div>


        <div class="footer-col footer-col-links">
          <h3>Navegue por Categoria</h3>
          <ul class="category-list-two-cols">
            <li><a href="../index/usuario.php">Conta</a></li>
            <li><a href="../index/favoritos.php">Favoritos</a></li>
            <li><a href="../index/sobre.php">Nossa Historia</a></li>
          </ul>
        </div>

        <div class="footer-col footer-col-social">
          <h3>Siga a Éclat</h3>
          <div class="social-icons">
            <a href="https://www.instagram.com/eclatjoias_oficial/?utm_source=qr&igsh=MWVtY21zY3A1b3huOQ%3D%3D#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/share/17oPPh1v44/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://pin.it/4njZyGX1p" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
          </div>
        </div>

      </div>

      <div class="footer-copyright">
        <div class="container">
          <p>© 2025 Éclat Joias. Todos os direitos reservados.</p>
        </div>
      </div>
 
</body>
</html>