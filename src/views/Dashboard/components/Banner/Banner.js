import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import Banner from './../../../../assets/Banner.jpg';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 583,
    width: '100%',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const classes = useStyles();

  return (
    <Card>
      <img className={classes.chartContainer} alt="Banner" src={Banner} />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
