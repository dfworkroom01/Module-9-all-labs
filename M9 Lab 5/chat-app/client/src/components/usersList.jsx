import React from 'react';

// UsersList component displays all connected users
const UsersList = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="users-list">
        <h3>No users online</h3>
      </div>
    );
  }

  return (
    <div className="users-list">
      <h3>Users Online</h3>
      <ul>
        {users.map((user, index) => (
          // Ensure user is an object with a 'nickname' property
          <li key={index}>{user.nickname}</li>  
        ))}
      </ul>
    </div>
  );
};

export default UsersList;



