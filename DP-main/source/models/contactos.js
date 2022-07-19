const conexion = require('../models/conexion.js');
var Distribudores={}




Distribudores.insertar = async function insertar(contacto){
	console.log(contacto);
	console.log(contacto.nombre);
	console.log(contacto.nombre2);
	console.log(contacto.Apellido_P);
	console.log(contacto.Apellido_M);
	console.log(contacto.Calle);
	console.log(contacto.NumCasa);
	console.log(contacto.Colonia);
	console.log(contacto.telefono1);
	console.log(contacto.telefono2);

    var sqlConsulta = "INSERT INTO persons set Nombre1 =?, Nombre2 =?, Apellido_P =?, Apellido_M =?";
	let data = [contacto.nombre,contacto.nombre2,contacto.Apellido_P,contacto.Apellido_M];

	

	let response =[];
	let response2 =[];
	let response3 =[];
	let response4 =[];

	try {
		response = await conexion.query(sqlConsulta, data);
		console.log(response);

		var sqlConsultaNumbers = "INSERT INTO phone_numers set Id_Person = ?, Numero1 = ?, Numero2 = ?";
		let dataNumbers = [response.insertId,contacto.telefono1,contacto.telefono2];

		response2 = await conexion.query(sqlConsultaNumbers, dataNumbers);

		var sqlConsultaDirecc = "INSERT INTO addresses set Id_Person = ?, Calle = ?, Num_Casa = ?,Colonia = ?";
		let dataDirecc = [response.insertId,contacto.Calle,contacto.NumCasa,contacto.Colonia];

		response3 = await conexion.query(sqlConsultaDirecc, dataDirecc);

		var sqlConsultaDistri = "INSERT INTO distributors set Fecha_R = ?, persons_id = ?, addresses_id = ?, phone_numers_id = ?";
		let dataDistri = ['NOW()',response.insertId,response.insertId,response.insertId];

		response3 = await conexion.query(sqlConsultaDistri, dataDistri);



	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Distribudores.mostrarTodos = async function mostrarTodos(){
    var sqlConsulta = "SELECT * FROM distributors left join addresses on distributors.addresses_id = addresses.id_person left join persons on distributors.persons_id = persons.id_ left join phone_numers on distributors.phone_numers_id = phone_numers.id_person";
	let response =[];

	try {
		response = await conexion.query(sqlConsulta);
		console.log(response);
	} catch (error) {
		console.log(error);
		return error;
	}
	return response
}

Distribudores.buscarId = async function buscarId(id){
    var sqlConsulta = "SELECT * FROM distributors left join addresses on distributors.addresses_id = addresses.id_person left join persons on distributors.persons_id = persons.id_ left join phone_numers on distributors.phone_numers_id = phone_numers.id_person WHERE distributors.persons_id = ?";
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
    var sqlConsulta1 = "DELETE FROM distributors WHERE persons_id = ?";
	var sqlConsulta2 = "DELETE FROM addresses WHERE id_person = ?";
	var sqlConsulta3 = "DELETE FROM persons WHERE id_ = ?";
	var sqlConsulta4 = "DELETE FROM phone_numers WHERE id_person = ?";
	
	let response = [];

	try {
		response = await conexion.query(sqlConsulta1,[id]);
		response = await conexion.query(sqlConsulta2,[id]);
		response = await conexion.query(sqlConsulta3,[id]);
		response = await conexion.query(sqlConsulta4,[id]);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Distribudores.actualizar = async function actualizar(contacto){
	console.log(contacto);
    var sqlConsulta1 = "UPDATE persons SET Nombre1 =?, Apellido_P=?, Apellido_M =? where id_ = ?";
	var sqlConsulta2 = "UPDATE addresses SET Calle =?";
	var sqlConsulta3 = "UPDATE phone_numers SET Numero1 =?";

    let data1 = [contacto.Nombre1, contacto.Apellido_P, contacto.Apellido_M,contacto.Id_Person];
	let data2 = [contacto.Calle];
	let data3 = [contacto.Numero1];

	let response = [];

	try {
		response = await conexion.query(sqlConsulta1,data1);
		response = await conexion.query(sqlConsulta2,data2);
		response = await conexion.query(sqlConsulta3,data3);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

module.exports = {Contactos: Distribudores}