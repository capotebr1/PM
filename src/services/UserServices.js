const BASE_URL = "http://localhost:5000/users";

export const getUsers = async () => {
    try{
        const response = await fetch(`${BASE_URL}/`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getUserProjects = async (userID) => {
    try{
        const response = await fetch(`${BASE_URL}/projects/${userID}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getUser = async (email) => {
    try{
        const response = await fetch(`${BASE_URL}/${email}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const loginUser = async (email, password) => {
    try{
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                user: {
                    password: password,
                    email: email
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}