let customerId = 0
let employerId = 0
let mealId = 0
let deliveryId = 0

store = {customers: [], employers: [], meals: [], deliveries: [], drivers: []}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }
// employees() - returns a list of customers employed by the employer

 deliveries(){
    let deliveryRecords = this.employees().map(employee => {
        return employee.deliveries()
        })
      return deliveryRecords[0].concat(deliveryRecords[1])
    }

    meals() {
      let mealRecords = this.employees().map(employee => { return employee.meals() })
      let mealsAll = mealRecords[0].concat(mealRecords[1])
      let uniqueMeals = [...new Set(mealsAll)]
      return uniqueMeals
    }

    mealTotals(){
      let mealRecords = this.employees().map(employee => { return employee.meals() })
      let mealsAll = mealRecords[0].concat(mealRecords[1])
      let newRecord = [];
      let copy = mealsAll.slice(0);
      for (let i = 0; i < mealsAll.length; i++) {
        let mealCount = 0;
        for (let w = 0; w < copy.length; w++) {
          if (mealsAll[i] === copy[w]) {
            mealCount++;
            delete copy[w];
          }
        }
        if (mealCount > 0) {
          let a = new Object()
          a.id = mealsAll[i].id
          a.orderCount = mealCount
          newRecord.push(a)
        }
      }
      console.log(newRecord)
    }

  //    mealTotals() {
  //   let allMeals = this.deliveries().map(delivery => {
  //     return delivery.meal();
  //   });
  //   let summaryObject = {};
  //   allMeals.forEach(function(meal) {
  //     summaryObject[meal.id] = 0;
  //   });
  //   allMeals.forEach(function(meal) {
  //     summaryObject[meal.id] += 1;
  //   });
  //   console.log(summaryObject);
  // }
}


// mealTotals() - returns a JavaScript object displaying each respective meal id ordered by the employer's employees. The keys of the JavaScript object are the meal ids and associated with each meal id is a value. For example, employerOne.mealTotals() returning an object of {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times, and the meal with id of 2 was ordered by employerOne's employees three times.

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  // meal() - returns the meal associated with the delivery

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
  // customer() - returns the customer associated with the delivery
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  // meals() - returns all of the meals that a customer has had delivered

  totalSpent() {
    return this.meals().reduce(function (runningTotal, currentValue) {
      return runningTotal + currentValue.price }, 0)
    }
  // totalSpent() - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
   return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

   static byPrice() {
    return store.meals.sort((a, b) => {
      if (a !== undefined) {
      return a.price < b.price;
      }
    });
  }
    // byPrice() - A class method that orders the meals by their price. Use the static keyword to write a class method.

}
