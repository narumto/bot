function getFicha(name = "nome", emoji1 = "cla", emoji2 = "ptt") {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR'); // Formato: dd/mm/aa

    // Atribuir o primeiro emoji ao clã e o segundo ao rank
    const clanEmoji = emoji1;
    const rankEmoji = emoji2;

    return `➖➖➖➖➖➖➖➖➖➖➖
*💫🕉'RPG De Naruto Online'🕉💫*

*💢 Ficha 💢*

*👉🏻 Nome/Nick:* 
*👉🏻 Clã:* 
*👉🏻 Recrutado por:* 

*⟦${rankEmoji}${clanEmoji} ❰ ${name} ❱ ${clanEmoji}${rankEmoji}⟧*

   *📆 Data: ${formattedDate} 📅*
➖➖➖➖➖➖➖➖➖➖➖`;
}


module.exports = {
    getFicha
};