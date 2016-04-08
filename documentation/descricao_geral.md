# 1 Introdução

## 1.1 Objetivos deste documento
Descrever e especificar os problemas encontrados nas atuais _imageboards_, bem como definir as funções a serem cumpridas pelo software __NyaChan__


## 1.2 Público-alvo
O grupo de desenvolvimento do projeto.

## 1.3 Materiais de Referência 
 * [4Chan](http://www.4chan.org/)
 * [Futaba Channel](http://www.2chan.net/)


# 2 Descrição Geral do Produto

## 2.1 Visão Geral
Com o objetivo de promover discussões em torno de assuntos específicos, surgiu-se o conceito de fóruns de internet, ou _messageboard_, ao qual através de divisões hierárquicas e bem divididas de temas visa dar acesso a seus usuários de um local para interações sociais em torno de gostos em comum. Como uma ramificação do conceito de fóruns, foram criados os chamados _imageboards_, ao qual trazem como proposta uma maior ênfase de discussões em torno de imagens.


A maioria dos _imageboards_ tem sua estrutura, funcionalidades e _layout_ baseados no Futaba Channel (também conhecido como 2Chan), um _imageboard_ desenvolvido no Japão em 2001, ao qual preza pela anonimidade de seus usuários e possuí conteúdos fortemente divididos por categorias, altamente dinâmicos e de curta duração, sendo os conteúdos postados por usuários normalmente excluídos após um curto espaço de tempo conforme algumas regras impostas pelo _imageboard_. O 4Chan, um _imageboard_ popular e baseado no Futaba Channel, chega a ter cerca de 20 milhões de visitantes únicos por mês, de acordo com o criador do site, Christopher Poole.


Tendo em vista a popularidade e potencial dos _imageboards_, e que a maioria dos _imageboards_ mais populares ainda possuem um _layout_ e estilo fortemente similares ao Futaba Channel, torna-se viável o aprimoramento de tais conceitos em busca de uma abordagem mais moderna e que possa melhorar a experiência de UX (usabilidade do usuário).


Este projeto tem como objetivo desenvolver um _imageboard_ que tenha como público-alvo tanto usuários inexperientes quanto experientes de _imageboards_ que desejam participar de discussões em torno de temas em comum em uma abordagem mais moderna do Futaba Channel. Os aprimoramentos propostos estão baseados primeiramente em mudanças do _layout_, adição de novas funcionalidades e um sistema de divisão de temas por _tags_, permitindo que as discussões possam ser categorizadas em mais do que um tema .

## 2.2 Stakeholder

## 2.3 Usuários
Pessoas que querem participar, ler ou buscar imagens a cerca de discussões sobre temas específicos.


## 2.4 Benefícios do produto
 1. _Layout_ moderno e responsivo, evoluindo a concepção de _layout_ atual das _imageboards_
 * Sistema de _Tags_ para Facilitar o agrupamento de discussões em torno de determinados temas
 * Sistema de Album e agrupamento de imagens, que permitirá a postagem de mais de uma foto por _thread_, sem poluir a pagina

## 2.5 Escopo do Produto
 * Seção com as principais abas ( _tags_ | assuntos )
 * Cada aba contará com uma página mostrando suas _threads_ ativas
 * As _threads_ podem ser vistas em modo catálogo ou linear
 * Cada _Thread_ tem uma página onde o usuário poderá ver os comentários e discussões assim como responder a _Thread_

## 2.6 Limitações do produto
 * Limite de número de _threads_, tamanho de imagens e arquivos, além do número de usuários simultâneos na aplicação, visto o limite de armazenamento e memória do servidor que será utilizado
 * As _threads_ fechadas serão armazenadas por duas semanas, e depois deletadas
 * O serviço rodará nos navegadores Chrome(30), Firefox(25), Opera(12)