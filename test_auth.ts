import { insforge } from "./lib/insforge";

async function test() {
  const { data, error } = await insforge.auth.signInWithPassword({
    email: "adrinindadewa2016@gmail.com",
    password: "password123", // Assuming we don't know the password, wait I don't know the password!
  });
  console.log(data, error);
}

test();
