export function validar(input){
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHtml = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHtml = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError'
]

const mensajesError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'Su contraseña no es valida'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes ser mayor de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'La Direccion deve contener entre 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'La Ciudad deve contener entre 10 a 40 caracteres'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'El Estado deve contener entre 10 a 40 caracteres'
    },
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje = mensajesError[tipoDeInput][error];
        }
    });
    
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';

    if(!mayorEdad(fechaCliente)){
        mensaje = 'Debes ser mayor de edad';
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}