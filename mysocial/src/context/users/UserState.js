import UserContext from "./userContext";

const UserState = (props) => {

    return(
        <UserContext.Provider >
        {props.children}
        </UserContext.Provider>
    )
}

export default UserState;