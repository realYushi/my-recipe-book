const testAuth = (req, res, next) => {
    req.user = {
        uid: 'test-user-123',
        email: 'test@example.com',
        name: 'Test User'
    };
    console.log('Test user authenticated');

    next();
};

export default testAuth;
