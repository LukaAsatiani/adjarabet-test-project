'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_views extends Model {
    static associate(models) {
			
    }
  };
  product_views.init({
    user_id: {
			type: DataTypes.INTEGER.UNSIGNED
		},
    product_id: {
			type: DataTypes.INTEGER.UNSIGNED
		},
  }, {
    sequelize,
		timestamps: false,
    modelName: 'product_views',
  });
  return product_views;
};