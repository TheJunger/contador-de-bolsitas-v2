import { useState, useEffect } from "react"

const OpenLabelRemoveProduccion = ({setShowLabelDelete, fetchData, token, produccionID})=>{

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
        const response = await fetch('https://thejunger.pythonanywhere.com/api/remove-data-produccion',{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                produccionID: produccionID,
            })
        })

        if(response.ok){
            setShowLabelDelete(false)
            fetchData()
        }
        else{
            alert('Ha sucedio un problema durante la eliminacion')
        }
    }

    return (
        <div className="labelProdAddCont">
        <div className="fondodifuminado"></div>
        <form className="formContProdAdd FCPD" onSubmit={handleSave}>
            <div>Estas por borrar Produccion para {dueño} N:{grosor} {color} {cantidad} del {fecha}</div>
            <div className="buttonsBolsonesSaveLabel">
                <button onClick={()=>{setShowLabelDelete(false)}} type="button" className="cancelButtonProdLabel" >Cancelar</button>
                 <button type="submit" >Añadir</button>
            </div>
        </form>
       </div>
    )
}

export {OpenLabelRemoveProduccion}