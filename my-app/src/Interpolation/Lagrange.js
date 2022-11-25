import React, { useState } from 'react';
import {Button,Table,Container} from 'react-bootstrap';
import Chart from "react-apexcharts";
import axios from 'axios'

function Lagrange(){

    const [ArrData,setArrData] = useState([{}])
    const [X,setX] = useState()
    const [Y,setY] = useState()
    const [Option,setOption] = useState({})
    const [Series,setSeries] = useState([{}])

    const RowData=(e)=>{
        var Arr = []
        for(var i=0;i<(e.target.value);i++){
            if(i<=0){
                Arr[i] = {x:0,y:0}
            }
            else{
                Arr.push({x:0,y:0})
            }
        }
        setArrData(Arr)
    }

    const setDataX = (e,index)=>{
        ArrData[index].x = Number(e.target.value)
    }

    const setDataY = (e,index)=>{
        ArrData[index].y = Number(e.target.value)
    }

    const setValX = (e)=>{
        var x = Number(e.target.value)
        setX(x)
    }


    const calLagrange = ()=>{
        var yp = 0
        for(var i=0;i<ArrData.length;i++){
            var p = 1
            for(var j=0;j<ArrData.length;j++){
                if(i!=j){
                    p *= ((ArrData[j].x-X)/(ArrData[j].x-ArrData[i].x))
                }
            }
            yp += p*ArrData[i].y
        }
        setY(yp)
        console.log(Y)


        var data=[[]],result=[]
        for(i=0;i<ArrData.length;i++){
            data[i] = [ArrData[i].x,ArrData[i].y]
        }

        result[0] = [ArrData[0].x,ArrData[0].y]
        result[1] = [X,Y]
        result[2] = [ArrData[ArrData.length-1].x,ArrData[ArrData.length-1].y]

        setOption({iter:ArrData.map((e)=>(e.y)),colors:['#198754',"#FFC300"],grid:{show: true,borderColor: '#838A8E',strokeDashArray: 0,position: 'back'}})
        setSeries([{name:"Y",data:data},{name:"Result",data:result}])
    }

    return(
        <><center>
        <h1>Lagrange Interpolation</h1>
            <h2><input placeholder="Input number of data" type="number" onChange={RowData}/></h2>
            <h2><input placeholder="Input X" type="number" onChange={setValX}/></h2>


            <Button variant="success" onClick={()=>calLagrange()}>Calculate</Button>

            <Container><Table striped bordered hover variant="success" size="sm">
            <thead><tr>
                <th><center>X</center></th>
                <th><center>Y</center></th>
            </tr></thead>
            <tbody>
                {ArrData.map((i,row) =>(
                    <tr>
                        <td><center><input onChange={e=>setDataX(e,row)} /></center></td>
                        <td><center><input onChange={e=>setDataY(e,row)} /></center></td>
                    </tr>
                ))}
            </tbody>
            </Table></Container>

            <h2>f({X}) = {Y}</h2>
                
            <center> <Chart type="line" options={Option} series={Series} width={1500}height={400} /> </center>


        </center></>
    );
}

export default Lagrange;