import mongoose from 'mongoose';

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Inventario", );
        console.log("Conexión a la base de datos establecida");
    } catch (err) {
        console.error("Error en la conexión a la base de datos:", err);
        process.exit(1); 
    }
};

export default dbconnect;
