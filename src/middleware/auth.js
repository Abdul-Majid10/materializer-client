import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
    const {currentUser, isAuthenticated} = useSelector((state)=>state.user);
    if(!currentUser?.token && !isAuthenticated){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}

export const NonAuthorizeUser = ({ children }) => {

    const {currentUser, isAuthenticated} = useSelector((state)=>state.user);

    if(currentUser?.token && isAuthenticated){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}

export const ProtectRoute = ({ children }) => {
    const { state } = useLocation();
    const  username  = state ? state.username : null;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}
