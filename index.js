const app = require("./src/server");
//require("dotenv").config();

const port = process.env.PORT || 3001; 

app.listen(port,
    console.log(`Te estoy escuchando por el puerto ${port}!`)
);



  

  

