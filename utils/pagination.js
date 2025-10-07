const safeParseInt = (value, defaultValue) => {
  const parsed = parseInt(value);
  return isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
};

export const Pagination = async (
  Model,
  req,
  query = {},
  sort = { createdAt: -1 }
) => {
  try {
    const page = safeParseInt(req.body.page, 1);
    const perPageRaw = req.body.per_page || req.body.limit || 10;

    const perPage =
      typeof perPageRaw === "string" && perPageRaw.toLowerCase() === "all"
        ? null
        : safeParseInt(perPageRaw, 10);

    const totalRecords = await Model.countDocuments(query);

    let dataQuery = Model.find(query).sort(sort);

    if (perPage !== null) {
      dataQuery = dataQuery.skip((page - 1) * perPage).limit(perPage);
    }

    const data = await dataQuery;

    return {
      data,
      pagination: {
        page: perPage === null ? 1 : page,
        per_page: perPage === null ? "All" : perPage,
        totalRecords,
        totalPages: perPage === null ? 1 : Math.ceil(totalRecords / perPage),
        hasNextPage: perPage === null ? false : page * perPage < totalRecords,
      },
    };
  } catch (error) {
    throw error;
  }
};
