const bypassAuth = (req, res, next) => {
  req.user = {
    uid: "123e4567-e89b-12d3-a456-426614174000",
    email: "john.doe@example.com",
    name: "john_doe",
  };
  next();
};

module.exports = bypassAuth;
