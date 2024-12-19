import setaCurvaIcon from '../../assets/icons/seta-curva.svg';
import facebookicon from '../../assets/icons/social  media/facebook.svg';
import tiktokIcon from '../../assets/icons/social  media/tiktok.svg';
import pinterestIcon from '../../assets/icons/social  media/pinterest.svg';
import linkedinIcon from '../../assets/icons/social  media/linkedin.svg';
import instaIcon from '../../assets/icons/social  media/instagram.svg';
import youtubeIcon from '../../assets/icons/social  media/youtube.svg';
import emailIcon from '../../assets/icons/email.svg';
import wppIcon from '../../assets/icons/whatsapp.svg';

const socialMedia = [
  { icon: linkedinIcon, link: 'https://www.linkedin.com/' },
  { icon: pinterestIcon, link: 'https://www.pinterest.com/' },
  { icon: instaIcon, link: 'https://www.instagram.com/' },
  { icon: tiktokIcon, link: 'https://www.tiktok.com/' },
  { icon: youtubeIcon, link: 'https://www.youtube.com/' },
  { icon: facebookicon, link: 'https://www.facebook.com/' },
];

export function Footer() {
  const renderNossasRedesSociais = () => (
    <div className="border-b border-gray-950">
      <div className="container mx-auto font-montserrat px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col justify-center items-center md:items-start">
          <p className="text-6xl md:text-7xl font-butler font-light">
            Nossas <br /> redes sociais
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={setaCurvaIcon} className="transform -scale-x-90 rotate-[216deg] md:scale-x-100 md:rotate-0" />
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-4">
          {socialMedia.map((social, index) => (
            <div
              className="border border-gray-950 p-4 flex items-center justify-center aspect-w-1 aspect-h-1 hover:bg-primary cursor-pointer"
              key={index}
            >
              <img src={social.icon} className="object-contain w-1/2 h-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuerFalarComigo = () => (
    <div className="border-b border-gray-950">
      <div className="container mx-auto font-montserrat px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col justify-center items-center md:items-start">
          <p className="text-6xl md:text-7xl font-butler font-light">
            Quer falar
            <br />
            comigo?
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={setaCurvaIcon} className="transform -scale-x-90 rotate-[216deg] md:scale-x-100 md:rotate-0" />
        </div>
        <div className="flex items-center">
          <ul>
            <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
              <img src={emailIcon} alt="" className="max-w-[24px]" />
              <p className="">telmabarcellos@modacad.com.br</p>
            </li>
            <li className="flex gap-2 md:text-2xl font-medium highlight-link mb-2 items-center">
              <img src={wppIcon} alt="" className="max-h-[24px]" />
              31 99616 7573
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCopy = () => (
    <div className="border-b border-gray-950">
      <div className="container mx-auto font-montserrat py-8 px-4">
        <p className="font-butler font-medium text-center">Copyright 2024 Modacad</p>
      </div>
    </div>
  );

  return (
    <>
      {renderNossasRedesSociais()}
      {renderQuerFalarComigo()}
      {renderCopy()}
    </>
  );
}
