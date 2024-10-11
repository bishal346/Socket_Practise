class Room{
    constructor(id,nameId,title,privateRoom = false) {
        this.id = id; 
        this.nameId = nameId; 
        this.title = title; 
        this.privateRoom = privateRoom; 
        this.message = []; 
    }
    addMessage(messageObj) {
        this.message.push(messageObj); 
    }

    clearMessage() {
        this.message = []; 
    }

}

module.exports = Room; 