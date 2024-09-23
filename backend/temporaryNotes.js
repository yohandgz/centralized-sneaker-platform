//what if i do this, i store a separate table in my database that stores every 
//single search a user has made. everytime a new search is made, i call the api 
//and add the search to the table. if it has already been made, we just pull 
//every item from the database that has the keywords

//the logic above is nice, but how can we implement popular shoes showing up on 
//top? 
//what if each time a shoe is clicked, they get a score that adds 1
//and to avoid all the keyword searching that could be very unreliable, 
//we can add a list to the search table of all the indexes of shoes from that 
//search. then all those shoes are resorted by highest score to lowest, then 
//they are shown to the user. 

//and also, to prevent two different api calls for inputs like nike dunk low
//and nike low dunk, we implememnt a keyword function that searches through 
//the searches themselves. and they need to match 1:1 words, no difference!
//also make sure digits turn to words.

//maybe keep score of searches to suggest popular searches

//BADA BOOEY

//my thought process VVV
//could you explain the purpose of sneakerRoutes.js and sneakerController.js? because by the logic of my current backend, the server takes in searches. the server asks db.js if the search is in the database, if it is, then it sends the shoes to the server, and the server returns those shoes. if it isn't, then the db.js asks apiclient.js for shoes, then the database updates and the server returns those. where do sneakerRoutes.js and sneakerController.js fall into this process? what code goes there if any? should i just delete those files? 

//once everything is done we can have users sign in and build their own pinterest board:)))))))



//image notes: 
//small url and smaller url: 
//300->140
//214->100
//"https://images.stockx.com/images/Vans-Slip-On-47-V-DX-David-Bowie-Hunky-Dory-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1626899069"
//"https://images.stockx.com/images/Vans-Slip-On-47-V-DX-David-Bowie-Hunky-Dory-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1626899069"


//"https://images.stockx.com/images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging-Product.png?fit=fill&bg=FFFFFF&w=300&h=214&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1696534946"
//"https://images.stockx.com/images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging-Product.png?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1696534946"

