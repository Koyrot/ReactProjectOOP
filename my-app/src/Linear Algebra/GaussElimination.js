import React, { useState } from 'react';
import {Button,Table,Container} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function GaussElimination(){

    const [MatA,setMatA] = useState([])
    const [MatB,setMatB] = useState([])
    const [MatX,setMatX] = useState([])
    const [Err,setErr] = useState()
    const [VRA,setVRA] = useState()


    const CreateArr=(e)=>{

        if(e.target.value>0){
            var A = [[]],B=[]
            for(var i=0;i<(e.target.value);i++){
            A[i] = []
            for(var j=0;j<(e.target.value);j++){
                A[i][j] = 0 
            }
        }
        setMatA(A)
        setMatB(B)
            const err = "ดีครับ"
            setErr(err)
            const variant = 'success'
            setVRA(variant)
        }
        else{
            var A = [[]],B=[]
            for(i=0;i<(e.target.value);i++){
                A[i] = []
                for(j=0;j<(e.target.value);j++){
                    A[i][j] = null                         
                }
            }
            setMatA(A)
            setMatB(B)
            const err = "ใส่ใหม่"
            const variant = 'danger'
            setVRA(variant)
            setErr(err)
        }  
    }

    const ChangeMatA = (e,row,column) =>{
        MatA[row][column] = parseFloat(e.target.value)
    }
    const ChangeMatB = (e,row) =>{
        MatB[row] = parseFloat(e.target.value)
    }

    const Calculate = () =>{
        var mat_a = [[]],mat_b = [],mat_x = []
        for(var i=0;i<MatA.length;i++){
            mat_a[i] =[];
            for(var j=0;j<MatA[0].length;j++){
                mat_a[i][j] = MatA[i][j]
            } 
            mat_b[i] = MatB[i]
        }
        console.log(mat_a)
        console.log(mat_b)

        for(var k=0;k<MatA.length;k++){
            for(i=k+1;i<MatA.length;i++){
                var temp = mat_a[i][k]/mat_a[k][k]
                for(j=k+1;j<MatA[0].length;j++){
                    mat_a[i][j] = mat_a[i][j] - temp*mat_a[k][j]
                }
                mat_b[i] = mat_b[i] - temp*mat_b[k]
            }
        }

        for(i=MatA.length-1;i>=0;i--){
            mat_x[i] = mat_b[i]
            for(j=i+1;j<MatA.length;j++){
                mat_x[i] = mat_x[i]-mat_a[i][j]*mat_x[j]
            }
            mat_x[i] = mat_x[i]/mat_a[i][i]
        }
        setMatX(mat_x)

    }


    return(
        <><center>
            <h1>Gauss Elimination</h1>
            <h2><input placeholder="Input Dimentions" type="number" onChange={CreateArr}/></h2>

            <Alert  variant={VRA}> {Err} </Alert>

            {MatA.map((row,i)=>(<div>
                <Container>
                <Table variant="success" size="sm">
                    <tbody>
                        <tr>
                            {row.map((column,j)=>(
                                <td><input onChange={e=>ChangeMatA(e,i,j)}/></td>
                            ))}
                            <td><input onChange={e=>ChangeMatB(e,i)}/></td>
                        </tr>
                    </tbody>
                </Table>
                </Container>
            </div>))}

            <Button variant="success" onClick={()=>Calculate()}>Calculate</Button>
            
            {MatX.map((Ans,i)=>(
                <h1 id={i}>X{i+1}&nbsp; = &nbsp;{Ans}</h1>
            ))}

        </center></>
    );
}

export default GaussElimination;