## Nyarlathotep Channel Wiki!!!

A __NyaChan__ _(Nyarlathotep Channel)_ é um projeto de _imageboards_ desenvolvido pelos alunos [Adson](https://github.com/AdsonEsteves), [Alisson](https://github.com/AlissonSteffens) e [Augusto](https://github.com/Augus-top).

Nyarlathotep é uma representação do Caos, conhecido como _The Crawling Chaos_, criado por [HP Lovecraft](https://en.wikipedia.org/wiki/H._P._Lovecraft) e que simboliza, no projeto, a natureza caótica da mente humana, que é expressada nos _imageboards_.

Nyaruko é a sua versão do anime [Haiyore Nyaruko-san](https://en.wikipedia.org/wiki/Nyaruko:_Crawling_with_Love)



![nyaruko](https://github.com/BeholderDEV/NyaChan/blob/master/documentation/misc/anime.jpg?raw=true)

# 1 Introdução

## 1.1 Objetivos deste documento
Descrever e especificar os problemas encontrados nos _imageboards_ atuais, bem como definir as funções a serem cumpridas pela __NyaChan__

## 1.2 Público-alvo
O grupo de desenvolvimento do projeto.

## 1.3 Materiais de Referência 
 * [4Chan](http://www.4chan.org/)
 * [Futaba Channel](http://www.2chan.net/)

# 2 Descrição Geral do Produto

## 2.1 Visão Geral
Com o objetivo de promover discussões em torno de assuntos específicos, surgiu-se o conceito de fóruns de internet, ou _messageboard_, ao qual através de divisões hierárquicas e bem divididas de temas visa dar acesso a seus usuários de um local para interações sociais em torno de gostos em comum. Como uma ramificação do conceito de fóruns, foram criados os chamados _imageboards_, ao qual trazem como proposta uma maior ênfase de discussões em torno de imagens.

A maioria dos _imageboards_ tem sua estrutura, funcionalidades e _layout_ baseados no Futaba Channel (também conhecido como 2Chan), um _imageboard_ desenvolvido no Japão em 2001, ao qual preza pela anonimidade de seus usuários e possuí conteúdos fortemente divididos por categorias, altamente dinâmicos e de curta duração, sendo os conteúdos postados por usuários normalmente excluídos após um curto espaço de tempo conforme algumas regras impostas pelo _imageboard_. O 4Chan, um _imageboard_ popular e baseado no Futaba Channel, chega a ter cerca de 20 milhões de visitantes únicos por mês, de acordo com o criador do site, Christopher Poole.

Tendo em vista a popularidade e potencial dos _imageboards_, e que a maioria dos _imageboards_ mais populares ainda possuem um _layout_ e estilo fortemente similares ao Futaba Channel, torna-se viável o aprimoramento de tais conceitos em busca de uma abordagem mais moderna e que possa melhorar a usabilidade do usuário.

Este projeto tem como objetivo desenvolver um _imageboard_ que tenha como público-alvo tanto usuários inexperientes quanto experientes de _imageboards_ que desejam participar de discussões em torno de temas em comum em uma abordagem mais moderna do Futaba Channel. Os aprimoramentos propostos estão baseados primeiramente em mudanças do _layout_ e adição de novas funcionalidades tendo como foco um sistema de divisão de temas por _tags_, permitindo que as discussões possam ser categorizadas em mais do que um tema.

As mudanças propostas no _layout_ têm como objetivo proporcionar além da responsividade, uma usabilidade que preza pela utilização de princípios modernos de _web design_ que permitem uma maior interação entre o usuário e a interface do sistema.

A inclusão de contas para os usuários permitirá, além de portabilidade de configurações entre os ambientes nos quais os usuários acessarão o site, como a possibilidade de definir temas para a interface do site, a utilização de um sistema de notificações que tornará a utilização do sistema ainda mais dinâmica, tendo em vista a criação da possibilidade do usuário "acompanhar" o ciclo de vida de uma _thread_ automaticamente. Para os usuários não cadastrados, as funcionalidades implementadas adicionais são a possibilidade de criar _threads_ com mais de uma imagem, gerar álbuns que podem ser baixados em "lote" e alterar localmente o estilo da interface do sistema.

## 2.2 Stakeholders
* __Desenvolvedores__: Os criadores do projeto, que buscam um _imageboard_ com um _layout_ melhorado e funcionalidades novas em comparação aos existentes
* __Usuários__: Pessoas que querem participar, ler ou buscar imagens a cerca de discussões sobre temas específicos que se enquadrem dentro das [tags] (https://github.com/BeholderDEV/nya-chan/wiki/Ap%C3%AAndice#tags) de assuntos existentes

## 2.3 Usuários
__Público-alvo geral__: Pessoas que querem participar, ler ou buscar imagens a cerca de discussões sobre temas específicos que se enquadrem dentro das [tags] (https://github.com/BeholderDEV/nya-chan/wiki/Ap%C3%AAndice#tags) de assuntos existentes. Os usuário do site serão divididos em três grupos:

 * __Administrador__: Gerenciará o site com objetivo de mantê-lo em ordem e dentro das regras de uso estabelecidas
 * __Usuário anônimo__: Poderá postar threads e comentários sem restrições
 * __Usuário cadastrado__: Detém os mesmos privilégios do usuário anônimo, possuindo funcionalidades adicionais, tais como marcar _threads_ e comentários

## 2.4 Benefícios do produto
 * _Layout_ moderno e responsivo, evoluindo a concepção de _layout_ atual de _imageboards_
 * Sistema de _Tags_ para Facilitar o agrupamento de discussões em torno de determinados temas
 * Sistema de álbum e agrupamento de imagens, que permitirá a postagem de mais de uma foto por _thread_, sem poluir a pagina

## 2.5 Escopo do Produto
 * Seção com as principais abas ( _tags_ | assuntos ), ao qual serve como página inicial
 * Cada aba contará com uma página mostrando suas _threads_ ativas. As _threads_ podem ser vistas em modo catálogo, onde cada _thread_ ficará lado a lado mostrando apenas a primeira postagem de forma reduzida, ou linear, onde cada _thread_ será ordenada de maneira linear na vertical e dividida por páginas, mostrando a primeira postagem e os últimos cinco comentários.
 * Cada _Thread_ possui uma página onde o usuário poderá ver todos os comentários e discussões, assim como responder a _Thread_
 * Seção de cadastramento de usuários
 * Seção de configurações para usuários
 * Seção de gerenciamento do site para administradores

## 2.6 Limitações do produto
 * Limite de número de _threads_, tamanho de imagens e arquivos, além do número de usuários simultâneos na aplicação, visto o limite de armazenamento e memória do servidor que será utilizado
 * As _threads_ fechadas serão armazenadas por duas semanas, e depois deverão ser deletadas
 * O _software_ terá como principais navegadores suportados: Chrome(30), Firefox(25) e Opera(12)

# 3 Especificação de Requisitos

## 3.1 Requisitos Funcionais
 1. O _software_ deve dividir e exibir as _threads_ de acordo com suas _tags_, sendo que cada _tag_ contará com um subdomínio do site
 2. O _software_ deve exibir as _threads_ de uma _tag_ nos formatos, lista (uma _thread_ abaixo da outra) e catálogo (lado a lado), no qual o usuário poderá acessar a _thread_
 3. O _software_ deve criar uma página para cada _thread_, com seus dados (imagens e comentários) linearmente
 4. O _software_ deve conter atalhos de teclado para as ações de usuário conforme a [tabela](https://github.com/BeholderDEV/nya-chan/wiki/Ap%C3%AAndice#tabela-de-atalhos)
 5. O _software_ deve contar com um sistema de busca e filtragem entre as _threads_ de cada _tag_, onde haverá um campo de texto acima da página principal de cada _tag_ onde o usuário poderá digitar as palavras-chave que deseja que estejam na primeira postagem da thread. O _software_ deverá retornar todas as _threads_ que estão de acordo com a busca do usuário
 6. O _software_ deve permitir a navegação entre as _threads_ a partir da pagina de uma _thread_ através do uso de um atalho ou ao clicar no botão existente na página que realiza a troca de threads
 7. O _software_ deve permitir o cadastro de usuário (sendo ele opcional para a maioria das funcionalidades do site)
 8. O _software_ deve permitir ao usuário cadastrado, criar uma página de perfil com suas últimas interações no site (_threads_ criadas e comentadas)
 9. O _software_ deve permitir ao usuário postar _threads_ definindo sua(s) _tag(s)_ (**obrigatório**) e [arquivo(s)](https://github.com/BeholderDEV/nya-chan/wiki/Ap%C3%AAndice#gloss%C3%A1rio) (**opcional**) inicial(is)
 10. O _software_ deve permitir o _download_ de todas os arquivos anexados ao comentário de um usuário
 11. O _software_ deve permitir ao usuário fazer comentários com texto e/ou arquivos relacionados a uma _thread_ (o usuário pode utilizar sua identificação ou postar anonimamente)
 12. O _software_ deve conter "comandos" que quando digitados em um comentário, realizam ações sobre o texto (_spoiler_ e citação)
 13. O _software_ deve permitir citar outros comentários a partir de um identificador único de cada comentário
 14. O _software_ deve permitir ao usuário marcar uma parte do comentário ou imagem como _spoiler_, escondendo-a, e para visualizar o conteúdo é necessário ao leitor efetuar determinada ação com o mouse
 15. O _software_ deve permitir marcar parte de um comentário como citação, ao qual deverá colorir tal parte do texto
 16. O _software_ deve permitir ao usuário cadastrado receber notificações das _threads_ marcadas
 17. O _software_ deve permitir ao usuário modificar o tema do site (CSS ou temas prontos)
 18. O _software_ deve permitir a distinção entre usuários e usuários com poderes de admistrador conforme o [anexo](https://github.com/BeholderDEV/nya-chan/wiki/Ap%C3%AAndice#poderes-de-administrador)
 19. O _software_ deve ser capaz de interpretar a linguagem Markdown dentro de comentários de usuários
 20. O _software_ deve permitir a criação de enquetes no momento de criação de _threads_. Cada _thread_ poderá ter exclusivamente apenas uma enquete, ao qual ficará junta a sua postagem inicial
 21. O _software_ deve contar com um sistema de denúncia nos comentários, no qual o usuário poderá denunciar o comentário para que os administradores possam tomar providências


## 3.2 Requisitos Não Funcionais
### Implementação
 1. O _software_ deve executar nos navegadores Chrome(30), Firefox(25), Opera(12)
 2. O _software_ deve ser desenvolvido com arquitetura em camadas (MVC)
 3. O _software_ deve ser desenvolvido utilizando somente com tecnologia _Open Source_ 
 4. O _software_ deve ter seu CSS desenvolvido utilizando o _framework_ __Bootstrap__ como base
 5. O _software_ deve ter seu banco de dados gerenciado pelo __MongoDB__
 6. O _software_ deve ter seu servidor implementado utilizando __Node.js__
 7. O _software_ deve ter sua interface implementada utilizando __AngularJS__

### Segurança
 1. O _software_ deve armazenar as senhas dos usuários cadastrados, de maneira criptografada utilizando o padrão __SHA2__
 2. O _software_ deve validar as postagens dos usuários através do __reCAPTCHA__

## 3.3 Regras de Negócios
 1. O _software_ não deve permitir postagens em _threads_ fechadas
 2. O _software_ deve garantir que o usuário marque ao menos uma _tag_ ao abrir uma _thread_
 3. O _software_ deve deletar as _threads_ que estiverem armazenadas por mais de duas semanas
 4. O _software_ não deve permitir que usuários banidos façam postagens
 5. O _software_ apenas deve permitir postagens do mesmo usuário a cada 30 segundos

# 4 Diagramas

## 4.1 Casos de Uso

![](https://github.com/BeholderDEV/NyaChan/blob/master/documentation/Diagramas/casoDeUso.png?raw=true) 

### UC.01 - Navegar Pelas Boards
#### Cenário Principal
1. Sistemas apresenta as _threads_ em destaque e as _tags_ disponíveis
2. Usuário escolhe uma _tag_ e acessa a sua respectiva _board_
3. Sistema exibe as _threads_ disponíveis da _board_
4. Usuário escolhe uma _thread_ da _board_
5. Sistema exibe os _posts_ da _thread_

#### Cenário Alternativo
* No passo 2, o usuário pode escolher uma _thread_ em destaque e ir para o passo 5

### UC.02 - Criar _Thread_
#### Cenário Principal
1. Usuário seleciona o botão __New Thread__ existente no cabeçalho do sistema
2. Sistema apresenta uma _modal_ para o usuário com os seguintes campos: Subject; Comment; área para _upload_ de arquivos; seleção de _tags_; e validação de _captcha_
3. Usuário obrigatoriamente preenche as _tags_, o _captcha_ e realiza o _upload_ de um arquivo ou o preenchimento de um dos campos de texto (Subject, Comment)
4. Usuário seleciona o botão __Post__
5. Sistema adiciona a _thread_ criada ao grupo de _threads_ ativas nas _tags_ selecionadas


#### Cenário de Exceção
* No passo 4, o usuário seleciona o botão __Post__ sem ter preenchido corretamente algum dos campos obrigatórios. O sistema exibe um alerta nos campos que não foram preenchidos corretamente

### UC.03 - Responder Thread
#### Cenário Principal
1. Usuário seleciona o botão __Responder Thread__ existente no cabeçalho do sistema ou no post inicial da _thread_
* Sistema exibe um _modal_ para o usuário com os seguintes campos: Name; Comment; área para _upload_ de arquivos; e validação de _captcha_
* Usuário obrigatoriamente preenche o _captcha_ e realiza o _upload_ de um arquivo ou o preenchimento do campo Comment
* Usuário seleciona o botão __Post__
* Sistema adiciona o novo comentário à _thread_

#### Cenário Alternativo
* No passo 1, o usuário seleciona diretamente o id de um comentário existente, passando para o passo 2 com o id do comentário selecionado já preenchido dentro do campo Comment do modal

#### Cenário de Exceção
* No passo 4, o usuário seleciona o botão __Post__ sem ter preenchido corretamente algum dos campos obrigatórios. O sistema exibe um alerta nos campos que não foram preenchidos corretamente

### UC.04 - Baixar Arquivos de uma _Thread_
#### Cenário Principal
1. Usuário sobrepõe o ponteiro do mouse sob o arquivo que deseja baixar
* Sistema exibe um ícone de _download_ no canto inferior direito do arquivo
* Usuário clica no ícone
* Sistema envia o arquivo no formato original caso seja um arquivo, ou em formato __.zip__ caso seja um lote de arquivos 

#### Cenário de Exceção
* No passo 4, o sistema envia uma mensagem de erro caso o arquivo já tenha sido deletado

## UC.05 - Alterar CSS
#### Cenário Principal
1. Usuário seleciona o botão __Opções__ no cabeçalho do sistema ou o ícone __Alterar CSS__ existente no perfil de usuário
* Sistema exibe um modal com campo de texto para inserir o código CSS
* Usuário preenche o campo
* Usuário seleciona o botão __Save__
* Sistema adiciona o CSS inserido às páginas do sistema

### UC.06 - Denunciar Postagens
#### Cenário Principal
1. Usuário seleciona o ícone ao lado do id do _post_
* Sistema exibe um modal com campo de _captcha_
* Usuário soluciona o _captcha_
* Usuário seleciona o botão __Report__
* Sistema notifica os administradores e salva a denúncia na lista de denúncias
 
#### Cenário de Exceção
* No passo 4, o usuário seleciona o botão __Report__ sem ter preenchido corretamente o _captcha_. O sistema exibe um alerta de erro

### UC.07 - Cadastrar
#### Cenário Principal
1. Usuário seleciona o botão __Sign Up__ no cabeçalho do sistema
* Sistema exibe um _modal_ com os seguintes campos para serem preenchidos: Login, Password, e-mail e área para realizar o _upload_ de imagem de perfil
* Usuário preenche os campos e opcionalmente escolhe e realiza o _upload_ da imagem de perfil
* Usuário seleciona o botão __Enter__
* Sistema valida os campos preenchidos e efetua o cadastro

#### Cenário de Exceção
* No passo 4, o usuário seleciona o botão __Enter__ sem ter preenchido corretamente os campos. O sistema exibe um alerta de erro

### UC.08 - Alterar Configurações 

__(Mais opções de configurações precisam ser elaboradas)__

#### Cenário Principal
1. Usuário cadastrado clica em seu nome de usuário no cabeçalho do sistema para acessar seu perfil
* Sistema exibe a pagina de perfil
* Usuário aperta o ícone de alteração de configurações
* Sistema exibe uma tela para alteração de configurações, incluindo alteração de senha e nome de usuário.
* Usuário preenche os campos que deseja alterar
* Usuário clica no botão __alterar__
* Sistema valida as alterações realizadas

#### Cenário de Exceção
* No passo 6, o usuário cadastrado seleciona o botão __Alterar__ sem ter preenchido corretamente os campos. O sistema exibe um alerta de erro

### UC.09 - Marcar _Threads_ para Visualização
#### Cenário Principal
1. Usuário cadastrado localiza a _thread_ que deseja marcar
* Usuário cadastrado aperta no ícone de __Marcar para Visualização__ na postagem inicial da _thread_
* Sistema adiciona a _thread_ na lista de _threads_ visualizadas do usuário cadastrado

#### Cenário Alternativo
1. Usuário cria uma _thread
* Sistema adiciona a _thread_ na lista de _threads_ visualizadas do usuário cadastrado

### UC.10 - Gerenciar Notificações
#### Cenário Principal
1. Usuário cadastrado clica em seu nome de usuário no cabeçalho do sistema para acessar seu perfil
* Sistema exibe a pagina de perfil
* Usuário cadastrado seleciona o ícone __Gerenciar Notificações__
* Sistema exibe uma tela com opções de retirar _threads_ marcadas de sua lista ou apenas silenciar o envio de notificações de determinada _thread_
* Usuário cadastrado seleciona a _thread_ da lista e a opção que deseja efetuar
* Sistema salva a alteração realizada

### UC.11 - Receber Notificações
#### Cenário Principal
1. Sistema verifica que uma das _threads_ na lista de _threads_ para visualização do usuário cadastrado recebeu uma nova postagem
* Sistema envia uma notificação para o cabeçalho do usuário cadastrado contendo a informação de qual _thread_ recebeu uma nova postagem, a hora da postagem e um link para a postagem na _thread_. 
* Usuário cadastrado verifica a notificação em seu cabeçalho, tendo a opção de deletar ou permitir que a notificação permaneça na lista de notificações

#### Cenário Alternativo
* No passo 2, caso já exista uma notificação da mesma _thread_ na lista de notificações do usuário cadastrado, o sistema não envia a nova notificação

#### Cenário de Exceção
* Após o passo 3, o usuário cadastrado que tentar acessar o link de uma postagem da notificação para uma _thread_ fechada que já foi deletada do sistema, receberá uma tela com mensagem de ___thread_ não existente__


### UC.12 - Deletar postagens
#### Cenário Principal
1. Administrador localiza a _thread_ com as postagens que deseja deletar
* Administrador seleciona as postagens clicando no ícone __Select Post__
* Administrador aperta o botão __Delete Post__ localizado no rodapé da _thread_ 
* Sistema deleta as mensagens do servidor

#### Cenário Alternativo
* No passo 2, o administrador seleciona a postagem inicial da _thread_, o que faz com que a _thread_ inteira seja deletada do servidor

### UC.13 - Banir Usuários
#### Cenário Principal
1. Administrador localiza alguma postagem do usuário que deseja banir
* Administrador seleciona o ícone __Banir Usuário__ localizado no topo da postagem
* Sistema exibe uma tela para que seja selecionado o tempo de banimento
* Administrador escolhe dentro das seguintes opções: 1 dia; 1 semana; 1 ano; Eternamente 
* Administrador clica no botão __Confirm__
* Sistema bane o usuário pelo IP, inserindo-o na lista de IPs banidos e assim o impedindo de realizar novas postagens dentro do tempo de banimento
* Sistema exibe uma mensagem de banimento no topo da postagem que foi selecionada

#### Cenário de Exceção
No passo 5, o administrador seleciona o botão __Confirm__ sem ter selecionado o tempo de banimento, o que faz com que o sistema envie uma mensagem de erro informando que o tempo precisa ser selecionado

### UC.14 - Gerenciar _Tags_
#### Cenário Principal
1. Administrador localiza a _thread_ que deseja alterar as _tags_
* Administrador seleciona o ícone __Change Tags__ localizada na postagem inicial da _thread_
* Sistema exibe uma área ao lado da postagem com opções de _tags_ para selecionar
* Administrador seleciona as _tags_ que considera adequadas para a determinada _thread_
* Administrador seleciona o botão __Confim__
* Sistema altera as _tags_ da postagem inicial para as novas _tags_ escolhidas pelo administrador

## 4.2 Classes

![](https://raw.githubusercontent.com/BeholderDEV/NyaChan/master/documentation/Diagramas/classes.jpg?raw=true)

## 4.3 Estados
![](https://raw.githubusercontent.com/BeholderDEV/NyaChan/master/documentation/Diagramas/estadosThread.jpg?raw=true)


# Apêndice

## Tabela de Atalhos

| Funcionalidade| Atalho        |
| ------------- |:---------------:|
| Próxima Página / _thread_      | <kbd>N</kbd>  |
| Pagina / _thread_ Anterior      | <kbd>B</kbd> |
| Ativar Atualização Automática     | <kbd>A</kbd> |
| Resposta Rápida    | <kbd>Q</kbd> |
| Atualizar     | <kbd>R</kbd> |
| Ativar BookMark à _thread_    | <kbd>W</kbd> |
| Modo Catálogo  | <kbd>C</kbd> |

## Poderes de Administrador

 * Deletar _threads_
 * Deletar postagens
 * Banir usuários de acordo com as [politicas de uso](https://github.com/BeholderDEV/nya-chan/wiki/Pol%C3%ADticas-de-Uso) estabelecidas 
 * Alterar _tags_ de threads

## Tags

| Nome   | Descrição                      |
| -------|--------------------------------|
| a      | Anime & Mangá                  |
| b      | Aleatório                      |
| c      | Quadrinhos & Desenhos Animados |
| g      | Gif & Webm                     |
| h      | História e Ciências Humanas    |
| m      | Música                         |
| p      | Politicamente Incorreto        |
| t      | Tecnologia                     |
| tv     | Televisão & Filmes             |
| v      | Vídeo Games                    |


## Glossário

 * __Arquivo__: Qualquer arquivo nos seguintes formatos: jpg, gif, png, bmp, webm e pdf.
 * __Banimento__: Impedir o uso do site para um usuário durante determinado tempo.
 * __Thread__: Tópico com uma página, onde são agrupados comentários e imagens
 * __Tag__: Categoria na qual os temas se dividem.
 * __Spam__:  Algum tipo de postagem repetitiva
 * __Flood__: Várias postagens seguidas
 * __Imageboard__: Site com foco em discussões em torno de imagens e textos
 * __BookMark__: Marcador (Marca páginas)
 * __Raid__: Chamada para uma ação organizada em grupo, com a intenção de prejudicar alguma entidade

# Políticas de Uso

1. Não submeter, postar, discutir, requisitar ou linkar conteúdos que violem as leis locais ou Brasileiras
 * Não é permitido o acesso aos conteúdos do site, para menores de 18 anos
 * As ideias expressadas na _tag_ __/b__ não representam de maneira alguma os ideais dos desenvolvedores do site.
 * Não é permitida a postagem dos seguintes conteúdos fora do __/b__:
  * Insultos
  * Racismo
  * Respostas fora de tópico
  * Respostas com imagens muito grandes
  * Texto Indecifrável
  * Imagens Antropomórficas ou Grotescas
 * Não é permitido postar ou requisitar informação pessoal
 * Não é permitido postar ou requisitar chamadas de invasão (_raids_)
 * Não é permitido postar ou requisitar chamadas de invasão (_raids_) entre as boards (_flood_)
 * A qualidade das postagens é de extrema importância para a comunidade, encorajamos os contribuidores a prover imagens em alta qualidade e comentários informativos
 * Submeter conteúdos falsos ou abusar do sistema de denúncia pode resultar em banimento
 * Responder a uma _thread_ dizendo que você denúnciou um post não é permitido
 * Reclamar da __NyaChan__ ou de suas políticas de uso também pode ser motivo de banimento
 * Tentativas de burlar o banimento pode resultar em banimento permanente
 * Não é permitido nenhum tipo de _span_ ou _flood_
 * Não é permitido nenhum tipo de propaganda
 * Não é permitido passar-se por um administrador
 * Não é permitido o uso de _scrapers_, _bots_ ou qualquer outro tipo de postagem automática.
 * Não é permitido fazer postagens por _proxies_, VPNs ou Tor

##Banimento
O descumprimento das __Politicas de Uso__ podem resultar em banimento do usuário, por um tempo a ser definido pelo administrador.