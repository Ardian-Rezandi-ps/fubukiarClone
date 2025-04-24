import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";

const Aboutcerita = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedContent, setSelectedContent] = React.useState(null);
    const params = useParams();
    const tag = params.tag;

 //useEffect(() => {
//const fetchContent = async () => {
           // const contents = await getContentSettingByTag("content");
         //   const contentByTag = contents.filter((item) => item.tag === tag);
          //  setSelectedContent(contentByTag[0]);
          //  setIsLoading(false);
    //    };
//fetchContent();
//}, [tag]);

   

    return (
        <div>
            <BackIcon />
            <div className="relative w-full h-1/2 h-2/5">
            <Carousel autoSlide animationType="fade" hideNavigation hidePagination>
                    {[
                        "/images/car1.png",
                        "/images/car2.png",
                        "/images/car3.png",
                        "/images/car4.png",
                        "/images/car5.png"
                    ].map((s) => <img key={s} src={s} className="w-full h-1/2 flex-shrink-0 h-full object-cover" />)}
                </Carousel>
                <div className="absolute top-1 bg-gradient-to-t from-primary-darker w-full h-full z-10"></div>

            </div>

            <div className="text-primary-orange flex justify-center items-center flex-col gap-2 px-10 py-5">
               <h1 className="text-xl font-bold pb-2">Cerita Rakyat</h1>
               
                <div
                    className="text-xs border-t-2 font-light text-center border-primary-orange py-5"
                   
                >

                    Cerita rakyat merupakan harta budaya yang menyimpan nilai-nilai luhur dan kearifan lokal, diwariskan dari generasi ke generasi sebagai cerminan perjalanan sejarah bangsa. Dalam kekayaan cerita ini, tersimpan pesan moral yang mendalam serta gambaran kehidupan masyarakat Indonesia yang penuh warna. Kali ini, kita akan mengangkat dua cerita rakyat yang tak lekang oleh waktu, yaitu Lutung Kasarung dan Raja Amphat. Lutung Kasarung Lutung Kasarung adalah salah satu legenda yang berasal dari wilayah Sunda. Cerita ini mengisahkan tentang seekor lutung yang ternyata menyimpan rahasia besar: ia merupakan pangeran terkutuk yang harus menjalani ujian untuk mengembalikan kehormatan dan keadilan kerajaannya. Kisah ini sarat dengan tema transformasi, pengorbanan, dan kekuatan kebaikan yang mampu mengatasi segala rintangan. Melalui perjalanan penuh liku, Lutung Kasarung mengajarkan kita bahwa penampilan bukanlah segalanya, melainkan nilai-nilai batin dan kebenaran hati yang menentukan sejatinya seseorang. Cerita ini telah menginspirasi berbagai karya sastra dan pertunjukan seni, menjadikannya simbol keajaiban dan kepercayaan terhadap keadilan alam. Raja Amphat Raja Amphat merupakan kisah rakyat yang menggambarkan sosok pemimpin bijaksana dengan hati yang tulus. Dalam cerita ini, Raja Amphat dikenal karena keadilannya dalam memimpin serta kemampuannya menyatukan berbagai lapisan masyarakat dalam harmoni. Perjalanan hidupnya penuh dengan tantangan dan pengorbanan, namun keikhlasan dan keberaniannya selalu membawa harapan baru bagi rakyatnya. Lewat kisah ini, kita diajak untuk memahami pentingnya kepemimpinan yang tidak hanya mengutamakan kekuasaan, tetapi juga mengedepankan nilai-nilai moral dan kemanusiaan, sehingga mampu menginspirasi generasi penerus untuk membangun masyarakat yang lebih adil dan sejahtera. Merawat Warisan Budaya Kedua cerita rakyat, Lutung Kasarung dan Raja Amphat, bukan hanya sekadar hiburan semata. Mereka merupakan cermin dari sejarah dan identitas bangsa yang kaya akan tradisi dan nilai-nilai luhur. Dengan mengangkat kisah-kisah ini, kita turut melestarikan warisan budaya yang mengajarkan tentang keadilan, keberanian, dan kebijaksanaan—nilai-nilai yang sangat relevan di tengah tantangan zaman modern. Melalui cerita-cerita ini, diharapkan semangat dan kearifan tradisional Indonesia dapat terus hidup, memberikan inspirasi, dan menjadi landasan dalam membangun masa depan yang lebih bermartabat.
                </div>

            </div>
            
        </div>
    );
};

export default Aboutcerita;
