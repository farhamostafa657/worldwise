import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cites</p>
      <Footer />
    </div>
  );
}

export default Sidebar;
