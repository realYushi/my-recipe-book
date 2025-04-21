const bypassAuth = (req, res, next) => {
  req.user = {
    uid: "test-user-123",
    email: "test@example.com",
    name: "Test User",
  };
  next();
};

export default bypassAuth;
