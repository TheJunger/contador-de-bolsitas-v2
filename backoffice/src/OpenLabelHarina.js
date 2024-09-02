import React from "react";
import { useEffect, useState } from "react";
import "./OpenLabelHarina.css";

const OpenLabelHarina = ({
  setShowLabelEditHarina,
  harinaid,
  tipoHarina,
  fetchData,
  token,
}) => {
  const [dataEditBolsas, setDataEditBolsas] = useState([]);
  const [total, setTotal] = useState(0);
  const [usadas, setUsadas] = useState(0);
  const [restantes, setRestantes] = useState(0);

  useEffect(() => {
    fetch(`http://192.168.100.9:5050/api/get-specific-data-bolsas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ harinaid: harinaid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataEditBolsas(data);
        if (data.length > 0) {
          setTotal(parseInt(data[0].Total));
          setUsadas(parseInt(data[0].Usadas));
          setRestantes(parseInt(data[0].Restantes));
        }
      });
  }, [harinaid, token]);

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await fetch("http://192.168.100.9:5050/api/save-data-bolsas", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bolsaid: harinaid,
        nuevoValorTotal: total,
        nuevoValorUsadas: usadas,
        nuevoValorRestanes: restantes,
      }),
    });

    if (response.ok) {
      setShowLabelEditHarina(false);
      fetchData();
    } else {
      alert("Ha sucedido un problema durante el guardado");
    }
  };

  const handleChange = (e) => {
    //500 21 > 23 = r
    // t - u = r
    // 500 - 23 = r
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      if (tipoHarina === "total") {
          setTotal(0);
      } else if (tipoHarina == "usadas") {
          setRestantes(0);
          //check
      }
    }
    else {
      if (tipoHarina == "total") {
        setTotal(newValue);
        setRestantes(newValue - usadas);
      } else if (tipoHarina == "usadas") {
        setUsadas(newValue);
        setRestantes(total - newValue);
      }
    }
  };

  const adjustValue = (amount) => {
    //total - usadas = restantes
    if (tipoHarina == "total") {
      const newTotal = total + amount;
      setTotal(newTotal);
      setRestantes(newTotal - restantes);
    } else if (tipoHarina == "usadas") {
      const newUsadas = usadas + amount;
      const newRestantes = total - newUsadas;
      setUsadas(newUsadas);
      setRestantes(newRestantes);
    }
  };

  const handleCancel = () => {
    setShowLabelEditHarina(false);
  };

  return (
    <form className="labelContHarina" onSubmit={handleSave}>
      <div className="fondoDifuminadoHarina"></div>

      <div className="labelGetBolsasContainer">
        {dataEditBolsas.length > 0 ? (
          <div className="labelEditTitle">
            Estas editando {tipoHarina} de {dataEditBolsas[0].Dueño}
          </div>
        ) : (
          "Cargando..."
        )}

        <div className="helpLabelHarina">
          <div title="Total">
            T:{" "}
            {dataEditBolsas.length > 0
              ? dataEditBolsas[0].Total
              : "Cargando..."}
          </div>
          <div title="Usadas">
            U:{" "}
            {dataEditBolsas.length > 0
              ? dataEditBolsas[0].Usadas
              : "Cargando..."}
          </div>
          <div title="Restantes">
            R:{" "}
            {dataEditBolsas.length > 0
              ? dataEditBolsas[0].Restantes
              : "Cargando..."}
          </div>
        </div>

        <div className="buttonsNumberLabelHarina">
          <div onClick={() => adjustValue(-24)}>-24</div>
          <div onClick={() => adjustValue(-21)}>-21</div>
          <div onClick={() => adjustValue(-18)}>-18</div>
          <input
            type="number"
            onChange={handleChange}
            value={tipoHarina == "total" ? total : usadas}
            className="inputLabelHarinaCont"
            placeholder={tipoHarina == "total" ? total : usadas}
          />
          <div onClick={() => adjustValue(+18)}>+18</div>
          <div onClick={() => adjustValue(+21)}>+21</div>
          <div onClick={() => adjustValue(+24)}>+24</div>
        </div>
        <div className="buttonsHarinaSaveLabel">
          <button className="cancelButtonLabelHarina" onClick={handleCancel}>Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </div>
    </form>
  );
};

export { OpenLabelHarina };
