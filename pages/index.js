import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Banner, CreatorCard } from '../components';
import images from '../assets';

const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justifyStart mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div className="">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Top Sellers</h1>
          <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
            <div ref={scrollRef} className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none">
              {[6, 7, 8, 9, 10].map((creator, i) => (
                <>
                  <CreatorCard
                    key={creator.seller}
                    rank={i + 1}
                    creatorImg={images[`creator${i + 1}`]}
                    creatorName="JUST NAME"
                    creatorEths={10 - i * 0.5}
                  />
                  {!hideButtons && (
                  <>
                    <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer">
                      <Image src={images.left} layout="fill" objectFit="contain" alt="leftArrow" className={theme === 'light' ? 'filter invert' : ''} />
                    </div>
                    <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer">
                      <Image src={images.right} layout="fill" objectFit="contain" alt="leftArrow" className={theme === 'light' ? 'filter invert' : ''} />
                    </div>
                  </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
