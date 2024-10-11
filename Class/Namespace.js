class Namespace{
    constructor(id,name,endpoint,image) {
        this.id = id; 
        this.name = name; 
        this.endpoint = endpoint; 
        this.image = image; 
        this.rooms = []; 
    }
    addRooms(roomObj) {
        this.rooms.push(roomObj); 
    }

}

module.exports = Namespace; 