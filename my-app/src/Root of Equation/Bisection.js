import React , {useState} from 'react'
import {compile} from 'mathjs'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {Button,Table} from 'react-bootstrap';
import Chart from "react-apexcharts";



function Bisection() {

    const [XL,setXl] = useState()
    const [XR,setXr] = useState()
    const [XM,setAns] = useState()
    const [EQ,setEquation] = useState()
    const [iterGraph,setIterGraph] = useState({})
    const [xmGraph,setXmGraph] = useState([{}])
    const [OBJ,setObj] = useState([{}])


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
        var xm = 0,err = 1,xOld = 0,fxM=0,fxR=0,xr = XR,xl=XL,iteration=0
        var obj = [{it:[],xR:[],xL:[],xM:[],Err:[]}]

        while(err > 0.000001){
            xOld = xm
            xm = (xl+xr)/2


            let scopeXm = {x: xm}
            let scopeXr = {x: xr}
            const Equation = compile(EQ) 
            fxM = Equation.evaluate(scopeXm) 
            fxR = Equation.evaluate(scopeXr)

            

            if(fxM*fxR > 0){
                xr = xm
            }
            else if(fxM*fxR < 0){
                xl = xm
            }
            err = Math.abs((xm-xOld)/xm)*100
            
            if(iteration<=0){
                obj = [{it:iteration,xR:xr,xL:xl,xM:xm,Err:err}]
            }
            else{
                obj.push({it:iteration,xR:xr,xL:xl,xM:xm,Err:err.toFixed(26)})
            }
            iteration++;

        }
        setAns(xm)
        setObj(obj)
        console.log(obj)
        setIterGraph({iter:obj.map((e)=>(e.it)),colors:['#198754'],grid:{show: true,borderColor: '#838A8E',strokeDashArray: 0,position: 'back'}})

        setXmGraph([{name:'XM',data:obj.map((e)=>(e.xM))}])
    }
    
    const API = (key) =>{
      console.log(key)
        axios.get('http://localhost:3500/Bisection').then(res=>{
          console.log(res)
            //const data = res
            res.data.forEach(e => {
              // console.log(e)
                if(e.id == key){
                  //console.log(e.xl)
                  setEquation(e.eq)
                  setXl(e.xl)
                  setXr(e.xr)
                }
            });
        })
    }

    return (
      <><center>
        <h1>Bisection</h1>
        <h3>Equation : <input placeholder="Input Equation" type="text" value={EQ}  onChange={InputEquation}/> </h3> 
        
        <br></br>
        <h3>Input XL : <input placeholder="Input Value" type="number" value ={XL} onChange={InputVal1}/> </h3>
        <h3>Input XR : <input placeholder="Input Value" type="number" value ={XR} onChange={InputVal2}/> </h3>
        <DropdownButton variant="outline-success" title="Equation" onSelect={API} >
          <Dropdown.Item eventKey="1">13-x^4 <br></br> xl = 1.5,xr = 2</Dropdown.Item>
          <Dropdown.Item eventKey="2">(43*x)-1 <br></br> xl = 0.02,xr = 2</Dropdown.Item>
        </DropdownButton>
        <br></br>
        <Button variant="success" onClick={()=>Calculate()}>Calculate</Button>
        
        <h1>{XM}</h1>

        {/* {console.log(iterGraph)}
        {console.log(xmGraph)} */}
        <center> <Chart type="line" options={iterGraph} series={xmGraph} width={1500}height={400} /> </center>


        <Table striped bordered hover variant="success" size="sm">
      <thead >
        <tr>
          <th><center>Iteration</center></th>
          <th><center>XR</center></th>
          <th><center>XL</center></th>
          <th><center>XM</center></th>
          <th><center>Error</center></th>
        </tr>
      </thead>
      <tbody>

      {OBJ.map((e,i) => (
        <tr>
            <td>{e.it}</td>
            <td>{e.xR}</td>
            <td>{e.xL}</td>
            <td>{e.xM}</td>
            <td>{e.Err}</td>
        </tr>
        ))}



      </tbody>
    </Table>
        </center>
      </>
    );
  }

export default Bisection;