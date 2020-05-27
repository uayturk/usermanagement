import React, { Component } from 'react'
import { Bar,Line,Pie } from 'react-chartjs-2';
import User from "./User";
import UserConsumer from "../context";
import axios from "axios";




class Chart extends Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            
            chartData:{
                //labels:[],
                datasets:[
                    {
                        label:'Performance',
                       
                    }

                ],
            },
            department: "",
          
        };
        
        
    }

    setPerformanceDatas  = async () => {
       
        const departmentArray = [];
        const fullDepartmentArray = [];
        const countOfDepartments = [];
        
        var counter = null;

        const response = await axios.get(`http://localhost:3004/users`);

        // used .reduce for grouping
        /*const groupedArray = response.data.reduce((groupByDepartment, { department, name }) => {
            if (!groupByDepartment[department]) 
                groupByDepartment[department] = [];

            groupByDepartment[department].push(name);
        
            
            return groupByDepartment;
        }, {});*/


    
        // Set chartData.labels datas, departmentArray and fullDepartmentArray      
        for(var i =0 ; i<response.data.length ; i++){    
       
            if(!this.state.chartData.labels){ 
                this.state.chartData.labels = [];
            }   
            if(this.state.chartData.labels.includes(response.data[i].department) === false){
                this.state.chartData.labels.push(response.data[i].department);
                departmentArray.push(response.data[i].department);       
            }
            fullDepartmentArray.push(response.data[i].department)                                  
        }

          /*From Doc*/
         /*By default, when your component’s state or props change, your component will re-render. 
         If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate(). 
         If we not use forceUpdate here,undefined comes first time when you add new department. You need manuel refresh. To solve this forceUpdate used.*/
         this.forceUpdate();
             
        for (var i = 0; i < departmentArray.length; i++) {

            for (var j = 0; j < fullDepartmentArray.length; j++) {
               if(departmentArray[i] === fullDepartmentArray[j]){
                  counter ++;
               }
            }
            countOfDepartments.push(counter)
            counter = 0;
          
        }
       
        this.setState({
            chartData: {
               
                datasets:[
                    {                               
                        data : countOfDepartments,   
                        backgroundColor:this.convertToPercentageAndSetBackgroundColor(countOfDepartments),                               
                    }

                ],
            }
          });  
                
    }

    convertToPercentageAndSetBackgroundColor = (array) => {
        
        const sumOfArrayElements = array.reduce((a, b) => a + b, 0)
        const percentageArray = [];
        const backgroundColorArray = [];
       
        for(var i = 0; i < array.length; i++){
            percentageArray.push(Math.ceil((array[i]/sumOfArrayElements)*100))

        }

        for(var i =0 ; i<percentageArray.length ; i++){
            if(percentageArray[i]<= 16){         
                backgroundColorArray.push('#cd3232');        
            }else if(percentageArray[i] > 16 && percentageArray[i] <= 30){          
                backgroundColorArray.push('#cd8032');
            }else if(percentageArray[i] > 30 && percentageArray[i] <= 40){           
                backgroundColorArray.push('#cda632');
            }else if(percentageArray[i] > 40 && percentageArray[i] <= 65){          
                backgroundColorArray.push('#a6cd32');
            }else if(percentageArray[i] > 65 && percentageArray[i] < 101){          
                backgroundColorArray.push('#59cd32');
            }
         }


         return backgroundColorArray;

    }


    //componentDidMount uses to access a DOM element in React . Example : document.getElementById() 
    componentDidMount() {

        this.setPerformanceDatas();
        setInterval(() => {
            if (JSON.parse(localStorage.getItem('renderChartJs'))) {
                this.setPerformanceDatas();
                localStorage.setItem('renderChartJs',JSON.stringify(false));          
            } 
          }, 1000)
       
       
    }
  
    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right'
   
    }

    render() {
        return (
            
                <div className = "chart">
                    
                   
                    <Pie
                        data={this.state.chartData}
                        //width={700}
                        //height={250}
                        //options={{  }}
                        options={{ 
                            responsive: true,
                            title:{
                                display:this.props.displayTitle,
                                text:'User Distribution of Company',
                                fontSize : 15,
                                //position:'bottom'
                            },
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition,
                                //onClick:this.legendClick
                            },
                            tooltips: {
                                callbacks: {
                                  label: function(tooltipItem, data) {
                                    
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                    var total = meta.total;
                                    var currentValue = dataset.data[tooltipItem.index];
                                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                                    return currentValue + ' (' + percentage + '%)';
                                  },
                                  title: function(tooltipItem, data) {
                                    return data.labels[tooltipItem[0].index];
                                  }
                                }
                            },
                         
                        
                        }}
                    />
                </div>
            
        )
    }
}

export default Chart;