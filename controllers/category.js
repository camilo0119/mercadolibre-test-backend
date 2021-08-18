const { default: axios } = require('axios');
const { response } = require('express');
const { DATA_AUTHOR } = require('../constanst/constants');

const findCategoryById = async (req, res = response) => {

  try {
    let response = await axios(`${process.env.API_MERCADOLIBRE}/categories/${req.params.id}`)
    response = response.data

    if (response?.id) {
      res.json({
        ...DATA_AUTHOR,
        ...response
      })
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
  findCategoryById
}