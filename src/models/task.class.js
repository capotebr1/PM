export class TASK {
    constructor(id, name, description, creationDate, deadline, urgency, ownerID, projectID){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = creationDate;
        this.deadline = deadline;
        this.urgency_id = urgency;
        this.projects_id = Number(projectID);
        this.ownerID = ownerID;
    }
}

