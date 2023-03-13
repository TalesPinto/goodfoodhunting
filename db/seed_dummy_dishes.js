// connection pool
const { Pool } = require('pg')

// establishing a client that can talk to the database
const pool = new Pool({
    database: 'goodfoodhunting',
})
const array = ["Arepas", "Barbecue Ribs", "Bruschette with Tomato", "Bunny Chow", "Caesar Salad", "California Maki", "Caprese Salad", "Cauliflower Penne", "Cheeseburger", "Chicken Fajitas", "Chicken Milanese", "Chicken Parm", "Chicken Wings", "Chilli con Carne", "Ebiten maki", "Fettuccine Alfredo", "Fish and Chips", "French Fries", "Sausages", "French Toast", "Hummus", "Katsu Curry", "Kebab", "Lasagne", "Linguine with Clams", "Massaman Curry", "Meatballs with Sauce", "Mushroom Risotto", "Pappardelle alla Bolognese", "Pasta Carbonara", "Pasta and Beans", "Pasta with Tomato and Basil", "Peking Duck", "Philadelphia Maki", "Pho", "Pierogi", "Pizza", "Poke", "Pork Belly Buns", "Pork Sausage Roll", "Poutine", "Ricotta Stuffed Ravioli", "Risotto with Seafood", "Salmon Nigiri", "Scotch Eggs", "Seafood Paella", "Som Tam", "Souvlaki", "Stinky Tofu", "Sushi", "Tacos", "Teriyaki Chicken Donburi", "Tiramisù", "Tuna Sashimi", "Vegetable Soup"]

let dummyImg = 'https://baconmockup.com/300/200'

for (let i = 0; i < 20; i++) {

    let randomName = Math.floor(Math.random() * array.length)

    const sql = `INSERT INTO dishes (title, imagem_url) VALUES ('${array[randomName]}', '${dummyImg}') returning id;`
    //req.body is the query to get info
    pool.query(sql, (err, dbRes) => {
        console.log(err)
        console.log(dbRes.rows[0].id) // check the order of the dishes added, they dont necessarily finish in the correct order, that's why their are added in out of order
    })

}
