import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
  LinearProgress,
  Divider,
  Card,
  CardHeader
} from '@material-ui/core';

import Axios from 'axios';
import Page from '../../components/Page';

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmitProduct = async values => {
    const request = { ...values };
    setIsLoading(true);
    const response = await Axios.post(`${baseUrl}/products`, request);

    if (response.data.result.message === 'Product Saved Successfully') {
      toast.success(response.data.result.message);
      values = {};
      setIsLoading(false);
      // navigate('/app/products', { replace: true });
    }
  };

  return (
    <Page title="Register Producto">
      <Card>
        <CardHeader title="Registro de Producto" />
        <Divider />
        <br />
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center">
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                salePrice: '',
                wholeSalePrice: '',
                purchasePrice: '',
                initialExistence: '',
                nameProduct: ''
              }}
              validationSchema={Yup.object().shape({
                salePrice: Yup.number()
                  .max(255)
                  .required('El precio de venta es requerido'),
                wholeSalePrice: Yup.number()
                  .max(255)
                  .required('Precio de venta por mayoreo requerido'),
                purchasePrice: Yup.number()
                  .max(255)
                  .required('Precio de compra requerido'),
                initialExistence: Yup.number()
                  .max(255)
                  .required('Existencia inicial requerida'),
                nameProduct: Yup.string()
                  .max(255)
                  .required('Nombre de producto requerido')
                // policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })}
              onSubmit={handleOnSubmitProduct}>
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.nameProduct && errors.nameProduct)}
                    fullWidth
                    helperText={touched.nameProduct && errors.nameProduct}
                    label="Nombre de Producto"
                    margin="normal"
                    name="nameProduct"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nameProduct}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.initialExistence && errors.initialExistence
                    )}
                    fullWidth
                    helperText={
                      touched.initialExistence && errors.initialExistence
                    }
                    label="Existencia Inicial"
                    margin="normal"
                    name="initialExistence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.initialExistence}
                    variant="outlined"
                    type="number"
                  />

                  <TextField
                    error={Boolean(
                      touched.purchasePrice && errors.purchasePrice
                    )}
                    fullWidth
                    helperText={touched.purchasePrice && errors.purchasePrice}
                    label="Precio Compra"
                    margin="normal"
                    name="purchasePrice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.purchasePrice}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    error={Boolean(touched.salePrice && errors.salePrice)}
                    fullWidth
                    helperText={touched.salePrice && errors.salePrice}
                    label="Precio Venta"
                    margin="normal"
                    name="salePrice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salePrice}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    error={Boolean(
                      touched.wholeSalePrice && errors.wholeSalePrice
                    )}
                    fullWidth
                    helperText={touched.wholeSalePrice && errors.wholeSalePrice}
                    label="Precio Venta Mayoreo"
                    margin="normal"
                    name="wholeSalePrice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.wholeSalePrice}
                    variant="outlined"
                    type="number"
                  />

                  {isLoading && <LinearProgress color="secondary" />}

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained">
                      Salvar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Card>
    </Page>
  );
};

export default ProductForm;
