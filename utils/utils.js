const constants = require("../constanst/constants")

const bffItem = ({
  address,
  condition,
  currency_id,
  id,
  price,
  title,
  thumbnail,
  shipping,
  sold_quantity,
  category_id
}) => ({
  id,
  title,
  price: {
    currency: currency_id,
    amount: price,
    decimals: currencyFormatter(price)
  },
  picture: thumbnail,
  condition,
  free_shipping: shipping.free_shipping,
  address: !!address ? address.state_name : '',
  sold_quantity,
  category_id
})

const bffObjectFill = (payload, propsDelete = []) => {
  const response = bffItem(payload)
  if (propsDelete) {
    propsDelete.forEach(keyName => {
      delete response[keyName]
    })
  }
  return response
}

const bffItemListResponse = ({ results, filters}) => {
  const categories = filters.find(filter => filter.id === "category")
  return {
    ...constants.DATA_AUTHOR,
    categories: categories ? categories?.values[0]?.path_from_root.map(category => category.name) : [],
    items: results.slice(0, 4).map(item => bffObjectFill(item, ['sold_quantity', 'category_id'])) // Consultar con negocio props address, segun mockups
  }
}

const formatter = new Intl.NumberFormat(constants.COUNTRY, {
  style: 'currency',
  currency: constants.CURRENCY,
})

const currencyFormatter = (value) => {
  const formatterValue = formatter.format(Number(value))
  return formatterValue.slice(0, formatterValue.indexOf(','))
}

module.exports = {
  bffItem,
  bffObjectFill,
  bffItemListResponse
}