import Container from "../../components/Container/Container";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Navigation />
      <Container>
        <h1 className={styles.title}>404 - Page Not Found</h1>
      </Container>
    </>
  );
};

export default NotFoundPage;
