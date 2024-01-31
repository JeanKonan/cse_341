const express = require('express');
const app = express();

app.use('/', require("./routes").router);

app.listen(3000, (err) => {
    console.log("Started server on 3000");
});



// const f = function() {
//     console.log("Hello");
// };

// f.name = "Jean";

// f.add2 = function(number) {
//     return number + 2;
// }

// f();
// console.log(f.name);
// console.log(f.add2(34));