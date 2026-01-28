import mssql from "mssql";

const connectionSettings  = {
    server: "localhost\SQLEXPRESS02",
    database: "SistemaGestion",
    user: "Gabri",
    password: "",
    options:    {
        trustServerCertificate: true
        }
};

export async function getConnection(){
    try{
        return await mssql.connect(connectionSettings);
    }
    catch(error){
        console.error(error);
    }
}

export {msssql};

