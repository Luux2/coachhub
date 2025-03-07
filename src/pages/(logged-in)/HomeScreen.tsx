import Animation from "../../components/misc/Animation.tsx";
import {Outlet} from "react-router-dom";
import Header from "../../components/misc/Header.tsx";
import MenuTabs from "../../components/misc/MenuTabs.tsx";

export const HomeScreen = () => {

    return (
        <>


            <Animation>
                <Header />
                <div className="flex mt-20">
                    <MenuTabs />
                    <Outlet />
                </div>
            </Animation>
        </>
    );
};

export default HomeScreen;
