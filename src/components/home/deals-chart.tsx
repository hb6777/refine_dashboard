import { DollarCircleOutlined } from '@ant-design/icons'
import  { Card } from 'antd' 
import React from 'react'
import { Text } from '../text'
import   { Area, AreaConfig } from '@ant-design/plots'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { useList } from '@refinedev/core'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'
import { arrayReplace } from '@refinedev/core/dist/definitions/helpers/keys'

const DealsChart = () => {

  const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
      resource:'dealStages',
      filters:[{
        field:'title',
        operator: 'in',
        value: ['WON','LOST']
      }], 
      meta: {
        gqlQuery: DASHBOARD_DEALS_CHART_QUERY
      }
  });

  // console.log(data);

  const dealData = React.useMemo(()=> {
    return mapDealsData(data?.data)
  },[data?.data]);

  const config:AreaConfig = {
      data:dealData,
      xField: 'timeText',
      yField: 'value',
      isStack: false,
      seriesField: 'state',
      smooth:true,
      animation:true,
      startOnZero: false,
      legend: {
        offsetY: -6
      },
      xAxis:{
        label: {
          formatter: (data) => {
            return (data.replace(' 20',`-`))
          }
        }
      },
      yAxis: {
        tickCount: 4,
        label:{
          formatter: (v:string) =>{
            return `$${Number(v) /1000}k`
          }
        }
      },
      tooltip: {
        formatter: (data) => {
          return {
            name: data.state,
            value: `$${Number(data.value)/1000}k`}
        }
      }
  }

  return (
    <Card 
        style={{height:'100%'}}  
        headStyle={{padding: '8px 16px'}}
        bodyStyle={{padding: '24px 24px 0 24pxs'}}
        title={
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <DollarCircleOutlined />
              <Text
                size='sm'
                style={{marginLeft:'0.5rem'}}
              >Deals</Text>
          </div>
        }
    >      
      <Area {...config} height={325}  />

    </Card>
  )
}

export default DealsChart
