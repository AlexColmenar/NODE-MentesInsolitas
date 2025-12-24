import {Sequelize} from "sequelize";
import db from "../BBDD/db.js";

export const productos = db.define("productos",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    precio:{
        type: Sequelize.DECIMAL(10,2)
    },
    descripcion:{
        type: Sequelize.STRING
    },
    imagen:{
        type: Sequelize.STRING
    },
    slug:{
        type: Sequelize.STRING
    },
},
{
    //para que no busque las columnas createdAt y updatedAt
    timestamps: false
});