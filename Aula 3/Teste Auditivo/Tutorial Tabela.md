## Instruções para criação de uma tabela para uso em um script de um teste auditivo.

A parte experimental dos *scripts* do PCIbex funciona tendo como base uma tabela. Dessa forma, torna-se essencial para a construção de um bom *script* saber como montar uma tabela que atenda às necessidades do seu experimento. 

Esse tutorial tem como objetivo explicar e exemplificar a criação de uma tabela para um experimento linguístico que tenha áudios como estímulos experimentais. Aconselhamos a utilização desse documento em conjunto com as [instruções](https://github.com/julia-greco/Curso_Livre_PCIbex/blob/master/Aula%203/Teste%20Auditivo/Tutorial%20Script.md) de como montar um *script*, para o mesmo tipo de experimento, presente nesse respositório na pasta **data_includes**.

### Experimento auditivo

O experimento para o qual criaremos uma tabela consiste em:
```
O participante ouve um áudio com uma sentença
e depois escolhe, entre duas opções, qual delas 
é a interpretação de sua preferência em relação
à frase ouvida anteriormente.
```
Portanto, será necessário ter em nosso *script* uma tela na qual toque o áudio, e outra na qual o participante possa ver as duas sentenças e escolher sua opção de interpretação.

### Criando a tabela

Neste ponto já podemos assumir que a nossa tabela terá três colunas: uma com os áudios, uma com as sentenças A e uma com as sentenças B.

| Audio | Sentença A | Sentença B |
|-------|------------|------------|

Na primeira coluna colocaremos os nomes dos áudios. Os arquivos em si deverão estar armazenados na pasta **chunk_includes** no seu repositório, ou então na seção **resources** no *PCIbex*. Mas **atenção**, para que os áudios sejam reproduzidos corretamente é necessário que você coloque o nome e a **extensão** do seu arquivo. No nosso exemplo  a extensão será **.wav**.

| Audio | Sentença A | Sentença B |
|-------|------------|------------|
| audio1.wav |  |  |
| audio2.wav |  |  |
| audio3.wav |  |  |

A segunda e terceira colunas são preenchidas com as sentenças. Nós usaremos `.` ao invés de `)` depois da letra **A** e **B** porque senão a tabela dará erro ao ser processada.

| Audio | Sentença A | Sentença B |
|-------|------------|------------|
| audio1.wav | A. O delegado dirigia uma Ferrari conversível. | B. A mulher dirigia uma Ferrari conversível. |
| audio2.wav | A. O assessor foi promovido. | B. O assessor foi demitido. |
| audio3.wav | A. O primo de Carlos estava no Amapá. | B. O amigo morava no Amapá. |

Agora nós já possuímos uma tabela com todas as informações necessárias para rodar o nosso experimento da maneira que descrevemos acima. Contudo, se analisássemos os resultados coletados, não seríamos capazes de reconhecer a qual conjunto de áudio e sentenças o participante deu determinada resposta. para termos essa informação no arquivo de resultados, será necessário a criação de uma coluna denominada **Item**, na qual será informado um código representativo de um conjunto de áudio e sentenças.

| Audio | Sentença A | Sentença B | Item |
|-------|------------|------------|------|
| audio1.wav | A. O delegado dirigia uma Ferrari conversível. | B. A mulher dirigia uma Ferrari conversível. | 1 |
| audio2.wav | A. O assessor foi promovido. | B. O assessor foi demitido. | 2 |
| audio3.wav | A. O primo de Carlos estava no Amapá. | B. O amigo morava no Amapá. | 3 |

Para o nosso teste, a tabela já está pronta e perfeitamente funcional. No entanto, a maioria dos experimentos são bem maiores do que o exemplo apresentado. Além disso, para que os resultados não sejam influenciados pela posição e o agrupamento dos estímulos, é necessário aplicar técnicas como o [Quadrado Latino](https://www.ime.unicamp.br/~ftorres/ENSINO/MONOGRAFIAS/Juari1_EA2016.pdf). Portanto, é comum se ter mais de uma versão de um experimento, ou mais de um **grupo**.

Foi com esse pensamento em mente que os desenvolvedores do *PCIbex* criaram uma forma de automatizar a distribuição dessas versões para cada participante. Para que isso ocorra, só é necessário que seja adicionado à tabela uma coluna denominada **Group**, que contenha letras ou números para a identificação das diferentes versões. Ao adicioná-la o *PCIbex* reconhece automaticamente que o conteúdo da coluna indica grupos de itens, e exibe para o participante os itens relacionados a somente um dos grupos especificados. Quando um próximo participante for fazer o experimento, o *PCIbex* irá exibir os itens de outro grupo, e assim sucessivamente.

Como foi dito antes, para o nosso experimento exemplo, não há necessidade de adicionar a coluna **Group**, já que teremos apenas uma versão, mas vamos incluir a coluna aqui por motivos didáticos. **Note** que o nome da coluna deve ser necessariamente **Group**, em inglês e com a primeira letra maíuscula, caso contrário o *PCIbex* não será capaz de reconhecê-la.

| Audio | Sentença A | Sentença B | Item | Group |
|-------|------------|------------|------|-------|
| audio1.wav | A. O delegado dirigia uma Ferrari conversível. | B. A mulher dirigia uma Ferrari conversível. | 1 | A |
| audio2.wav | A. O assessor foi promovido. | B. O assessor foi demitido. | 2 | A |
| audio3.wav | A. O primo de Carlos estava no Amapá. | B. O amigo morava no Amapá. | 3 | A |

Com a adição dessa última coluna, nossa tabela está pronta para ser utilizada no modelo de [*script*](https://github.com/julia-greco/minicursoPCibex/blob/master/data_includes/script_auditivo.js) disponível nesse repositório. Entretanto, para que ela possa funcionar sem nenhum problema no *PCIbex*, é necessário tomar alguns cuidados.

### Especificações da tabela para uso no PCIbex

O primeiro detalhe crucial é que a tabela deve estar formatada na extensão **.csv**. Nesse estilo, a tabela deverá ter as suas colunas separas por **vírgulas**. O exemplo que montamos ficaria assim:
```
Audio, Sentença A, Sentença B, Item, Group
audio1.wav, A. O delegado dirigia uma Ferrari conversível., B. A mulher dirigia uma Ferrari conversível., 1, A 
audio2.wav, A. O assessor foi promovido., B. O assessor foi demitido., 2, A
audio3.wav, A. O primo de Carlos estava no Amapá., B. O amigo morava no Amapá., 3, A
```
Mas **cuidado** pois em alguns computadores, apesar de se salvar a tabela em **.csv**, a tabela vem separada por **ponto e vírgula**. Para resolver esse problema acesse esse [tutorial](http://ptcomputador.com/Sistemas/windows/220763.html). Caso não funcione, acesse essa [solução de problemas](https://www.clubedohardware.com.br/topic/1024802-como-configurar-delimitador-csv-de-%C2%B4%C2%B4-para-%C2%B4%C2%B4/?do=findComment&comment=5636864)

Outra especificação importante para o funcionamento da tabela é a presença de espaços. Apesar do nosso exemplo acima, para que não ocorra nenhum erro ao se executar a tabela, é necessário que a mesma não apresente nenhum espaço além do enter que delimita as linhas. Após essa correção nossa tabela ficaria assim:
```
Audio,SentençaA,SentençaB,Item,Group
audio1.wav,A. O delegado dirigia uma Ferrari conversível.,B. A mulher dirigia uma Ferrari conversível.,1,A 
audio2.wav,A. O assessor foi promovido.,B. O assessor foi demitido.,2,A
audio3.wav,A. O primo de Carlos estava no Amapá.,B. O amigo morava no Amapá.,3,A
```
Por fim, um último detalhe que deve se ter em mente é o não reconhecimento de **diacríticos** pela plataforma. Isto se aplica também às tabelas, e caso você queira exportá-la diretamente para o *PCIbex Farm* é necessário utilizar os códigos em [**html**](http://www.lsi.usp.br/~help/html/iso.html) correspondentes aos caracteres especiais. Aconselhamos a não utilização, mesmo com o código **html**, de nenhum diacrítico nos nomes das colunas, já que essas serão utilizadas como variáveis dentro do *script*. Dessa forma, com todas as alterações necessárias, o resultado final é esse:
```
Audio,SentencaA,SentencaB,Item,Group
audio1.wav,A. O delegado dirigia uma Ferrari conversível.,B. A mulher dirigia uma Ferrari conversível.,1,A 
audio2.wav,A. O assessor foi promovido.,B. O assessor foi demitido.,2,A
audio3.wav,A. O primo de Carlos estava no Amapá.,B. O amigo morava no Amapá.,3,A
```

Finalmente a sua tabela está pronta! 

Espero que esse tutorial tenha contribuído para a compreensão de como construir uma tabela para uso no *PCIbex*.

Muito obrigada por acessá-lo,

Júlia Greco.



