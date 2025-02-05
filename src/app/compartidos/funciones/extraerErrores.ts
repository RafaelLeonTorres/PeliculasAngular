export function extraerErrores(obj: any): string[]{
    const err = obj.error.errors;

    let mensajesErrores: string[] = [];

    for(let llave in err){
        let campo = llave;
        const mensajesConCampos = err[llave].map((mensaje: string) => `${campo}: ${mensaje}`);
        mensajesErrores = mensajesErrores.concat(mensajesConCampos);
    }

    return mensajesErrores;
}