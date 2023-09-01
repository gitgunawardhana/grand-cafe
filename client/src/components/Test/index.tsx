import * as React from "react";

interface UserData {
  id: number;
  first_name: string;
  email: string;
  avatar: string;
  // Other properties if present
}

export default function App() {
  const [users, setUsers] = React.useState<UserData[]>([]); // Specify the type here

  const f = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };

  React.useEffect(() => {
    f();
  }, []);

  return (
    <div className="App">
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        {users.map((user) => (
          <div key={user.id}>
            <p>
              <strong>{user.first_name}</strong>
            </p>
            <p>{user.email}</p>
            <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
