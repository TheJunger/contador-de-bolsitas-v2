import React from "react";
import { useState, useEffect } from "react";
import "./OpenLabelBolsones.css"

const OpenLabelBolsones = ({setShowLabelBolsones, bolsonId, tipoCambio, fetchData, token, dueñoBolson}) =>{

    const [dataEditBolsones, setDataEditBolsones] = useState([]);
    const [total, setTotal] = useState(0);
    const [remanentes, setRemanentes] = useState(0);

    useEffect(() => {
        fetch(`https://thejunger.pythonanywhere.com/api/get-specific-data-bolsones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bolsonId: bolsonId }),
        })
          .then((response) => response.json())
          .then((data) => {
            setDataEditBolsones(data);
            if (data.length > 0) {
              setTotal(data[0].Cantidad);
              setRemanentes(data[0].Remanentes);
            }
          });
      }, [bolsonId, token]);

    const handleSaveBolsones = async (e) =>{
        e.preventDefault();
    
        const response = await fetch("https://thejunger.pythonanywhere.com/api/save-data-bolsones", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bolsonId: bolsonId,
            nuevoValorTotal: total,
            nuevoValorRemanentes: remanentes,
          }),
        });
    
        if (response.ok) {
          setShowLabelBolsones(false);
          fetchData();
        } else {
          alert("Ha sucedido un problema durante el guardado");
        }
    }

    const handleChange = (amount)=>{
        if(tipoCambio == 'total'){
            setTotal(total + amount)
        }
        else if(tipoCambio == "remanentes"){
            setRemanentes(remanentes + amount)
        }
    }

    const handleMainValue = (e)=>{
        const newValue = parseInt(e.target.value)
        if (isNaN(newValue)) {
          if (tipoCambio === "total") {
              setTotal(0);
          } else if (tipoCambio === "remanentes") {
              setRemanentes(0);
          }
        }
        else{
          if(tipoCambio == 'total'){
            setTotal(newValue)
          } else if (tipoCambio == "remanentes"){
            setRemanentes(newValue)
          }
        }
    }

    const handleCancel = () => {
      setShowLabelBolsones(false);
    };

    return(
        <form className="labelContBolsones" onSubmit={handleSaveBolsones}>
            <div className="fondoDifuminadoBolsones"></div>

            <div className="labelGetBolsonesContainer">
                {dataEditBolsones.length > 0 ? (
                    <div className="labelEditTitle">
                        Estas editando {tipoCambio} de {dataEditBolsones[0].Grosor} de {dueñoBolson}
                    </div>
                ):(
                    "Cargando..."
                )}

                <div className="helpLabelBolsones">
                    <div title="Total">
                        T: {dataEditBolsones.length > 0 ?
                        dataEditBolsones[0].Cantidad:
                        "Cargando..."}
                    </div>
                    <div title="Remanentes">
                        R: {dataEditBolsones.length > 0 ?
                        dataEditBolsones[0].Remanentes:
                        "Cargando"}
                    </div>
                </div>

                <div className="buttonsNumberLabelBolsones">
                    <div onClick={()=>{handleChange(-100)}}>-100</div>
                    <div onClick={()=>{handleChange(-50)}}>-50</div>
                    <div onClick={()=>{handleChange(-35)}}>-35</div>
                    <input
                        type="number"
                        onChange={handleMainValue}
                        value={tipoCambio == 'remanentes' ? remanentes : total}
                        className="inputLabelBolsonesCont"
                        placeholder={tipoCambio == "remanentes"? remanentes : total}
                    />
                    <div onClick={()=>{handleChange(+35)}}>+35</div>
                    <div onClick={()=>{handleChange(+50)}}>+50</div>
                    <div onClick={()=>{handleChange(+100)}}>+100</div>
                </div>
                <div className="buttonsBolsonesSaveLabel">
                    <button onClick={handleCancel} className="cancelButtonLabelBolson">Cancelar</button>
                    <button type="submit">Guardar</button>
                </div>



            </div>

        </form>
    )

}

export {OpenLabelBolsones}