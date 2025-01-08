import pinterestIcon from '../../../assets/icons/social  media/pinterest.svg';
import linkedinIcon from '../../../assets/icons/social  media/linkedin.svg';
import facebookicon from '../../../assets/icons/social  media/facebook.svg';
import instaIcon from '../../../assets/icons/social  media/instagram.svg';
import youtubeIcon from '../../../assets/icons/social  media/youtube.svg';
import tiktokIcon from '../../../assets/icons/social  media/tiktok.svg';
import setaCurvaIcon from '../../../assets/icons/seta-curva.svg';

const socialMedia = [
  { icon: linkedinIcon, link: 'https://www.linkedin.com/' },
  { icon: pinterestIcon, link: 'https://www.pinterest.com/' },
  { icon: instaIcon, link: 'https://www.instagram.com/' },
  { icon: tiktokIcon, link: 'https://www.tiktok.com/' },
  { icon: youtubeIcon, link: 'https://www.youtube.com/' },
  { icon: facebookicon, link: 'https://www.facebook.com/' },
];

export const CTARedesSociais = () => {
  return (
    <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-2">
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
  );
};
