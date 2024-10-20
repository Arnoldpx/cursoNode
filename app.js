
import express from 'express';
import dbconnect from "./config/db.js";
import productoRoutes from "./routes/productos.routes.js"
const app = express();

const router = express.Router();
const PORT = 3000;
app.use(express.json());


app.use('/api', productoRoutes);



dbconnect().then(()=>{
    app.listen(PORT,() => {
        console.log(`El servidor esta corriendo en el puerto ${PORT}`);
    })
}).catch(err=>{
    console.error('No se puede iniciar el servidor debido a un error')
});
