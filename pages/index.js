import React from 'react'
import {
  Grid,
  Typography,
  useTheme
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({

}))


export default function ProjectManager(){

  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h1">Projects</Typography>
      </Grid>
    </Grid>
  )
}