import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';
import { httpDelete } from './../../../RestClient';
import Page from '../../../components/Page';
import { TableControl } from '../../../components/controls';

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const SaleList = () => {
  const [sales, setSales] = useState([]);

  useEffect(async () => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const response = await axios.get(`${baseUrl}/sales`);
    if (isArray(response.data.result.data)) {
      setSales(response.data.result.data);
    }
  };

  const handleOnClickRemoveRow = async selectedItem => {
    const response = await httpDelete('sales', { ...selectedItem });

    if (!response.result.notification) {
      toast.success(response.result.message);
      initialLoad();
      return;
    }
    toast.error(response.data.result.notification);
  };

  const columnsTable = [
    {
      id: 'nameProduct',
      numeric: false,
      disablePadding: true,
      label: 'Producto'
    },
    {
      id: 'soldQuantity',
      numeric: false,
      disablePadding: true,
      label: 'Cantidad Vendida'
    },
    {
      id: 'typeSale',
      numeric: false,
      disablePadding: true,
      label: 'Tipo de Venta'
    },
    {
      id: 'total',
      numeric: false,
      disablePadding: true,
      label: 'Total'
    },
    {
      id: 'commentary',
      numeric: false,
      disablePadding: true,
      label: 'Comentario'
    }
  ];

  return (
    <div>
      <Container maxWidth={false}>
        <TableControl
          colunms={columnsTable}
          items={sales}
          onClickRemoveRow={handleOnClickRemoveRow}
          label="Ventas"
        />
      </Container>
    </div>
  );
};

export default SaleList;
