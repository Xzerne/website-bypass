var button = document.getElementById("submit");
var input = document.getElementById("input");
var result = document.getElementById("result");
var openlink = document.getElementById("openlink");

let resultUpdated = false

button.addEventListener('click', async function () {
  button.disabled = true;
  const response = requestsapi(input.value)
  if (response.status == "success") {
    input.value = null
    result.value = response.key
    resultUpdated = true
  }
})

setTimeout(() => {
  if (!resultUpdated || !button.disabled) {
    openlink.style.display = 'none';
  }
}, 100);

async function requestsapi(link) {
  try {
    const response = await fetch(`https://nakano-miku-api-steel.vercel.app/bypass?url=${encodeURIComponent(link)}`);

    // Check if the API response is successful
    if (response.key) {
      return response.json(); 
    } else {
      console.error('API request failed with status:', response.status);
      throw new Error(`API request failed with status: ${response.status}`); 
    }
  } catch (e) {
    console.error('Error fetching data:', e);
    throw new Error("Something went wrong with the api");
  }
}


