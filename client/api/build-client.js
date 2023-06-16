import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //we are in the server, we need to
    //preconfigure axios to include headers(hostname, cookies)
    //and pass BaseURL for our ingress service

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we must be on the browser
    // no need for any config
    return axios.create({
      baseURL: "/",
    });
  }
};
