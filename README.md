# agenda-pessoal

Agenda Pessoal (Demo Metaway)

### Considerações iniciais

Foi muito satisfatório produzir este mini projeto, levou ao todo uma semana (entorno de 3h/dia) e agora ao final (04/02 - 15h) apenas uma funcionalidade não está 100% funcional, que é o upload de fotos, as respostas do servidor para a requisição do post de fotos retornavam 500 então após algumas tentativas eu abri mão da funcionalidade temporariamente.

Do mais, espero que o código esteja satisfatório e desejo boa exploração e leitura para quem irá se aventurar nesta tarefa (deixei muitos comentários nas partes que achei precisarem de mais explicação ou que quis explicar o raciocínio)

#### testes

Os testes não cobrem 100% da aplicação, apenas 100% dos inputs, a documentação de algumas bibliotecas que usei em relação a testes deixavam a desejar então não quis perder tanto tempo com isso, ainda sim apliquei testes variados nos inputs para ao menos demonstrar que posso desenvolver assim.

Ainda falando de testes, não produzi usando TDD, pois não quis gastar o precioso tempo planejando além de entender cada etapa da funcionalidade, além de entender as particularidades das requisições e retornos da api. Em um caso mais controlado em que funcionalidades e padrões são introduzidos com mais calma eu adoraria desenvolver utilizando TDD, apenas achei que não era o momento nem o projeto para isto.

#### IA

Hoje este é um tópico sensível, então serei direto, não utilizei qualquer IA para gerar qualquer parte deste código, quando a código copiado de algum lugar (acredito que apenas dentro do arquivo ./utils/functions.js) *está explicitamente comentado de onde o código veio*.

## Bibliotecas

### API

[lodash](https://www.npmjs.com/package/lodash) *OBS.: Utilizada para fazer debounce em casos especificos*
[axios](https://www.npmjs.com/package/axios)

### Formulários

[vue-select](https://www.npmjs.com/package/vue-select)
[vue-the-mask](https://www.npmjs.com/package/vue-the-mask)

### Estados e Rotas

[vue-router](https://www.npmjs.com/package/vue-router)
[pinia](https://www.npmjs.com/package/pinia)

### Icons

Icons são da [radix-ui](https://www.radix-ui.com/icons)

## Project Setup

```sh
npm install
OR
pnpm install
```

### Crie as variaveis de ambiente

crie /.env
adicione VITE_API_BASE_URL='https...'

### Compila e ativa o hot-reload para desenvolvimento

```sh
npm run dev
```

### Compila e 'mimifica' os arquivos para produção

```sh
npm run build
```

### roda os testes unitários [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Executa a verificação usando Lint [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, correções de bugs ou novas funcionalidades, sinta-se à vontade para abrir uma [issue](https://github.com/GustavoRCarvalho/agenda-pessoal/issues) ou enviar um [pull request](https://github.com/GustavoRCarvalho/agenda-pessoal/pulls).

Desenvolvido por [Gustavo Rafael de Carvalho](https://github.com/GustavoRCarvalho) - [LinkedIn](https://www.linkedin.com/in/gustavo-carvalho-0/) - [Portfólio](https://portfolio.gustavocarvalho.dev.br/)
