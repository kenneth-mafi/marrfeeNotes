const BackendAPI = (import.meta.env.VITE_NOTED_API_URL || "http://localhost:5000").replace(/\/$/, "");

const sendAPIRequest = async ( endPoint, dataObj={}, method="GET", token="" ) => {
    if (!endPoint) return { success: false, error: "No endpoint" };

    const cleanEndPoint = String(endPoint).replace(/^\/+/, "");
    const reqObj = {
        method,
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
        body: method === "GET" ? undefined : JSON.stringify(dataObj),
    };

    const res = await fetch(`${BackendAPI}/api/${cleanEndPoint}`, reqObj);

    const text = await res.text();
    let json;
    try {
         json = text ? JSON.parse(text) : {}; 
    } catch (error) {
         json = { success: false, error: text }; 
         console.log(error);
    }

    if (!res.ok) {
        return { success: false, status: res.status, ...json };
    }
    
    return json;
};

export default sendAPIRequest;
