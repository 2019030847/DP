const conexion = require('../models/conexion.js');
var Distribudores={}




Distribudores.insertar = async function insertar(contacto){

	try {
		const person = await conexion.query('INSERT INTO persons SET Nombre1 = ?, Apellido_P = ?, Apellido_M = ? ', [contacto.nombre, contacto.Apellido_P, contacto.Apellido_M]);
		const address = await conexion.query('INSERT INTO addresses SET Calle = ?, Num_Casa = ?, Colonia = ? ', [contacto.calle, contacto.numcasa, contacto.colonia]);
		const phone_numer = await conexion.query('INSERT INTO phone_numers SET Numero1 = ?, Numero2 = ?', [contacto.numero1, contacto.numero2]);

		await conexion.query('INSERT INTO distributors SET Fecha_R = now(), persons_id = ?,addresses_id = ?, phone_numers_id = ?', [person.insertId, address.insertId, phone_numer.insertId]);

	} catch (error) {
		console.log(error);
		return error
	};

	return true;
}

Distribudores.mostrarTodos = async function mostrarTodos(){
    var sqlConsulta = `SELECT distributors.id_, addresses.Calle, addresses.Num_Casa, addresses.Colonia, persons.Nombre1, persons.Apellido_P, persons.Apellido_M, phone_numers.Numero1, phone_numers.Numero2 FROM distributors 
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
    var sqlConsulta = `SELECT distributors.id_, addresses.Calle, addresses.Num_Casa, addresses.Colonia, persons.Nombre1, persons.Apellido_P, persons.Apellido_M, phone_numers.Numero1, phone_numers.Numero2 FROM distributors 
	inner join addresses on distributors.addresses_id = addresses.id_ 
	inner join persons on distributors.persons_id = persons.id_
	inner join phone_numers on distributors.phone_numers_id = phone_numers.id_
	WHERE distributors.id_ = ?`;
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
	const distributor = await conexion.query('SELECT * FROM distributors WHERE id_ = ?', id);

	if (!distributor || !distributor[0]) return [];

	try {
		await conexion.query('DELETE FROM persons WHERE id_ = ?', [distributor[0].persons_id]);
		await conexion.query('DELETE FROM addresses WHERE id_ = ?', [distributor[0].addresses_id]);
		await conexion.query('DELETE FROM phone_numers WHERE id_ = ?', [distributor[0].phone_numers_id]);

		await conexion.query('DELETE FROM distributors WHERE id_ = ?', [ distributor[0].id_]);
	} catch (error) {
		console.log(error);
		return error;
	}

	return true;
}

Distribudores.actualizar = async function actualizar(contacto){

	const distributor = await conexion.query('SELECT * FROM distributors WHERE id_ = ?', contacto.idDistribudor);

	console.log(distributor);

	if (!distributor || !distributor[0]) return [];


	try {
		await conexion.query('UPDATE persons SET Nombre1 = ?, Apellido_P = ?, Apellido_M = ? WHERE id_ = ?', [contacto.nombre, contacto.Apellido_P, contacto.Apellido_M, distributor[0].persons_id]);
		await conexion.query('UPDATE addresses SET Calle = ?, Num_Casa = ?, Colonia = ? WHERE id_ = ?', [contacto.calle, contacto.numcasa, contacto.colonia, distributor[0].addresses_id]);
		await conexion.query('UPDATE phone_numers SET Numero1 = ?, Numero2 = ? WHERE id_ = ?', [contacto.numero1, contacto.numero2, distributor[0].phone_numers_id]);
	} catch (error) {
		console.log(error);
		return error;
	}

	return true;
}

module.exports = {Contactos: Distribudores}