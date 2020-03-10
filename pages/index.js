import React, { useState } from 'react'
import {
  Grid,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  DialogContent,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DataFnsUtils from '@date-io/date-fns'
import {format} from 'date-fns'
import {
  Add
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import EnhancedTable from '../src/ui/EnhancedTable'

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300
  },
  users: {
    marginRight: 0
  },
  button:{
    color:"#fff",
    backgroundColor:theme.palette.common.orange,
    borderRadius:50,
    textTransform:"none",
    "&:hover":{
      backgroundColor:theme.palette.secondary.light
    }
  }
}))


function createData(name, date, service, features, complexity, platform, users, total,search) {
  return { name, date, service, features, complexity, platform, users, total,search }
}

export default function ProjectManager() {

  const classes = useStyles()
  const theme = useTheme()
  const [rows, setRows] = useState([
    createData("alex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true),
    createData("blex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true),
    createData("clex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true),
    createData("dlex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true),
    createData("elex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true),
    createData("flex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500",true)
  ])

  const platformOptions = ["Web", "iOS", "Android"]
  let featureOptions = ["Photo/Video", "GPS", "File Transfer", "Users/Authentication", "Biometrics", "Push Notifications"]
  let websiteOptions = ["Basic","Interactive","E-Commerce"]

  const [websiteChecked, setWebsiteChecked] = useState(false)
  const [iOSChecked, setIOSChecked] = useState(false)
  const [androidChecked, setAndroidChecked] = useState(false)
  const [softwareChecked, setSoftwareChecked] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [date, setDate] = useState(new Date())
  const [total, setTotal] = useState("")
  const [service, setService] = useState("")
  const [complexity, setComplexity] = useState("")
  const [users, setUsers] = useState("")
  const [platforms, setPlatforms] = useState([])
  const [features, setFeatures] = useState([])

  const [search,setSearch] = useState("")

  const [page, setPage] = React.useState(0);


  const addProject = () => {

    setRows([...rows,createData(name,format(date,"MM/mm/yy"),
    service,features.join(", "),
    service === "Website" ? "N/A":complexity,
    service === "Website" ? "N/A":platforms.join(", "),
    service === "Website" ? "N/A":users,
    `$${total}`,true)])
    setDialogOpen(false)
    setWebsiteChecked(false)
    setIOSChecked(false)
    setSoftwareChecked(false)
    setName("")
    setDate(new Date())
    setTotal("")
    setService("")
    setComplexity("")
    setUsers("")
    setPlatforms([])
    setFeatures([])
  }

  const addProjectDisable = () => {
    switch(service){
      case "Website":
        if(name.length === 0 || total.length === 0 || features.length !== 1){
          return true
        }
        break
      default:
        if(name.length === 0 || total.length === 0 || features.length === 0 || users.length === 0 || complexity.length === 0 || platforms.length === 0 || service.length === 0){
          return true
        }
        break
    }
    return false
  } 

  const handleSearch = (event) =>{
    setSearch(event.target.value)
    const rowData = rows.map(row => Object.values(row).filter(option => option !==true && option !== false))

    const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(event.target.value.toLowerCase())))

    const newRows = [...rows]
    matches.map((row,index) => row.includes(true) ? newRows[index].search = true : newRows[index].search = false)

    setRows(newRows)
    setPage(0)
  }



  return (
    <MuiPickersUtilsProvider utils={DataFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            value={search}
            onChange={handleSearch}
            style={{ width: "35em", marginLeft: "5em" }}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => setDialogOpen(true)}><Add color="primary" style={{ fontSize: 30 }} /></InputAdornment>
            }}
            placeholder="Search project details or create a new entry"
          />
        </Grid>
        <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={<Switch checked={websiteChecked}
                color="primary"
                onChange={() => setWebsiteChecked(!websiteChecked)} />}
              label="Website"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={<Switch checked={iOSChecked}
                color="primary"
                onChange={() => setIOSChecked(!iOSChecked)} />}
              label="iOS Apps"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={<Switch checked={androidChecked}
                color="primary"
                onChange={() => setAndroidChecked(!androidChecked)} />}
              label="Android Apps"
              labelPlacement="start"
            />
            <FormControlLabel
              control={<Switch checked={softwareChecked}
                color="primary"
                onChange={() => setSoftwareChecked(!softwareChecked)} />}
              label="Custom Software"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        
        <Grid item style={{ marginTop:"5em",marginBottom: "35em" }}>
          <EnhancedTable rows={rows} setRows={setRows} page={page} setPage={setPage} websiteChecked={websiteChecked} iOSChecked={iOSChecked} androidChecked={androidChecked} softwareChecked={softwareChecked}/>
        </Grid>
        <Dialog open={dialogOpen} fullWidth maxWidth="md" onClose={() => setDialogOpen(false)}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField label="Name" fullWidth id="name" value={name} onChange={(event) => setName(event.target.value)} />
                  </Grid>
                  <Grid item container direction="column" style={{ marginTop: "5em" }}>
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="service"
                        name="service"
                        value={service}
                        onChange={(event) => setService(event.target.value)}
                      >
                        <FormControlLabel classes={{ label: classes.service }} value="Website" label="Website" control={<Radio />} />
                        <FormControlLabel classes={{ label: classes.service }} value="Mobile App" label="Mobile App" control={<Radio />} />
                        <FormControlLabel classes={{ label: classes.service }} value="Custom Software" label="Custom Software" control={<Radio />} />
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{ marginTop: "5em" }}>
                      <Select
                        disabled={service === "Website" ? true : false}
                        labelId="platforms"
                        id="platforms"
                        style={{ width: "12em" }}
                        MenuProps={{ style: { zIndex: 1302 } }}
                        multiple
                        value={platforms}
                        onChange={(event) => setPlatforms(event.target.value)}
                        displayEmpty
                        renderValue={platforms.length > 0 ? undefined : () => "Platforms"}
                      >
                        {platformOptions.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        )
                        )}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm style={{ marginTop: 16 }} alignItems="center">
                  <Grid item>
                    <KeyboardDatePicker format="MM/dd/yyyy" value={date} onChange={newDate => setDate(newDate)} />
                  </Grid>
                  <Grid item>
                    <Grid item container direction="column" style={{ marginTop: "5em" }}>
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(event) => setComplexity(event.target.value)}
                        >
                          <FormControlLabel classes={{ label: classes.service }} value="Low" label="Low" control={<Radio />} disabled={service === "Website" ? true : false}/>
                          <FormControlLabel classes={{ label: classes.service }} value="Medium" label="Medium" control={<Radio />} disabled={service === "Website" ? true : false}/>
                          <FormControlLabel classes={{ label: classes.service }} value="High" label="High" control={<Radio />} disabled={service === "Website" ? true : false}/>
                        </RadioGroup>
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      label="Total"
                      id="total"
                      value={total}
                      onChange={(event) => setTotal(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }} />
                  </Grid>
                  <Grid item style={{ alignSelf: "flex-end" }}>
                    <Grid item container direction="column" style={{ marginTop: "5em" }}>
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="users"
                          name="users"
                          value={users}
                          onChange={(event) => setUsers(event.target.value)}
                        >
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="0-10" label="0-10" control={<Radio />} disabled={service === "Website" ? true : false}/>
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="10-100" label="10-100" control={<Radio />} disabled={service === "Website" ? true : false}/>
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="100+" label="100+" control={<Radio />} disabled={service === "Website" ? true : false}/>
                        </RadioGroup>
                      </Grid>

                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      labelId="features"
                      multiple
                      style={{ width: "12em" }}
                      MenuProps={{ style: { zIndex: 1302 } }}
                      id="features"
                      value={features}
                      onChange={(event) => setFeatures(event.target.value)}
                      displayEmpty
                      renderValue={features.length > 0 ? undefined : () => "Features"}
                    >
                      {service === "Website" ? featureOptions = websiteOptions : null}
                      {featureOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      )
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{marginTop:"3em"}}>
              <Grid item>
                <Button color="primary" style={{fontWeight:300}} onClick={()=>setDialogOpen(false)}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button} onClick={addProject} disabled={addProjectDisable()}>Add Project +</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>

  )
}