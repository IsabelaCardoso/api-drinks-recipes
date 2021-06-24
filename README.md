# Desafio Técnico Saraiva Educação

Esse projeto é a minha solução para o desafio do processo seletivo da Saraiva Educação. A proposta foi desenvolver um sistema web que permitisse consumir uma API para busca de receitas de coquetéis e drinks.

## Desafio Back-End

## Dependências

Utilizei NodeJs, Sequelize e Express para o desenvolvimento. O banco de dados utilizado foi o MySQL.

## Funcionalidades

A aplicação permite ao usuário:

Usuários:
* Criar usuário
* Fazer login

Receitas:
* Criar
* Remover
* Editar
* Buscar


## Rodando a Aplicação

Clone o repositório e instale as dependências

### `npm install`

Inicie seu banco de dados MySQL

### `sudo systemctl start mysql`

Configure suas variáveis de ambiente em um arquivo .env na raiz do projeto, com seu usuário e senha do MySQL, hostname e um segredo, conforme campos abaixo

### `MYSQL_USER=root`
### `MYSQL_PASSWORD=suasenha`
### `HOSTNAME=localhost`
### `JWT_SECRET=seusegredo`


Execute as querys a seguir para criar o banco de dados e suas tabelas

### `npx sequelize db:create`
### `npx sequelize db:migrate`

Execute as querys a seguir para povoar o banco de dados (importante executar na ordem passada)

### `npx sequelize db:seed --seed './seeders/20210620160029-users.js'`
### `npx sequelize db:seed --seed './seeders/20210620160407-drinks.js'`
### `npx sequelize db:seed --seed './seeders/20210621223348-ingredients.js'`

Inicie a aplicação

### `npm start`

