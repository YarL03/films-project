import { FC } from "react"
import GenresMenu from "./genres/GenresMenu"
import Menu from "./Menu"
import { firstMenu, userMenu } from "./menu.data"

const MenuContainer: FC = () => {
    return (
        <div>
            <Menu menu={firstMenu}/>
            <GenresMenu/>
            <Menu menu={userMenu}/>
        </div>
    )
}

export default MenuContainer