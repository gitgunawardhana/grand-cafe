import { ReactNode, useEffect, useRef, useState } from "react";
import Text_03 from "../../assets/images/HomePage/Text_03.png";
import Text_04 from "../../assets/images/HomePage/Text_04.png";
import Text_05 from "../../assets/images/HomePage/Text_05.png";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "../../base-components/Button";

interface AnimatedContentProps {
    children: ReactNode;
}

const AnimatedContent = ({ children }: AnimatedContentProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.5 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={contentRef}
            className={`fade-in LKR{isVisible ? 'animate-fade-in' : ''}`}
            style={{
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'forwards',
            }}
        >
            {children}
        </div>
    );
};


const index = () => {
  return (
    <div>
      <div>
        {/* ... */}
        <div className="grid h-screen items-center p-5 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <AnimatedContent>
              {/* Your animated content */}
              <img src={Text_03} alt="" />
              <br></br>
              <img src={Text_04} alt="" />
              <br></br>
              <img src={Text_05} alt="" />
              <br></br>
              <br></br>
              <div className="flex flex-col sm:grid-cols-2 sm:flex-row">
                <div>
                  <Button
                    as={NavLink}
                    to="/table-booking"
                    className={twMerge(
                      "rounded-[15px] border-2 border-solid border-amber-500 !bg-transparent px-[30px] py-[20px] lg:px-[45px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "text-[14px] font-[900] uppercase tracking-[2px] !text-amber-500 hover:scale-110"
                      )}
                    >
                      Book A Table
                    </span>
                  </Button>
                </div>
                &nbsp;&nbsp;
                <div>
                  <Button
                    as={NavLink}
                    to="/product-page"
                    className={twMerge(
                      "rounded-[15px] border-2 border-solid border-gradient-yellow-300 !bg-amber-500 px-[20px] py-[20px] lg:px-[50px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "!text-#FFE353 text-[14px] font-[900] uppercase tracking-[2px] hover:scale-110"
                      )}
                    >
                      See Menu
                    </span>
                  </Button>
                </div>
              </div>
              {/* ... */}
            </AnimatedContent>
          </div>
          {/* ... */}
        </div>
        {/* ... */}
      </div>
    </div>
  );
};

export default index;
