import React, { useState } from 'react';
import {Button,Table,Container} from 'react-bootstrap';
import Chart from "react-apexcharts";
import axios from 'axios'

function LinearRegression(){

    const [ArrData,setArrData] = useState([{}])
    const [a_0,setA0] = useState()
    const [a_1,setA1] = useState()
    const [X,setX] = useState()
    const [FX,setFX] = useState()
    const [Sumation,setSum] = useState({})
    const [Option,setOption] = useState({})
    const [Series,setSeries] = useState([{}])
    const [numDataAPI,setNumDataAPI] = useState()


    const RowData=(e)=>{
         setNumDataAPI(e.target.value)
        var Arr = []
        for(var i=0;i<e.target.value;i++){
            if(i<=0){
                Arr[i] = {x:"",y:""}
            }
            else{
                Arr.push({x:"",y:""})
            }
        }
        setArrData(Arr)
    }

        const clearAPI = () =>{
        setX(null)
        setNumDataAPI(null)
        setArrData([{}])
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

    const calRegression =()=>{
        console.log(ArrData)
        var x=[],y=[],a0=0,a1=0,sumX=0,sumY=0,sumX2=0,sumXY=0,det=0,allSum={}
        for(var i=0;i<ArrData.length;i++){
            x[i] = ArrData[i].x
            y[i] = ArrData[i].y
        }
        var n = x.length
        for(i=0;i<n;i++){
            sumX += x[i]
            sumY += y[i]
            sumX2 += (x[i]*x[i])
            sumXY += (x[i]*y[i])
        }
        det = n*sumX2 - sumX*sumX
        a0 = (sumY*sumX2 - sumXY*sumX)/det
        a1 = (n*sumXY - sumX*sumY)/det


        allSum = {sumX:sumX , sumX2:sumX2 , sumY:sumY , sumXY:sumXY}

        setA0(a0)
        setA1(a1)
        setFX(a0+a1*X)
        setSum(allSum)
        /*Graph*/ 
        var data=[[]],result=[]
        for(var i=0;i<n;i++){
            data[i] = [x[i],y[i]]
        }

        result[0] = [x[0],y[0]]
        result[1] = [X,a0+a1*X]
        result[2] = [x[x.length-1],y[y.length-1]]

        // console.log(data)
        // console.log(result)
        setOption({iter:x,colors:['#198754',"#FFC300"],grid:{show: true,borderColor: '#838A8E',strokeDashArray: 0,position: 'back'}})
        setSeries([{name:"Data",data:data},{name:"Result",data:result}])
        /*Graph*/ 
    }

    const API = () =>{
        axios.get('http://localhost:3500/LinearRegression').then(res=>{
            const data = res.data

            setNumDataAPI(data[0].numData)
            setX(data[0].valueX)
            console.log(data[0].dataX.length)
            var Arr = []
            for(var i=0;i<data[0].dataX.length;i++){
                if(i<=0){
                    Arr[i] = {x:data[0].dataX[i],y:data[0].dataY[i]}
                }
                else{
                    Arr.push({x:data[0].dataX[i],y:data[0].dataY[i]})
                }
            }
            setArrData(Arr)
        })
    }



    return(
        <><center>
        <h1>Linear Regression</h1>
        <br></br>
            <h2><input placeholder="Input number of data" type="number" onChange={RowData} value={numDataAPI}/></h2>
            <h2><input placeholder="Input X" type="number" onChange={setValX} value={X}/></h2>
        <br></br>
            <Button onClick={()=>API()}>API</Button>
            <Button onClick={()=>clearAPI()}>Clear API</Button>
        <br></br>    
        <br></br>  
        <br></br>  
            <Container><Table striped bordered hover variant="success" size="sm">
            <thead><tr>
                <th><center>X</center></th>
                <th><center>Y</center></th>
            </tr></thead>
            <tbody>
                {ArrData.map((i,row) =>(
                    <tr>
                        <td><center><input onChange={e=>setDataX(e,row)} value={ArrData[row].x}/></center></td>
                        <td><center><input onChange={e=>setDataY(e,row)} value={ArrData[row].y}/></center></td>
                    </tr>
                ))}
            </tbody>
            </Table></Container>

            <Button variant="success" onClick={()=>calRegression()}>Calculate</Button>
        <br></br>            
        <br></br>
        <br></br>    
            <h2>a0 = {a_0}</h2>
            <h2>a1 = {a_1}</h2>
            <h2>f({X}) = {FX}</h2>
        <br></br>
        <br></br>
            <Container fluid="xxl"><Table striped bordered hover variant="success" size="sm" >
                <thead><tr>
                    <th width="25%"><center>Σx</center></th>
                    <th width="25%"><center>Σy</center></th>
                    <th width="25%"><center>Σ(x^2)</center></th>
                    <th width="25%"><center>Σxy</center></th>
                </tr></thead>
                <tbody>
                    <tr>
                        <td><center>{Sumation.sumX}</center></td>
                        <td><center>{Sumation.sumY}</center></td>
                        <td><center>{Sumation.sumX2}</center></td>
                        <td><center>{Sumation.sumXY}</center></td>
                    </tr>
                    <br></br>
                </tbody>
            </Table></Container>

            <center> <Chart type="line" options={Option} series={Series} width={1500}height={400} /> </center>        

        </center></>
    );
}

export default LinearRegression;