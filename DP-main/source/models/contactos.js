const conexion = require('../models/conexion.js');
var Distribudores={}




Distribudores.insertar = async function insertar(contacto){
    var sqlConsulta = "INSERT INTO distributors set ?";
	let response =[];

	try {
		response = await conexion.query(sqlConsulta, contacto);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Distribudores.mostrarTodos = async function mostrarTodos(){
    var sqlConsulta = `SELECT * FROM distributors 
	inner join addresses on distributors.addresses_id = addresses.id_ 
	inner join persons on distributors.persons_id = persons.id_
	inner join phone_numers on distributors.phone_numers_id = phone_numers.id_`;
	let response =[];

	try {
		response = await conexion.query(sqlConsulta);
	} catch (error) {
		console.log(error);
		return error;
	}
	return response
}

Distribudores.buscarId = async function buscarId(id){
    var sqlConsulta = "SELECT * FROM distributors WHERE id_ = ?";
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,[id]);
	} catch (error) {
		console.log(error);
		return error;
	};

	return response;
}

Distribudores.borrar = async function borrar(id){
    var sqlConsulta = "DELETE FROM distributors WHERE id_ = ?";
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,[id]);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Distribudores.actualizar = async function actualizar(contacto){
    var sqlConsulta = "UPDATE distributors SET Nombre1 =?, Apellido_P=?, Apellido_M =?, Calle =?, Num_Casa =?, Colonia =?, Numero1=?, Numero2=?, WHERE id_ =?";
    let data = [contacto.nombre, contacto.domicilio, contacto.telefono, contacto.idContactos];
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,data);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

module.exports = {Contactos: Distribudores}