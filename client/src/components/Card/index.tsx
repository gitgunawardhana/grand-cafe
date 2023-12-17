const Main = () => {
    return (
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src="https://placekitten.com/600/400"
          alt="Card Image"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Card Title 1</h2>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    );
  };

export default Main;
