# WebHealthAPI

A WebHealth API é uma API Restful desenvolvida na linguagem Javascript, com uso da biblioteca Node.js e do framework Express.
Esta implementa um sistema de clínica de saúde, onde são mantidos médicos, pacientes e seus respectivos agendamentos.

A WebHealth implementa e mantém um banco de dados local MySql, tendo que ser feita a alteração dos dados de login do .ENV.EXAMPLE para torná-lo o .ENV antes da execução do código.

Para colocá-la em funcionamento, é necessário primeiro instalar suas dependências com `npm install`

Em seguida, pode-se iniciar a execução da API, usando `npm start`. O script 'start' está configurado no package.json.

Para utilização da API, é recomendado o uso da aplicação em React [WebHealth](https://github.com/tgo-mas/WebHealth). As recomendações para instalação da mesma estão no Readme contido no repositório do link acima.
