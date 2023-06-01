const LandingPage = ({ color }) => {
  console.log("I am in the component", color);
  return <h1>Landing Page</h1>;
};

//this getInitialProps is afunc provided by NextJs
//It will run the function inside the server once
//and return the data to the react component as props,
//then it will run in the frontend again
LandingPage.getInitialProps = () => {
  console.log("I am on the server");

  return { color: "red" };
};

export default LandingPage;
