const _ModalDescription = () => {
    return (
        <div className="px-20 py-2">
            <div className="mx-auto text-3xl text-center text-morado font-bold opacity-80">
                Nota importante
            </div>
            <div>
                <ul className="list-disc text-primario font-bold opacity-50">
                    <li >
                        El archivo de Google Drive debe ser un Excel
                    </li>
                    <li>
                        Debe contar con los permisos de escritura y lectura solo con el link
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default _ModalDescription