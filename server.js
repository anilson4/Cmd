const express = require('express');
const basicAuth = require('basic-auth');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;
const USER = 'admin';
const PASS = 'senha123'; // altere aqui

app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticação
app.use((req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name !== USER || user.pass !== PASS) {
    res.set('WWW-Authenticate', 'Basic realm="Painel Hacker Seguro"');
    return res.status(401).send('Acesso negado');
  }
  next();
});

const comandos = {
  wifi: 'netsh wlan show profiles',
  ip: 'ipconfig /all',
  ddos: 'ping 127.0.0.1 -n 3',
  banco: 'echo SELECT * FROM users;',
  spoofing: 'echo IP spoofing simulado.',
  nmap: 'echo Executando Nmap: simulação de scan...',
  dir: 'dir',
  whoami: 'whoami'
};

app.get('/executar/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const comando = comandos[tipo];
  if (!comando) return res.status(400).send('Comando inválido');

  exec(comando, { windowsHide: true }, (err, stdout, stderr) => {
    if (err) return res.status(500).send(`Erro: ${err.message}`);
    if (stderr) return res.send(`STDERR: ${stderr}`);
    res.send(stdout);
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
