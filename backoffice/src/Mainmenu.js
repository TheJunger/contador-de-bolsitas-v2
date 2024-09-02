import React from "react";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { Bolsitas } from "./Bolsitas";
import { useState } from "react";
import "./Mainmenu.css"
import { BolsasHarina } from "./BolsasHarina";
import { BolsonesDeposito } from "./BolsonesDeposito";

const MainMenu = ({token}) =>{

    const [showBolsitas, setShowBolsitas] = useState(false)
    const [showBolsones, setShowBolsones] = useState(false)
    const [showBolsasHarina, setShowBolsonesHarina] = useState(false)
    const [showInventario, setShowInventario] = useState(false)
    const [showHistorial, setShowHistorial] = useState(false)
    const [showMain, setShowMain] = useState(true)

    return(
        <>
            <Navbar setShowBolsitas={setShowBolsitas} setShowBolsones={setShowBolsones} setShowBolsonesHarina={setShowBolsonesHarina} setShowMain={setShowMain} setShowInventario={setShowInventario} setShowHistorial={setShowHistorial}/>
            <div className="mainmenucontainer">
            {showBolsitas == true ?
            <Bolsitas token={token}/> :
            showBolsones == true ?
            <BolsonesDeposito token={token}/> :
            showBolsasHarina == true ? 
            <BolsasHarina token={token}/> :
            showMain == true ?
            <Main/> :
            showInventario == true?
            "inventario" :
            showHistorial == true?
            "historial" :
            null
            }
            
        </div>
        </>

    )

}

export {MainMenu}