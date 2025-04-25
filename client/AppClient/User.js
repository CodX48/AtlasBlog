
const userjwt = async (BodyData) => {
  const Fetched_Data = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(BodyData)
  });

    return await Fetched_Data.json();
    };

// Call the function and log the result
userjwt({
    Email:"Khatab@lol.com",
    Password: "123456789"
}).then(data => console.log(data));
  