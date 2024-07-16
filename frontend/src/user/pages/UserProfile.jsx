import { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

function UserProfile() {
  const auth = useContext(AuthContext);

  return (
    <div>
      UserProfile
      {auth.userId}
      <button onClick={() => auth.logout()}>logout</button>
    </div>
  );
}

export default UserProfile;
