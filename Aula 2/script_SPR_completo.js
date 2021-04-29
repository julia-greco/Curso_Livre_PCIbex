PennController.ResetPrefix(null);
PennController.DebugOff();

Sequence("Inicio","Instrucoes", randomize("Itens"),SendResults(),"Final");

newTrial("Inicio",

    newText("<p>Bem-vindo! Antes de iniciarmos, preencha os dados a seguir:</p>")
    .print()
    .css("font-size","1.2em")
    ,
    newText("<p>Nome:</p>")
    .print()
    .css("font-size","1.2em")
    ,
    newTextInput("Nome")
    .print()
    ,
    newText("<p>Idade:</p>")
    .print()
    .css("font-size","1.2em")
    ,
    newTextInput("Idade")
    .print()
    ,
    newButton("Iniciar")
    .css("font-size","1.2em")
    .print()
    .wait() 
    ,
    newVar("ID") 
    .global()
    .set( getTextInput("Nome") )
    ,
    newVar("IDADE")
    .global()
    .set( getTextInput("Idade") )
   
)

    .log( "ID" , getVar("ID") )
    .log( "AGE" , getVar("IDADE") 

);

newTrial("Instrucoes",
    
    newText("<p>Este experimento consiste em ler sentenças segmentadas e responder perguntas de compreensão.</p>")
    .print()
    .center()
    .css("font-size","1.2em")
    ,
    newText("<p>Use a tecla <strong>ESPAÇO</strong> para ler cada trecho. Aperte as teclas C e M para responder SIM ou NÃO.</p>")
    .print()
    .center()
    .css("font-size","1.2em")    
    ,
    newButton("Iniciar")
    .print()
    .center()
    .css("font-size","1.2em")
    .wait()
)

Template("Itens.csv",

 variable => newTrial( "Itens",

    newController("DashedSentence", {s: variable.Frase} )
    .css("font-size","1.0em")
    .print()
    .log()
    .wait() 
    .remove()
    ,
    newText("Pergunta", variable.Pergunta)
    .css("font-size","1.2em")
    .center()
    ,
    newText("C",  "Sim (C)")
    .css("font-size","1.2em")
    ,
    newText("M", "Não (M)")
    .css("font-size","1.2em")
    ,
    newCanvas(1800, 900)
    .add(200, 0, getText("Pergunta"))
    .add(50, 150, getText("C"))
    .add(550, 150, getText("M"))
    .print()
    ,
    newSelector()
    .add( getText("C") , getText("M") )
    .keys(        "C"    ,       "M"   )
    .log()
    .wait()
    )

    .log("Group", variable.Group)
    .log("Item", variable.Item)

    );

PennController.SendResults;
    
    newTrial( "Final" ,
    newText("Fim do experimento! Obrigado!")
    .css("font-size","1.2em")
    .center()
    .print()
    .wait()

    )    
    
 .setOption("countsForProgressBar", false);
