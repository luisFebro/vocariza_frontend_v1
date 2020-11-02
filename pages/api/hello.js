// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*
They can be deployed as Serverless Functions (also known as Lambdas).
 */

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
