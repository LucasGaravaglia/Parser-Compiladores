class parser{
  constructor() {
    this.syntacticTable = {
    "<STA>": [
      ["tokenConditional", "tokenStartFunction", "<EXP>", "tokenFinalFunction", "<STA>"],
      ["tokenStartBlockFunction", "<STA>", "tokenFinalBlockFunction","<STA>"],
      ["tokenWhile", "tokenStartFunction", "<EXP>", "tokenFinalFunction", "<STA>"],
      ["tokenReturn","<EXP>", "tokenEndLine","<STA>"],
      ["tokenEndLine","<STA>"],
      ["tokenIdentifier", "<K>", "tokenEndLine","<STA>"],
      ["tokenDataType","tokenIdentifier", "<T>", "tokenEndLine","<STA>"],
      ["tokenUnsigned", "tokenDataType","tokenIdentifier", "<T>", "tokenEndLine","<STA>"],
        ["tokenTypeDef", "tokenDataType", "tokenIdentifier", "tokenEndLine", "<STA>"],
      ["$"],
      
    ],
    "<T>": [
      ["tokenAssignments", "<EXP>"],
      ["tokenSeparator", "tokenIdentifier", "<T>"],
    ],
    "<EXP>": [
      ["tokenIdentifier", "<S>"],
      ["tokenStartFunction", "<EXP>", "tokenFinalFunction"],
      ["tokenNumber","<S>"],
    ],
    "<K>": [
      ["tokenAssignments", "<EXP>"],
      ["tokenStartFunction","tokenIdentifier","<B>","tokenFinalFunction"],
    ],
    "<B>": [
      ["tokenSeparator", "tokenIdentifier", "<B>"],
      ["$"],
    ],
    "<S>": [
      ["tokenOperator", "<EXP>"],
      ["tokenExpression", "<EXP>"],
      ["$"],
    ],
    "<F>": [
      ["tokenDataType","tokenIdentifier", "tokenStartFunction","<P>","tokenFinalFunction","<STA>"],
      ["tokenUnsigned","tokenIdentifier","tokenDataType", "tokenStartFunction","<P>","tokenFinalFunction","<STA>"],
      ["$"],
    ],
    "<P>": [
      ["tokenDataType", "tokenIdentifier","<Z>"],
      ["$"],
    ],
    "<P>": [
      ["tokenSeparator", "tokenIdentifier","<Z>"],
      ["$"],
    ],
    "<TD>": [
      ["tokenTypeDef", "tokenDataType","tokenIdentifier","tokenEndLine"],
    ]
    }
    this.pilha = ["$"];
  }
  
  stackUp(vet){
    for (let i = vet.length-1; i >= 0; i--){
      this.pilha.push(vet[i]);
    }
  }
  process(tokenList) {
    let message = "";
    this.pilha.push("<F>");
    let state;
    while (tokenList[0] != undefined) {
      state = this.pilha[this.pilha.length - 1];
      this.pilha.pop();
      if ((/<[a-z]*>/i).test(state)) {
        for (let i = 0; i < this.syntacticTable[state].length; i++) {
          if (this.syntacticTable[state][i][0] == tokenList[0]) {
            this.stackUp(this.syntacticTable[state][i])
          }
        }
      } else {
        if (state == "$") {
        } else if (state != tokenList[0]) {
          message = "Erro na analise sintática";
          break;
        }else{
          tokenList.shift();
        }
      }
    }
    if (message) {
      console.log(message)
    } else {
      console.log("Sem erros sintáticos.")
    }
  }
}
module.exports = { parser };