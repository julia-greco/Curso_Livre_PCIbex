//Início do Script

//Inativa os prefixos do PennController (sem esse comando os códigos não funcionam)
PennController.ResetPrefix(null);
PennController.DebugOff();
//Define a sequência de telas do experimento
Sequence("Participante", "Instrucoes", randomize("Experimento"), SendResults(), "Final");

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
         ,         
)


//Cria uma nova tela - Tela de coleta de dados do participante
newTrial("Participante",

//Cria o texto "Bem-Vindos!"
         newText("<p>Bem-Vindos!</p>")
         ,
         newText("<p>Neste experimento, você vai ouvir uma frase e depois deve escolher a melhor opção de interpretação para ela.</p>")
         ,
         newText("<p>Por favor, escreva seu NOME COMPLETO na caixa abaixo.</p>")
         ,
//Cria uma caixa de texto nomedada "Nome" para receber o nome do participante  
         newTextInput("Nome")
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
)

//Envia para o arquivo "results" o conteúdo da variável "NOME"
.log( "NOME" , getVar("NOME") )

//Nova tela - Tela de instruções do treino
newTrial("Instrucoes",
         
    newText("<p>INSTRUÇÕES:</p>")
    ,
    newText("<p>Ouça a frase com atenção e depois clique em cima de uma das sentenças, <strong>A</strong> ou <strong>B</strong>, que você considerar a melhor interepretação.</p>")
    ,    
    //Cria um novo botão nomeado "Iniciar" e envia para o arquivo "results" a informação de quando ele é pressionado
    newButton("Iniciar")
        .log()
)

//Indica o uso da tabela "treino_script_auditivo.csv"
Template("tabela_script_auditivo.csv",
// "variable" vai automaticamente apontar para cada linha da tabela "tabela_script_auditivo.csv"
    variable => newTrial( "Experimento",
//"variable" aponta para todas as linhas da coluna "AudioExperimento" da tabela "tabela_script_auditivo.csv" e toca o audio referente a elas
        newAudio("AudioExperimento", variable.AudioExperimento)
            .play()
        ,
//Exibe na tela a imagem "alto_falante_icone.png"
        newImage("alto_falante_icone.png")
            .size( 90 , 90 )
            .print()
            .center()
       
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
        newText("A",variable.SentencaA)
        ,
        newText("B",variable.SentencaB)
        ,
        //Cria um canvas (uma caixa) e coloca os textos "A" e "B" um ao lado do outro
        newCanvas( "2000vw", "800vh" )
            .add( "center at 25%" , "middle at 2%" , getText("A") )
            .add( "center at 75%" , "middle at 2%" , getText("B") )
            .print() //Agora, dentro do canvas, é que os textos "A" e "B" serão impressos na tela
        ,
        //Possibilita a seleção dos textos "A" e "B" através do mouse ou das teclas "A" e "B". Também envia para o arquivo "result" qual texto foi selecionado
        newSelector()
            .add( getText("A") , getText("B") )
            .keys("A","B")
            .log()
            .wait()
    )
         
    //Envia para o arquivo "results" o conteúdo da coluna "Group" 
    .log("Group", variable.Group)
    .log("Item", variable.Item)
);

//Nova Tela - Tela final    
newTrial( "Final" ,
    newText("<p> O experimento foi concluído. Obrigada pela participação!</p>")
    .center()
    ,
    newText("<p> Você receberá um e-mail com a sua declaração de participação.</p>")
    .center()
    .wait()
 )

//Ajeita a barra de pogresso para que ela fique completa
.setOption("countsForProgressBar",false);
//Fim do Script
