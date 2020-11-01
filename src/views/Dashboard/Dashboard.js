import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { isObject, isArray, groupBy, uniqBy } from 'lodash';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import {
  Budget,
  TotalNormalSold,
  TotalSoldWholesale,
  TotalProfit as TotalSold,
  Banner,
  UsersByDevice
} from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const Dashboard = () => {
  const [report, setReport] = useState({});

  useEffect(async () => {
    const url = `${baseUrl}/reports`;
    const response = await axios.get(url);

    if (isObject(response.data.result.data)) {
      setReport(response.data.result.data);
    }
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget totalReverse={report.totalReverse || 'oading...'} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalNormalSold
            totalSoldNormal={report.totalSoldNormal || 'oading...'}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalSoldWholesale
            totalSoldWholesale={report.totalSoldWholesale || 'oading...'}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalSold totalSold={report.totalSold || 'oading...'} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <Banner />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid>
      </Grid>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <div>Loadding...</div>
});
