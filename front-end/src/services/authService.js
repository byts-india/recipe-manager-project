async function login(email, password) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const payload = JSON.stringify({ email, password });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
    };
    const response = await fetch(
      "http://localhost:5000/auth/login",
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("login failed");
  }
}
async function register(firstName, lastName, age, email, password) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const payload = JSON.stringify({
      firstName,
      lastName,
      age,
      email,
      password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
    };
    const response = await fetch(
      "http://localhost:5000/auth/register",
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("login failed");
  }
}

export { login, register };
