import express from "express";
import {encuentros} from "../models/encuentros.js";
import {experiencias} from "../models/experiencias.js";
import {productos} from "../models/productos.js";
import moment from 'moment';
moment.locale('es');

const paginaInicio = async (rec, res) => {

    const promiseDB=[ ];
    promiseDB.push(encuentros.findAll({limit:3, order: [["Id", "DESC"]]}));
    promiseDB.push(productos.findAll({limit:3, order: [["Id", "DESC"]]}));
    promiseDB.push(experiencias.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo Viajes
    try{
        const resultado = await Promise.all(promiseDB);
            res.render("inicio", {
                pagina: "Inicio",
                clase: "home",
                experiencias: resultado[2],
                encuentros: resultado[0],
                productos: resultado [1],
            });

    }catch(error){
        console.log(error);
    }
}

const quienesSomos = (req, res) => {
    res.render( "nosotros",{
        pagina: "Quienes somos",
    });
};

const paginaEncuentros = async (req, res) => {
    try{
        const encuentro = await encuentros.findAll({
            limit: 15,
            order: [["Id", "DESC"]],


        }); //busca todas las experiencias en BBDD
        res.render("encuentros", {
            pagina: "Encuentros",
            encuentros: encuentro,
            moment: moment,
        });
    }catch(error)
    {
        console.log(error);
    }
};

const paginaExperiencias = async (req, res) => {
    try{
        const experiencia = await experiencias.findAll({
            limit: 9,
            order: [["Id", "DESC"]],


        }); //busca todas las experiencias en BBDD
        res.render("experiencias", {
            pagina: "Experiencias",
            experiencias: experiencia,
        });
    }catch(error)
    {
        console.log(error);
    }
};
const paginaProductos = async (req, res) => {
    try{
        const producto = await productos.findAll({
            limit: 21,
            order: [["Id", "DESC"]],


        }); //busca todas las experiencias en BBDD
        res.render("productos", {
            pagina: "Productos",
            productos: producto,
        });
    }catch(error)
    {
        console.log(error);
    }
};

//siempre que quiera consultar a la BBDD hay qie poner await y async que son las promesas y el trycatch para comprobar
const guardarExperiencias = async (req, res) => {

    const {nombre, correo, situaciones} = req.body;

    const errores = [];

    if (nombre.trim() === "") {
        errores.push({mensaje: "El nombre está incompleto: "})
    }
    if (correo.trim() === "") {
        errores.push({mensaje: "El correo está incompleto: "})
    }
    if (situaciones.trim() === "") {
        errores.push({mensaje: "El mensaje está incompleto: "})
    }

    if (errores.length > 0){

        const Experiencias = await experiencias.findAll({
            limit: 3,
            order: [["Id", "DESC"]],
        });

    res.render('experiencias', {
        pagina: 'Experiencias',
        errores: errores,
        nombre: nombre,
        correo: correo,
        situaciones: situaciones,
        experiencias: Experiencias,
    });
}else
{
    //Almacenar el mensaje en la BBDD
    try {
        //await hace que si no esta la fila la crea
        await experiencias.create({nombre: nombre, correo: correo, situaciones: situaciones,});
        res.redirect('/experiencias'); //Guardo en la base de datos y lo envío a la misma vista
    } catch (error) {
        console.log(error);
    }
    }
};

const paginaDetallesProductos = async (req, res) => {
    const { slug } = req.params;

    try {
        const resultado = await productos.findOne({ where: { slug: slug } });

        res.render('produs', {
            pagina: 'Información del Producto',
            resultado
        });

    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    quienesSomos,
    paginaEncuentros,
    paginaExperiencias,
    paginaProductos,
    guardarExperiencias,
    paginaDetallesProductos,
}

