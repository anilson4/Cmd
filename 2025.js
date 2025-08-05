// Elementos principais
const terminal = document.getElementById("terminal");
const bgSound = document.getElementById("background-sound");

// Simulações disponíveis
const simulacoes = {
  wifi: [
    "[Iniciando ataque Wi-Fi]",
    "🔍 Escaneando redes...",
    "📡 Rede: MinhaCasaWiFi - Sinal Forte",
    "🔓 Tentando conexão...",
    "🔑 Descobrindo senha: ****",
    "Senha encontrada: 'minha123senha'",
    "✅ Conexão estabelecida com sucesso!"
  ],
  ip: [
    "[Rastreamento IP iniciado]",
    "🔍 IP alvo: 187.99.123.45",
    "🌐 Localização: São Paulo - Brasil",
    "📡 ISP: Claro Net",
    "🧠 Coletando metadados...",
    "✅ Informações completas coletadas!"
  ],
  vuln: [
    "[Teste de vulnerabilidade]",
    "🌐 Alvo: www.sitefalso.com",
    "🔍 Scaneando portas...",
    "🔓 Porta 21 aberta (FTP)",
    "⚠️ Vulnerabilidade detectada: FTP anônimo",
    "🚨 Falha crítica no Apache 2.4.49",
    "✅ Relatório gerado com sucesso."
  ],
  camera: [
    "[Acessando câmeras IP]",
    "🔍 Buscando câmeras abertas...",
    "🎥 Câmera localizada: 192.168.1.101",
    "📡 Transmitindo imagem simulada...",
    "✅ Acesso simulado à webcam remoto!"
  ],
  ddos: [
    "[Simulando ataque DDoS]",
    "⚡ Gerando tráfego falso...",
    "📤 Enviando pacotes SYN...",
    "🌊 Overload simulado em www.alvofalso.com",
    "✅ Ataque fictício concluído!"
  ],
  sniffer: [
    "[Sniffer de rede iniciado]",
    "🔍 Monitorando pacotes...",
    "📥 Captura de dados: login: admin / senha: 1234",
    "📄 Log salvo: sniffer_log.txt",
    "✅ Operação simulada com sucesso."
  ],
  banco: [
    "[Acessando banco de dados]",
    "🔐 Conectando ao host...",
    "💾 SELECT * FROM users;",
    "📊 Dados coletados: 324 registros",
    "✅ Banco de dados simulado acessado!"
  ],
  spoofing: [
    "[Iniciando IP Spoofing]",
    "🔀 Modificando cabeçalhos de IP...",
    "📤 Enviando pacotes falsificados...",
    "🛡️ Proteções simuladas burladas.",
    "✅ Spoofing concluído com êxito."
  ]
};

// Função para executar a simulação
function executarSimulacao(tipo) {
  terminal.innerHTML = "";
  terminal.classList.remove("flash");
  bgSound.volume = 0.2;
  bgSound.play();

  const linhas = simulacoes[tipo];
  let i = 0;

  function digitarLinhaTexto(texto, callback) {
    let j = 0;
    const intervalo = setInterval(() => {
      terminal.innerHTML += texto[j];
      terminal.scrollTop = terminal.scrollHeight;
      j++;
      if (j >= texto.length) {
        clearInterval(intervalo);
        terminal.innerHTML += "\n";
        callback();
      }
    }, 20);
  }

  function digitarProximaLinha() {
    if (i < linhas.length) {
      digitarLinhaTexto(linhas[i], () => {
        if (linhas[i].includes("✅")) {
          terminal.classList.add("flash");
          new Audio("https://www.soundjay.com/button/beep-07.wav").play();
        }
        i++;
        setTimeout(digitarProximaLinha, 400);
      });
    } else {
      terminal.innerHTML += "\n<b style='color:#00ff00;'>[FIM DA SIMULAÇÃO]</b>";
    }
  }

  digitarProximaLinha();
}
