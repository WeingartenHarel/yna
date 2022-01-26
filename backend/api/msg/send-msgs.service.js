
// const axios = require("axios");

// const postData = {
//   from: "447537404817",
//   to: ["972506555525"],
//   body: "This is a test message from your Sinch account",
// };

// const axiosConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer d6d3b4484bfb4e8a9fde393100d9ce6e",
//   },
// };
 
// function sendMsg(){
// axios
//   .post(
//     "https://sms.api.sinch.com/xms/v1/a4e710cc9a8f4ad1a6d6985369fa0afe/batches",
//     postData,
//     axiosConfig
//   )
//   .then((json) => {
//     console.log(json);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }