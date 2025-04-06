function escolherArenaAleatoria() {
    const arenas = [
        { nome: "*Arena Trovão ⚡*", descricao: `A arena trovão, foi construída  após a guerra em Kumogakure, os ninjas que nela lutam possuem a habilidade,  "manto de chakra estilo raio", o mesmo utilizado pelo Raikage,  seus efeitos aumentam drasticamente sua velocidade e resistência.
( As resistencias Variam de acordo com a patente da luta)
[🈂20%🔻]
[✳30%🔻]
[✴40%🔻]
["💠+" 50%🔻]`},
        { nome: "*Arena Uchiha ⭕*", descricao: `Um espaço criado para um treinamento no estilo Uchiha, ninjas que lutam nessa Arena Possuem o Sharingan, tendo a habilidade de copiar um jutsu do Oponente.
(Nessa Arena Você Poderá copiar qualquer Jutsu do oponente caso não tenha incluindo Rank S,A e etc), pode ser usado apenas uma vez.` },
        { nome: "*Arena Hyuuga ⚪*", descricao: `O Clã Hyuuga decidiu passar seus conhecimentos adiante, então construíram um baluarte (estrutura militar usada para defesas em guerras), para então treinar seus discípulos, nessa arena os pontos de chakra do inimigo são visíveis, e cada ataque acertado drena uma parte do chakra do oponente.
(Caso aceite dano levará (-10%🔹) no round)`},
        { nome: "*Arena Namikaze 〽*", descricao: `Minato Namikaze, era conhecido como  "Relampago Amarelo" temido em todo o mundo ninja, durante sua vida foi considerado o ninja mais rapido, e executava seus inimigos sem eles nem mesmo sentirem a sua presença, seu hiraishin era uma técnica impecável  tanto para ataque quanto para fugir alem de o tornar praticamente imune a habilidades sensoriais podendo aparecer em qualquer lugar devido as suas kunais nesse espaço todos possuem a habilidade Hiraishin.
(Nessa Arena todas as Fugas são imune a sensor)` },
        { nome: "*Arena Momoshiki 🌕*", descricao: `Muito conhecidos pelo seu vigor, os Seres Vindos da "Lua" se alimentam de frutos e companheiros para se fortalecer,  nessa arena parte do aumento de chakra é convertido em HP.
(Nessa Arena 50% dos aumentos de Chakra é convertido em aumentos de Hp)
Ex: Pilula +100 hp e CK, 50 do CK aumentado da pilula é convertido em +50♥ de HP e a Pilula passa a aumentar apenas +50🔹` },
        { nome: "*Arena Might-Guy 🥋*", descricao: `Guy, resolveu abrir uma academia para ensinar taijutsu aos ninjas de Konohagakure, por seus conhecimentos avançados ele ensinou técnicas extremamente avançadas a  seus ninjas sendo eles capazes de realizar a abertura dos oito portões internos.
(Taijutsu Especial Ignora Qualquer Ativação imune a taijutsu)` },
        { nome: "*Arena Espelhada 🪞*", descricao: `A arena Espelhada  é uma arena especial onde metade   do dano de jutsos (Aumentos de dano não contam) em seu oponente é refletido para  você tambem.` },
        { nome: "*Arena do Ceifeiro*", descricao: `Nesta Arena reside um Ceifeiro da Morte invocado pelo Juíz, o Ceifeiro ataca toda vez que qualquer um dos oponentes estiverem sem defesa, arrancando parte de sua energia vital, sendo assim, ambos perder -30Hp💔 caso ataquem sem defesas.` },
        { nome: "*Arena das Cobras 🐍*", descricao: `Orochimaru Ensinou a seus ninjas uma técnica um tanto quanto poderosa nessa arena os ninjas possuem uma habilidade secreta ensinada pelo sannin.
( Danos Que seriam Letais deixam o Oponente com 10%♥ de HP apenas uma vez)` },
        { nome: "*Arenas Elementares 💧🌪🔥⚡⛰*", descricao: `Essa são arenas onde os participantes vão receber buffs e debuffs referentes ao elementos da arena, exemplo  +30 🔺 em dano de Katon  e menos - 30 🔺  em dano fuuton na arena de fogo, porém  esse buffs e debuffs será trocados d e luta para luta.` },
        { nome: "*Arena Lunar 🌕*", descricao: `Arena lunar  é uma arena onde por conta da sua gravidade diferente da terra  faz que seja impossível usar certos tipos de jutsus e faz  os  Ninja gasta mais chakra durante a luta que corresponde a - 10🔹.` },
        { nome: "*Arena Solar 🔆*", descricao: `Arena solar é  um ambiente extremo que simula as  condições do sol gravidade estrema e uma quantidade extrema de energia natura, por conta disso os ninja que luta nesse arena  toda vez que ficam sem defesa recebem  -10 💔.` },
        { nome: "*Arena Estrelar 🌠*", descricao: `A arena estrelar  é a arena perfeita onde foi construída de forma  que seja indestrutível  e  inalterável, onde não restrição, buffs ou debuffs.` },
        { nome: "*Arena Karin 🌐*", descricao: `Karin Cria um campo sensorial perfeito tornando essa arena uma das mais difíceis de se batalhar.
(Ambos os ninjas possuem habilidades sensoriais perfeitas)
(Imunidade a sensor não funciona nessa arena)` },
        { nome: "*✨ Santuário da Luz Quebrada ✨*", descricao: `Este local foi marcado por uma luz instável e cortante. Toda manipulação de energia aqui causa dor e desgaste físico direto. Todo jutsu ativado consome 10 de Vida ❤ e 10 de Chakra 🔹, pois o ambiente fragmenta a estabilidade do chakra dos jogadores.` },
        { nome: "*🪐 Prisão Estelar Zero 🪐*", descricao: `Um campo suspenso além da realidade, onde as leis da gravidade foram aniquiladas. Aqui, corpos flutuam, movimentos perdem peso, e golpes físicos tornam-se inúteis diante do vácuo absoluto. Em meio ao silêncio espacial, apenas o controle do chakra pode romper o vazio desta prisão cósmica.
Todos os taijutsus causam 0%🔺 de danos.
Esse efeito só é cortado caso um dos oponentes possua 30%🔹 ou menos de chakra restante ou for paralisado.
`},
        { nome: "*🌀 Campo do Portão Interior 🌀*", descricao: `Um domínio ancestral onde as leis do combate corporal se sobrepõem ao próprio chakra. Diz-se que este espaço ecoa o espírito dos antigos mestres que abriram os Portões Internos, moldando um campo onde a força física é inevitável e o corpo se torna a verdadeira arma.
Todos os Taijutsus, independentemente de sua natureza ou estilo, passam a ser considerados Taijutsu Corporal.
Habilidades que interagem ou ampliam Taijutsu Corporal se aplicam a qualquer Taijutsu utilizado neste campo.` },
        { nome: "*Domínio do Vazio Silencioso 🔮*", descricao: `No Domínio do Vazio Silencioso, todas as formas de interferência sutil sejam ecos, drenos contínuos de vitalidade ou reduções de danos são completamente anuladas. Técnicas que dependem de repetição, desgaste ou enfraquecimento progressivo simplesmente não têm efeito aqui.` }
    ];
    
    const arenaEscolhida = arenas[Math.floor(Math.random() * arenas.length)];
    return `${arenaEscolhida.nome}\n${arenaEscolhida.descricao}`;
}

function sortearPatente(menorPatente) {
    const patentes = [ {nome: "Gennin"}, {nome: "Chunnin"}, {nome: "Jounnin"}, {nome: "Anbu"}, {nome: "Sannin"}, {nome: "Daimyo"}, {nome: "Kage"}, {nome: "Rikkudo"}];
    // Buscar índice da patente pelo nome
    const index = patentes.findIndex(p => p.nome === menorPatente);
    if (index === -1) throw new Error("Patente inválida" + menorPatente);
    const patentesPossiveis = patentes.slice(0, index + 1);
    return patentesPossiveis[Math.floor(Math.random() * patentesPossiveis.length)];
}

function sortearElemento() {
        const elementos = ['Katon 🔥*', 'Suiton 💧*', 'Doton ⛰*', 'Fuuton 🌪️*', 'Raiton ⚡*'];
        const indiceAleatorio = Math.floor(Math.random() * elementos.length);
        return `*Arena ${elementos[indiceAleatorio]}`;
    }

module.exports = {
    escolherArenaAleatoria,
    sortearPatente,
    sortearElemento
};
