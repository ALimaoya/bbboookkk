import { KINDLIST ,CURRENTINDEX } from './actionType' ;

export function kindList(state = [] ,action ){
    const { type, data } = action ;
    if( type === KINDLIST ){
        state = data ;
        return state ;
    }else{
        return state ;
    }
}

export function currentIndex(state = [] ,action){
    const { type, index } = action ;
    if( type === CURRENTINDEX ){
        state = index ;
        return state ;
    }else{
        return state ;
    }
}