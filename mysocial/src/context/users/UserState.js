import UserContext from "./userContext";


const UserState = (props) => {
   
    const url = 'http://localhost:5000'

    const login = async (email, password) => {
        const response = await fetch(`${url}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            await localStorage.setItem('token', json.authToken);
        }
    }

    const signUp = async (name, email, password) => {

        const response = await fetch(`${url}/api/user/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            await localStorage.setItem('token', json.authToken);
        }

    }

    return (
        <UserContext.Provider value={{ login, signUp }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;