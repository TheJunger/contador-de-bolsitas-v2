import React from "react";
import "./BolsasHarina.css"
import { useEffect, useState } from "react";
import { OpenLabelHarina } from "./OpenLabelHarina";


const BolsasHarina = ({token}) =>{

    const [dataBolsas, setDataBolsas] = useState([])
    const [showLabelEditHarina, setShowLabelEditHarina] = useState(false);
    const [harinaid, setHarinaID] = useState(null);
    const [tipoHarina, setTipoHarina] = useState('ninguno');

    const fetchData = async () => {
        try {
          const response = await fetch('http://192.168.100.9:5050/api/get-data-bolsas', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setDataBolsas(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        if (token) {
          fetchData();
        }
      }, [token]);

      const handleClick = (id, tipo) =>{
        setShowLabelEditHarina(true);
        setHarinaID(id);
        setTipoHarina(tipo);
      }

    return(
        <div className="bolsasHarinaContainer">
                <div className="BHC bolsascontainertitle">Harina</div>
                <div className="BHC bolsascontainertotal">Total</div>
                <div className="BHC bolsascontainerusadas">Usadas</div>
                <div className="BHC bolsascontainerrestantes">Restantes</div>
                <div className="BHC bolsascontainervazquez">Vazquez</div>
                <div className="BHC bolsascontainerosvaldo">Osvaldo</div>
                {dataBolsas.length > 0 ? dataBolsas.map((bolsas)=>(
                  <React.Fragment key={bolsas.ID}>
                    <div onClick={()=>{handleClick(bolsas.ID, "total")}} className={"BHC bolsas" + bolsas.Dueño + " bolsasContent bolsasTotal"+ bolsas.Dueño}>{bolsas.Total}</div>
                    <div onClick={()=>{handleClick(bolsas.ID, "usadas")}} className={"BHC bolsas" + bolsas.Dueño + " bolsasContent bolsasUsadas"+ bolsas.Dueño}>{bolsas.Usadas}</div>
                    <div className={"BHC bolsas" + bolsas.Dueño + " bolsasContent bolsasRestantes"+ bolsas.Dueño}>{bolsas.Restantes}</div>
                  </React.Fragment>
                )): "Cargando"}
                {showLabelEditHarina ? <OpenLabelHarina setShowLabelEditHarina={setShowLabelEditHarina} harinaid={harinaid} tipoHarina={tipoHarina} fetchData={fetchData} token={token} /> : null}
        </div>
    )

}

export {BolsasHarina}