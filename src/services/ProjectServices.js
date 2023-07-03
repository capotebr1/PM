const BASE_URL = "http://localhost:5000/projects";
    
export const getAllProjects = async (id) => {
    try{
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getProject = async (id) => {
    try{
        const response = await fetch(`${BASE_URL}/info/${id}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const postProject = async (name, description, date, deadline, userID) => {
    try{
        const request = await fetch(`${BASE_URL}/add` , {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name: name,
            description: description,
            creation_date: date,
            user_id: userID,
            deadline: deadline
          })
        })
        const response = await request.json();
        console.log(response);
        return response;
    }
    catch(err){
        throw new Error(err)
    }
}

export const removeProject = async (id) => {
    try{
        const request = await fetch(`${BASE_URL}/delete/${id}` , {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ id: id })
        })
        const response = request.json();
        return response;
    }
    catch(err){
        throw new Error(err);
    }
}

export const updateProject = async (id, name, desciption) => {
    try{
        const request = await fetch(`${BASE_URL}/edit/projects` , {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                description: desciption
            })
        });
        const response = await request.json();
        return response;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getAllMembers = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/user/projects/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(err);
    }
}