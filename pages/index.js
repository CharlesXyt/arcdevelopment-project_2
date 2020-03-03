import React,{useState} from 'react'
import {
  Grid,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel
} from '@material-ui/core'
import {
  Add
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({

}))


export default function ProjectManager(){

  const classes = useStyles()
  const theme = useTheme()
  const [websiteChecked,setWebsiteChecked] = useState(false)
  const [iOSChecked,setIOSChecked] = useState(false)
  const [androidChecked,setAndroidChecked] = useState(false)
  const [softwareChecked,setSoftwareChecked] = useState(false)

  return (
    <Grid container direction="column">
      <Grid item style={{marginTop:"2em",marginLeft:"5em"}}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField 
        style={{width:"35em",marginLeft:"5em"}}
        InputProps={{
          endAdornment:<InputAdornment position="end"><Add color="primary"/></InputAdornment>
        }}
        placeholder="Search project details or create a new entry"
        />
      </Grid>
      <Grid item style={{marginLeft:"5em",marginTop:"2em"}}> 
        <FormGroup row>
          <FormControlLabel
          style={{marginRight:"5em"}}
          control={<Switch checked={websiteChecked} 
          color="primary" 
          onChange={() => setWebsiteChecked(!websiteChecked)}/>} 
          label="Website"
          labelPlacement="start"
          />
          <FormControlLabel 
          style={{marginRight:"5em"}}
          control={<Switch checked={iOSChecked} 
          color="primary" 
          onChange={() => setIOSChecked(!iOSChecked)}/>} 
          label="iOS Apps"
          labelPlacement="start"
          />
          <FormControlLabel 
          style={{marginRight:"5em"}}
          control={<Switch checked={androidChecked} 
          color="primary" 
          onChange={() => setAndroidChecked(!androidChecked)}/>} 
          label="Android Apps"
          labelPlacement="start"
          />
          <FormControlLabel 
          control={<Switch checked={softwareChecked} 
          color="primary" 
          onChange={() => setSoftwareChecked(!softwareChecked)}/>} 
          label="Custom Software"
          labelPlacement="start"
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}