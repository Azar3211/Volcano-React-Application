import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => navigate('/register'); //This function will navigate to the register page
    const navigateToLogin = () => navigate('/login'); //This function will navigate to the login page
    const navigateToHome = () => navigate('/'); //This function will navigate to the home page
    const navigateToVolcanoes = () => navigate('/volcanoes'); //This function will navigate to the list of volcanoes page
    const navigateToVolcanoInfo = (id) => {

        navigate(`/volcanoes/${id}`); //This function will navigate to the volcano info page with the id of the volcano as a parameter

    }

    return {
        navigateToRegister,
        navigateToLogin,
        navigateToHome,
        navigateToVolcanoes,
        navigateToVolcanoInfo
    };
}

export default useNavigation;
