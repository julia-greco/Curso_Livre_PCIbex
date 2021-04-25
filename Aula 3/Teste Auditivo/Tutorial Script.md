

## Instruções para criação de um script para experimento auditivo na plataforma GitHub

A plataforma *PCIbex* pode ser, no início, bem complicada de ser utilizada por usuários inexperientes em programação, mas após acessar o [tutorial](https://doc.pcibex.net/basic-tutorial/) fornecido no site e ler alguns recursos na documentação, o seu funcionamento começa a ficar mais claro. Contudo o seu uso ainda pode ser prejudicado pelas próprias limitações da plataforma.

Esse tutorial pretende guiá-lo através da criação de um *script* para um experimento auditivo dentro do GitHub, a fim de evitar certos estresses que o servidor do *PCIbex* pode causar. Antes de mergulharmos em linhas e mais linhas de código, é interessante ter alguns recursos prontos e preparados para facilitar o trabalho que teremos pela frente.

### Antes de começar

Antes de começarmos a programar, é importante que você já tenha montado uma pasta denominada **chunk_includes** com os estímulos (no nosso caso áudios), imagens (para ícones, etc.) e a tabela. Nesse tutorial não iremos nos aprofundar em como montar uma tabela para uso no *PCIbex*, aconselhamos a consulta a uma [documentação](https://github.com/julia-greco/Curso_Livre_PCIbex/blob/main/Aula%203/Teste%20Auditivo/Tutorial%20Tabela.md) que explica com detalhes essa questão. 

Aconselhamos também a preparação prévia de um documento com o planejamento de como será a estrutura do experimento. Quantas telas terá, se cada tela terá um botão ou não, etc. Nesse repositório há um [exemplo](https://github.com/julia-greco/Curso_Livre_PCIbex/blob/master/Aula%203/Teste%20Auditivo/Estrutura%20%20do%20Experimento.md) da estrutura do experimento que desenvolveremos aqui.

É interessante também que se mantenha uma mesma formatação em todo o *script* para facilitar a localização de erros, como esquecer de colocar uma vírgula ou um parênteses final. Não mantenha todos os códigos alinnhados um embaixo do outro, construa hierarquias através de espaços e coloque vírgulas e parentêses alinhados verticalmente com código ao qual estão ligados. Um exemplo de uma formatação funcional seria:
```
Header(
         defaultText
                  .css("font-size","1.2em")
                  .print()
         ,
         defaultTextInput
                  .css("font-size","1.2em")
                  .print()
         ,
         defaultButton
                  .css("font-size","1.2em")
                  .center()
                  .print()
                  .wait()   
)
```
**Perceba** como é fácil de compreender com essa estrutura que **Header** abriga **defaultText, defaultTextInput, e defaultButton** e que esses por sua vez abrigam **.css, .print, .center, .wait**. Tente se lembrar de que os comandos são processados **verticalmente**, como em uma lista. 

Da mesma forma, sugerimos a utilização da função de comentário para não só deixar o seu código mais organizado, mas também para que você possa se lembrar do que cada comando realiza. Essa função é marcada pelo uso de **//** antes do texto comentando. Um exemplo do seu uso é:
```javascript
//Cria um cabeçalho. Todos os comandos dentro do cabeçalho serão rodados automaticamente antes de cada "trial"
Header(
//Define que todo texto será impresso na tela e que o tamanho da fonte será "1.2em"
         defaultText
            .css("font-size","1.2em")
            .print()
         ,
//Define que toda caixa de texto será impressa na tela e que o tamanho da fonte será "1.2em"
         defaultTextInput
            .css("font-size","1.2em")
            .print()
         ,
//Define que todo botão será impresso na tela, que o tamanho da fonte será "1.2em" e que o participante será obrigado a interagir com ele para prosseguir com o experimento
         defaultButton
            .css("font-size","1.2em")
            .center()
            .print()
            .wait()        
)
```
**Note** que o texto dos comentários está na cor **cinza**.

Por fim, aconselhamos a utilização da ferramenta *debugger* durante a construção do *script*. Ela não só aponta os erros no código mas também oferece a possibilidade de pular telas inteiras, agilizando o processo de teste. Infelizmente nesse tutorial não será possível aprofundar no funcionamente do *debugger*, portanto sugerimos que leia a parte referente à [ferramenta](https://doc.pcibex.net/core-concepts/4_pcibex-farm#debugger) no tutorial fornecido no site do *PCIbex*. 

Agora sim estamos prontos para começar.

### Criando o *script*

1. Crie um documento com extensão **.js**  dentro de uma pasta intitulada **data_includes** no seu diretório do Github. Para isso vá em **create new file**, escreva o nome da pasta indicado, digite barra a inclinada para a direita) e escreva o nome do seu documento de extensão **.js** (exemplo:**data_includes/meu_script.js**). Não se esqueça de que não pode haver **espaços** nem **caracteres especiais** no nome do seu script. Clique em **Commit new file** no final da página.

2.  Clique no nome do documento apenas criado e depois clique no ícone de lápis para começar a editar o seu script. 

3.  O Primeiro comando que deve ser escrito é `PennController.ResetPrefix(null);`. Esse comando é essencial para que o resto dos seus comandos funcione. Ele inativa os prefixos que acompanham as declarações de elementos do PennController, tornando a linguagem mais simples e limpa. Para mais informações sobre esse tópico, acesse a página da documentação sobre [Reset Prefix](https://doc.pcibex.net/global-commands/#resetprefix)

4. O próximo comando a ser escrito é o `Sequence()` Esse comando define a sequência na qual as telas do seu experimento irão aparecer. Nesse ponto é interessante você já ter em mente quantas telas você irá precisar, e também em qual ordem elas aparecerão. No nosso caso, precisaremos de quatro telas: uma de boas-vindas em que o participante preenche seus dados, uma com as instruções para o experimento, uma com o experimento em si, e uma com instruções finais e um agradecimento pela participação. Um exemplo do uso do `Sequence` seria:

- `Sequence("Participante", "Instrucoes", randomize("Experimento"), SendResults(), "Final");.`

- Antes da tela **Experimento** foi utilizado o comando `randomize()` que aleatoriza os itens exibidos dentro de um experimento. Também foi adicionado um comando antes de **Final**, o `SendResults()`. Esse comando salva automaticamente os dados coletados antes de exibir a tela **Final**.

5. Antes de começar a escrever o código principal, pode ser útil declarar um cabeçalho, ou um *Header*. O comando `Header()"` é executado antes de todo *Trial* (ou tela) e é útil para estabelecer de antemão as características de alguns *Elements*, além de definir variáveis globais (variáveis que podem ser utilizadas ao longo de todo o comando). Iremos declarar em nosso exemplo a característica de três *Elements*. Os comandos `defaultText()`, `defaultInputText()` e `defaultButton()` pré-definem respectivamente os *Elements* `newText()`, `newTextInput()` e `newButton()`. Os três elementos terão as mesmas duas características (ou os mesmos dois comandos declarados dentro deles): `.css()`, com o qual definiremos o tamanho da fonte; e `.print()`, comando utilizado para indicar que aquele elemento deve ser "impresso" na tela. A única exceção será o elemento `newButton()`, que além dos dois comandos, conterá também `.center()`, para centralizar o botão na tela, e `.wait()`, que interrompe o processamento do programa até que o usuário interaja com o botão. `.wait()` é essencial para o funcionamento do código, pois sem ele o programa processaria todos os comandos até a última linha, imprimindo os elementos na tela somente por alguns milissegundos. Abaixo, segue o exemplo do `Header()`:
```javascript
Header(
         defaultText
                  .css("font-size","1.2em")
                  .print()
         ,
         defaultTextInput
                  .css("font-size","1.2em")
                  .print()
         ,
         defaultButton
                  .css("font-size","1.2em")
                  .center()
                  .print()
                  .wait()   
)
```
- O tamanho da fonte está em uma medida muito utilizada dentro da programação, o *em*. Se quiser mais informações sobre essa medida, acesse o artigo da [Wikipedia](https://en.wikipedia.org/wiki/Em_(typography)).
Observe também que até aqui todos os comandos tinham sido demarcados por **ponto e vírgula**, mas que agora, dentro de outras estruturas maiores como o *Header*, e mais para frente o *Trial*, os comandos serão delimitados somente por uma **vírgula**. Mas **atenção**, não há necessidade de colocar vírgula no último comando declarado dentro dessas estruturas mencionadas, já que o final dele coincidirá com o final da estrutura.

6. O comando a seguir é um dos mais básicos na construção de um experimento no *PennController*, o `newTrial()`. Esse comando é o responsável por criar novas telas, dentro das quais *Elements* serão declarados. Os *Elements* podem ser caixas de textos, imagens, áudios, botões, etc. todos extremamente importantes na construção do *script*. Após digitar o comando e abrir o parêntese, escreva o nome da tela, entre aspas, que você já tinha definido no comando anterior (`Sequence()`). Exemplo:
```javascript
newTrial("Participante",
  
)
```
7. O primeiro *Trial* será para coletar os dados do participante. Dentro dele será necessário ter uma breve mensagem de boas-vindas, caixas de texto nas quais o participante digitará informações como seu nome, e-mail, idade, etc. e uma caixa de seleção na qual estará disponível algumas opções de escolaridade. Além disso, será preciso ter um botão que possa ser clicado quando os campos de informações estiverem preenchidos, levando o participante para a próxima tela. Dessa forma, o primeiro elemento a ser utilizado será o `newText()`. Como o nome sugere, é um elemento de texto, ou seja, sua função é criar um novo texto que será utilizado no experimento. É nele que você escreverá as frases que aparecerão na tela. Um exemplo de do seu uso é:
```javascript
newText("<p>Por favor, escreva seu NOME COMPLETO na caixa abaixo</p>")
,
```
- O comando contém só o texto a ser impresso pois, em nosso cabeçalho, declaramos que todo *Element* `newText()` será "impresso" (além de formatá-lo com o tamanho de fonte ideal). Assim, não é necessário adicionar mais nenhum comando para que funcione corretamente.
Observe que além do texto entre aspas há também `<p>` e `</p>`. Esses dois símbolos são usados em programação para indicar um parágrafo. `<p>` indica o início do parágrafo, enquanto `</p>` indica o fim.
 
7. O próximo *Element* a ser usado será `newTextInput()`, que terá uma estrutura muito semelhante a `newText()`. Entretanto, como nosso objetivo ao usar esse *Element* é o de receber os dados do participante, entre parênteses teremos, ao invés do conteúdo a ser exeibido, o nome dado ao elemento, que posteriormente será utilizado para recuperar os dados enviados pelo usuário. Ao escolher um nome, tenha o cuidado de manter em mente que o PCIbex não reconhece **diacríticos** e que ele faz diferença entre **maíusculas e minúsculas**. Exemplo da estrutura do comando:
```javascript
newTextInput("Nome")
,
```
- O *Element* `newButton()` terá a mesma sintaxe que `newTextInput()` nesse primeiro *Trial*. Contudo, nos próximos ele apresentará algumas pequenas mudanças.

8. O *Element* a seguir é bem diverso dos que utilizamos até agora. O comando `newDropDown()` cria uma caixa com uma lista vertical na qual os itens podem ser selecionados. Pelo fato do `newDropDown()` ser um *Element* assim como `newText()`, `newTextInput`, etc. ele também conterá `.css()` e `.print()`, mas em sua estrutura será declarado ainda dois outros comandos: `.add()`, que irá adicionar as opções selecionáveis; e `.log()`, que enviará as informações coletadas para o documento de resultados. Exemplo:
```javascript
newDropDown("Escolaridade", "Selecione sua escolaridade")
         .add("Médio completo", "Superior em curso", "Superior completo", "Pós-graduação")
         .css("font-size","1.2em")
         .print()
         .log()
,
``` 
- Observe que a primeira palavra entre aspas é o nome do *Element*, enquanto a segunda é o texto padrão que aparecerá antes de ser selecionada alguma das opções.
 
 9. Os comandos utilizados até agora alteraram a estrutura do experimento, moldando-no de acordo com o que foi declarado no *script*, mas pouco se falou sobre os dados coletados e a página de resultados. Os comandos a seguir tratam desse assunto. Todas as nossas caixas de texto receberam nomes, esses nomes serão utilizados no *Element* `newVar()`, que declara uma nova variável. Dentro dele, será utilizado: `.global()`, que torna a variável global; e `.set(getTextInput())`, que atribui os dados coletados nas caixas de texto às variáveis criadas. Um exemplo de uso seria:
 ```javascript
 newVar("NOME")
        .global()
        .set( getTextInput("Nome") )
 ,
```
- Assim como outros *Elements*, variáveis também tem de ser nomeadas. Nesse caso, para diferenciar o nome atribuído à caixa de texto do nome da váriavel, esse último foi escrito todo em caixa alta.
Com esse comando final, podemos fechar o nosso primeiro *Trial* e partir para o próximo.

- Até agora essa deve ser a estrutura do *Trial* **Participante**:
```javascript
//Cria uma nova tela - Tela de coleta de dados do participante
newTrial("Participante",

         newText("<p>Bem-Vindos!</p>")
         ,
         newText("<p>Neste experimento, você vai ouvir uma frase e depois deve escolher a melhor opção de interpretação para ela.</p>")
         ,
         newText("<p>Por favor, escreva seu NOME COMPLETO na caixa abaixo.</p>")
         ,
//Cria uma caixa de texto nomedada "Nome" para receber o nome do participante  
         newTextInput("Nome")
         ,
         newText("<p>Por favor, escreva o seu E-MAIL na caixa abaixo.</p>")
         ,
         newTextInput("Email")
         ,
         newText("<p>Escreva sua IDADE na caixa a abaixo.</p>")
         ,
         newTextInput("Idade")
         ,
         newText("<p>Agora selecione sua ESCOLARIDADE na caixa abaixo e aperte o botão 'Iniciar' para começar </p>")
         , 
//Cria uma caixa com seletores nomeada "Escolaridade" para que o participante selecione sua escolaridade
         newDropDown("Escolaridade", "Selecione sua escolaridade")
                  .add("Médio completo", "Superior em curso", "Superior completo", "Pós-graduação")
                  .css("font-size","1.2em")
                  .print()
                  .log() //Envia para o arquivo "results" a opção selecionada pelo participante 
         ,
//Cria um botão nomeado "Iniciar"
         newButton("Iniciar")
         ,
//Cria uma nova variável chamada "NOME" que recebe o conteúdo da caixa de texto "Nome"
         newVar("NOME")
                  .global()
                  .set( getTextInput("Nome") )
         ,
         newVar("EMAIL")
                  .global()
                  .set( getTextInput("Email") )
          ,
         newVar("IDADE")
                  .global()
                  .set( getTextInput("Idade") )
         
)
```
10. Antes de prosseguir para a próxima tela, faremos uso do comando `.log()` novamente, mas de uma maneira um pouco diferente. Dessa vez, ao invés de declará-lo com os parênteses em branco iremos dar um nome ao `.log()` e utilizar `.getVar()` para recuperar o conteúdo atribuído às váriáveis criadas na etapa anterior. Assim estaremos enviando os dados contidos nas varíaveis, isto é, os dados inseridos pelo participante, para o documento de resultados. Segue o exemplo de uso do comando:
```javascript
.log( "NOME" , getVar("NOME") )
```
11. O próximo *Trial* será nomeado **Instrucoes** e será composto basicamente de uma série de `newText()` idênticos aos utilizados nas etapas anteriores. Ele também terá um botão nomeado **Iniciar** com, a princípio, as mesmas configurações do botão anteriormente criado. No entanto, para termos um controle maior no que diz respeito aos tempos de reação do participante, utilizaremos o comando `.log()`, dentro do *Element* `newButton()`para saber o momento exato em que o usuário iniciou o experimento em si. Assim, nosso exemplo ficará como se segue:
```javascript
newButton("Iniciar")
         .log()
```        
12. O *Trial* a seguir será o mais crucial, já que é nele que desenvolveremos a estrutura principal do experimento. Diferentemente das telas que construímos até agora, iremos iniciar com o comando `Template()`. Esse comando irá agir de uma forma semelhante ao comando `default`. No entanto, ao invés de definir previamente a característica de algum elemento, o *Template* irá definir a estrutura de vários *Trial* cujo os dados serão processados a partir de uma tabela (A mesma especificada na introdução do tutorial). Assim iremos declarar o nosso novo *Trial*, nomeado **Experimento** dentro de *Template*. Exemplo de uso:
```javascript
Template("minha_tabela.csv",

         row => newTrial( "Experimento",    
                     )
)
```
- O comando *Template* irá receber então o nome da tabela na qual os estímulos do experimento estarão registrados. Ainda teremos a criação de uma função que apontará para todas as linhas da tabela especificada. Essa função no nosso exemplo recebeu o nome de `row`, o mesmo nome que aparece no [tutorial](https://doc.pcibex.net/advanced-tutorial/) fornecido no site do PCIbex.

13. Agora, dentro do novo *Trial* utilizaremos o comando `newAudio()`, que irá reproduzir os áudios indicados. Como `newAudio()` é um *Element* sonoro, ao invés de utilizar o comando `.print()` para exibi-lo utilizaremos o comando `.play()`. Exemplo:
```javascript
newAudio("AudioExperimento", row.AudioExperimento)
            .play()
,
```        
- É novamente utilizado o comando `variable`, e dessa vez, ele apontará para todas as linhas da coluna **AudioExperimento** presente na tabela. Portanto tome **cuidado** para não escrever o nome errado da coluna na qual estão citados os seus áudios, caso contrário o programa não conseguirá encontrar os seus arquivos.

14. Para ilustrar ao participante que um áudio será tocado, é interessante exibir uma imagem que indique tal ação, como, por exemplo, a imagem de um auto-falante. Assim utilizaremos a seguir o comando `newImage()` para a exibição de imagens. Como os outros *Elements* vistos anteriormente, será necessário declarar o comando `.print()`. Utilizaremos também o comando `.size()` que determina o tamanho da imagem. Um exemplo do uso desse *Element*:
```javascript
newImage("alto_falante_icone.png")
            .size( 90 , 90 )
            .print()
,
```
15. Para que o participante seja levado para a próxima parte do experimento, na qual ele analisará duas sentenças, iremos utilizar novamente um botão, que terá mais uma modificação dentre as que vimos até agora. Além de adicionarmos o comando `.log()`, adicionaremos também o comando `.remove()`, que irá remover o botão da tela assim que o mesmo for clicado. Isso se faz necessário pois não iremos declarar outro *Trial* dentro do nosso *Template*, e portanto, tudo que adicionarmos na tela permanecerá, a não ser que seja removido por meio desse comando. Exemplo:
```javascript
newButton("Próximo")
            .log()
            .remove()
,
```        
16. Como dito anteriormente, nesse *Trial* precisaremos remover tudo que for adicionado. Para remover a imagem que adicionamos, utilizaremos o comando `getImage()` em conjunto com o comando `.remove()`, identificando a imagem criada anteriormente e removendo-na. Um exemplo do uso dessa estrutura é:
```javascript
getImage("alto_falante_icone.png")
            .remove()
,
```        
17. Depois de ouvir o áudio, o participante irá ler duas sentenças, portanto iremos utilizar dois `newText()`. Entretanto, ao invés de escrevermos o texto que será impresso diretamente no elemento, utilizaremos `row` para retomar as sentenças presentes na tabela. Exemplo:
```javascript
newText("A",row.SentencaA)
,
```        
- Note que demos um nome ao novo texto criado: **A**. Esse nome será utilizado no comando a seguir.

18. Ao imprimir os textos na tela, eles automaticamente se posicionam um embaixo do outro, o que até agora não se apresentou como um problema. Contudo, para as respostas do experimento é interessante que o participante possa ler as opções lado a lado. Para isso utilizaremos o comando `newCanvas()` que permite alterar a posição das sentenças na tela. Entre os parênteses do nosso `newCanvas()` iremos definir o tamanho total da nossa tela em **pixels**. Com o comando `.add()` em conjunto com o comando `getText()`, iremos recuperar os textos já criados e posicioná-los na tela utilizando medidas novamente em **pixels**. Segue o exemplo do uso desse *Element*:
```javascript
newCanvas( 1400 , 700 )
            .add( 50 , 100 , getText("A") )
            .add( 750 , 100 , getText("B") )
            .print() 
,
```
- A medida à esquerda corresponde à **largura** da tela, enquanto a medida à direita corresponde à **altura** da tela. Perceba que no posicionamento das nossas sentenças a altura é a mesma, enquanto a largura é diferente, porque queremos que as frases fiquem lado a lado, mas não em cima uma da outra. Repare também que aqui utilizamos o comando `.print()`, isso ocorre pois o `newCanvas()` é um *Element*, e como todo outro *Element* visual precisa ser impresso para que suas alterações se tornem visíveis.

19. O último comando novo que utilizaremos em nosso script é o `newSelector()`. Esse comando possibilita que o participante escolha uma das sentenças, tanto pelo _**mouse**_ quanto pelo **teclado**. Para que a seleção por *mouse* das sentenças possa ocorrer, dentro do `newSelector()` utilizaremos novamente o comando `.add()` em conjunto com `getText()` para retomar as sentenças exibidas. Já para a seleção por teclas, será utilizado o comando `.keys()`, dentro do qual indicaremos entre aspas quais teclas serão as seletoras. Iremos declarar ainda os comandos `.wait()` e `.log()`. Exemplo:
```javascript
newSelector()
          .add( getText("A") , getText("B") )
          .keys("A","B")
          .log()
          .wait()
)
```
20. Após fechar o *Trial*, mas antes de fechar o *Template*, adicionaremos os dois últimos comandos `.log()`. Nesse caso eles irão retomar outras duas colunas da tabela criada: **Item** e **Group**, portanto iremos utilizar `variable`:
```javascript
.log("Group", variable.Group)
```
- Depois dos comandos, você pode fechar o *Template* com **`);`**.

- O seu *Trial* do experimento deve se parecer com esse:
```javascript
//Indica o uso da tabela "treino_script_auditivo.csv"
Template("tabela_script_auditivo.csv",
// "variable" vai automaticamente apontar para cada linha da tabela "tabela_script_auditivo.csv"
         row => newTrial( "Experimento",
//"variable" aponta para todas as linhas da coluna "AudioExperimento" da tabela "tabela_script_auditivo.csv" e toca o audio referente a elas
                  newAudio("AudioExperimento", row.AudioExperimento)
                           .play()
                  ,
//Exibe na tela a imagem "alto_falante_icone.png"
                  newImage("alto_falante_icone.png")
                           .size( 90 , 90 )
                           .print()
       
                  ,
//Cria um botão nomeado "Próximo", envia para o arquivo "results" a informação de quando ele foi pressionado e remove ele da tela
                  newButton("Próximo")
                           .log()
                           .remove()
                  ,
//Remove a imagem "alto_falante_icone.png" 
                   getImage("alto_falante_icone.png")
                           .remove()
                  ,
//Cria um novo texto nomeado "A" e "variable" aponta para todas as linhas da coluna "SentencaA" e imprime o texto presente nelas 
                   newText("A",row.SentencaA)
                  ,
                   newText("B",row.SentencaB)
                  ,
//Cria um canvas (uma caixa) e coloca os textos "A" e "B" um ao lado do outro
                  newCanvas( 1400 , 700 )
                           .add( 50 , 100 , getText("A") )
                           .add( 750 , 100 , getText("B") )
                           .print() 
                  ,
//Possibilita a seleção dos textos "A" e "B" através do mouse ou das teclas "A" e "B". Também envia para o arquivo "result" qual texto foi selecionado
                  newSelector()
                           .add( getText("A") , getText("B") )
                           .keys("A","B")
                           .log()
                           .wait()
                  )
         
//Envia para o arquivo "results" o conteúdo da coluna "Group" 
         .log("Group", row.Group)
         .log("Item", row.item)
);
```
21. Crie mais um *Trial* intitulado **Final** e coloque um `newText()` com agradecimentos pela participação. Não se esqueça também de adicionar um comando `.wait()` no último `newText()` criado, pois como os resultados já foram salvos (devido ao comando que colocamos no `Sentence()`) não a necessidade de colocar um botão aqui. Exemplo:
```javascript
newText("<p> Você receberá um e-mail com a sua declaração de participação.</p>")
         .wait()
```
22. Após testar o seu programa e corrigir os erros com a ajuda do *debugger*, será necessário fazer dois ajustes finais para que seu experimento esteja pronto para distribuição. O primeiro deles será ajeitar a barra de progresso, que até esse momento não deverá estar se completando mesmo ao final do experimento. Para corrigir tal erro será necessário usar o comando: `.setOption("countsForProgressBar",false);`. Esse comando deverá ir ao final do experimento, após o seu último *Trial*.
O outro ajuste será desativar o *debugger*, e para isso utilizaremos o código: `PennController.DebugOff();`. Esse comando deverá ir bem no início do script, logo após o comando: `PennController.ResetPrefix(null);`.

Finalmente o seu experimento está pronto!

Espero que esse tutorial tenha contribuído na construção do seu script!

Muito obrigada por acessá-lo,

Júlia Greco.


