import Main from "../../components/Main";

export interface UserObj {
  email: string | null;
  displayName: string | undefined | null;
  uid: string | null;
  updateProfile: any;
}

const Home = () => {
  return <Main />;
};

export default Home;
