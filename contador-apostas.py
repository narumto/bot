import re
from collections import defaultdict

texto = """Kitty Rayuki 🌘🔘 /100 🔰 
Alice Rayuki 🌘 💠 / 100 🔰 
Thais Kami ⚜🃏 /100 🔰 
Konan Sarutobi 🈯🀄 / 50 🔰 
Tadoky Hatake ♌✴ / 40 🔰 
Leozin Uzumaki 🌀✳ / 100 🔰 
Shiro Terumi 🔱🈂 / 100 🔰
Berlim Shouton 💎 ✴ / 100 🔰 
Lav Momoshiki 🌕✳ / 100 🔰 
Angel shobondama 🌐 💠/ 100 🔰 
Henry Uzumaki 🌀🈂 / 50 🔰
Gojo Uchiha ㊗✴ / 100 🔰
Narum Shouton 💎💠 / 100 🔰 
Thais Kami ⚜🃏 /100 🔰 
Berlim Shouton 💎 ✴ / 100 🔰
Tony shobondama 🌐🈂 / 100 🔰 
Gojo Uchiha ㊗✴ / 100 🔰
Victor K. Sanshōuo 🕎💠 /50 🔰 
Victor K. Sanshōuo 🕎💠 /50 🔰
Jao Render 🈚✴ / 100 🔰 
Bruna Garasu ⚪💠 / 100 🔰 
Kisagi Kyusuke 🗯✳ / 50 🔰
Angel shobondama 🌐 💠/ 100 🔰 
Yukki Momochi Ⓜ💠 /100 🔰 
Victor K. Sanshōuo 🕎💠 /100 🔰
Alex Kyusuke 🗯💠 / 100 🔰 
Thais Kami ⚜🃏 /100 🔰 
Izume Kagari 📛💠 / 100 🔰 
Alice Rayuki 🌘 💠 / 100 🔰 
Jao Render 🈚✴ / 100 🔰 
Luna Render 🈚🃏 /100 🔰"""

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
