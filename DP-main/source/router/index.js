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

	res.render('agenda.html', { titulo : 'Agenda de distribuidores', contactos: contactos, contacto: null })
});

router.post('/agenda/nuevo', async (req,res) => {
	const { nombre, Apellido_P, Apellido_M, calle, numcasa, colonia, numero1, numero2 } = req.body;

	await dbContactos.Contactos.insertar({nombre, Apellido_P, Apellido_M, calle, numcasa, colonia, numero1, numero2});

	res.redirect('/agenda')
});

router.get('/agenda/id', async (req,res) => {
	const { idDistribudor } = req.query;
	if (!idDistribudor) return res.redirect('/agenda');

	const contacto = await dbContactos.Contactos.buscarId(idDistribudor);
	console.log(contacto);
	res.render('agenda.html', { titulo: 'Agenda de Distribuidores', contactos: [], contacto: contacto[0]});
});

router.post('/agenda/id', async (req,res) => {
	const { idDistribudor, nombre, Apellido_P, Apellido_M, calle, numcasa, colonia, numero1, numero2 } = req.body;
	console.log(req.body);
	if (!idDistribudor) return res.redirect('/agenda');
	console.log(idDistribudor);

	await dbContactos.Contactos.actualizar({ idDistribudor, nombre, Apellido_P, Apellido_M, calle, numcasa, colonia, numero1, numero2});

	res.redirect('/agenda');
})

router.post('/agenda/id/borrar', async (req,res) => {
	const { idDistribudor } = req.body;
	
	if (!idDistribudor) return res.redirect('/agenda');

	await dbContactos.Contactos.borrar(idDistribudor);

	res.redirect('/agenda');
})


router.get('*',(req,res)=>{
	res.send("No existe la pagina");
})
module.exports=router;