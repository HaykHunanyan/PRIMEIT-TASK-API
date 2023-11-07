const { Op } = require('sequelize');

module.exports = function (options = {}, deepWhere = false) {
  return async context => {
    const { query } = context.params;
    const getRelation = relation => {
      const sequelizeInstance = context.app.get('sequelizeClient');
      let relAs = '';
      if (query[relation.as]) {
        relAs = {};
        const rel = JSON.parse(query[relation.as]);
        for (const key in rel) {
          if (Object.hasOwnProperty.call(rel, key)) {
            const element = rel[key];
            if (typeof element === typeof {} && element?.$iLike) {
              relAs[key] = { [Op.iLike]: element?.$iLike };
            } else {
              relAs[key] = element;
            }
          }
        }
      }
      const rel = {
        ...relation,
        model: sequelizeInstance.models[relation.model],
        where: deepWhere ? { ...relAs, ...relation?.where } : relAs,
      };
      // if (query[relation.as]) {
      //   rel[relation.as] = { where: { ...JSON.parse(query[relation.as]) } };
      // }
      return rel;
    };
    if (query) {
      const include = query?.include || [];

      if (query.include) {
        delete context.params.query.include;
      }
      if (options.models.length) {
        context.params.sequelize = {
          include: options.models
            .filter(({ as }) => include.includes(as))
            .map(i => {
              const relations = {
                ...getRelation(i),
              };

              if (relations.include) {
                relations.include = relations.include.map(rel =>
                  getRelation(rel)
                );
              }

              return relations;
            }),
          raw: false,
        };
      }
      include.forEach(i => {
        delete context.params.query[i];
      });
      return context;
    }
  };
};
