import React, {Link} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Map from '@material-ui/icons/Map';
import Flag from '@material-ui/icons/Flag';
import GraphicEq from '@material-ui/icons/GraphicEq';

const useStyles = makeStyles({
  root: {
    position:'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
});
export default function FootNav({screenConfig}) {
  const classes = useStyles();
//   const [value, setValue] = React.useState(0);
    console.log(screenConfig)
  const handleChange = (event, newValue) => {
    screenConfig[1](newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={screenConfig[0]}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<Map />}label="Global Stats" />
        <Tab icon={<Flag />}label="Country Stats" />
        <Tab icon={<GraphicEq />} label="Graphs" />
      </Tabs>
    </Paper>
  );
}
