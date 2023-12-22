/*import JWT from "jsonwebtoken";

//const JWT_SECRET_KEY = "57b9a4eec9243f0e6654cb870e10fbd68f1e4449aa293117ef2c88867f58321f";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "57b9a4eec9243f0e6654cb870e10fbd68f1e4449aa293117ef2c88867f58321f";


const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token," 57b9a4eec9243f0e6654cb870e10fbd68f1e4449aa293117ef2c88867f58321f");

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;*/




import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  // Vérifier si l'en-tête d'authentification est présent
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new Error("Authentication failed: Missing or invalid Authorization header"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifier et décoder le jeton JWT
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // Ajouter les informations de l'utilisateur au corps de la requête
    req.body.user = {
      userId: userToken.userId,
    };

    // Appeler next() pour passer au middleware ou à la route suivante
    next();
  } catch (error) {
    console.error(error);

    // En cas d'erreur lors de la vérification du jeton
    return next(new Error("Authentication failed: Invalid token"));
  }
};

export default userAuth;
