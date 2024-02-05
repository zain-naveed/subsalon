export const AppTtitle = (newTitle) =>{
    if(newTitle){
    return (document.title = newTitle);
    }
    else{
        return (document.title = "Subsalon | ");
    }

}