import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import { isArray, uniqBy } from 'lodash';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '450px'
  }
}));

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const UsersByDevice = props => {
  const [reportSales, setReportSales] = useState({});
  const { className, ...rest } = props;

  useEffect(async () => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    let response = await axios.get(`${baseUrl}/sales`);
    if (isArray(response.data.result.data)) {
      let nameOfProducts = response.data.result.data.map(
        item => item.nameProduct
      );

      const tempSale = {};
      nameOfProducts = uniqBy(nameOfProducts, item => item.trim());

      response.data.result.data.forEach(item => {
        if (nameOfProducts.includes(item.nameProduct)) {
          tempSale[item.nameProduct] =
            tempSale.quantity || 0 + item.soldQuantity;
        }
      });

      setReportSales(tempSale);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: Object.values(reportSales),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],

    labels: Object.keys(reportSales)
  };

  const options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 75,
    layout: { padding: 0 },
    showLines: true,
    spanGaps: true,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: true,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton onClick={initialLoad} size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Ventas por Producto"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
