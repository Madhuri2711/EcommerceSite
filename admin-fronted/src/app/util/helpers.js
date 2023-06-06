export const signOut = (props) => {
    localStorage.removeItem("token");
    props.history.push('/login')
  };