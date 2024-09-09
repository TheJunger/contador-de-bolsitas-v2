import { useState, useEffect } from "react"

const OpenLabelEditProduccion = ({setShowLabelEdit, fetchData, token, produccionID})=>{

    const [fecha, setFecha] = useState('')
    const [dueño, setDueño] = useState('Osvaldo')
    const [grosor, setGrosor] = useState(1)
    const [color, setColor] = useState('Amarillo')
    const [cantidad, setCantidad] = useState(7)

    useEffect(()=>{
        fetch('https://thejunger.pythonanywhere.com/api/get-specific-data-produccion',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ produccionID: produccionID })
        })
        .then(response => response.json())
        .then(data=>{
            setFecha(data[0].Fecha)
            setDueño(data[0].Dueño)
            setGrosor(data[0].Grosor)
            setColor(data[0].Color)
            setCantidad(data[0].Cantidad)
        })
    },[produccionID, token])

    const handleSave = async (e)=>{
        e.preventDefault();
        const response = await fetch('https://thejunger.pythonanywhere.com/api/edit-data-produccion',{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                produccionID: produccionID,
                fecha: fecha,
                dueño: dueño,
                grosor: grosor,
                color: color,
                cantidad: cantidad
            })
        })

        if(response.ok){
            setShowLabelEdit(false)
            fetchData()
        }
        else{
            alert('Ha sucedio un problema durante la edicion')
        }
    }

    return (
        <div className="labelProdAddCont">
        <div className="fondodifuminado"></div>
        <form className="formContProdAdd" onSubmit={handleSave}>
            <div>Estas por editar {fecha} {dueño} {color}</div>
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
                <button onClick={()=>{setShowLabelEdit(false)}} type="button" className="cancelButtonProdLabel" >Cancelar</button>
                 <button type="submit" >Añadir</button>
            </div>
        </form>
       </div>
    )
}

export {OpenLabelEditProduccion}