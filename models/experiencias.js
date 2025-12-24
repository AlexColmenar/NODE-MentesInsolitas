import {Sequelize} from "sequelize";
import db from "../BBDD/db.js";

export const experiencias = db.define("experiencias",{
    Id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    correo:{
        type: Sequelize.STRING
    },
    situaciones:{
        type: Sequelize.STRING
    },
},
    {
        //para que no busque las columnas createdAt y updatedAt
        timestamps: false
    });