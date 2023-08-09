import fbIcon from "../../assets/socialMediaIcon/fbIcon.svg";
import instaIcon from "../../assets/socialMediaIcon/instaIcon.svg";
import telegramIcon from "../../assets/socialMediaIcon/telegramIcon.svg";
import whatsappIcon from "../../assets/socialMediaIcon/whatsappIcon.svg";

const SocailMediaLinks = () => {
  const socialMediaLinks = [
    {
      title: "Facebook",
      icon: fbIcon,
      link: "#",
    },
    {
      title: "Instagram",
      icon: instaIcon,
      link: "#",
    },
    {
      title: "Telegram",
      icon: telegramIcon,
      link: "#",
    },
    {
      title: "Whatsapp",
      icon: whatsappIcon,
      link: "#",
    },
  ];
  return (
    <>
      <div>
        <ul
          className="list-style-none mx-auto flex flex-row pl-0"
          data-te-navbar-nav-ref
        >
          {socialMediaLinks.map((item) => (
            <li key={item.title} className="px-2" data-te-nav-item-ref>
              <img
                className="h-5 cursor-pointer transition-transform ease-in-out hover:rotate-6 hover:scale-125"
                src={item.icon}
                title={item.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocailMediaLinks;
