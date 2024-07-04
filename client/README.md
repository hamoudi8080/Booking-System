# Fullstack-booking-system
-first download node.js LTS

-create react project

-download npm install tailwindcss follow steps here
https://tailwindcss.com/docs/guides/create-react-app

-this website is used for icons https://heroicons.com/ 

-Create React App doesn't prescribe a specific routing solution, but React Router is the most popular one.

To add it, run:

npm install --save react-router-dom

To add Axios for handling HTTP requests, install it in clinet folder
npm install axios



Install express for backend, install it in api folder
npm install express 

Install so that backend and receive requests, , install it in api folder  
npm install cors

Install for database
npm install mongodb 


install env configration in api folder
npm install dotenv

we dont want to send password of user as clear password to database,
so we encrypt first, install in api folder,
npm install bcryptjs


install json web token in api folder
npm install jsonwebtoken


# source of information and technical:

to know the difference between routing..
https://www.geeksforgeeks.org/reactjs-types-of-routers/


grow css is used look at this link 
https://tailwindcss.com/docs/flex-grow


CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
https://classic.yarnpkg.com/en/package/cors

for password encryption
https://www.npmjs.com/package/bcrypt

















# why jwt is important

The server verifies the credentials. If they’re correct, the server generates a JWT, signs it with a secret key, and sends it back to the user.
The user stores this token and sends it along with future requests to authenticate themselves.
When the server receives a request with a token, it verifies the token using the secret key. If the token is valid, the server processes the request. If the token is not valid (for example, if it has been tampered with), the server rejects the request.
This process ensures that the server can authenticate the user for each request without having to store any state information about logged-in users. This is one of the reasons why JWTs are popular for authentication in stateless, RESTful APIs.

notice the secrete key is kept in server side.


# Ok! how does the server verifying the future requests from client?

When the server receives a token from a client, it needs to verify that the token is legitimate and hasn’t been tampered with. This is done using the secret key that was used to sign the token in the first place.

Here’s how it works:

Extract the Token: The server extracts the token from the incoming request. This is usually found in the Authorization header.
Decode the Token: JWTs are made up of three parts: the header, the payload, and the signature. These parts are Base64Url encoded and separated by dots. The server decodes these parts to read the contents.
Verify the Signature: The signature is the most important part for verifying the token. It’s created by taking the encoded header, the encoded payload, a secret key, and applying a hashing algorithm to them. When the server receives a token, it forms a new signature in the same way using the header and payload from the incoming token and the secret key stored on the server. If the signature formed by the server matches the signature in the incoming token, it means the token is legitimate and hasn’t been tampered with.
Check the Claims: Once the server has verified the token, it can trust the claims in the payload. Claims are statements about the user, like their username or email address.
So, if a user tampers with the token (for example, by changing the username in the payload), the signature will no longer match, because the server uses the original secret key to create the signature. The server will know something is wrong, and it will reject the token.

This is why it’s crucial to keep the secret key… well, secret! If someone else knows the secret key, they could create their own tokens, and the server wouldn’t be able to tell the difference. 




Imagine you’re at an amusement park. When you first enter, you show your ticket and get a wristband. Now, every time you want to ride something, you just show your wristband. You don’t need to dig out your ticket again. That’s kind of how JWTs work.

Here’s a simpler explanation of the code:

Importing Modules: The code starts by importing several modules. These are like tools in a toolbox, each one does a different job. For example, jsonwebtoken is the tool that will create and check our digital wristbands.
Setting Up Secrets: The jwtSecret is a special password that the server uses to make sure the digital wristbands haven’t been tampered with. It’s like the unique design on a real wristband that’s hard to fake.
Creating the Wristband: When a user logs in (app.post('/login', async (req, res) => {...}), the server checks their username and password. If they’re correct, the server creates a digital wristband (jwt.sign({email: userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {...});). This wristband says “I am this user” and is signed with the server’s secret password.
Using the Wristband: The server sends the wristband back to the user, who keeps it safe. Now, whenever the user wants to do something, they send the wristband along to prove who they are. The server checks the wristband’s signature to make sure it’s real and hasn’t been tampered with.
So, JWTs are a way for users to prove who they are to the server, without having to send their username and password every time. It’s like getting a wristband when you enter an amusement park, so you can enjoy all the rides without having to show your ticket every time. I hope this makes things clearer! 😊


# how about session ?

In the context of web applications, a session is a server-side storage of information that is desired to persist throughout the user’s interaction with the web site or web application. Instead of storing large and constantly changing information via cookies in the user’s browser, only a unique identifier is stored on the client side (called a “session id”). This session id is passed to the web server every time the browser makes an HTTP request (i.e. when a page is loaded). The web application pairs this session id with its internal database and retrieves the stored variables for use by the requested page.

However, using JWT for authentication is a stateless method, meaning it doesn’t require the server to keep a record of which users are logged in. This can make it more scalable and easier to use across multiple servers.


# how about cookies ? why do use it here in project ?

Cookies are used in this context as a way to store the JWT on the client side (the user’s browser). When the server sends the JWT to the client, it sets a cookie with the JWT as its value. This is what the line res.cookie('token', token) is doing.

Here’s why cookies are used:

Persistence: Cookies are stored in the user’s browser, so they persist even if the user closes the browser or reboots their computer. This means the user can remain authenticated even across different browsing sessions.
Security: Cookies can be configured to only be sent over secure (HTTPS) connections, which helps protect the JWT from being intercepted.
Automatic Sending: Once a cookie is set, the user’s browser will automatically include it in all future requests to the same domain. This means the user doesn’t have to manually attach the JWT to every request they make.
Domain Restriction: Cookies are only sent to the domain that set them. This provides an additional layer of security as it ensures that the JWT can’t be sent to any malicious third-party domains.
So, in the login route you provided, once the user is authenticated, a JWT is created and sent back to the user’s browser inside a cookie. For all subsequent requests, the user’s browser will automatically include this cookie, allowing the server to verify the user’s identity and provide access to protected resources.