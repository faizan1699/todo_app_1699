export const validateReqFields = (body, requiredFields) => {
  if (!body) {
    return {
      success: false,
      message: `Request body is missing`,
    };
  }
  const missingFields = [];
  requiredFields.forEach((field) => {
    if (
      body[field] === undefined ||
      body[field] === null ||
      (typeof body[field] === "string" && body[field].trim() === "")
    ) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return {
      success: false,
      message:
        requiredFields?.length > 1
          ? `${missingFields.join(", ")} are required`
          : `${missingFields.join(", ")} is required`,
    };
  }

  return { success: true };
};
