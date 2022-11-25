import Chart from "react-apexcharts";





function graph(it,xm) {
// console.log(it)
// console.log(xm)

    return(
<>
{console.log(it)}
<center> <Chart options={it} series={xm} width={700}height={320}/> </center>
</>


    )


}


export default graph;