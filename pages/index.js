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
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  DialogContent,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DataFnsUtils from '@date-io/date-fns'
import {
  Add,
  FilterList
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300
  },
  users: {
    marginRight: 0
  }
}))


function createData(name, date, service, features, complexity, platform, users, total) {
  return { name, date, service, features, complexity, platform, users, total }
}

export default function ProjectManager() {

  const classes = useStyles()
  const theme = useTheme()
  const [rows, setRows] = useState([
    createData("alex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500"),
    createData("alex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500"),
    createData("alex", "11/2/19", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500")
  ])

  const platformOptions = ["Web", "iOS", "Android"]
  const featureOptions = ["Photo/Video", "GPS", "File Transfer", "Users/Authentication", "Biometrics", "Push Notifications"]

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


  return (
    <MuiPickersUtilsProvider utils={DataFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
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
        <Grid item container justify="flex-end" style={{ marginTop: "5em" }}>
          <Grid item style={{ marginRight: 75 }}>
            <FilterList color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "15em" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Feature</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">Platform</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.services}</TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>{row.features}</TableCell>
                    <TableCell align="center">{row.complexity}</TableCell>
                    <TableCell align="center">{row.platform}</TableCell>
                    <TableCell align="center">{row.users}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                          <FormControlLabel classes={{ label: classes.service }} value="Low" label="Low" control={<Radio />} />
                          <FormControlLabel classes={{ label: classes.service }} value="Medium" label="Medium" control={<Radio />} />
                          <FormControlLabel classes={{ label: classes.service }} value="High" label="High" control={<Radio />} />
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
                  <Grid item>
                    <Grid item container direction="column" style={{ marginTop: "5em" }} alignItems="flex-end">
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
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="0-10" label="0-10" control={<Radio />} />
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="10-100" label="10-100" control={<Radio />} />
                          <FormControlLabel classes={{ label: classes.service, root: classes.users }} value="100+" label="100+" control={<Radio />} />
                        </RadioGroup>
                      </Grid>
                      <Grid item style={{ marginTop: "5em" }}>
                        <Select
                          labelId="features"
                          style={{ width: "12em" }}
                          MenuProps={{ style: { zIndex: 1302 } }}
                          id="features"
                          multiple
                          value={features}
                          onChange={(event) => setFeatures(event.target.value)}
                          displayEmpty
                          renderValue={features.length > 0 ? undefined : () => "Features"}
                        >
                          {featureOptions.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          )
                          )}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>

  )
}