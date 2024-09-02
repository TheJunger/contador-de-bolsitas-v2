import React from "react";
import { useState } from "react";
import "./Navbar.css"

const Navbar = ({setShowBolsitas, setShowBolsones, setShowBolsonesHarina, setShowMain, setShowInventario, setShowHistorial}) =>{

    const [activeBolsitas, setActiveBolsitas] = useState(false)
    const [activeBolsones, setActiveBolsones] = useState(false)
    const [activeBolsasHarina, setActiveBolsonesHarina] = useState(false)
    const [activeInventario, setActiveInventario] = useState(false)
    const [activeMain, setActiveMain] = useState(true)
    const [activeHistorial, setActiveHistorial] = useState(false)
    const [title, setTitle] = useState('Bienvenido')
    const [isMenuActive, setIsMenuActive] = useState(false)

    const handleShow = (type)=>{
        setShowMain(false)
        setActiveMain(false)
        setActiveBolsitas(false); 
        setActiveBolsones(false); 
        setActiveBolsonesHarina(false); 
        setShowBolsitas(false); 
        setShowBolsones(false); 
        setShowBolsonesHarina(false);
        setTitle('')
        setActiveInventario(false)
        setShowInventario(false)
        setShowHistorial(false)
        setActiveHistorial(false)
        setIsMenuActive(false)

        if (type == "main") {
            setShowMain(true) 
            setActiveMain(true)
            setTitle('Bienvenido')
        }

        if (type == "bolsitas") {
            setActiveBolsitas(true); 
            setShowBolsitas(true); 
            setTitle('Estas editando Bolsitas')
        }

        if (type == "bolsones") {
            setActiveBolsones(true);
            setShowBolsones(true);
            setTitle('Estas editando Bolsones')
        }

        if (type == "bolsas") {
            setActiveBolsonesHarina(true);
            setShowBolsonesHarina(true);
            setTitle('Estas editando Bolsas')
        }
        if (type == "inventario") {
            setActiveInventario(true)
            setShowInventario(true)
            setTitle('Estas editando Inventario')
        }
        if (type == "historial") {
            setShowHistorial(true)
            setActiveHistorial(true)
            setTitle('Estas viendo Historial')
        }

    }

    return(
        <div className="navbarcontainer">
            <div className="navbarup">
                <div onClick={()=>{handleShow("main")}} className="navbarupdiv navbarupLogo">Logo</div>
                <div className="navbarupdiv navbarupTitle">{title}</div>
                <div className="navbarupdiv navbarupLogout">Cerrar sesion</div>
                <div onClick={()=>{setIsMenuActive(!isMenuActive)}} className="navbarupdiv navbarupMenu">Barras</div>
            </div>

            <div className={isMenuActive == true ? "navbardownmobile show" : "navbardownmobile nonshow"} /*style={{ display: isMenuActive ? "block" : "none" }}*/>
            <div onClick={()=>{setIsMenuActive(false)}} className="fondoDifuminadoMobile"></div>
                <div onClick={()=>{handleShow("bolsitas")}} className={activeBolsitas == true ? "navbardowndivMobile navbardownBolsitasMobile active" : "navbardowndivMobile navbardownBolsitasMobile"}>Bolsitas</div>
                <div onClick={()=>{handleShow("bolsas")}} className={activeBolsasHarina == true ? "navbardowndivMobile navbardownHarinaMobile active" : "navbardowndivMobile navbardownHarinaMobile"}>Bolsas de harina</div>
                <div onClick={()=>{handleShow("bolsones")}} className={activeBolsones == true ? "navbardowndivMobile navbardownBolsonesMobile active" : "navbardowndivMobile navbardownBolsonesMobile"}>Bolsones hechos</div>
                <div onClick={()=>{handleShow("inventario")}} className={activeInventario == true ? "navbardowndivMobile navbardownInventarioMobile active" : "navbardowndivMobile navbardownInventarioMobile"}>Inventario</div>
                <div onClick={()=>{handleShow("historial")}} className={activeHistorial == true ? "navbardowndivMobile navbardownHistorialMobile active" : "navbardowndivMobile navbardownHistorialMobile"}>Historial</div>
                <div className="navbardowndivMobile navbarupLogoutMobile">Cerrar sesion</div>
            </div>

            <div className="navbardown">
                <div onClick={()=>{handleShow("bolsitas")}} className={activeBolsitas == true ? "navbardowndiv navbardownBolsitas active" : "navbardowndiv navbardownBolsitas"}>Bolsitas</div>
                <div onClick={()=>{handleShow("bolsas")}} className={activeBolsasHarina == true ? "navbardowndiv navbardownHarina active" : "navbardowndiv navbardownHarina"}>Bolsas de harina</div>
                <div onClick={()=>{handleShow("bolsones")}} className={activeBolsones == true ? "navbardowndiv navbardownBolsones active" : "navbardowndiv navbardownBolsones"}>Bolsones hechos</div>
                <div onClick={()=>{handleShow("inventario")}} className={activeInventario == true ? "navbardowndiv navbardownInventario active" : "navbardowndiv navbardownInventario"}>Inventario</div>
                <div onClick={()=>{handleShow("historial")}} className={activeHistorial == true ? "navbardowndiv navbardownHistorial active" : "navbardowndiv navbardownHistorial"}>Historial</div>
            </div>
        </div>
    )

}

export {Navbar}