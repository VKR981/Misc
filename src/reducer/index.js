const postsreducer=(state=['hello','world'],action)=>{
    switch(action.type){
        case 'GET_LIST':
            return state
        case 'COPY':
            state=action.payload
            return state
        default:
            return state

    }
};

export default postsreducer