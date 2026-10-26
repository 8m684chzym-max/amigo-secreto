# Amigo Secreto 🎁

Web app mobile-first em português de Portugal, sem dependências, backend ou serviços de análise.

Na primeira abertura, o grupo vem preparado com Miguel e Carolina, Gonçalo e Luisa, Madalena e João F, João e Maria. Os quatro casais estão excluídos nos dois sentidos. João F e João são participantes distintos. Nenhum sorteio é feito automaticamente.

## Utilização

1. Define o nome do grupo, data e orçamento opcionais.
2. Adiciona 3 a 30 participantes, com WhatsApp (indicativo internacional) e lista de desejos opcionais. Podes editar ou remover participantes antes do sorteio.
3. Adiciona exclusões: A ↔ B impede ambos de oferecerem um ao outro.
4. Faz o sorteio e copia cada link ou abre a mensagem no WhatsApp. O envio é manual.
5. Cada participante abre o seu link e toca em «Abrir o meu presente».

O sorteio usa backtracking com escolha da pessoa com menos candidatos disponíveis, baralhamento Fisher–Yates e unicidade de destinatários. Não permite autoatribuição e comunica configurações impossíveis. Não garante distribuição uniforme de todas as soluções.

## Privacidade e limites

O grupo, números e resultados ficam no localStorage do navegador do organizador. Não há sincronização, recuperação de conta ou edição colaborativa. Em navegação privada ou ao limpar os dados podes perder o grupo. Erros ao guardar são apresentados na interface.

Cada link transporta no fragmento URL apenas o nome do grupo, quem oferece, quem recebe, a lista de desejos do destinatário, data e orçamento. Não inclui números de telefone nem os outros resultados. O fragmento não é enviado ao servidor HTTP; é uma codificação base64url, **não encriptação**. Quem tiver o link consegue ler o resultado, e o organizador consegue consultar todos os resultados no seu dispositivo. Não é um sistema de segredo criptográfico perante o organizador. Não introduzas dados sensíveis nas listas de desejos. O WhatsApp recebe o texto partilhado quando abres o respetivo link.

Anular o sorteio ou apagar dados não revoga links já enviados: os resultados estão contidos nos próprios links. Se repetires o sorteio, avisa os participantes e envia os novos links.

## GitHub Pages

Em **Settings → Pages → Build and deployment**, escolhe **Deploy from a branch**, **main**, **/ (root)** e guarda. A aplicação ficará em `https://8m684chzym-max.github.io/amigo-secreto/` após a publicação. Não necessita de build; todos os recursos usam caminhos relativos e funcionam numa subpasta. O ficheiro `.nojekyll` desativa o processamento Jekyll. Não é necessário configurar Actions.

## Desenvolvimento e validação

Requer Node.js 20+ para testes e Python 3 para o servidor local:

```sh
npm test
npm start
```

Abre `http://localhost:8000`. Testes cobrem 2700 sorteios, todas as 64 configurações de exclusões entre quatro participantes contra um oráculo de permutações, entradas inválidas e links com Unicode. Para validação manual, testa num ecrã de 375 px: criar grupo, editar participante, adicionar exclusão, sortear, copiar link, abrir o link noutro navegador, revelar/esconder e recarregar. Confirma também um grupo impossível e os avisos de anulação. O clipboard precisa de HTTPS ou localhost; existe alternativa de cópia manual.
