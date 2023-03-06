import axios from "axios";

export const get_profile = async (nickname) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : "",
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/${nickname}`, config);

        return res.data;
    }catch(err){
        return {"error": true};
    }
};

export const get_profiles = async () => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : "",
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/accounts/index/`, config);
        
        return res.data;
    }catch(err){
        return {"error": true};
    }
};

export const edit_profile = async (formData) => {
    console.log("Inside edit profile: ", formData)

    try{
        const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/v1/accounts/edit-profile/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : "",
                'Accept': 'application/json'
            },
            data: formData
        });
        
        return res.data;
    }catch(err){
        return {"error": true};
    }
};