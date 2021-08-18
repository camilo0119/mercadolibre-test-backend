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
  address: address.state_name ?? '',
  sold_quantity,
})

const bffItemListObject = (payload) => {
  const response = bffItem(payload)
  delete response.address
  delete response.sold_quantity
  return response
}

const bffItemListResponse = ({ results, filters}) => {
  const categories = filters.find(filter => filter.id === "category")
  return {
    ...constants.DATA_AUTHOR,
    categories: categories ? categories?.values[0]?.path_from_root.map(category => category.name) : [],
    items: results.slice(0, 4).map(item => bffItemListObject(item))
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
  bffItemListObject,
  bffItemListResponse
}