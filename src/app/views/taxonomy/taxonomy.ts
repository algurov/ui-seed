export const taxonomy = [
  {
    title: 'Лаборатории',
    name: 'Laboratory',
    api: 'laboratory',
    columns: [
      {name:'name', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Единицы измерения',
    name: 'Units',
    api: 'unit',
    columns: [
    ]
  },
  {
    title: 'Место хранения',
    name: 'Storage',
    api: 'productStorage',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Параметры',
    name: 'Property',
    api: 'property',
    columns: [
      {name: 'nameRu', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title:'GoodsCategoryProperty',
    name: 'GoodsCategoryProperty',
    api: 'goodsCategoryProperty',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Типы исследования',
    name: 'ResearchType',
    api: 'researchType',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Целевые документы',
    name: 'TargetDocuments',
    api: 'targetDocument',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Страны',
    name: 'Countries',
    api: 'country',
    columns: [
      {name: 'titleRu',title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Регионы',
    name: 'Regiones',
    api: 'region',
    columns: [
      {name: 'titleRu', title: 'Наименование', type: 'string'}
    ]
  },
  {
    title: 'Города',
    name: 'Cities',
    api: 'city',
    columns: [
      {name: 'titleRu', title: 'Наименование', type: 'string'}
    ]
  },
  // {
  //   name: 'ProductStorages',
  //   columns: [
  //     {name: 'name', type: 'string'},
  //     {name: 'transportation', type: 'boolean'}
  //   ]
  // },
  // {
  //   name: 'ResearchType',
  //   columns: [
  //     {name: 'name', type: 'string'},
  //     {name: 'parent', type: 'string'}
  //   ]
  // },
  // {
  //   name: 'documents',
  //   columns: [
  //     {name: 'name', type: 'string'}
  //   ]
  // },

  //refubrished
  {
    title: 'Продукты испытания',
    name: 'Goods',
    api: 'goods',
    columns: [
      {name: 'fullNameRu', title: 'Наименование', type: 'string'},
      {name: 'shortNameRu', title: 'Наименование краткое', type: 'string'},
      {name: 'fullNameEng', title: 'Наименование(англ.)',type: 'string'},
      {name: 'tnved', title: 'Код ТНВЭД', type: 'string'},
      {name: 'goodsCategories',title: 'Категории', type: 'link', linkTo: 'Goods'}
    ]
  },

  //refubrished
  {
    title: 'Категории продуктов испытаний',
    name: 'GoodsCategory',
    api: 'goodsCategory',
    columns: [
      {name: 'fullName', title: 'Наименование', type: 'string'},
      {name: 'shortName', title: 'Наименование краткое', type: 'string'},
      {name: 'goodsCategoryTypes', title: 'Тип категории', type: 'link', linkTo: 'GoodsCategory'},
      {name: 'standard', title: 'Стандарт', type: 'link', linkTo: 'Standard'}
      // {name: 'researchProduct', type: 'link', linkTo: 'Goods'},
      // {name: 'researchProductCategoryType', type:'link', linkTo: 'GoodsCategoriesTypes'}
    ]
  },
  //refubrished
  {
    title: 'Типы категорий продуктов испытаний',
    name: 'GoodsCategoryType',
    api: 'goodsCategoryType',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'},
      {name: 'description', title: 'Описание', type: 'string'}
    ]
  },

  //refubrished
  {
    title: 'Стандарты',
    name: 'Standard',
    api: 'standard',
    columns: [
      {name: 'fullName', title: 'Наименование', type: 'string'},
      {name: 'shortName', title: 'Наименование краткое', type: 'string'},
      // {name: 'parent', type: 'link', linkTo: 'Standard'},
      {name: 'standardCategory', title: 'Категория', type: 'link', linkTo:'StandardCategory'},
      {name: 'createDate', title: 'Создан', type: 'date'},
      {name: 'startDate', title: 'Начало', type: 'date'},
      {name: 'stopDate', title: 'Конец', type: 'date'},
      {name: 'description', title: 'Описание', type: 'string'}
    ]
  },

  //refubrished
  {
    title: 'Категории стандарта',
    name: 'StandardCategory',
    api: 'standardCategory',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },

  //refubrished
  {
    title: 'Дополнительные условия стандарта',
    name: 'StandardAdditionalCondition',
    api: 'standardAdditionalCondition',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'},
      {name: 'standard', title: 'Стандарт', type: 'link', linkTo: 'Standard'}
    ]
  },
  // {
  //   name: 'Properties',
  //   columns: [
  //     {name: 'name', type: 'string'},
  //     {name: 'englishName', type: 'string'},
  //     {name: 'descriptor', type: 'string'},
  //     {name: 'precision', type: 'integer'},
  //     {name: 'researchCategory', type: 'string'},       //TODO here
  //     {name: 'researchType', type: 'link', linkTo: 'ResearchType'}
  //   ]
  // },
  // {
  //   name: 'PropertiesUnits',
  //   columns: [
  //     {name: 'unit', type: 'link', linkTo: 'Units'},
  //     {name: 'research_params', type: 'link', linkTo: 'Properties'}
  //   ]
  // },
  // {
  //   name: 'Units',
  //   columns: [
  //     {name: 'name', type: 'string'},
  //     {name: 'englishName', type: 'string'},
  //     {name: 'description', type: 'string'},
  //     {name: 'precision', type: 'integer'}
  //   ]
  // },
  // {
  //   name: 'GoodsCategoriesProperties',
  //   columns: [
  //     {name: 'properties', type: 'link', linkTo: 'Properties'},
  //     {name: 'name', type: 'string'},
  //     {name: 'unit', type: 'link', linkTo: 'Units'},
  //     {name: 'parent', type: 'link', linkTo: 'GoodsCategoriesProperties'},
  //     {name: 'standard', type: 'link', linkTo: 'Standards'},
  //     {name: 'standardAdditionalConditions', type: 'link', linkTo: 'StandardAdditionalConditions'},
  //     {name: 'goodsCategory', type: 'link', linkTo: 'GoodsCategories'},
  //     {name: 'propertiesType', type: 'link', linkTo: 'PropertiesType'}
  //   ]
  // },

  //refubrished
  {
    title: 'Типы испытания',
    name: 'PropertyType',
    api: 'propertyType',
    columns: [
      {name: 'name', title: 'Наименование', type: 'string'}
    ]
  },
  // {
  //   name: 'GoodsCategoriesPropertiesValues',
  //   columns: [
  //     {name: 'goodsCategoriesProperties', type: 'link', linkTo: 'GoodsCategoriesProperties'},
  //     {name: 'goodsCategories', type: 'link', linkTo: 'GoodsCategories'},
  //     {name: 'standardAdditionalConditions', type: 'link', linkTo: 'StandardAdditionalConditions'},
  //     {name: 'propertiesType', type: 'link', linkTo: 'PropertiesType'},
  //     {name: 'min', type: 'string'},
  //     {name: 'max', type: 'string'},
  //     {name: 'text', type: 'string'},
  //     {name: 'startDate', type: 'date'},
  //     {name: 'endDate', type: 'date'}
  //   ]
  // },
  // {
  //   name: 'GoodsCategoriesPropertiesTestStandards',
  //   columns: [
  //     {name: 'stanadrd', type: 'link', linkTo: 'Standards'},
  //     {name: 'goodsCategoriesProperties', type: 'link', linkTo: 'GoodsCategoriesProperties'}
  //   ]
  // }
];
