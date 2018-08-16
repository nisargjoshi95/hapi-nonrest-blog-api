const signOptions = {
  algorithm: 'HS256',
  expiresIn: "3h",
};

const verifyOptions = {
  algorithms: ['HS256'],
  maxAge: '3h',
};

const secretKey = '3fnRnLqCUnHOUA0RfFnTf9kK37FfljFX5et/2HSvZ/i78oWhDCvL/WhahMQHg9+daYVUSTebNBWBLMb3DTEC83wS0m9M4JgmuMUaIUQrWPBRjEOamw5TRYcgfgerP4mJL/HJVpcASDveBGFrRkAsDHTGuzjXmqq7urE1d2z0URKbVMsi+pooqyCRZzWFyNs0k63i3hkjKftJtERmDFGPNaGtRGMnLZMf0ySoqFKJKWm1FvMpqtTJvxfRrGqyiLjda+Xuq/RbVAELhqGQnNqA0Hi0Qx0tVmq5NO9IDTJAGWahQEeScGiyaUEAHJ94kGtI2DCezTzXeITQzH66KhGA9g==';

export {signOptions, verifyOptions, secretKey};