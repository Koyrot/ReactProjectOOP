import React , {useState} from 'react'
import Button from 'react-bootstrap/Button';
import {compile} from 'mathjs'
import axios from 'axios'

function FalsePosition(){

    const [XL,setXl] = useState()
    const [XR,setXr] = useState()
    const [X1,setAns] = useState()
    const [EQ,setEquation] = useState()

    const InputEquation = (e) =>{
        var eq = e.target.value
        setEquation(eq)
    }

    const InputVal1 = (e) =>{
        var xl = Number(e.target.value)
        setXl(xl)
    }

    const InputVal2 = (e) =>{
        var xr = Number(e.target.value)
        setXr(xr)
    }

    const Calculate = () =>{
        var x1 = 0,err = 1,xOld=0,fx1=0,fxL=0,fxR=0,xr = XR,xl=XL

        while(err > 0.000001){
            xOld = x1

            let scopeXR = {x: xr}
            let scopeXL = {x: xl}
            const Equation = compile(EQ)
            fxR = Equation.evaluate(scopeXR)
            fxL = Equation.evaluate(scopeXL)
            console.log(fxR)
            console.log(fxL)

            x1 = ((xl*fxR)-(xr*fxL))/(fxR-fxL)
            let scopeX1 = {x: x1}
            fx1 = Equation.evaluate(scopeX1) 

            if(fx1*fxR > 0){xr = x1}
            else if(fx1*fxR < 0){xl = x1}

            err = Math.abs((x1-xOld)/x1)*100

        }
        console.log(x1)

        setAns(x1)
    }

    const API = () =>{
        axios.get('http://localhost:3500/FalsePosition').then(res=>{
            console.log(res)
            const data = res.data
            console.log(data)
            data.forEach(e => {
                console.log(e.id)
            });
        setEquation(res.data[0].eq)
        setXl(res.data[0].xl)
        setXr(res.data[0].xr)
        }) 
    }

    return(
        <>
        <center>
        <h1>False Position</h1>
        <h3>Equation : <input type="text" value={EQ} onChange={InputEquation}/> </h3>
        <br></br>
        <h3>Input XL : <input type="number" value ={XL} onChange={InputVal1}/> </h3>
        <h3>Input XR : <input type="number" value ={XR} onChange={InputVal2}/> </h3>
        <Button variant="success" onClick={()=>Calculate()}>Calculate</Button>
        &emsp;
        <Button onClick={()=>API()}>API</Button>
        <br></br>
        <h1>{X1}</h1>
        </center>
        </>
    )
}

export default FalsePosition;