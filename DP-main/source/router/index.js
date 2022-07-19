const express = require("express");
const dbContactos = require('../models/contactos.js');
const router = express.Router();
const mysql = require("mysql");

//dbContactos.Contactos.insertar({nombre:'Johana',domicilio:'El Zapote', telefono:'6692202109'})
//dbContactos.Contactos.mostrarTodos();
//dbContactos.Contactos.buscarId(1);
// dbContactos.Contactos.borrar(1);

router.get('/',(req,res)=>{
    res.send("Iniciamos Servidor");
});

router.get('/index',(req,res)=>{
	res.render('index.html',{titulo:'Index'})
});


router.get('/agenda',(req,res) => {
	res.render('agenda.html', { titulo : 'Agenda de distribuidores', contactos: [], contacto: null })
});

router.post('/agenda', async (req,res) => {
	let contactos = await dbContactos.Contactos.mostrarTodos();
	if (!contactos.length) return res.render('agenda.html', { titulo : 'Agenda de distribuidores', contactos: [], contacto: null });

	res.render('agenda.html', { titulo : 'Agenda de Contactos', contactos: contactos, contacto: null })
});

router.post('/agenda/nuevo', async (req,res) => {
	const { nombre, nombre2, Apellido_P, Apellido_M, Calle,NumCasa,Colonia, telefono1,telefono2 } = req.body;

	await dbContactos.Contactos.insertar({nombre, nombre2, Apellido_P, Apellido_M, Calle,NumCasa,Colonia, telefono1,telefono2});

	res.redirect('/agenda')
});

router.get('/agenda/id', async (req,res) => {
	const { idContactos } = req.query;
	if (!idContactos) return res.redirect('/agenda');

	const contacto = await dbContactos.Contactos.buscarId(idContactos);
	console.log(contacto);

	res.render('agenda.html', { titulo: 'Agenda de Contactos', contactos: [], contacto: contacto[0]});
});

router.post('/agenda/id', async (req,res) => {
	const { Nombre1, Apellido_P, Apellido_M, Calle, Numero1, Id_Person } = req.body;
	if (!Id_Person) return res.redirect('/agenda');

	await dbContactos.Contactos.actualizar({Nombre1, Apellido_P, Apellido_M, Calle, Numero1, Id_Person});

	res.redirect('/agenda');
})

router.post('/agenda/id/borrar', async (req,res) => {

	const { Id_Person } = req.body;
	
	if (!Id_Person) return res.redirect('/agenda');
	
	await dbContactos.Contactos.borrar(Id_Person);

	res.redirect('/agenda');
})


router.get('*',(req,res)=>{
	res.send("No existe la pagina");
})
module.exports=router;