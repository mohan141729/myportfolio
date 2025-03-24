import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const HeroSection = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: ["Programmer", "Web Developer", "Designer", "ML Engineer"],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
        });

        return () => typed.destroy(); // Cleanup on unmount
    }, []);

    return (
        <section>
            <section className="text-gray-600 body-font bg-[#081b29] font-sans">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 lg:ml-[150px] md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center order-last md:order-first text-center" data-aos="fade-right">
                        <h1 className="text-2xl font-semibold mb-4 text-[white]">Hello, It's Me</h1>
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            Mohan<span className="text-cyan-400"> D</span>
                        </h1>
                        <h1 className="text-4xl font-bold mb-4 text-[white]">
                            I'm <span className="text-cyan-400 "><span ref={typedRef}></span></span>
                        </h1>
                        <p className="text-lg text-[white] mb-4">
                            As a professional web developer, my main goal is to deliver
                            high-quality web development solutions that meet and exceed the
                            expectations of local and global clients, providing them with an
                            effective and efficient online presence, and ensuring their
                            complete satisfaction.
                        </p>
                        <div className="flex flex-wrap gap-6 mt-6">
                            {[
                                { href: "https://www.linkedin.com/in/dmohan1729/", icon: "bxl-linkedin" },
                                { href: "https://www.instagram.com/dmohan1729/", icon: "bxl-instagram" },
                                { href: "https://github.com/mohan141729", icon: "bxl-github" },
                                { href: "https://www.youtube.com/@1SyntaxPro", icon: "bxl-youtube" },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="grid place-items-center text-cyan-400 border-[1.6px] border-cyan-400 text-4xl rounded-full p-1 text-center hover:bg-cyan-400 hover:shadow-[0_0_15px_#00BFFF] hover:text-[#081b29] "
                                    style={{ animationDelay: `${index * 0.2}s` }} target="blank"
                                >
                                    <i className={`bx ${item.icon}`}></i>
                                </a>
                            ))}
                        </div>

                        <a
                            href="public/images/Mohan_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 px-6 py-3 text-lg font-semibold text-cyan-400 border border-cyan-400 rounded-lg hover:shadow-[0_0_15px_#00BFFF] hover:bg-cyan-400 hover:text-[#081b29] transition"
                        >
                            Download CV
                        </a>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 sm:justify-center sm:justify-items-center lg:mr-[60px]" data-aos="fade-left">
                        <img
                            src="https://res.cloudinary.com/dovmtmu7y/image/upload/v1724175235/portfolio-removebg-preview_ln2kzi.png"
                            alt="Mohan D"
                            className="h-[430px] md:rounded-[68%_32%_36%_64%_/_33%_48%_52%_67%] shadow-[0_0_25px_#00BFFF] animate-float bg-cyan-400 sm:rounded-full sm:h-50 sm:w-50 order-first md:order-last   md:h-[450px] md:w-[450px] "
                        />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default HeroSection;

const styles = `
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .social-link:hover {
    color: black !important;
    background-color: var(--primary-color);
    box-shadow: 0 0 20px var(--primary-color);
    transition: all .3s ease-in-out;
  }

`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);