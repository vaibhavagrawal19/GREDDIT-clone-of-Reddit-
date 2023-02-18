authentication is the proces of veritfying who someon is
authorization is the process of verifying whether someone has access to some backend resource

after authentication JWT authorization header, sent with every http request

express-rate-limit


jwt is user identification
when the user copmletes the login


bcrypt.compare?


JSON web tokens:

once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services and resources permitted with that token. 
can be used for information exchange, secure because of the public/private key mech and signature is calculated using the header and payload, so tampered messages can be detected.

structure:
three parts separated by .
header.payload.signature
thus xxx.yyy.zzz

## Header
typically consists of two parcreatedUserts, the type (which is JWT) and the hashing algorithm used (such as SHA256). then this JSON is Base64Url encoded to form the first part of JWT

## Payload
{
    "sub": "1234567",
    "name": "Vaibhav",
    "admin": true,
}

## Signature
HMACSHA256(
    base64UrlEncode(header) + '.' + base64UrlEncode(payload),
    secret
)

when the user successfully logs in, then a JWT should be returned. Then, whenever the user wants to access a protected route, then he sends the JWT, typically in the authorization header using the bearer schema.

stateless authentication mechanism as the user state is never saved in the server memory.
the server's protected routes will check for a valid JWT. all the necessary information in the JWT, so do not need to go back to the database again and again.


# Documentation for JWT

there are some options ???

options.header object can customize the header


