import { Box, Paper, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import './Widget.css'
interface WidgetProps {
    title:string,
    children:any
}

export default function Widget({title,children}: WidgetProps) {
  return (
    <Paper className='widget'>
        <Typography variant='button'>{title}</Typography>
        <Box mt={2}>{children}</Box>
    </Paper>
  )
}