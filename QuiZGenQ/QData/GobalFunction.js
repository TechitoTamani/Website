export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function getRandomIntMN(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

export function ArrayEqual(array1,array2){
    if (array1[0] == array2[0] && array1[1] == array2[1]) {
        return true
    }
    else {
        return false
    }
}

export function ArrayNotIn(arraymain,arraycheck){

    let Nc = 0

    for (let i = 0; i < arraymain.length; i++){
        if (arraymain[i].includes(arraycheck[0]) && arraymain[i].includes(arraycheck[1])) {
            Nc++
        }
    }

    if (Nc == 0){
        return(true)
    }
    else if (Nc != 0){
        return(false)
    }
}

export function AnsNotIn(arraymain,ans){
    
    let Nc = 0

    for (let i = 0; i < arraymain.length; i++){
        if (arraymain[i] == ans) {
            Nc++
        }
    }

    if (Nc == 0){
        return(true)
    }
    else if (Nc != 0){
        return(false)
    }
}