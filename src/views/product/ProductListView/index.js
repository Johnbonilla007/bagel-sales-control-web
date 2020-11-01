import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';
import { httpDelete } from './../../../RestClient';
import Page from '../../../components/Page';
import { TableControl } from '../../../components/controls';

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const response = await axios.get(`${baseUrl}/products`);
    if (isArray(response.data.result.data)) {
      setProducts(response.data.result.data);
    }
  };

  const handleOnClickRemoveRow = async selectedItem => {
    const response = await httpDelete('products', { ...selectedItem });

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
      label: 'Nombre de Producto'
    },
    {
      id: 'initialExistence',
      numeric: false,
      disablePadding: true,
      label: 'Existencia Inicial'
    },
    {
      id: 'existence',
      numeric: false,
      disablePadding: true,
      label: 'Existencia'
    },
    {
      id: 'existence',
      numeric: false,
      disablePadding: true,
      label: 'Existencia'
    },
    {
      id: 'purchasePrice',
      numeric: false,
      disablePadding: true,
      label: 'Precio de Compra'
    },
    {
      id: 'existence',
      numeric: false,
      disablePadding: true,
      label: 'Existencia'
    },
    {
      id: 'salePrice',
      numeric: false,
      disablePadding: true,
      label: 'Precio de Venta'
    },
    {
      id: 'wholesaleprice',
      numeric: false,
      disablePadding: true,
      label: 'Precio de Venta por Mayoreo'
    }
  ];

  return (
    <div>
      <Container maxWidth={false}>
        <TableControl
          colunms={columnsTable}
          items={products}
          onClickRemoveRow={handleOnClickRemoveRow}
          label="Rosquillas"
        />
      </Container>
    </div>
  );
};

export default ProductList;
