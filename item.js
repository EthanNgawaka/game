class Item{
    constructor(name, description, useText){
        this.name = name;
        this.description = description;
        this.useText = useText;
    }
}

function genericItem(text){
    dialogueBoxHandler.queueNewText(text);
}