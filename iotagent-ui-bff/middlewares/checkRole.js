module.exports = async (req, res, next) => {
  if(!process.env.KEYCLOAK_AUTHORIZED_ROLE) {
    next();
  } else {
    try {
      const tokenData = req.tokenData;
      const roles = tokenData.realm_access.roles;

      const hasRole = roles.includes(process.env.KEYCLOAK_AUTHORIZED_ROLE);

      if (hasRole) {
        next();
      } else {
        const error = new Error("Access Denied: You do not have permission to access this.");
        error.statusCode = 401;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}
