import re
from collections import defaultdict

texto = """Darui Kira ♎💠 / 100 🔰
Gojo Uchiha ㊗✴ / 100 🔰
Jorge Kira ♎✳ / 100 🔰
Mateus Kamizuru 🐝💠 / 100 🔰 
Anya Kira ♎🀄 / 100 🔰 
Thais Kami ⚜🃏 / 100 🔰
Bruno Garasu ⚪💠 / 100 🔰 
Berlim Shouton 💎 ✴ / 100 🔰 
Karina Kagari 📛💠/ 100 🔰
Kidsonn Kamizuru 🐝 ✴ / 100 🔰 
Yami Kami ⚜✳ / 50 🔰
Izumi Kagari 📛💠 / 100 🔰
Jao Render 🈚 ✴ / 100 🔰 
Thais Kami ⚜🃏 / 100 🔰
Bruno Garasu ⚪💠 / 100 🔰
Karina Kagari 📛💠/ 100 🔰 
Yami Kami ⚜✳ / 50 🔰
Tadoky Hatake ♌✴ / 50 🔰
Boruto Yuki ❄✳ / 50 🔰
Berlim Shouton 💎 ✴ / 100 🔰
Narum Shouton 💎💠 / 100 🔰
Henry Uzumaki 🌀 🈂 / 50 🔰
Kitty Rayuki 🌘🔘 / 100 🔰"""

# Expressão regular para capturar nome completo + emojis + pontos
padrao = re.compile(r"(?P<player>.+?)\s*/\s*(?P<pontos>\d+)\s*🔰")

saldos = defaultdict(int)

for match in padrao.finditer(texto):
    nome_completo = match.group("player").strip()
    pontos = int(match.group("pontos"))
    saldos[nome_completo] += pontos

# Mostrar os resultados
for jogador, saldo in sorted(saldos.items()):
    print(f"*➔ {jogador} 『+{saldo}🔰』*")
