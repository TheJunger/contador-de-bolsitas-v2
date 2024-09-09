import { useState, useEffect } from "react"
import './OpenLabelAddProduccion.css'

const OpenLabelAddProduccion = ({setShowLabelCreate, fetchData, token}) =>{

    const [fecha, setFecha] = useState('00/00/00')
    const [dueño, setDueño] = useState('Osvaldo')
    const [grosor, setGrosor] = useState(1)
    const [color, setColor] = useState('Amarillo')
    const [cantidad, setCantidad] = useState(7)

    const handleSave = async (e)=>{
        e.preventDefault()
        console.log(fecha,dueño,grosor,color,cantidad)
        const response = await fetch('https://thejunger.pythonanywhere.com/api/add-data-produccion', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },    
          body: JSON.stringify({
            fecha: fecha,
            dueño: dueño,
            grosor: grosor,
            color: color,
            cantidad: cantidad,
          }),
        })

        if (response.ok){
            setShowLabelCreate(false)
            fetchData()
        }
        else{
            alert('Ha sucedio un problema durante la creacion')
        }
    }

    return(
        <div className="labelProdAddCont">
        <div className="fondodifuminado"></div>
        <form onSubmit={handleSave} className="formContProdAdd">
            <div>Estas por añadir una nueva produccion</div>
            <div>
                <div>Fecha</div>
                <input type="text" value={fecha} placeholder="DD/MM/AA" onChange={(e)=> setFecha(e.target.value)}/>
            </div>
            <div>
                <div>Dueño</div>
                <select value={dueño} onChange={(e)=> setDueño(e.target.value)}>
                    <option value="Osvaldo">Osvaldo</option>
                    <option value="Vazquez">Vazquez</option>
                </select>
            </div>
            <div>
                <div>Grosor (Numero)</div>
                <select value={grosor} onChange={ (e) => setGrosor(e.target.value)}>
                    <option value="grosorUno">1</option>
                    <option value="grosorDos">2</option>
                    <option value="grosorTres">3</option>
                    <option value="grosorCuatro">4</option>
                </select>
            </div>
            <div>
                <div>Color</div>
                <select value={color} onChange={ (e) => setColor(e.target.value)}>
                    <option value="Amarillo">Amarillo</option>
                    <option value="Verde">Verde</option>
                    <option value="Rojo">Rojo</option>
                </select>
            </div>
            <div>
                <div>Cantidad</div>
                <input type="number" value={cantidad} onChange={(e)=> setCantidad(e.target.value)}/>
            </div>
            <div className="buttonsBolsonesSaveLabel">
                <button type="button" className="cancelButtonProdLabel" onClick={()=>{setShowLabelCreate(false)}}>Cancelar</button>
                <button type="submit" >Añadir</button>
            </div>
        </form>
        </div>
    )
}

export {OpenLabelAddProduccion}