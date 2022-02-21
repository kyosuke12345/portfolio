const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('Not set NODE_ENV');
}

const enviroment = {
  NODE_ENV: NODE_ENV,
};

export default enviroment;