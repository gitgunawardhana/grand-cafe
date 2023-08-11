import image from "../../assets/images/HomePage/Burger.png";

export default function Avatar({ person, size }) {
    return (
     <>
     <div>
     <img
        className="avatar"
        src={image}
        alt={person.name}
        width={size}
        height={size}
      />
      <p>{person.name}</p>
      </div>
      </>
        
     
    );
  }