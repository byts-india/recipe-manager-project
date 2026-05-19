function successResponse(res, msg, data=null, statusCode=200) {
  res.status(statusCode).json({
    success: true,
    message: msg,
    data: data,
  });
}

function failureResponse(res, msg, statusCode=500) {
  res.status(statusCode).json({
    success: false,
    message: msg,
  });
}

module.exports = { successResponse, failureResponse };
