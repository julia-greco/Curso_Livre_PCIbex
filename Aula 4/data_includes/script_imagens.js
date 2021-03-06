PennController.ResetPrefix(null); 
PennController.DebugOff();

Sequence ("welcome","tela1","tela2", "treino", "tela3" , 
randomize("experiment"), SendResults(), "final");

newTrial("welcome",
    defaultText
    .css("font-size","1.2em")
    .print()
    ,
    newText("<p>Bem-vindx!</p>")
    ,
    newText("<p>Neste experimento, voc&ecirc; vai ler uma frase, ela deve ser lida rapidamente e com aten&ccedil&atildeo. Depois  voc&ecirc deve escolher a melhor op&ccedil;&atildeo de imagem para ela.</p>")
    ,
    
    newText("<p>Por favor, escreva seu NOME COMPLETO na caixa abaixo.</p>")
    ,
    newTextInput("Nome")
    .css("font-size","1.2em")
    .print()
    ,
   
    
    newText("<p>Por favor, escreva seu CURSO na caixa abaixo.</p>")
    ,
     newTextInput("Curso")
    .css("font-size","1.2em")
    .print()
    ,
    
    newButton("Start")
    .css("font-size","1.2em")
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("Nome") )
   ,
    newVar("CURSO")
        .global()
        .set( getTextInput("Curso") )

       ) 
    .log( "ID" , getVar("ID") )
    .log( "CURSO" , getVar("CURSO") )
    
    
newTrial("tela1",
defaultText
    .css("font-size","1.2em")
    .print()
    
,
newText("Termo de Consentimento Livre e Esclarecido </p>"),
newText("Esta pesquisa est&aacute sendo desenvolvida pela aluna do curso de mestrado em Lingu&iacutestica da UFRJ Graziele Soares, sob a orienta&ccedil&atildeo do professor Marcus Maia.</p> A finalidade deste trabalho &eacute contribuir com a ci&ecircncia.</p> Solicitamos sua autoriza&ccedil&atildeo para utilizar seus dados em eventos da &aacuterea e publica&ccedil&otildees posteriores.</p> Basta voc&ecirc escrever EU CONCORDO na caixa de texto abaixo. "),
newTextInput("tcle")
.css("font-size","1.2em")
    .print()
    .log()
,
 newButton("Start")
    .css("font-size","1.2em")
        .print()
        .wait()
        )

newTrial("tela2",
defaultText
    .css("font-size","1.2em")
    .print()
    .log
    ,
     newText("<p>Vamos realizar um pequeno treino para voc&ecirc; se familiarizar com o experimento.</p>")
        ,
        newText("<p>INSTRU&Ccedil;&Otilde;ES:</p>")
        ,
        newText("<p> Leia a frase com aten&ccedil;&atilde;o e depois clique no bot&atilde;o &quot;Pr&oacute;ximo&quot; para ver as duas imagens <strong>A</strong> e <strong>B</strong>.</p>")
        ,
        newText("<p>Clique em cima da imagem que voc&ecirc  acha que &eacute; a melhor de acordo com a frase que voc&ecirc; leu.</p>")
        ,
        newText("<p>Aperte &quot;Iniciar&quot; para come&ccedil;ar</p>")
        ,
         newButton("Iniciar")
            .css("font-size","1.2em")
            .print()
            .center()
            .log()
            .wait()
            )
            
 Template("treino.csv",
 
 variable => newTrial("treino",

 newText("frase", variable.Frase)
 .css("font-size","2.5em")
 .print()
 ,
 newButton("Pr&oacute;ximo")
            .css("font-size","1.2em")
            .print()
            .center()
            .log()
            .wait()
            .remove()
            ,
    getText("frase")
    .remove()
    ,
    
  newImage("A",variable.ImageFileA)
          .size(200,200)
            //.print
        ,
        newImage("B",variable.ImageFileB)
            .size(200,200)
            //.print 
            ,
    newCanvas(1200, 600)
    .add(250, 150, getImage("A"))
    .add(850, 150, getImage("B"))
    .print()
        ,
      
        //newKey("AB")
        newSelector()
            .add( getImage("A") , getImage("B") )
            .keys(          "Z"    ,          "M"   )
            .log()
            .wait()
            )

    .log("Group", variable.Group)
    .log("Item", variable.Item)
    )
    
    
    
    newTrial("tela3",
    defaultText
    .css("font-size","1.2em")
    .print()
    ,
       newText("<p>Agora que voc&ecirc j&aacute; praticou, vamos iniciar o experimento. </p>")
        ,
        newText("<p>Clique em &quot;Iniciar&quot; quando estiver pronto para come&ccedil;ar.</p>")
        ,
        newButton("Iniciar")
            .css("font-size","1.2em")
            .print()
            .center()
            .log()
            .wait()
            )
    Template("myTable.csv",
    variable => newTrial("experiment"
    ,
           newText("frase", variable.Frase)
 .css("font-size","2.5em")
 .print()
 ,
 
 newButton("Pr&oacute;ximo")
            .css("font-size","1.2em")
            .print()
            .center()
            .log()
            .wait()
            .remove()
            ,
    getText("frase")
    .remove()
    ,
  newImage("A",variable.ImageFileA)
            .size(200,200)
            //.print
        ,
        newImage("B",variable.ImageFileB)
            .size(200,200)
            //.print 
            ,
    newCanvas(1200, 600)
    .add(250, 150, getImage("A"))
    .add(850, 150, getImage("B"))
    .print()
        ,
     
        //newKey("AB")
        newSelector()
            .add( getImage("A") , getImage("B") )
            .keys(          "Z"    ,          "M"   )
            .log()
            .wait()
            )

    .log("Group", variable.Group)
    .log("Item", variable.Item)
    )
        
 newTrial("final"
 ,
    newText ("<p> Obrigada pela participa&ccedil;&atilde;o!</p>")
    .css("font-size","1.2em")
        .print()
        .wait()
        )
        .setOption("countsForProgressBar",false);