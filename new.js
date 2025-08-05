const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir seu HTML e CSS
app.use(express.static(path.join(__dirname, 'public')));

// Rota que executa comandos baseados na simulação
app.get('/executar/:tipo', (req, res) => {
  const tipo = req.params.tipo;

  // Comandos reais de demonstração, sem riscos
  const comandos = {
    wifi: 'netsh wlan show profiles',
    ip: 'ipconfig',
    vuln: 'echo Scaneando portas com Nmap...',
    apk: 'echo Analisando APK...',
    camera: 'echo Buscando câmeras IP...',
    ddos: 'ping 127.0.0.1 -n 2',
    sniffer: 'echo Iniciando captura de pacotes...',
    banco: 'echo SELECT * FROM users;',
    spoofing: 'echo IP spoofing simulado.'
  };

  const comando = comandos[tipo];

  if (!comando) return res.status(400).send('Comando inválido');

  exec(comando, (err, stdout, stderr) => {
    if (err) return res.status(500).send(`Erro: ${err.message}`);
    if (stderr) return res.send(`STDERR: ${stderr}`);
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
