import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
  Card,
  CardHeader,
  Divider
} from '@material-ui/core';
import axios from 'axios';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';
import Page from '../../components/Page';

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

class SalesFormView extends React.Component {
  state = { products: [], isLoading: false, values: {} };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await axios.get(`${baseUrl}/products`);
    if (isArray(response.data.result.data)) {
      this.setState({ products: response.data.result.data });
    }
  };

  handleOnSubmitSale = async () => {
    const { values } = this.state;
    let user = localStorage.getItem('UserInfo');

    user = user && JSON.parse(user);

    const request = { ...values };
    request.userName = user.nickname;
    this.setState({ isLoading: true });

    const response = await axios.post(`${baseUrl}/sales`, request);
    this.setState({ isLoading: false });

    if (
      response.data.result.message === 'The sale was registered successfully'
    ) {
      toast.success(response.data.result.message);
    }

    if (response.data.result.notification) {
      toast.warn(response.data.result.notification);
    }
  };

  handleChange = event => {
    const { values } = this.state;
    const { value, name } = event.target;

    values[name] = value;

    this.setState({ values: values });
  };
  handleOnChangeQuantity = event => {
    const { values, products } = this.state;
    let { value } = event.target;
    value = parseInt(value);

    values.soldQuantity = value;
    this.setState({ values });

    if (values.productId && values.typeSale && value) {
      const product = products.find(
        item => item.productId === values.productId
      );
      const typeSaleSelected = values.typeSale;
      if (typeSaleSelected === 'Normal') {
        values.total = value * product.salePrice;
        this.setState({ values });

        return;
      }
      values.total = value * product.wholesaleprice;
      this.setState({ values });
    }
  };

  render() {
    const { values, products, isLoading } = this.state;

    return (
      <Page title="Register Sale">
        <Card>
          <CardHeader title="Registro de Ventas" />
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
                  productId: 0,
                  typeSale: null,
                  total: '',
                  commentary: ''
                }}
                validationSchema={Yup.object().shape({
                  productId: Yup.number()
                    .max(255)
                    .required('El producto es requerido'),
                  typeSale: Yup.string()
                    .max(255)
                    .required('El tipo de venta es requerido')
                })}
                onSubmit={this.handleOnSubmitSale}>
                {({
                  errors,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  touched
                }) => (
                  <form onSubmit={handleSubmit}>
                    <InputLabel id="demo-simple-select-label">
                      Nombre de Producto
                    </InputLabel>
                    <Select
                      disabled={!products.length}
                      error={Boolean(touched.productId && errors.productId)}
                      helperText={touched.productId && errors.productId}
                      label="Nombre de Producto"
                      margin="normal"
                      name="productId"
                      onBlur={handleBlur}
                      onChange={this.handleChange}
                      value={values.productId}
                      fullWidth>
                      {products.map(product => (
                        <MenuItem value={product.productId}>
                          {product.nameProduct}
                        </MenuItem>
                      ))}
                    </Select>
                    <br />
                    <br />
                    <InputLabel>Tipo de Venta</InputLabel>
                    <Select
                      // error={Boolean(touched.typeSale && errors.typeSale)}
                      fullWidth
                      helperText={touched.typeSale && errors.typeSale}
                      label="Tipo"
                      margin="normal"
                      name="typeSale"
                      onBlur={handleBlur}
                      onChange={this.handleChange}
                      value={values.typeSale}>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Mayoreo">Mayoreo</MenuItem>
                    </Select>

                    <TextField
                      error={Boolean(
                        touched.soldQuantity && errors.soldQuantity
                      )}
                      fullWidth
                      helperText={touched.soldQuantity && errors.soldQuantity}
                      label="Cantidad"
                      margin="normal"
                      name="soldQuantity"
                      disabled={!values.productId || !values.typeSale}
                      onChange={this.handleOnChangeQuantity}
                      type="number"
                      value={values.soldQuantity}
                      variant="outlined"
                    />
                    <InputLabel>Total </InputLabel>
                    <TextField
                      error={Boolean(touched.total && errors.total)}
                      fullWidth
                      margin="normal"
                      name="total"
                      onBlur={handleBlur}
                      onChange={this.handleChange}
                      type="number"
                      value={values.total}
                      variant="outlined"
                      disabled
                    />

                    <TextField
                      error={Boolean(touched.commentary && errors.commentary)}
                      fullWidth
                      helperText={touched.commentary && errors.commentary}
                      label="Comentario"
                      margin="normal"
                      name="commentary"
                      onBlur={handleBlur}
                      onChange={this.handleChange}
                      multiline
                      value={values.commentary}
                      variant="outlined"
                    />
                    {isLoading && <LinearProgress color="secondary" />}

                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={this.handleOnSubmitSale}>
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
  }
}

export default SalesFormView;
