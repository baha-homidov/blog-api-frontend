export default async function isLoggedIn() {
  try {
    const response = await fetch("https://blogapibackend.onrender.com/auth/getuser", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Network error");
      return false;
    }

    const data = await response.json();
    
    if (data.user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
