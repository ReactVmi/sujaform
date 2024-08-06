// utils/stripe.js
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51BYFp0JBAYr3SMoY9ue4vRBlYlmUzkm1yyNUJcc3zCZloyVdoeYNZWQpjEGSTVvWAzyCGZzM2h2cnXSgKGR3AgVm00YfF49TW7", {
  apiVersion: "2020-08-27" // Replace with your desired API version
});
export default stripe;
