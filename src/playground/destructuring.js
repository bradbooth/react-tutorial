//Object Destructuring

const person = {
    name: 'Brad',
    age: 23,
    location : {
        city: 'Toronto',
        temp: 25
    }
}
//Destructure
const { name, age } = person

console.log(`${name} is ${age}.`)


//Destructure & rename & default
const { city = 'Johanesburg', temp: temperature } = person.location

console.log(`It is ${temperature} degrees in ${city}.`)

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {name:publisherName} = book.publisher

console.log(publisherName)


// Array Destructuring

const address = ['1299 S Juniper Street', 'Philidalphia', 'Penslyvania', '19147']
const [, , state = 'New York', zip] = address
console.log(`Your are in ${state} with zip ${zip}`)

const item = ['Coffee', '$2.00', '$2.50', '$2.75']
const [item_name, , price_medium] = item
console.log(`A(n) ${item_name} costs ${price_medium}`)