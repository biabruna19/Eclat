/*
 * Catálogo da Éclat Joias.
 * Antes os produtos estavam repetidos dentro de cada página PHP (e de novo
 * em favoritos.php); agora ficam todos aqui, num lugar só.
 * O estoque inicial é só para a demonstração: o painel administrativo pode
 * alterar tudo, e as mudanças ficam salvas no navegador.
 */
window.CATALOGO = {
 "categorias": {
  "colares": {
   "nome": "Colares",
   "singular": "Colar",
   "banner": "imagens/colecoes/colares.webp",
   "prata": {
    "nome": "Versailles",
    "descricao": "Prata em sua forma mais pura. Colares que unem sofisticação e simplicidade em perfeita harmonia.",
    "img": "imagens/colecoes/versailles.webp"
   },
   "dourado": {
    "nome": "Étoile Royale",
    "descricao": "O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa.",
    "img": "imagens/colecoes/etoile-royale.webp"
   }
  },
  "brincos": {
   "nome": "Brincos",
   "singular": "Brinco",
   "banner": "imagens/colecoes/brincos.webp",
   "prata": {
    "nome": "Monaco",
    "descricao": "Prata em sua forma mais pura. Brincos que unem sofisticação e simplicidade em perfeita harmonia.",
    "img": "imagens/colecoes/monaco.webp"
   },
   "dourado": {
    "nome": "Claire",
    "descricao": "O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa.",
    "img": "imagens/colecoes/claire.webp"
   }
  },
  "aneis": {
   "nome": "Anéis",
   "singular": "Anel",
   "banner": "imagens/colecoes/aneis.webp",
   "prata": {
    "nome": "Caprice",
    "descricao": "A pureza da prata 925 e o brilho dos cristais. Joias inspiradas no charme atemporal da alta costura.",
    "img": "imagens/colecoes/caprice.webp"
   },
   "dourado": {
    "nome": "Riviera",
    "descricao": "O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa.",
    "img": "imagens/colecoes/riviera.webp"
   }
  },
  "relogios": {
   "nome": "Relógios",
   "singular": "Relógio",
   "banner": "imagens/colecoes/relogios.webp",
   "prata": {
    "nome": "Robuste",
    "descricao": "Relógios com caixa de aço em tons prateados que unem força, precisão e estilo atemporal.",
    "img": "imagens/colecoes/robuste.webp"
   },
   "dourado": {
    "nome": "Délicate",
    "descricao": "Relógios banhados a ouro 18k, que unem a delicadeza de um design fino com a resistência de uma peça eterna.",
    "img": "imagens/colecoes/delicate.webp"
   }
  },
  "braceletes": {
   "nome": "Braceletes",
   "singular": "Bracelete",
   "banner": "imagens/colecoes/braceletes.webp",
   "prata": {
    "nome": "Aurore",
    "descricao": "A pureza da Prata 925 em designs que capturam a beleza da Aurora. Joias que brilham com uma luz suave e atemporal.",
    "img": "imagens/colecoes/aurore.webp"
   },
   "dourado": {
    "nome": "Essence",
    "descricao": "O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa.",
    "img": "imagens/colecoes/essence.webp"
   }
  }
 },
 "produtos": [
  {
   "id": "colares-prata-etoile",
   "nome": "Étoile",
   "descricao": "Colar em Prata 900. Cravejado com safiras azuis",
   "preco": 899.9,
   "img": "imagens/produtos/colares/etoile.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "colares-prata-coeur",
   "nome": "Coeur",
   "descricao": "Colar Romântico em Prata 825. Pingente central de coração",
   "preco": 880.0,
   "img": "imagens/produtos/colares/coeur.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "colares-prata-brillant",
   "nome": "Brillant",
   "descricao": "Colar em Prata 925 Pingente de cristal",
   "preco": 900.0,
   "img": "imagens/produtos/colares/brillant.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 20
  },
  {
   "id": "colares-prata-diamant",
   "nome": "Diamant",
   "descricao": "Colar em Prata 900 Pingente central de pedra gota rosada",
   "preco": 1199.0,
   "img": "imagens/produtos/colares/diamant.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 2
  },
  {
   "id": "colares-prata-mure",
   "nome": "Mûre",
   "descricao": "Colar em Prata 800 Pingente de ametista quadrada de zircônias.",
   "preco": 799.99,
   "img": "imagens/produtos/colares/mure.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 13
  },
  {
   "id": "colares-prata-perles",
   "nome": "Perles",
   "descricao": "Colar Clássico em Prata 900 Com fio de pérolas de cultura delicadas",
   "preco": 900.0,
   "img": "imagens/produtos/colares/perles.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 12
  },
  {
   "id": "colares-prata-eblouissant",
   "nome": "Éblouissant",
   "descricao": "Colar Choker Duplo em Prata 800 Pingente de leque de esmeraldas e pérola.",
   "preco": 899.0,
   "img": "imagens/produtos/colares/eblouissant.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 11
  },
  {
   "id": "colares-prata-charmant",
   "nome": "Charmant",
   "descricao": "Colar em Prata 925 Com Safira gota e pontos de luz",
   "preco": 699.0,
   "img": "imagens/produtos/colares/charmant.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "colares-prata-precieux",
   "nome": "Précieux",
   "descricao": "Colar em Prata 850 Com Ônix preto central",
   "preco": 999.0,
   "img": "imagens/produtos/colares/precieux.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 8
  },
  {
   "id": "colares-prata-fleur",
   "nome": "Fleur",
   "descricao": "Colar em Prata 925 Com flor central de turmalina rosa",
   "preco": 895.0,
   "img": "imagens/produtos/colares/fleur.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "colares-prata-luxe",
   "nome": "Luxe",
   "descricao": "Colar em Prata 925 Com ônix e pérolas",
   "preco": 899.0,
   "img": "imagens/produtos/colares/luxe.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 14
  },
  {
   "id": "colares-prata-ciel",
   "nome": "Ciel",
   "descricao": "Colar Choker em Prata 925 Com estrela e pedras azuis.",
   "preco": 499.0,
   "img": "imagens/produtos/colares/ciel.webp",
   "categoria": "colares",
   "linha": "prata",
   "estoque": 3
  },
  {
   "id": "colares-dourado-courant",
   "nome": "Courant",
   "descricao": "Colar em ouro 15K de design múltiplo",
   "preco": 799.0,
   "img": "imagens/produtos/colares/courant.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 8
  },
  {
   "id": "colares-dourado-joie",
   "nome": "Joie",
   "descricao": "Colar em Ouro 18K de duas voltas com pingentes coloridos",
   "preco": 495.0,
   "img": "imagens/produtos/colares/joie.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 0
  },
  {
   "id": "colares-dourado-argent",
   "nome": "Argent",
   "descricao": "Gargantilha Choker de Elos Grossos em Ouro 14K",
   "preco": 999.0,
   "img": "imagens/produtos/colares/argent.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 19
  },
  {
   "id": "colares-dourado-monde",
   "nome": "Monde",
   "descricao": "Colar Choker em Ouro 18K com mini pingentes de coração",
   "preco": 890.99,
   "img": "imagens/produtos/colares/monde.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 10
  },
  {
   "id": "colares-dourado-eclaire",
   "nome": "Éclairé",
   "descricao": "Gargantilha Choker Fita em Ouro 10K",
   "preco": 599.99,
   "img": "imagens/produtos/colares/eclaire.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 5
  },
  {
   "id": "colares-dourado-dore",
   "nome": "Doré",
   "descricao": "Colar em Ouro 16K com pingente de coração único",
   "preco": 900.0,
   "img": "imagens/produtos/colares/dore.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 0
  },
  {
   "id": "colares-dourado-battement",
   "nome": "Battement",
   "descricao": "Colar em Ouro 15K com pingente de coração de zircônia",
   "preco": 790.0,
   "img": "imagens/produtos/colares/battement.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 9
  },
  {
   "id": "colares-dourado-univers",
   "nome": "Univers",
   "descricao": "Colar Choker Celestial em Ouro 18K com luas e estrelas de zircônia",
   "preco": 699.0,
   "img": "imagens/produtos/colares/univers.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 20
  },
  {
   "id": "colares-dourado-etoile",
   "nome": "Étoilé",
   "descricao": "Colar Choker Estrela Solitária em Ouro 14K.",
   "preco": 679.9,
   "img": "imagens/produtos/colares/etoile.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 0
  },
  {
   "id": "colares-dourado-fantaisie",
   "nome": "Fantaisie",
   "descricao": "Colar Choker em Ouro 18K com pequenas contas de rubi.",
   "preco": 889.9,
   "img": "imagens/produtos/colares/fantaisie.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 17
  },
  {
   "id": "colares-dourado-lumiere",
   "nome": "Lumiere",
   "descricao": "Colar Choker em Ouro 15K com pérolas e pingentes de folha",
   "preco": 600.0,
   "img": "imagens/produtos/colares/lumiere.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 13
  },
  {
   "id": "colares-dourado-lune",
   "nome": "Lune",
   "descricao": "Colar Ponto de Luz em Ouro 14K com pedra redonda.",
   "preco": 699.0,
   "img": "imagens/produtos/colares/lune.webp",
   "categoria": "colares",
   "linha": "dourado",
   "estoque": 14
  },
  {
   "id": "brincos-prata-salidou",
   "nome": "Salidou",
   "descricao": "Prata 925 Argola Lisa 20mm",
   "preco": 299.0,
   "img": "imagens/produtos/brincos/salidou.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 17
  },
  {
   "id": "brincos-prata-gateau-basque",
   "nome": "Gâteau Basque",
   "descricao": "Prata 925 Coração Vazado 12mm",
   "preco": 495.0,
   "img": "imagens/produtos/brincos/gateau-basque.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 8
  },
  {
   "id": "brincos-prata-cugneaux",
   "nome": "Cugneaux",
   "descricao": "Prata 925 Pêndulo Oval Polido",
   "preco": 319.0,
   "img": "imagens/produtos/brincos/cugneaux.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "brincos-prata-tourton",
   "nome": "Tourton",
   "descricao": "Prata 925 Geométrico Minimalista",
   "preco": 799.0,
   "img": "imagens/produtos/brincos/tourton.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 17
  },
  {
   "id": "brincos-prata-niflettes",
   "nome": "Niflettes",
   "descricao": "Prata 925 Argolinha com Ponto de Luz",
   "preco": 299.0,
   "img": "imagens/produtos/brincos/niflettes.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 15
  },
  {
   "id": "brincos-prata-pogne",
   "nome": "Pogne",
   "descricao": "Prata 925 Gota com Detalhe Texturizado",
   "preco": 1199.0,
   "img": "imagens/produtos/brincos/pogne.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 20
  },
  {
   "id": "brincos-prata-fiadone",
   "nome": "Fiadone",
   "descricao": "Prata 925 com Zircônia Redonda 4mm",
   "preco": 495.0,
   "img": "imagens/produtos/brincos/fiadone.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 2
  },
  {
   "id": "brincos-prata-sable",
   "nome": "Sablé",
   "descricao": "Ouro 18k com pedras cintilantes",
   "preco": 1399.0,
   "img": "imagens/produtos/brincos/sable.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "brincos-prata-rousquille",
   "nome": "Rousquille'",
   "descricao": "Ouro 18k com design inspirado na natureza",
   "preco": 1399.0,
   "img": "imagens/produtos/brincos/rousquille.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "brincos-prata-pompe-a-huile",
   "nome": "Pompe á huile",
   "descricao": "Ouro 18k com safiras azuis",
   "preco": 1799.0,
   "img": "imagens/produtos/brincos/pompe-a-huile.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 16
  },
  {
   "id": "brincos-prata-pets-de-nonne",
   "nome": "Pets de nonne",
   "descricao": "Ouro 18k com rubis refinados",
   "preco": 2199.0,
   "img": "imagens/produtos/brincos/pets-de-nonne.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 2
  },
  {
   "id": "brincos-prata-craquelin",
   "nome": "Craquelin",
   "descricao": "Ouro 18k com rubis refinados",
   "preco": 2199.0,
   "img": "imagens/produtos/brincos/craquelin.webp",
   "categoria": "brincos",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "brincos-dourado-montecaos",
   "nome": "Montécaos",
   "descricao": "Dourado 18k Argola Clássica 18mm",
   "preco": 250.0,
   "img": "imagens/produtos/brincos/montecaos.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 0
  },
  {
   "id": "brincos-dourado-pastis",
   "nome": "Pastis",
   "descricao": "Dourado 18k Quadrado Liso Moderno",
   "preco": 495.0,
   "img": "imagens/produtos/brincos/pastis.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 19
  },
  {
   "id": "brincos-dourado-bugnes",
   "nome": "Bugnes",
   "descricao": "Dourado 18k com Pérola Natural Pequena",
   "preco": 360.0,
   "img": "imagens/produtos/brincos/bugnes.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 2
  },
  {
   "id": "brincos-dourado-nougat",
   "nome": "Nougat",
   "descricao": "Dourado 18k Argola Texturizada 20mm",
   "preco": 199.0,
   "img": "imagens/produtos/brincos/nougat.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 7
  },
  {
   "id": "brincos-dourado-bourdaloue",
   "nome": "Bourdaloue",
   "descricao": "Dourado 18k Redondo Fosco Minimalista",
   "preco": 469.0,
   "img": "imagens/produtos/brincos/bourdaloue.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 18
  },
  {
   "id": "brincos-dourado-teurgoule",
   "nome": "Teurgoule",
   "descricao": "Dourado 18k com Corrente Fina e Cristal Branco",
   "preco": 799.0,
   "img": "imagens/produtos/brincos/teurgoule.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 8
  },
  {
   "id": "brincos-dourado-calisson",
   "nome": "Calisson",
   "descricao": "Dourado 18k Argola com Detalhe Torcidos",
   "preco": 2199.0,
   "img": "imagens/produtos/brincos/calisson.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 2
  },
  {
   "id": "brincos-dourado-dragee",
   "nome": "Dragée",
   "descricao": "Dourado 18k com Zircônias Cravejadas",
   "preco": 469.0,
   "img": "imagens/produtos/brincos/dragee.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 4
  },
  {
   "id": "brincos-dourado-perouges",
   "nome": "Pérouges",
   "descricao": "Dourado 18k com Pêndulo Alongado",
   "preco": 499.0,
   "img": "imagens/produtos/brincos/perouges.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 16
  },
  {
   "id": "brincos-dourado-croquant",
   "nome": "Croquant",
   "descricao": "Dourado 18k com Ponto de Luz 4mm",
   "preco": 495.0,
   "img": "imagens/produtos/brincos/croquant.webp",
   "categoria": "brincos",
   "linha": "dourado",
   "estoque": 9
  },
  {
   "id": "aneis-prata-agreable",
   "nome": "Agréable",
   "descricao": "Prata 925 com zircônia cravejada, Solitário",
   "preco": 299.0,
   "img": "imagens/produtos/aneis/agreable.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "aneis-prata-courageux",
   "nome": "Courageux",
   "descricao": "Prata 925 com detalhe em Ouro 18k",
   "preco": 495.0,
   "img": "imagens/produtos/aneis/courageux.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 9
  },
  {
   "id": "aneis-prata-energique",
   "nome": "Énergique",
   "descricao": "Prata 925 Corrente Clássica",
   "preco": 999.0,
   "img": "imagens/produtos/aneis/energique.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 6
  },
  {
   "id": "aneis-prata-fabuleux",
   "nome": "Fabuleux",
   "descricao": "Prata 925 Pingente Estelar com zircônias",
   "preco": 1199.0,
   "img": "imagens/produtos/aneis/fabuleux.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 9
  },
  {
   "id": "aneis-prata-fidele",
   "nome": "Fidèle",
   "descricao": "Prata 925 com design inspirado na natureza",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/fidele.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 6
  },
  {
   "id": "aneis-prata-honnete",
   "nome": "Honnête",
   "descricao": "Prata 925 com safiras azuis",
   "preco": 1799.0,
   "img": "imagens/produtos/aneis/honnete.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 13
  },
  {
   "id": "aneis-prata-ouvert",
   "nome": "Ouvert",
   "descricao": "Prata 925 Elegância Real com rubis",
   "preco": 2199.0,
   "img": "imagens/produtos/aneis/ouvert.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "aneis-prata-passionne",
   "nome": "Passionné",
   "descricao": "Prata 925 com pedras cintilantes",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/passionne.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 3
  },
  {
   "id": "aneis-prata-patient",
   "nome": "Patient",
   "descricao": "Prata 925 com design inspirado na natureza",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/patient.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 16
  },
  {
   "id": "aneis-prata-polie",
   "nome": "Polie",
   "descricao": "Prata 925 com safiras azuis",
   "preco": 1799.0,
   "img": "imagens/produtos/aneis/polie.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "aneis-prata-superbe",
   "nome": "Superbe",
   "descricao": "Prata 925 com rubis refinados",
   "preco": 2199.0,
   "img": "imagens/produtos/aneis/superbe.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "aneis-prata-travailleur",
   "nome": "Travailleur",
   "descricao": "Prata 925 com pedras cintilantes",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/travailleur.webp",
   "categoria": "aneis",
   "linha": "prata",
   "estoque": 11
  },
  {
   "id": "aneis-dourado-bonne",
   "nome": "Bonne",
   "descricao": "Ouro 18k com diamantes incrustados",
   "preco": 299.0,
   "img": "imagens/produtos/aneis/bonne.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 9
  },
  {
   "id": "aneis-dourado-calme",
   "nome": "Calme",
   "descricao": "Ouro 18k com pérolas naturais",
   "preco": 495.0,
   "img": "imagens/produtos/aneis/calme.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 19
  },
  {
   "id": "aneis-dourado-chaleureux",
   "nome": "Chaleureux",
   "descricao": "Ouro 18k puro e atemporal",
   "preco": 999.0,
   "img": "imagens/produtos/aneis/chaleureux.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 16
  },
  {
   "id": "aneis-dourado-creatif",
   "nome": "Créatif",
   "descricao": "Ouro 18k com zircônias",
   "preco": 1199.0,
   "img": "imagens/produtos/aneis/creatif.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 20
  },
  {
   "id": "aneis-dourado-drole",
   "nome": "Drôle",
   "descricao": "Ouro 18k com design inspirado na natureza",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/drole.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 16
  },
  {
   "id": "aneis-dourado-dynamique",
   "nome": "Dynamique",
   "descricao": "Ouro 18k com safiras azuis",
   "preco": 1799.0,
   "img": "imagens/produtos/aneis/dynamique.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 17
  },
  {
   "id": "aneis-dourado-gentille",
   "nome": "Gentille",
   "descricao": "Ouro 18k com rubis refinados",
   "preco": 2199.0,
   "img": "imagens/produtos/aneis/gentille.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 17
  },
  {
   "id": "aneis-dourado-heureuse",
   "nome": "Heureuse",
   "descricao": "Ouro 18k com pedras cintilantes",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/heureuse.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 5
  },
  {
   "id": "aneis-dourado-joyeuse",
   "nome": "Joyeuse",
   "descricao": "Ouro 18k com design inspirado na natureza",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/joyeuse.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 9
  },
  {
   "id": "aneis-dourado-loyal",
   "nome": "Loyal",
   "descricao": "Ouro 18k com safiras azuis",
   "preco": 1799.0,
   "img": "imagens/produtos/aneis/loyal.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 19
  },
  {
   "id": "aneis-dourado-serieux",
   "nome": "Sérieux",
   "descricao": "Ouro 18k com rubis refinados",
   "preco": 2199.0,
   "img": "imagens/produtos/aneis/serieux.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 20
  },
  {
   "id": "aneis-dourado-sympathique",
   "nome": "Sympathique",
   "descricao": "Ouro 18k com pedras cintilantes",
   "preco": 1399.0,
   "img": "imagens/produtos/aneis/sympathique.webp",
   "categoria": "aneis",
   "linha": "dourado",
   "estoque": 14
  },
  {
   "id": "relogios-prata-emerveillement",
   "nome": "Émerveillement",
   "descricao": "Aço Inox Escovado, Clássico.",
   "preco": 799.0,
   "img": "imagens/produtos/relogios/emerveillement.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "relogios-prata-espoir",
   "nome": "Espoir",
   "descricao": "Aço Inox com Detalhes em Safira.",
   "preco": 1199.0,
   "img": "imagens/produtos/relogios/espoir.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 2
  },
  {
   "id": "relogios-prata-frisson",
   "nome": "Frisson",
   "descricao": "Cronógrafo Funcional Prata.",
   "preco": 1490.0,
   "img": "imagens/produtos/relogios/frisson.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 13
  },
  {
   "id": "relogios-prata-ivresse",
   "nome": "Ivresse",
   "descricao": "Design Esportivo em Titânio Polido.",
   "preco": 1899.0,
   "img": "imagens/produtos/relogios/ivresse.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 4
  },
  {
   "id": "relogios-prata-mystere",
   "nome": "Mystère",
   "descricao": "Pulseira Mesh Minimalista.",
   "preco": 650.0,
   "img": "imagens/produtos/relogios/mystere.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 13
  },
  {
   "id": "relogios-prata-nostalgie",
   "nome": "Nostalgie",
   "descricao": "Mostrador Preto com Marcadores em Prata.",
   "preco": 950.0,
   "img": "imagens/produtos/relogios/nostalgie.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 6
  },
  {
   "id": "relogios-prata-passion",
   "nome": "Passion",
   "descricao": "Fino e Elegante com Borda Slim.",
   "preco": 880.0,
   "img": "imagens/produtos/relogios/passion.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 16
  },
  {
   "id": "relogios-prata-plaisir",
   "nome": "Plaisir",
   "descricao": "Aço Inox com Indicador de Data.",
   "preco": 1250.0,
   "img": "imagens/produtos/relogios/plaisir.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "relogios-prata-reverie",
   "nome": "Rêverie",
   "descricao": "Design Quadrado Retrô.",
   "preco": 1050.0,
   "img": "imagens/produtos/relogios/reverie.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 15
  },
  {
   "id": "relogios-prata-serenite",
   "nome": "Sérénité",
   "descricao": "Pulseira Metálica Grossa.",
   "preco": 1320.0,
   "img": "imagens/produtos/relogios/serenite.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 2
  },
  {
   "id": "relogios-prata-tendresse",
   "nome": "Tendresse",
   "descricao": "Edição Especial Limitada.",
   "preco": 2999.0,
   "img": "imagens/produtos/relogios/tendresse.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "relogios-prata-tristesse",
   "nome": "Tristesse",
   "descricao": "Modelo Ultra Slim.",
   "preco": 780.0,
   "img": "imagens/produtos/relogios/tristesse.webp",
   "categoria": "relogios",
   "linha": "prata",
   "estoque": 12
  },
  {
   "id": "relogios-dourado-admiration",
   "nome": "Admiration",
   "descricao": "Banhado a Ouro 18k, Detalhes em Zircônia.",
   "preco": 899.0,
   "img": "imagens/produtos/relogios/admiration.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 4
  },
  {
   "id": "relogios-dourado-amour",
   "nome": "Amour",
   "descricao": "Pulseira em Aço Dourado Polido.",
   "preco": 1050.0,
   "img": "imagens/produtos/relogios/amour.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 14
  },
  {
   "id": "relogios-dourado-charme",
   "nome": "Charme",
   "descricao": "Design Slim com Mostrador Pérola.",
   "preco": 1390.0,
   "img": "imagens/produtos/relogios/charme.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 6
  },
  {
   "id": "relogios-dourado-confidence",
   "nome": "Confidence",
   "descricao": "Caixa Quadrada Retrô.",
   "preco": 999.0,
   "img": "imagens/produtos/relogios/confidence.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 7
  },
  {
   "id": "relogios-dourado-douceur",
   "nome": "Douceur",
   "descricao": "Ouro Rosa com Pulseira de Couro.",
   "preco": 1150.0,
   "img": "imagens/produtos/relogios/douceur.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 20
  },
  {
   "id": "relogios-dourado-elegance",
   "nome": "Élégance",
   "descricao": "Clássico com Borda Cravejada.",
   "preco": 1699.0,
   "img": "imagens/produtos/relogios/elegance.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 8
  },
  {
   "id": "relogios-dourado-felicite",
   "nome": "Félicité",
   "descricao": "Minimalista com Fundo Escuro.",
   "preco": 750.0,
   "img": "imagens/produtos/relogios/felicite.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 12
  },
  {
   "id": "relogios-dourado-grace",
   "nome": "Grace",
   "descricao": "Mostrador de Madre-Pérola.",
   "preco": 1450.0,
   "img": "imagens/produtos/relogios/grace.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 12
  },
  {
   "id": "relogios-dourado-joie",
   "nome": "Joie",
   "descricao": "Retangular e Sofisticado.",
   "preco": 1099.0,
   "img": "imagens/produtos/relogios/joie.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 9
  },
  {
   "id": "relogios-dourado-legerete",
   "nome": "Légéreté",
   "descricao": "Luxo com Diamantes na Borda.",
   "preco": 2599.0,
   "img": "imagens/produtos/relogios/legerete.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 20
  },
  {
   "id": "relogios-dourado-relorelogio",
   "nome": "Relorelogio",
   "descricao": "Edição Especial Limitada.",
   "preco": 3199.0,
   "img": "imagens/produtos/relogios/relorelogio.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 17
  },
  {
   "id": "relogios-dourado-volupte",
   "nome": "Volupté",
   "descricao": "Clássico com Cronógrafo Dourado.",
   "preco": 1599.0,
   "img": "imagens/produtos/relogios/volupte.webp",
   "categoria": "relogios",
   "linha": "dourado",
   "estoque": 11
  },
  {
   "id": "braceletes-prata-amaryllis-declat",
   "nome": "Amaryllis dÉclat",
   "descricao": "Prata 925 com Banho de Ródio, Cravejado em Zircônia.",
   "preco": 780.0,
   "img": "imagens/produtos/braceletes/amaryllis-declat.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "braceletes-prata-azalee-rose",
   "nome": "Azalée Rose",
   "descricao": "Prata 925 com Acabamento Polido e Liso.",
   "preco": 450.0,
   "img": "imagens/produtos/braceletes/azalee-rose.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 18
  },
  {
   "id": "braceletes-prata-camomille-douce",
   "nome": "Camomille Douce",
   "descricao": "Prata Maciça 950, Design Ergonômico.",
   "preco": 1120.0,
   "img": "imagens/produtos/braceletes/camomille-douce.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "braceletes-prata-coquelicot-lumiere",
   "nome": "Coquelicot Lumière",
   "descricao": "Prata 925, Elos Interligados.",
   "preco": 699.0,
   "img": "imagens/produtos/braceletes/coquelicot-lumiere.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 19
  },
  {
   "id": "braceletes-prata-fleur-de-cristal",
   "nome": "Fleur de Cristal",
   "descricao": "Prata 925, Design Ondulado Inspirado em Serpentes.",
   "preco": 945.0,
   "img": "imagens/produtos/braceletes/fleur-de-cristal.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "braceletes-prata-fleur-de-reverie",
   "nome": "Fleur de Rêverie",
   "descricao": "Prata Pura, Modelo Trançado Fino.",
   "preco": 550.0,
   "img": "imagens/produtos/braceletes/fleur-de-reverie.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 10
  },
  {
   "id": "braceletes-prata-fleur-de-soleil",
   "nome": "Fleur de Soleil",
   "descricao": "Prata Pura, Modelo Trançado Fino.",
   "preco": 550.0,
   "img": "imagens/produtos/braceletes/fleur-de-soleil.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 14
  },
  {
   "id": "braceletes-prata-fleur-sauvage",
   "nome": "Fleur Sauvage",
   "descricao": "Prata Pura, Modelo Trançado Fino.",
   "preco": 550.0,
   "img": "imagens/produtos/braceletes/fleur-sauvage.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 16
  },
  {
   "id": "braceletes-prata-gardenia-blanche",
   "nome": "Gardénia Blanche",
   "descricao": "Prata Maciça, com Textura Diamantada.",
   "preco": 1490.0,
   "img": "imagens/produtos/braceletes/gardenia-blanche.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 4
  },
  {
   "id": "braceletes-prata-iris-doree",
   "nome": "Iris Dorée",
   "descricao": "Design de Coroa em Miniatura em Prata.",
   "preco": 999.0,
   "img": "imagens/produtos/braceletes/iris-doree.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 0
  },
  {
   "id": "braceletes-prata-lotus-eternel",
   "nome": "Lotus Éternel",
   "descricao": "Corrente Fina com Pingente de Ponto de Luz.",
   "preco": 399.0,
   "img": "imagens/produtos/braceletes/lotus-eternel.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 18
  },
  {
   "id": "braceletes-prata-muguet-damour",
   "nome": "Muguet dAmour",
   "descricao": "Dois Fios de Prata 925 Torcidos.",
   "preco": 720.0,
   "img": "imagens/produtos/braceletes/muguet-damour.webp",
   "categoria": "braceletes",
   "linha": "prata",
   "estoque": 18
  },
  {
   "id": "braceletes-dourado-camelia-parisienne",
   "nome": "Camélia Parisienne",
   "descricao": "Ouro 18k, Design Fino e Rígido.",
   "preco": 1890.0,
   "img": "imagens/produtos/braceletes/camelia-parisienne.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 5
  },
  {
   "id": "braceletes-dourado-dahlia-damour",
   "nome": "Dahlia dAmour",
   "descricao": "Ouro 18k com Zircônias Cravejadas.",
   "preco": 2550.0,
   "img": "imagens/produtos/braceletes/dahlia-damour.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 2
  },
  {
   "id": "braceletes-dourado-fleur-de-lune",
   "nome": "Fleur de Lune",
   "descricao": "Banhado a Ouro, com Zircônias em todo o aro.",
   "preco": 990.0,
   "img": "imagens/produtos/braceletes/fleur-de-lune.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 14
  },
  {
   "id": "braceletes-dourado-jasmin-de-nuit",
   "nome": "Jasmin de Nuit",
   "descricao": "Ouro 18k, Acabamento Espelhado.",
   "preco": 1650.0,
   "img": "imagens/produtos/braceletes/jasmin-de-nuit.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 7
  },
  {
   "id": "braceletes-dourado-lavande-etoilee",
   "nome": "Lavande Étoilée",
   "descricao": "Ouro 18k, Malha Flexível.",
   "preco": 2100.0,
   "img": "imagens/produtos/braceletes/lavande-etoilee.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 4
  },
  {
   "id": "braceletes-dourado-lys-blanc",
   "nome": "Lys Blanc",
   "descricao": "Ouro 18k, Design Minimalista.",
   "preco": 1450.0,
   "img": "imagens/produtos/braceletes/lys-blanc.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 18
  },
  {
   "id": "braceletes-dourado-magnolia-de-reve",
   "nome": "Magnolia de Rêve",
   "descricao": "Ouro 18k, Fecho Esculpido.",
   "preco": 2900.0,
   "img": "imagens/produtos/braceletes/magnolia-de-reve.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 14
  },
  {
   "id": "braceletes-dourado-pivoine-lumiere",
   "nome": "Pivoine Lumière",
   "descricao": "Ouro 18k com Safiras Azuis.",
   "preco": 3800.0,
   "img": "imagens/produtos/braceletes/pivoine-lumiere.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 17
  },
  {
   "id": "braceletes-dourado-orchidee",
   "nome": "Orchidée",
   "descricao": "Ouro 18k, Efeito Trançado.",
   "preco": 1990.0,
   "img": "imagens/produtos/braceletes/orchidee.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 0
  },
  {
   "id": "braceletes-dourado-rose-d-or",
   "nome": "Rose d Or",
   "descricao": "Ouro 18k, Detalhes Filigrana.",
   "preco": 2350.0,
   "img": "imagens/produtos/braceletes/rose-d-or.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 13
  },
  {
   "id": "braceletes-dourado-tulipe-argentee",
   "nome": "Tulipe Argentée",
   "descricao": "Ouro 18k, Fios Cruzados com Zircônia.",
   "preco": 1790.0,
   "img": "imagens/produtos/braceletes/tulipe-argentee.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 11
  },
  {
   "id": "braceletes-dourado-violette-douce",
   "nome": "Violette Douce",
   "descricao": "Ouro 18k, com Pingentes Estelares.",
   "preco": 1599.0,
   "img": "imagens/produtos/braceletes/violette-douce.webp",
   "categoria": "braceletes",
   "linha": "dourado",
   "estoque": 19
  }
 ]
};
