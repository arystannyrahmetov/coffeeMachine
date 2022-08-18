// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

class CoffeeMachine {
    constructor() {
        this.waterAmount = 400;
        this.milkAmount = 540;
        this.beansAmount = 120;
        this.cupsAmount = 9;
        this.moneyAmount = 550;
    }
    fill(water, milk, beans, cups) {
        this.waterAmount += water;
        this.milkAmount += milk;
        this.beansAmount += beans;
        this.cupsAmount += cups;
    }
    take() {
        console.log(`I gave you $${this.moneyAmount}`);
        this.moneyAmount = 0;
    }
    buy(coffeeType, coffeeAmount) {
        if (this.checkAvailability(coffeeType)) {
            this.waterAmount -= coffeeType.water;
            this.milkAmount -= coffeeType.milk;
            this.beansAmount -= coffeeType.beans;
            this.cupsAmount -= coffeeAmount;
            this.moneyAmount += coffeeType.price;
        }
    }
    checkAvailability(coffeeType) {
        if (this.waterAmount < coffeeType.water) {
            console.log('Sorry, not enough water!');
            return false;
        }
        if (this.milkAmount < coffeeType.milk) {
            console.log('Sorry, not enough milk!');
            return false;
        }
        if (this.beansAmount < coffeeType.beans) {
            console.log('Sorry, not enough coffee beans!');
            return false;
        }
        if (this.cupsAmount < 1) {
            console.log('Sorry, not enough disposable cups!');
            return false;
        }
        console.log('I have enough resources, making you a coffee!');
        return true;
    }
    showLogs() {
        console.log(`\nThe coffee machine has:\n` +
        `${this.waterAmount} ml of water\n` +
        `${this.milkAmount} ml of milk\n` +
        `${this.beansAmount} g of coffee beans\n` +
        `${this.cupsAmount} disposable cups\n` +
        `$${this.moneyAmount} of money\n`);
    }
}

class Coffee {
    constructor(water, milk, beans, price) {
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.price = price;
    }
}

class Espresso extends Coffee {
    constructor() {
        super(250, 0, 16, 4);
    }
}

class Latte extends Coffee {
    constructor() {
        super(350, 75, 20, 7);
    }
}

class Cappuccino extends Coffee {
    constructor() {
        super(200, 100, 12, 6);
    }
}

let machine = new CoffeeMachine();

while (true) {
    let action = input("Write action (buy, fill, take, remaining, exit):\n");

    if (action === 'fill') {
        let water = parseInt(input("Write how many ml of water do you want to add:\n"));
        let milk = parseInt(input("Write how many ml of milk do you want to add:\n"));
        let beans = parseInt(input("Write how many grams of coffee beans do you want to add:\n"));
        let cups = parseInt(input("Write how many disposable cups of coffee do you want to add:\n"));
        machine.fill(water, milk, beans, cups);
    } else if (action === 'take') {
        machine.take();
    } else if (action === 'buy') {
        let coffee = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:\n');
        if (coffee === '1') {
            machine.buy(new Espresso(), 1);
        } else if (coffee === '2') {
            machine.buy(new Latte(), 1);
        } else if (coffee === '3') {
            machine.buy(new Cappuccino(), 1);
        } else if (coffee === 'back') {
            continue;
        }
    } else if (action === 'remaining') {
        machine.showLogs();
    } else if (action === 'exit') {
        break;
    }
}