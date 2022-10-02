import styles from "./Menu.module.scss";
import { IMenu } from "./menu.interface";
import { FC } from "react";
import MenuItem from "./MenuItem";
import AuthItems from "./auth/AuthItems";

const Menu: FC<{ menu: IMenu }> = ({ menu: { title, items } }) => {
  return (
    <div className={styles.menu}>
        <div className={styles.heading}>{title}</div>
        <ul className={styles.ul}>
            {items.map(item => 
                <MenuItem item={item} key={item.link}/>)}
            {title === 'General' ? <AuthItems/> : null}
        </ul>
    </div>
  )
};

export default Menu;
