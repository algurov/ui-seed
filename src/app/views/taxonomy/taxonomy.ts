export const taxonomy = [
  {
    name: 'countries',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'regions',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'cities',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'ProductStorages',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'transportation', type: 'boolean'}
    ]
  },
  {
    name: 'ResearchType',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'parent', type: 'string'}
    ]
  },
  {
    name: 'documents',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'Goods',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'shortName', type: 'string'},
      {name: 'englishName', type: 'string'},
      {name: 'code', type: 'string'},
      {name: 'parent', type: 'link', linkTo: 'Goods'}
    ]
  },
  {
    name: 'GoodsCategories',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'shortName', type: 'string'},
      {name: 'parent', type: 'link', linkTo: 'GoodsCategories'},
      {name: 'researchStandart', type: 'link', linkTo: 'research_standart'},
      {name: 'researchProduct', type: 'link', linkTo: 'Goods'},
      {name: 'researchProductCategoryType', type:'link', linkTo: 'GoodsCategoriesTypes'}
    ]
  },
  {
    name: 'GoodsCategoriesTypes',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'descriptor', type: 'string'}
    ]
  },
  {
    name: 'Standard',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'shortName', type: 'string'},
      {name: 'parent', type: 'link', linkTo: 'Standard'},
      {name: 'category', type: 'link', linkTo:'StandardsCategories'},
      {name: 'addDate', type: 'date'},
      {name: 'startDate', type: 'date'},
      {name: 'endDate', type: 'date'},
      {name: 'description', type: 'string'}
    ]
  },
  {
    name: 'StandardsCategories',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'StandardAdditionalConditions',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'researchStandart', type: 'link', linkTo: 'Standard'}
    ]
  },
  {
    name: 'Properties',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'englishName', type: 'string'},
      {name: 'descriptor', type: 'string'},
      {name: 'precision', type: 'integer'},
      {name: 'researchCategory', type: 'string'},       //TODO here
      {name: 'researchType', type: 'link', linkTo: 'ResearchType'}
    ]
  },
  {
    name: 'PropertiesUnits',
    columns: [
      {name: 'unit', type: 'link', linkTo: 'Units'},
      {name: 'research_params', type: 'link', linkTo: 'Properties'}
    ]
  },
  {
    name: 'Units',
    columns: [
      {name: 'name', type: 'string'},
      {name: 'englishName', type: 'string'},
      {name: 'description', type: 'string'},
      {name: 'precision', type: 'integer'}
    ]
  },
  {
    name: 'GoodsCategoriesProperties',
    columns: [
      {name: 'properties', type: 'link', linkTo: 'Properties'},
      {name: 'name', type: 'string'},
      {name: 'unit', type: 'link', linkTo: 'Units'},
      {name: 'parent', type: 'link', linkTo: 'GoodsCategoriesProperties'},
      {name: 'standard', type: 'link', linkTo: 'Standards'},
      {name: 'standardAdditionalConditions', type: 'link', linkTo: 'StandardAdditionalConditions'},
      {name: 'goodsCategory', type: 'link', linkTo: 'GoodsCategories'},
      {name: 'propertiesType', type: 'link', linkTo: 'PropertiesType'}
    ]
  },
  {
    name: 'PropertiesType',
    columns: [
      {name: 'name', type: 'string'}
    ]
  },
  {
    name: 'GoodsCategoriesPropertiesValues',
    columns: [
      {name: 'goodsCategoriesProperties', type: 'link', linkTo: 'GoodsCategoriesProperties'},
      {name: 'goodsCategories', type: 'link', linkTo: 'GoodsCategories'},
      {name: 'standardAdditionalConditions', type: 'link', linkTo: 'StandardAdditionalConditions'},
      {name: 'propertiesType', type: 'link', linkTo: 'PropertiesType'},
      {name: 'min', type: 'string'},
      {name: 'max', type: 'string'},
      {name: 'text', type: 'string'},
      {name: 'startDate', type: 'date'},
      {name: 'endDate', type: 'date'}
    ]
  },
  {
    name: 'GoodsCategoriesPropertiesTestStandards',
    columns: [
      {name: 'stanadrd', type: 'link', linkTo: 'Standards'},
      {name: 'goodsCategoriesProperties', type: 'link', linkTo: 'GoodsCategoriesProperties'}
    ]
  }
];
