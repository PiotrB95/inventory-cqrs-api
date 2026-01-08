
# Notes / Assumptions

# 1. Assumptions & Simplifications
a. Key assumptions made during implementation.
---

creating basic express server

preparing folder structure

adding necessary endpoints

testing them with postman

extending applications with another business requirements

checking all functionalities and endpoints

writing extra endpoints for easier testing

configurating unit test setups and write main ones

configurtating integration tests setup and write main ones


b. Elements that were intentionally omitted and the reasoning behind them.
---

tests of additional endpoints not included in the task

c. Interpretation of ambiguous parts of the task (e.g. discount rules,
customer/location model).
---
Base values of products should be defined by customer location. Then we can recalculate discounts.

# 2. Technical Decisions

a. Justification for:
---
 > *database choice*
 MongoDb - simplicity of the  tool and my previous experience with this technology.

> *project structure*
Based on experience, documentations and pattern requirements (CQRS).


> *CQRS implementation approach*
CommandBus and QueryBus for implement register and execute handlers.


b. Brief explanation of command / query separation.
---

Commands/queries subfolders for each main application parts.


# 3. Business Logic
a. How the discount system works (priority, order of application).
---

It checks customer location, then calculate total values for every discount options (if they are available) and add them into an array. If there is no discount in array it returns basic value multiplied by location factor, or select the lowest total amount from an array.


b. How stock consistency is ensured (no negative stock).
---

Product entity has "restock" and "sell" methods which contains necessary "if statement" with error throws.

c. Key edge cases that were taken into account.
---
For example:

negative stock or price

input validations

restocking with negative or zero amount

selling more than available stock

invalid location values

invalid discount calculation

invalid location-based price

invalid total amount

order with no customer assigned

order non-existing products

# 4. Testing

a. What is covered by tests and why
---
Units:

createOrder.command.spec.ts -> main functionality of the app

discountRules.spec.ts and pricingService.spec.ts -> all the most important calculations

product.entity.spec.ts -> restock and sell methods are crucial for edge case

order.repository.spec.ts -> proper data mapping

Integrations:

/customers  -> creating customers, we can’t create an order without them

/orders -> handling the most important endpoints

/products -> creating product, we must have something to order

b. What is not covered, but would be required in a production system.
---

There are some features that will be added and tested on production environment:

rate limiters

authorization and authentication

e2e tests

logs and metrics

test for extra endpoints

transactions for orders

paginations

order queue

api contracts

# Trade-offs & Alternatives describing:
#1. One concrete design decision you made that you would change if you had more time.
---
If the application could be expanded, I would change the database to the relational one: MySql or PostgreSQL.

#2. One alternative solution you seriously considered but rejected.
---
Use lowdb and joi.

#3. Why the chosen solution was selected over the alternative, including its downsides.
---
I would like to try new technologies, but time pressure did not allow me to learn them so
quickly.