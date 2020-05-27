import React, { useEffect, useRef,useState } from 'react'
import Chartjs from 'chart.js';

const chartConfig = {
    type: 'bar',
    data:{
        labels:['Jan.','Feb.','Mar.','Apr.',
                'May.','Jun.','Jul.','Aug.',
                'Sep.','Oct.','Nov.','Dec.'],
        datasets:[
            { 
                label:'Performance ( % )',              
                        
                data : [],             
                backgroundColor:[]
           }

        ],
             
    },
    options:{
        responsive: true,
        redraw:true,
        title:{
            display:true,
            text:'User Performance per Month',
            fontSize : 15
        },
        //If we want to set tooltip specifically,we can use callback with tooltip in option.
        /*tooltips: {
            callbacks: {
              label: function(tooltipItem, data) { 
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var index = tooltipItem.index;
               
                //return dataset.labels[index] + ': ' + dataset.data[index];
              },
            }
        },*/
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    
    }

};

//if there is no clone,all chartjs tooltip shows the same tooltip data from the last updated chart. 
//For the prevent this issue,please do not forget the use clone.
const clone = (o) => JSON.parse(JSON.stringify(o))

const setPerformanceDatas = (dataArray,chartConfig) => {

        chartConfig.data.datasets[0].backgroundColor.length = 0;
        chartConfig.data.datasets[0].data = dataArray

        
        for(var i = 0 ; i<chartConfig.data.datasets[0].data.length ; i++){
            if(chartConfig.data.datasets[0].data[i]<= 15){   
                chartConfig.data.datasets[0].backgroundColor.push('#cd3232');
            }else if(chartConfig.data.datasets[0].data[i] > 15 && chartConfig.data.datasets[0].data[i] <= 30){          
                chartConfig.data.datasets[0].backgroundColor.push('#cd8032');          
            }else if(chartConfig.data.datasets[0].data[i] > 30 && chartConfig.data.datasets[0].data[i] <= 45){           
                chartConfig.data.datasets[0].backgroundColor.push('#cda632');          
            }else if(chartConfig.data.datasets[0].data[i] > 45 && chartConfig.data.datasets[0].data[i] <= 60){          
                chartConfig.data.datasets[0].backgroundColor.push('#cdcd32');
            }else if(chartConfig.data.datasets[0].data[i] > 60 && chartConfig.data.datasets[0].data[i] <= 75){          
                chartConfig.data.datasets[0].backgroundColor.push('#a6cd32');            
            }else if(chartConfig.data.datasets[0].data[i] > 75 && chartConfig.data.datasets[0].data[i] <= 85){          
                chartConfig.data.datasets[0].backgroundColor.push('#80cd32');          
            }else if(chartConfig.data.datasets[0].data[i] > 85 && chartConfig.data.datasets[0].data[i] < 101){          
                chartConfig.data.datasets[0].backgroundColor.push('#59cd32');          
            }
         }
         
}

// class Chart extends Component {} Bu şekilde kullanamadık. Çünkü user'dan performanceArray geçirmeye çalışınca this.props.array'i array olarak algılamadı devTool'u açınca öyle görünse de.
// neticesinde props bir map fonksiyonu içermediği için bu normaldi aslında. Bu tarz array geçirmeli durumlarda fonksiyon component olarak tanımlamak makul.
const ChartUsers = ({dataArray}) => {
   
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
  
    //You can call your function inside useEffect which is used inside componentWillMount(). useEffect can do the same job with componentWillMount().
    /*By using this Hook(useEffect), you tell React that your component needs to do something after render.
     React will remember the function you passed, and call it later after performing the DOM updates */
    useEffect(() => {
        setPerformanceDatas(dataArray,chartConfig);
        
        if (chartContainer && chartContainer.current) {         
            const newChartInstance = new Chartjs(chartContainer.current, clone(chartConfig));
            //setChartInstance(newChartInstance);           
        }
    }, [chartContainer]);


    return (                                                      
        <div className = "chart">                   
             <canvas ref={chartContainer} />        
        </div>
    )
}

export default ChartUsers;