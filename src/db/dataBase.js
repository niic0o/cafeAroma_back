/*
Se usara un arreglo cargado de manera estatica en tiempo real hasta que se construya la base de datos
*/
const users = [
  {"id": 1,
  "categoria": 'cliente',
  "dni": 23568974,
  "nombre": "Juan Martín",
  "apellido": "Peralta",
  "username": "tincho",
  "password": "1234*abcd",
  "email": "juan.perez@example.com",
  "provincia": "Corrientes ",
  "ciudad": "La Plata",
  "domicilio": "Calle Falsa 123",
  "eliminado": "NO",
  },/*
  {
    id: 1,
    name: "jose",
    username: "josesito",
    email: "josesito@gmail.com",
  },
  {
    id: 2,
    name: "pedro",
    username: "pedrito",
    email: "pedrito@gmail.com",
  },
  {
    id: 3,
    name: "maria",
    username: "mariacita",
    email: "mariacita@gmail.com",
  },
  {
    id: 4,
    name: 'ana',
    username: 'anita',
    email: 'anita@gmail.com'
  },
  {
    id: 5,
    name: 'juan',
    username: 'juanito',
    email: 'juanito@gmail.com'
  },*/
];

module.exports = users;
