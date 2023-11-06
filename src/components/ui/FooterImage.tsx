import Image from 'next/image';

interface FooterImageProps {
  image: any;
}
const FooterImage: React.FC<FooterImageProps> = ({ image }) => {
  return (
    <div className='relative h-20 md:h-24 w-full '>
      <Image
        src={image}
        fill
        alt=' Check '
        className='object-cover object-center md:object-top'
      />
    </div>
  );
};

export default FooterImage;
