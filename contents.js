import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Bar, Doughnut, Line} from 'react-chartjs-2'



const Contents = () => {
    const [confirmedData, setconfirmedData] = useState({
        labels: ["1월", "2월", "3월"],
        datasets:[
            {
                label:"국내 누적 확진자",
                backgroundColor: "salmon",
                fill: true,
                data: [10, 5, 3]
            },
        ]
    })



    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            makeData(res.data)
        }
        const makeData = (item) => {
            const arr = item.reduce((a, c) => {
                const cDate = new Date(c.Date)
                const year = cDate.getFullYear()
                const month = cDate.getMonth()
                const date = cDate.getDate()
                const confirmed = c.Confirmed;
                const active = c.Active;
                const death = c.Deaths;
                const recovered =c.Recovered

                const findItem = a.find( a => a.year === year && a.month === month)

                if(!findItem){
                    a.push({year, month, date, confirmed, active, death, recovered })
                }
                if(findItem && findItem.date < date){
                    findItem.active = active
                    findItem.death = death
                    findItem.date = date
                    findItem.year = year
                    findItem.month = month
                    findItem.recovered = recovered
                    findItem.confirmed = confirmed
                }

              return a
            }, [])
            setconfirmedData({
                
            });




            console.log(arr)
        }

        fetchEvents();
    })

    return (

            <section>
       <h2>국내 코로나 현황</h2>
       <div className='contents'>
           <div>
               <Bar data = {confirmedData} options = {
                   
                    { title:{display: true, text:"누적 확진자 추이", fontsize: 16} },
                    { legend: {display: true, position: "bottom"} }
                   
               } />
               
           </div>
        </div>
     </section>
     
    )
    
}

export default Contents
