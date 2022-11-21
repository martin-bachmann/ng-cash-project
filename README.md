# NG Cash - Processo seletivo

Esse projeto contém uma API para transferências implementada com TypeScript, sequelize e express, conectados em um banco de dados PostgreSQL, e uma aplicação React que se alimenta desses dados. Também foram implementados testes de integração para o backend.

## Resultado final
![ng_cash_ss](https://github.com/martin-bachmann/ng-cash-project/blob/main/ng_cash_ss.png)

## Técnologias usadas
<p align="left">
  <img align="center" alt="TypeScript" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"> 
  <img align="center" alt="Express" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg">
  <img align="center" alt="Sequelize" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain-wordmark.svg">
  <img align="center" alt="PostgreSQL" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg">
  <img align="center" alt="React" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg">
  <img align="center" alt="Docker" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg"> 
</p>

## Para iniciar e executar o projeto
```bash
cd ~/ng-cash-project
docker-compose up -d
``` 

A parte do frontend é iniciada na porta 3000 e o backend na porta 3001.
Ao subir o docker, a aplicação já é iniciada com os seguintes usuarios cadastrados:
Username       | Password
---------------|--------
joao.gomes     | 123456
ferreira1988   | 123456
CarolinaSouza  | 123456
arthur1981     | 123456


## Para executar os testes do backend
```bash
cd ~/ng-cash-project
npm test
``` 

## Passo a passo do projeto

Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

### Backend

Desenvolver um servidor em Node.js utilizando Typescript, um ORM de sua preferência e um banco de dados PostgreSQL

#### Diagrama
![diagrama](https://github.com/martin-bachmann/ng-cash-project/blob/main/diagrama.drawio.png)

#### Regras de negócio

##### 1) Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando username e password.
- Criar uma rota para realizar o cadastro de um usuário.

##### 2) Deve-se garantir que cada username seja único e composto por, pelo menos, 3 caracteres.
- Implementar validações para rota de cadastrar usuário.

##### 3) Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela Accounts com um balance de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela Accounts não deverá ser afetada.
- A rota de cadastro de um usuário deve também criar a sua conta, sendo implementado tudo como uma transaction.

##### 4) Todo usuário deverá conseguir logar na aplicaçao informando username e password. Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
- Implementar um token que valide o login do usuário.

##### 5) Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio balance atual. Um usuário A não pode visualizar o balance de um usuário B, por exemplo.
- Implementar uma rota get para retornar o balance do usuário.

##### 6) Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um cash-out informando o username do usuário que sofrerá o cash-in, caso apresente balance suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
- Implementar uma rota para transação entre contas.
- Implementar validações para essa rota.

##### 7) Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions. Em casos de falhas transacionais, a tabela não deverá ser afetada.
- Se a transação der certo, alterar a tabela transactions para adicionar a transação.

##### 8) Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
- Implementar uma rota get para as transações do usuário.

##### 9) Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por: Data de realização da transação e/ou transações de cash-out/cash-in.
- Implementar uma rota get para as transações com filtros.

### Frontend

Desenvolver uma aplicação React ou Next utilizando Typescript com CSS3 ou uma biblioteca de estilização de sua preferência.

#### Regras de negócio

##### 1) Página para realizar cadastro na NG informando username e password.
- Criar uma página de cadastro.

##### 2) Página para realizar o login informando username e password.
- Criar uma página de login.

##### 3) Com o usuário logado, a página principal deve apresentar: balance atual do usuário, seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in, tabela com os detalhes de todas as transações que o usuário participou, mecanismo para filtrar a tabela por data ou tipo de transação e botão para realizar o log-out.
- Criar página principal da aplicação.
- Criar header com nome do usuário, saldo e botão de logout.
- Criar seção para realização de transações.
- Criar tabela de transações anteriores com filtros.

### Dockerização

- Criar dockerfile do backend.
- Criar dockerfile do frontend.
- Criar docker-compose com db, backend e frontend.

### ReadMe

Adicionar ao readme do projeto instruções para rodá-lo.

### Deploy

Remover qualquer diretório de dependências e compactar o diretório raiz em um arquivo .zip.
