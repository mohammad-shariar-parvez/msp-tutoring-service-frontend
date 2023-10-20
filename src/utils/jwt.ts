import jwtDecode from "jwt-decode";

export const decodedToken = (token: string) => {
    console.log("WWWWWWWW______", token);

    return jwtDecode(token);
};