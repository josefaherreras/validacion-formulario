const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //un arreglo de todos los inputs
//OBJETO expresiones
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

//objeto con los valores en false , estos valores representan si estos valores son validos o no.
const campos = {
	usuario : false,
	nombre : false,
	password : false,
	correo : false,
	telefono : false

}

//validación de campos
const validarFormulario = (e) =>{
	
	switch(e.target.name){
		/*validación de usuario*/
		case "usuario":
			validarCampo(expresiones.usuario,e.target, 'usuario');
		break;
		/*validación de nombre*/
		case "nombre":
			validarCampo(expresiones.nombre,e.target, 'nombre');
		break;
		/*validación de contraseña*/
		case "password":
			validarCampo(expresiones.password,e.target, 'password');
			validarPassword2();
		break;
		/*validación de contraseña2*/
		case "password2":
			validarPassword2();
		break;
		/*validación de correo*/
		case "correo":
			validarCampo(expresiones.correo,e.target, 'correo');
		break;
		/*validación de teléfono*/
		case "telefono":
			validarCampo(expresiones.telefono,e.target, 'telefono');
		break;
	}

}

const validarCampo = (expresion,input,campo) =>{
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');	
		campos[campo]= true; //expresión valida
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo]= false; //expresión invalida	
	}
}

const validarPassword2 = ()=>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password']= false; //expresión invalida
	}else{
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password']= true; //expresión valida
	}

}
//por cada input se ejecute este codigo
//la función se ejecutará por cada input que nosotros tengamos en nuestra pagina
inputs.forEach((input) => {
	//por cada input
	//comprobación de campos 
	input.addEventListener('keyup', validarFormulario); //levantar la tecla
	input.addEventListener('blur', validarFormulario);//clic a fuera del campo
});

//validación que todos los campos estén llenos y poder enviar 
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		//setTimeout -> que desaparezca el mensaje despues de 5 segundos
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);
		
		//remover todos los iconos 
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});