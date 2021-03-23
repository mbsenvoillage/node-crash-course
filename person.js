class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        return "My name is " + this.name + " and I am " + this.age;
    }
}

module.exports = Person;

