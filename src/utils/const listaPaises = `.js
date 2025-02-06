const listaPaises = `
SJ	 Svalbard e Jan Mayen
SK	 Eslováquia
SL	 Serra Leoa
SM	 San Marino
SN	 Senegal
SO	 Somália
SR	 Suriname
SS	 Sudão do Sul
ST	 São Tomé e Príncipe
SV	 El Salvador
SX	 São Martinho
SY	Síria Síria
SZ	 Essuatíni
TC	 Turcas e Caicos
TD	 Chade
TF	 Terras Austrais e Antárticas Francesas
TG	 Togo
TH	 Tailândia
TJ	 Tajiquistão
TK	 Toquelau
TL	 Timor-Leste
TM	 Turquemenistão
TN	 Tunísia
TO	 Tonga
TR	 Turquia
TT	 Trinidad e Tobago
TV	 Tuvalu
TW	 Taiwan
TZ	 Tanzânia
UA	 Ucrânia
UG	 Uganda
UM	 Ilhas Menores Distantes dos Estados Unidos
US	 Estados Unidos
UY	 Uruguai
UZ	 Uzbequistão
VA	 Vaticano
VC	 São Vicente e Granadinas
VE	 Venezuela
VG	 Ilhas Virgens Britânicas
VI	 Ilhas Virgens Americanas
VN	 Vietname
VU	 Vanuatu
WF	 Wallis e Futuna
WS	 Samoa
YE	 Iêmen
YT	 Mayotte
ZA	 África do Sul
ZM	 Zâmbia
ZW	 Zimbabwe
`

// Transforma a lista em um array de objetos { key: '', label: '' }
const paisesFormatados = listaPaises
  .trim() // Remove espaços em branco no início e no final
  .split('\n') // Divide a string em linhas
  .map((linha) => {
    const [key, ...labelParts] = linha.trim().split(/\s+/) // Divide a linha em código e nome
    const label = labelParts.join(' ') // Junta as partes do nome
    return { key, label }
  })

console.log(paisesFormatados)
