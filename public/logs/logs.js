//Runs the getData-function
getData();

//Asynchronously calls for a fetch in index.js
//Prints the res data sent back by get-function into the the page
async function getData() {
  const res = await fetch('/api');
  const data = await res.json();
  for(item of data) {
    const root = document.createElement('div');
    const gps = document.createElement('div');
    const date = document.createElement('div');

    const time = new Date(item.timestamp).toLocaleString();
    gps.textContent = `${item.lat}°, ${item.lon}°`;
    date.textContent = time;

    root.append(gps, date);
    document.body.append(root);
  }
  console.log(data);
}
//CHANGE