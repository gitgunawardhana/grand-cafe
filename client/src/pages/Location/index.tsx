import React from "react";
import location from "../../assets/images/HomePage/Location.png";

const Location: React.FC = () => {
  return (
    <div className="flex w-full flex-col justify-center pt-16">
      <div className=" flex h-1/5 flex-col items-center justify-center">
        <img src={location} alt="" />
        <br />
        <br />
      </div>
      <div className="h-screen w-full px-20">
        <iframe
          className="h-full w-full rounded-xl"
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.388051266444!2d81.03841764988682!3d6.988833699736026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae462167fa6dad9%3A0x84d3d072c32aa246!2sBadulla!5e0!3m2!1sen!2slk!4v1702840653352!5m2!1sen!2slk"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
