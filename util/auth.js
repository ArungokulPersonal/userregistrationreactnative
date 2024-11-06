import axios from "axios";

const API_KEY = "AIzaSyD-QyfOVw0leOKzgKC2MRMZMCRVPFKCRek";

async function authenticateUser(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  console.log(response.data);
}

export async function createUserWithSpringBootAPI(email, username, password) {
  const response = await axios.post("http://10.0.2.2:8080/req/signup", {
    username: username,
    email: email,
    password: password,
  });
  console.log(response.data);
}

export async function loginUserWithSpringBootAPI(username, password) {
  const response = await axios.post(
    "http://10.0.2.2:8080/req/login",
    {},
    { auth: { username: username, password: password } }
  );
  console.log(response.data);
}

export async function createUser(email, password) {
  await authenticateUser("signUp", email, password);
}

export async function login(email, password) {
  await authenticateUser("signInWithPassword", email, password);
}
