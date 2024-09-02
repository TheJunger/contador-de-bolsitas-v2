import React from "react";
import { useState, useEffect } from "react";
import "./BolsonesDeposito.css"
import { OpenLabelBolsones } from "./OpenLabelBolsones";

const BolsonesDeposito = ({token})=>{

    const [dataBolsones, setDataBolsones] = useState([])
    const [showLabelBolsones, setShowLabelBolsones] = useState(false)
    const [bolsonId, setBolsonId] = useState(null)
    const [dueñoBolson, setDueñoBolson] = useState("")
    const [tipoCambio, setTipoCambio] = useState("")

    const fetchData = async () =>{
        try{
            const response = await fetch('https://thejunger.pythonanywhere.com/api/get-data-bolsones', {
                method: "GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json()
            setDataBolsones(data);
        }
        catch(error){
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (token) {
          fetchData();
        }
      }, [token]);

    const handleClick = (id, tipo, cambio) => {
        setShowLabelBolsones(true);
        setBolsonId(id);
        setDueñoBolson(tipo);
        setTipoCambio(cambio)
    };

    return(
        <>
        <div className="gridBolsitasContainer">
            <div className='gBCUpTable gBCTitle'>Bolsones</div>
            <div className='gBCUpTable gBCOsvaldo'>Osvaldo</div>
            <div className='gBCUpTable gBCVazquez'>Vazquez</div>
            <div className='gBCUpTable gBCORemanentes'>Remanentes</div>
            <div className='gBCUpTable gBCOTotal'>Total</div>
            <div className='gBCUpTable gBCVRemantentes'>Remanentes</div>
            <div className='gBCUpTable gBCVTotal'>Total</div>
            <div className='gBCleftTable gBCTallarin'>N1 / Tallarin</div>
            <div className='gBCleftTable gBCCinta'>N2 / Cinta</div>
            <div className='gBCleftTable gBCCintaVerde'>N2 / Cinta (Verde)</div>
            <div className='gBCleftTable gBCCintaRoja'>N2 / Cinta (Roja)</div>
            <div className='gBCleftTable gBCAncha'>N3 / Cinta Ancha</div>
            <div className='gBCleftTable gBCAnchaVerde'>N3 / Cinta Ancha (Verde)</div>
            <div className='gBCleftTable gBCAnchaRoja'>N3 / Cinta Ancha (Roja)</div>
            <div className='gBCleftTable gBCPappardelle'>N4 / Papardelle</div>
            {dataBolsones.length > 0 ? dataBolsones.map((bolsones)=>(
                <React.Fragment key={bolsones.ID}>
                    <div onClick={()=>{handleClick(bolsones.ID, bolsones.Dueño, "total")}} className={"bolsones bolson"+bolsones.Grosor+bolsones.Dueño + " bolsonCantidad"+bolsones.Grosor+bolsones.Dueño + " bolsones"+ bolsones.Grosor}>{bolsones.Cantidad}</div>
                    <div onClick={()=>{handleClick(bolsones.ID, bolsones.Dueño, "remanentes")}} className={"bolsones bolson"+bolsones.Grosor+bolsones.Dueño + " bolsonRemanentes"+bolsones.Grosor+bolsones.Dueño  + " bolsones"+ bolsones.Grosor}>{bolsones.Remanentes}</div>
                </React.Fragment>
            )): "Cargando"}
            {showLabelBolsones ? <OpenLabelBolsones setShowLabelBolsones={setShowLabelBolsones} bolsonId={bolsonId} tipoCambio={tipoCambio} fetchData={fetchData} token={token} dueñoBolson={dueñoBolson}/> : null}
        </div>

        </>
    )
}

export {BolsonesDeposito}