import Cookies from "js-cookie";

export const isUserAdmin = (userID) => Number(Cookies.get("id")) === userID;