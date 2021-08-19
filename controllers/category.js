const { default: axios } = require('axios');
const { response } = require('express');
const { DATA_AUTHOR } = require('../constanst/constants');

const findCategoryById = async (req, res = response) => {

  try {
    const response = await axios(`${process.env.API_MERCADOLIBRE}/categories/${req.params.id}`)
    const { path_from_root} = response.data

    if (response.data) {
      res.json({
        ...DATA_AUTHOR,
        categories: path_from_root
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