const Namespace = require("./Class/Namespace");
const Room = require("./Class/Room");

const moz = new Namespace(0,'Mozella','/mozella','https://images.app.goo.gl/YXkFu9vB5K8HKXbU6'); 
const wiki = new Namespace(1,'Wikipedia','/wikipedia','https://images.app.goo.gl/YXkFu9vB5K8HKXbU6'); 
const linux = new Namespace(2,'Linux','/linux','https://images.app.goo.gl/YXkFu9vB5K8HKXbU6'); 

moz.addRooms(new Room(0,0,'Moz1', true));
moz.addRooms(new Room(1,0,'Moz2', true)); 
moz.addRooms(new Room(2,0,'Moz3')); 
moz.addRooms(new Room(3,0,'Moz4')); 

wiki.addRooms(new Room(0,1,'Wiki1'));
wiki.addRooms(new Room(1,1,'Wiki2')); 
wiki.addRooms(new Room(2,1,'Wiki3')); 

linux.addRooms(new Room(0,2,'Linux1'));
linux.addRooms(new Room(1,2,'Linux2')); 

const nameSpaces = [moz,wiki,linux]; 

module.exports = nameSpaces; 