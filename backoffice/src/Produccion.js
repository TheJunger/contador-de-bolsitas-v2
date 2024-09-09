import { useState, useEffect } from "react"
import React from "react"
import './Produccion.css'
import { OpenLabelAddProduccion } from "./OpenLabelAddProduccion"
import { OpenLabelEditProduccion } from "./OpenLabelEditProduccion"
import { OpenLabelRemoveProduccion } from "./OpenLabelRemoveProduccion"

const Produccion = ({token})=>{

    const [dataProduccion, setDataProduccion] = useState([])
    const [showLabelCreate, setShowLabelCreate] = useState(false)
    const [showLabelEdit, setShowLabelEdit] = useState(false)
    const [produccionID, setProduccionID] = useState(null)
    const [showLabelDelete, setShowLabelDelete] = useState(false)

    const fetchData = async () =>{
        try{
            const response = await fetch('https://thejunger.pythonanywhere.com/api/get-data-produccion', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await response.json()
            setDataProduccion(data);
        }
        catch (error){
            console.log('Error fetching data: ', error)
        }
    }

    useEffect(()=>{
        if(token){
            fetchData();
        }
    },[token])

    const handleEdit = (id)=>{
        setProduccionID(id)
        setShowLabelEdit(true)
    }

    const handleRemove = (id)=>{
        setProduccionID(id)
        setShowLabelDelete(true)
    }

    return(
        <div>
            <div className="gridProduccionContainer">
                <div className="headerProduccion produccionFecha">Fecha</div>
                <div className="headerProduccion produccionDueño">Dueño</div>
                <div className="headerProduccion produccionGrosor">Grosor</div>
                <div className="headerProduccion produccionColor">Color</div>
                <div className="headerProduccion produccionCantidad cantidadmobile">Cantidad</div>
                <div className="headerProduccion produccionAñadir" onClick={()=>{setShowLabelCreate(true)}}><i class="fa-solid fa-plus add"></i></div>
                {dataProduccion.length > 0 ? dataProduccion.map((produccion)=>(
                    <React.Fragment key={produccion.ID}>
                        <div>{produccion.Fecha}</div>
                        <div>{produccion.Dueño}</div>
                        <div>N° {produccion.Grosor}</div>
                        <div>{produccion.Color}</div>
                        <div className="cantidadmobile">{produccion.Cantidad}</div>
                        <div className="iconsProduccion">
                            <div onClick={()=>{handleEdit(produccion.ID)}}><i class="fa-solid fa-pencil pencil"></i></div>
                            <div onClick={()=>{handleRemove(produccion.ID)}}><i class="fa-solid fa-trash trash"></i></div>
                        </div>
                    </React.Fragment>
                )): 'Cargando...'}
            </div>
            {showLabelCreate ?<OpenLabelAddProduccion setShowLabelCreate={setShowLabelCreate} fetchData={fetchData} token={token} /> : null}
            {showLabelEdit? <OpenLabelEditProduccion setShowLabelEdit={setShowLabelEdit} fetchData={fetchData} token={token} produccionID={produccionID}/>: null}
            {showLabelDelete? <OpenLabelRemoveProduccion setShowLabelDelete={setShowLabelDelete} fetchData={fetchData} token={token} produccionID={produccionID}/>: null}
        </div>
    )
}

export {Produccion}