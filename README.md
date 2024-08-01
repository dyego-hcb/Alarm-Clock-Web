# Repositório de Alarm Clock WEB

Este repositório contém duas versões do código-fonte de um aplicativo de despertador web. O objetivo do aplicativo é fornecer uma interface simples para configurar alarmes e exibir a hora atual.

## Versão 1

A primeira versão do código consiste nos seguintes arquivos:

### index.html

Este arquivo contém a estrutura HTML e os elementos da página, incluindo:

- Um título para a página: "Alarm Clock WEB".
- Um link para o arquivo de estilo CSS.
- Um link para a fonte "Orbitron" do Google Fonts.
- Um elemento `div` que exibe o relógio atual.
- Um formulário de seleção de horas, minutos, segundos e AM/PM.
- Dois botões, um para ativar/desativar o alarme e outro para adiar o alarme.
- Um script que controla o comportamento do despertador.

### styles.css

Este arquivo contém estilos CSS para a página, incluindo:

- Estilos para o corpo da página e o plano de fundo.
- Estilos para o cabeçalho (`h1`).
- Estilos para os botões.
- Estilos para centralizar o conteúdo verticalmente e horizontalmente.
- Estilos responsivos para ajustar o tamanho do texto e a aparência dos botões em telas menores.

### alarm_clock.js

Este arquivo contém o código JavaScript responsável por:

- Exibir a hora atual no relógio.
- Verificar se a hora atual corresponde ao alarme configurado e reproduzir um som.
- Permitir adiar o alarme por 5 minutos.
- Controlar a ativação/desativação do alarme.

## Versão 2

A segunda versão do código consiste nos seguintes arquivos:

### index.html

Este arquivo contém a estrutura HTML atualizada e elementos adicionais, incluindo:

- Um novo título para a página: "Alarm-Clock Cruzeirao Cabuloso".
- Um novo cabeçalho (`h1`) para exibir o título do despertador.
- Um novo formulário e uma lista para exibir uma lista de alarmes configurados.
- Dois elementos `div` para exibir modais: um para adicionar/editar alarmes e outro para exibir um alarme ativo.
- Botões para alternar entre tema claro e escuro, e entre formato de hora AM/PM e 24 horas.
- Um rodapé para exibir o nome do autor.

### styles.css

Este arquivo contém estilos CSS atualizados para a nova versão, incluindo:

- Estilos para o corpo da página e o plano de fundo, com a adição de uma imagem de fundo.
- Estilos para o novo cabeçalho (`h1`).
- Estilos para a lista de alarmes.
- Estilos para os formulários modais e seus elementos.
- Estilos para suportar tema escuro.
- Estilos para botões e outros elementos interativos.

### alarm_clock.js

Este arquivo contém o código JavaScript atualizado, que adiciona as seguintes funcionalidades:

- Adicionar alarmes à lista de alarmes configurados.
- Exibir o modal para adicionar/editar alarmes.
- Exibir o modal quando um alarme é ativado.
- Permitir o adiamento de alarmes e o cancelamento de alarmes ativados.
- Alternar entre tema claro e escuro.
- Alternar entre formato de hora AM/PM e 24 horas.
- Configurar alarmes semanais que funcionam mesmo se a página não estiver em foco ou o PC estiver suspenso.
- Notificações de alarme no navegador quando a página não está em foco.

## Contribuição

Este repositório é apenas para fins educacionais e não aceita contribuições no momento.

---
