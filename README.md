# Sistema de Cadastro de Usuários

Este é um sistema simples de cadastro de usuários, desenvolvido com Laravel, onde é possível realizar as seguintes operações:

- Cadastro de novos usuários (com validações de dados).
- Listagem de usuários cadastrados.
- Edição e exclusão de usuários.

## Tecnologias Utilizadas

- **Backend**: Laravel (versão 10.x)
- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: MySQL
- **PHP**: 8.2

## Requisitos

Antes de rodar o sistema, verifique se você possui as seguintes dependências instaladas:

- **PHP** 8.2 ou superior
- **Composer** (para gerenciar as dependências do Laravel)
- **MySQL** ou outro banco de dados compatível
- **Node.js** e **npm** (para a compilação de assets front-end)

## Como Rodar o Sistema

Siga os passos abaixo para configurar e rodar o sistema localmente:

1. **Clone o repositório**
    Clone o repositório ou baixe os arquivos do projeto:
        git clone <URL_DO_REPOSITORIO>
        cd back-end

2. ** Instale as dependências do Laravel**
    Execute o comando abaixo para instalar as dependências do Laravel:
        composer install

3. **Configuração do Ambiente**
    Copie o arquivo .env.example para .env (necssário criar o arquivo .env)
    Em seguida, configure as credenciais do banco de dados no arquivo .env:
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=seu_banco_de_dados
        DB_USERNAME=seu_usuario
        DB_PASSWORD=sua_senha

4. **Gere a chave da aplicação**
    Rode o comando para gerar a chave do Laravel, que será usada para criptografar sessões e outros dados da aplicação:
        php artisan key:generate

5. **Execute as migrações do banco de dados**
    Para criar as tabelas necessárias no banco de dados, rode o comando:
        php artisan migrate

6. **Compile os assets do frontend**
    Execute o seguinte comando para instalar as dependências do Node.js (caso haja algum recurso que precise ser compilado):
        npm install Depois, compile os assets com npm run dev

7. **Inicie o servidor local**
    Após configurar o ambiente, execute o seguinte comando para rodar o servidor embutido do Laravel:
        php artisan serve
        O sistema estará disponível em seu ambiente local

## Como Rodar o Front-End
    O front-end do sistema é composto por HTML, CSS e JavaScript puro, sem necessidade de dependências externas ou configurações adicionais.

1. **Acesse a pasta do front-end**
    Navegue até a pasta do front-end do projeto

2. **Abra o arquivo index.html**
    Você pode abrir o arquivo diretamente no navegador clicando nele ou usando um servidor local.

    (Opcional) Rodar em um servidor local
    Se quiser testar o front-end em um servidor local, pode utilizar o PHP embutido ou o Live Server do VS Code:

    Com PHP
    php -S localhost:8000
    Acesse no navegador: http://localhost:8000/index.html.

    Com Live Server (VS Code)
    Caso utilize o VS Code, pode instalar a extensão Live Server e clicar com o botão direito no index.html, escolhendo "Open with Live Server".


## Funcionalidades
    Cadastro de Usuários: Permite cadastrar novos usuários com os campos nome, e-mail e senha.
    Listagem de Usuários: Exibe os usuários cadastrados em uma tabela com as opções de edição e exclusão.
    Edição e Exclusão de Usuários: Permite editar ou excluir usuários existentes.
    Validações
    O e-mail deve ser único (não permite cadastro de e-mails duplicados).
    A senha deve ter pelo menos 6 caracteres para garantir a segurança.