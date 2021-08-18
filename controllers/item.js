const { default: axios } = require('axios');
const { response } = require('express');
const { bffItemListResponse } = require('../utils/utils');

const findItemsByName = async (req, res = response) => {

  try {
    let response = await axios(`${process.env.API_MERCADOLIBRE}/sites/MLA/search?q=${req.query.q}`)
    response = response.data

    if (response) {
      res.json(bffItemListResponse(response))
    }

  } catch (e) {
    if (e.response) {
      res.status(e.response.status)
        .json({
          error: e.response.data.message
        });
    }
  }
}

const getItemById = async (req, res = response) => {

  try {

    const endpoint = `${process.env.API_MERCADOLIBRE}/items/${req.params.id}`

    let response = await axios(endpoint)
    response = response.data

    let description = await axios(`${endpoint}/description`)
    description = description.data.plain_text

    res.json({
      ...response,
      description
    })

    if (response) {
      res.json(bffItemListResponse(response))
    }
  } catch (e) {
    if (e.response) {
      res.status(e.response.status)
        .json({
          error: e.response.data.message
        });
    }
  }

}

module.exports = {
  findItemsByName,
  getItemById
}