const { DisconnectReason, makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { playBlackjack, buyCard, stopGame } = require('../games/blackjack');
const { playSlotMachine } = require('../games/slot-machine');
const { playRoulette } = require('../games/roulette');
const { getMenu } = require('../info/menu');
const { getKatana } = require('../info/katana-rules');
const { getContract } = require('../info/contract-rules');
const { getPShop, getPVile } = require('../info/points');
const { getCronogram } = require('../info/cronogram-vile');
const { getFicha } = require('../info/ficha-rec')
const { getShopVile, getShopRPG, getMenuVila, getFichaCompraAme, getFichaCompraRPG } = require('../info/shop-vile')
const { rulesApostas, limApostas } = require('../coliseu/info-apostas')
const { escolherArenaAleatoria, sortearPatente, sortearElemento } = require('../coliseu/sorteios')
const { processarAposta } = require('../coliseu/apostas')
const { placaInicial, placaCombo, placaFinal, getKunais } = require('../combo/combochu')
const { placaJInicial, placaJFinal } = require('../combo/combojou')

// IDs de Grupos
const groupIds = ['120363296203601720@g.us', '556384043631-1485535224@g.us', '120363278902077019@g.us'];
const vila = '120363274289996614@g.us';
const coliseu = ['120363393493858342@g.us', '120363287407780395@g.us']
const apostas = ['120363393493858342@g.us', '120363287407780395@g.us', '120363186149924180@g.us', '120363278902077019@g.us']

function startBot() {
    
    // Função para processar mensagens da vila
    async function processVilaMessages(sock, msg, text) {
        const commands = {
            '!katana': getKatana,
            '!contrato': getContract,
            '!pontosloja': getPShop,
            '!cronograma': getCronogram,
            '!pontosame': getPVile,
            '!lojaame': getShopVile,
            '!lojarpg' : getShopRPG,
            '!menu' : getMenuVila,
            '!compraame' : getFichaCompraAme,
            '!comprarpg' : getFichaCompraRPG,
        };
    
        if (text.startsWith('!ficha')) {
            const args = text.slice(7).trim().split(' ');
    
            // Extrair os dois últimos elementos como emojis
            const clanEmoji = args[args.length - 2];
            const rankEmoji = args[args.length - 1];
            
            // Juntar os elementos restantes como o nome completo
            const nome = args.slice(0, -2).join(' ');
            const response = getFicha(nome, clanEmoji, rankEmoji);
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        } else {
            const responseFn = commands[text];
            if (responseFn) {
                const response = responseFn();
                await sock.sendMessage(msg.key.remoteJid, { text: response });
            }
        }
    }
    
    // Função para processar mensagens de jogos
    async function processGameMessages(sock, msg, text, playerJid) {
        const commands = {
            '!menu': getMenu,
            'menu': getMenu,
            'm': getMenu,
            '!blackjack': () => playBlackjack(playerJid),
            'bj': () => playBlackjack(playerJid),
            '!Bj': () => playBlackjack(playerJid),
            'comprar': () => buyCard(playerJid),
            'c': () => buyCard(playerJid),
            'parar': () => stopGame(playerJid),
            'p': () => stopGame(playerJid)
        };
    
        const responseFn = commands[text];
        if (responseFn) {
            const response = await responseFn();
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        }
    }
    
    // Função para processar a roleta
    async function processRoulette(sock, msg, text) {
        const [_, number, color, prize = 10] = text.split(' ');
        const betAmount = parseInt(prize);
    
        if (betAmount > 100) {
            await sock.sendMessage(msg.key.remoteJid, { text: 'A aposta máxima permitida é de 100.' });
            return;
        }
    
        if (!isNaN(parseInt(number)) && (color === 'vermelho' || color === 'preto')) {
            const response = playRoulette(parseInt(number), color, betAmount);
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        } else {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Comando inválido. Exemplo de uso: !roleta 17 vermelho 10' });
        }
    }
    
    // Função para processar o caça-níqueis
    async function processSlotMachine(sock, msg, text) {
        const [, prize = 10] = text.split(' ');
        const betAmount = parseInt(prize);
    
        if (betAmount > 100) {
            await sock.sendMessage(msg.key.remoteJid, { text: 'A aposta máxima permitida é de 100.' });
            return;
        }
    
        const response = playSlotMachine(betAmount);
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    }
    
    // Função para processar mensagens do Coliseu
    async function processColiseuMessages(sock, msg, text) {
        if (text.startsWith('!arena')) {
            const response = escolherArenaAleatoria();
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        } else if (text.startsWith('!patente')) {
            const args = text.split(' ')[1]?.trim(); // Garante que args existe e remove espaços extras
            const patentesValidas = ["Gennin", "Chunnin", "Jounnin", "Anbu", "Sannin", "Daimyo", "Kage", "Rikkudo"];
            if (!args || !patentesValidas.includes(args)) {
                await sock.sendMessage(msg.key.remoteJid, { text: 'Erro: Patente inválida. Opções: Gennin, Chunnin, Jounnin, Anbu.' });
                return;
            }
            const response = sortearPatente(args);
            await sock.sendMessage(msg.key.remoteJid, { text: `Patente sorteada: ${response.nome}` });
        } else if (text.startsWith('!elemento')) {
            const response = sortearElemento();
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        }
    }
    
    async function processApostaMessages(sock, msg, text) {
        if (text.startsWith('💫(•🏟\'❰ Coliseu Estelar ❱\'🏟•)💫\n 📝❪•💸❝ Ficha de Aposta ❞💸•❫📝\n\n•➖➖❰✨ ⟦• ✰ ❲🏟❳ ✰ •⟧ ✨❱➖➖•\n\n')) {
            console.log('ENTROU NA LINHA 137');
            const response = processarAposta(text); // Processa a ficha de aposta
            await sock.sendMessage(msg.key.remoteJid, { text: response }); // Envia a resposta
        } else if (text.startsWith('/apostas')) {
            await sock.sendMessage(msg.key.remoteJid, { text: rulesApostas() }); // Envia a resposta
            await sock.sendMessage(msg.key.remoteJid, { text: limApostas() }); // Envia a resposta
        }
    }
    
    async function processCombo(sock, msg, text) {
        const [_, nome, cla, rank, gasto = 0] = text.split(' ');
            if (text.startsWith('/pi')) {
                const response = placaInicial(nome, cla, rank);
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('/pc')) {
                const response = placaCombo(nome, cla, rank, gasto);
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('/pf')){
                const response = placaFinal(nome, cla, rank, gasto);
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('/kunais')){
                const response = getKunais();
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('Boa luta') || text.startsWith('boa luta') || text.startsWith('BOA luta')) {
                if (msg.key.fromMe) {
                    return; // Ignora a mensagem
                }
                const response = 'Boa luta'
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('/pji')){
                const response = placaJInicial(nome, cla, rank);
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
            if(text.startsWith('/pjf')){
                const response = placaJFinal(nome, cla, rank, gasto);
                await sock.sendMessage(msg.key.remoteJid, { text : response});
            }
    }
    
    // Função principal de processamento de mensagens
    async function processMessage(sock, msg) {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        const playerJid = msg.key.participant;
        const remoteJid = msg.key.remoteJid;
    
        if (remoteJid.endsWith('@s.whatsapp.net')) {
            // A mensagem é de uma conversa privada
            await processCombo(sock, msg, text);
        }
        if (remoteJid === vila) {
            await processVilaMessages(sock, msg, text);
        }
        if (groupIds.includes(remoteJid)) {
            await processGameMessages(sock, msg, text, playerJid);
            if (text.startsWith('!slot')) {
                await processSlotMachine(sock, msg, text);
            } else if (text.startsWith('!roleta')) {
                await processRoulette(sock, msg, text);
            }
        } 
        if (coliseu.includes(remoteJid)) {
            await processColiseuMessages(sock, msg, text);
        }
        if (apostas.includes(remoteJid)) {
            await processApostaMessages(sock, msg, text); 
        }
        else {
            await processColiseuMessages(sock, msg, text);
        }
    }
    
    // Conexão ao WhatsApp
    async function connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        const sock = makeWASocket({
            printQRInTerminal: true,
            auth: state
        });
    
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
                if (shouldReconnect) {
                    connectToWhatsApp();
                }
            } else if (connection === 'open') {
                console.log('opened connection');
            }
        });
    
        sock.ev.on('creds.update', saveCreds);
    
        sock.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];
            console.log('Mensagem recebida:', JSON.stringify(m, null, 2));
            await processMessage(sock, msg);
        });
    }
    // Executa a função principal
    connectToWhatsApp();
}

module.exports = startBot