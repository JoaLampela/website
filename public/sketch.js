//Runs the postData function
postData();

//Creates a JSON-string using the given values
//Asynchronously calls for a fetch in index.js
//Prints the res data sent back by post-function into the console
async function postData() {
  const lat = 1;
  const lon = 2;
  const data = {
    lat,
    lon
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const res = await fetch('/api', options);
  const json = await res.json();
  console.log(json);
}