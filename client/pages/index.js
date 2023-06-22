import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signedin</h1>
  );
};

//this getInitialProps is a func provided by NextJs
//It will run the function inside the server once
//and return the data to the react component as props,
//then it will run in the frontend again, populating
//the default props of this component
LandingPage.getInitialProps = async (context) => {
  // context obj is passed as default prop here, it has req obj
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
/*
We must remember that once the browser calls our client service,
NextJs sends full rendered HTML,Js page back(after calling required services)
The browser runs this HTML,Js page outside of our K8s env. So when any request
comes from the browser to our client service, it is coming from outside so to speak
When browser is directly calling an API, it has all headers, cookies, hostname included
However, in getInitialProps(), when we make an axios request, it is run inside the NextJs server
which is our client service. That is why we need to identify whether the request is run inside browser
or server and then if needed(for server) we pass hostname as that of our Ingress service
Ingress will then route to the proper service

PS: When browser calls an API without hostname, it passes its own domain as hostname via headers
*/
