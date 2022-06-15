import { Paper, Typography,Box } from '@mui/material';
import React, { ReactElement } from 'react'
import './StatisticItem.css'
interface IStatisticItem {
    icon:ReactElement,
    label:string,
    value:string | number
}
function StatisticItem({icon,label,value}:IStatisticItem) {
  return (
    <Paper className='root'>
        <Box>{icon}</Box>
        <Box>
            <Typography variant='h5'>{value}</Typography>
            <Typography variant='caption'>{label}</Typography>
        </Box>
    </Paper>
  )
}

export default StatisticItem;