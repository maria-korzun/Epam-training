let  clearContainer = (container)=>{
    while(container.hasChildNodes()){
        container.firstChild.remove()
    }
}