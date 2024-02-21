import { useState, useEffect } from "react";


import apiInstance from "./api";

const Users = () => {
    const [users, setUsers] = useState();
  
    const getUsers = async () => {
      try {
          const response = await apiInstance.get('/user/profile');
          console.log(response.data);
          setUsers(response.data)
         
      } catch (err) {
          console.error(err);
        
      }
  }
const handleSubmit = ()=>{
  getUsers()
}
    return (
        <article>
          <button onClick={handleSubmit}>get user</button>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;