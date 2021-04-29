import React from 'react'

export class Lista extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Listado: [],
            puesto: '',
            empresa: '',
            ciudad: '',
            pais: ''
        }
    }

    Entrada(cambio){
        if (cambio.target.id === 'puesto'){
            this.setState({
                puesto: cambio.target.value
            })
        }
        else if (cambio.target.id === 'empresa'){
            this.setState({
                empresa: cambio.target.value
            })
        }
        else if (cambio.target.id === 'ciudad'){
            this.setState({
                ciudad: cambio.target.value
            })
        }
        else if (cambio.target.id === 'pais'){
            this.setState({
                pais: cambio.target.value
            })
        }
    }

    Agregar(){
        if ( this.state.puesto === '' || this.state.empresa === '' || this.state.ciudad === '' || this.state.pais === '' ){
            alert("Existen campos vacíos.");
        }
        else{
            this.setState({
                Listado: [...this.state.Listado, `${this.state.puesto} - ${this.state.empresa} - ${this.state.ciudad} - ${this.state.pais}`],
                puesto: '',
                empresa: '',
                ciudad: '',
                pais: ''
            })
        }
    }

    Eliminar(){
        var indice = document.getElementById("indice").value - 1
        if (-1 < indice && indice < this.state.Listado.length){
            var listaNueva = this.state.Listado
            listaNueva.splice(indice, 1)
            this.setState({
                Listado: listaNueva
            })
        }
        else{
            alert("El índice no existe.")
        }
    }

    render(){
        return(
            <div className="contenedor">
                <div className="formulario">
                    <h1>POSICIONES LABORALES</h1>
                    <hr></hr>
                    <input type="text" onChange={(cambio) => this.Entrada(cambio)} id="puesto" value={this.state.puesto} className="input" placeholder="- NOMBRE DEL PUESTO -"/><br></br>
                    <input type="text" onChange={(cambio) => this.Entrada(cambio)} id="empresa" value={this.state.empresa} className="input" placeholder="- NOMBRE DE LA EMPRESA -" /><br></br>
                    <input type="text" onChange={(cambio) => this.Entrada(cambio)} id="ciudad" value={this.state.ciudad} className="input" placeholder="- CIUDAD -" /><br></br>
                    <input type="text" onChange={(cambio) => this.Entrada(cambio)} id="pais" value={this.state.pais} className="input" placeholder="- PAÍS -" /><br></br>
                    <button onClick={() => this.Agregar()} className="boton" >AGREGAR</button>
                    <hr></hr>
                    <input type="text" id="indice" className="indice" placeholder="- ÍNDICE -"/><br></br>
                    <button onClick={() => this.Eliminar()} className="boton" >ELIMINAR</button>
                </div>
                <div className="lista">
                    <h1>LISTADO</h1>
                    <ul>
                        {this.state.Listado.map((item, index) => {return( <li key={index} className="elemento" >{index+1} - {item}</li> )})}
                    </ul>
                </div>
            </div>
        );
    }
}