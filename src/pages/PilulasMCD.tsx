import { Footer } from "../components/footer";
import { Header } from "../components/header";

import banner from "../assets/imgs/africa.jpg"
import telma from "../assets/imgs/telma.jpeg"

import { TextoPremium } from "../components/textoPremium";
import { BlockText } from "../components/blocktext";

interface PilulasDT {
    mostrarTexto: boolean;
}

export function PilulasMCD() {

    let mostrarTexto = true

    if(mostrarTexto = false) {
        return(
            <div className="mx-auto">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full lg:pt-[60px]">
                    <div className="lg:flex  lg:pb-5 lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto lg:mr-[105px]">
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">HISTORIO DA MODA</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">NOVOS MATERIAIS</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">MODA URBANA</span>
                        </div>
                    <div className="lg:flex lg:flex-col lg:pr-[20%] lg:ml-[94px]">
                            <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                            Semana de Moda Indígena DIA 05

                            </h1>

                            <p className="lg:text-left lg:text-[20px] w-[100%] lg:font-montserrat_regular">
                            Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                            e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                            de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                            </p>
                    </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={telma} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">Telma Barcellos</p>
                        </div>

                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                                <p className="text-left lg:mr-2">4/04/2025</p>
                                <span>•</span>
                                <span className="lg:ml-2">  10 min de leitura</span>
                            
                            <div className="lg:grid lg:items-end">
                            </div>

                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <div className="w-[280px] h-[280px] border-[1px] border-[#f1ece8] absolute ">

                        </div>
                        <img src={banner} alt="" className="w-[300px] h-[300px] " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-28 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            Estilismo pelo mundo Tokio
                            Outono Inverno 2024 2025
                        </h1>

                        <p className="text-left leading-[20px]">
                        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                        e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                        de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        {/* borda sera interna - com espaço de 10px entre a borda real da imagem e a desenhada
                            ajustar para a imagem do banner mesmo sendo retangular ficar com altura maxima e cortada
                            para o centro
                        */}
                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={banner} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={telma} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">Telma Barcellos</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            <div className="flex flex-col font-montserrat_light_italic">
                                <span className="-mb-[5px]">Historia da Moda</span>
                                <span className="-mb-[5px]">Novos Materiais</span>
                                <span>Moda Urbana</span>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                                <p className="text-left -mb-[5px]">4/04/2025</p>
                                <span>10 min de leitura</span>
                            </div>

                        </div>

                    </div>
                    
                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]">
                    <p className="text-justify  lg:text-lg font-montserrat_regular">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et vestibulum lacus. Donec sed convallis ipsum. Praesent rhoncus mattis gravida. Aenean nec lacus et leo tristique pellentesque at ac metus. In vehicula lectus erat, congue ultrices mi pulvinar a. Nulla placerat, arcu vitae bibendum fringilla, ante nulla semper quam, eu blandit nunc dolor id lorem. Praesent euismod commodo urna. Nunc vehicula odio massa, volutpat feugiat mi interdum vitae. Nulla nec purus ultrices mauris dignissim feugiat quis et lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut in gravida urna. Nullam at auctor felis. Proin quis mi libero. Praesent porta tempor porttitor.

                    Curabitur facilisis tellus a sapien condimentum accumsan. Suspendisse id ultrices metus. <br /> <br /> Fusce massa nulla, suscipit vulputate nulla sit amet, ornare accumsan lorem. Nullam sed convallis tortor, eget efficitur mauris. Nam porta ex non massa vestibulum, convallis sodales urna pellentesque. In hac habitasse platea dictumst. Praesent at viverra velit. Fusce luctus consectetur sem quis dignissim.

                    Integer at arcu non eros porttitor consequat id eu ante. In sed leo et libero pharetra blandit et et ante. <br /><br />Nulla commodo a leo quis volutpat. Aliquam erat volutpat. Praesent efficitur, nunc id finibus tempor, elit enim convallis nibh, vel pharetra mi mauris et est. Mauris iaculis lacinia sem, ac aliquam risus pretium vitae. Vivamus lacus ante, scelerisque vitae pharetra ac, tristique nec ante. Nunc commodo quam vel nunc vestibulum, quis maximus massa molestie. Proin blandit malesuada nulla, ut luctus sapien condimentum ac. Sed eget erat et justo finibus molestie et porttitor nulla. 
                    <br /><br />
                    Nunc nulla lacus, scelerisque ut ipsum nec, ullamcorper sollicitudin ante. Curabitur finibus neque sit amet diam sollicitudin accumsan.

                    Pellentesque faucibus velit maximus erat condimentum vestibulum.

                    <div className="flex justify-center items-center">
                        <img src={banner} alt="" className="max-h-60 my-[20px]" />
                    </div>

                    Integer quis blandit metus. In id velit sit amet neque consectetur porta. Ut mattis lorem in commodo semper. Sed id arcu sit amet ipsum consequat viverra eget at libero. Donec pharetra, lorem aliquet imperdiet posuere, nunc purus dignissim nisl, sit amet semper urna est aliquam diam. Cras vel varius diam. Nam commodo scelerisque tristique. Vestibulum efficitur justo magna, ut vestibulum tortor consequat varius. Morbi fringilla sollicitudin lacus, vitae imperdiet nisl dapibus at.

                    Morbi a libero eget nisl venenatis pharetra. Aenean nec ante tristique, congue neque sed, luctus dolor. 
                    <br /><br />
                    Morbi dui tellus, vestibulum vitae tellus quis, gravida semper dolor. Duis bibendum, dui eu ultricies condimentum, nisi tortor gravida magna, nec molestie odio est sed orci. Phasellus luctus porttitor porttitor. Duis enim est, dignissim sit amet rhoncus vel, porttitor ac nibh. Ut suscipit magna vel nulla fringilla, eu rutrum nulla vestibulum. Fusce sit amet efficitur nisl, id ornare quam. Sed ac dolor ornare, dignissim sapien a, condimentum diam. Aenean elit nisi, malesuada quis ex in, consectetur facilisis nulla. Suspendisse rhoncus, ante vitae tristique egestas, diam justo lacinia nisi, quis ultricies justo ante ut erat. Donec gravida justo ac vehicula euismod.
                    </p>

                </div>
                <Footer />                
            </div>
        )
    }else{
        return(
            <div className="mx-auto">
                <Header />
    
                {/** DESKTOP TOP PAGE */}
                <div className="hidden lg:flex lg:flex-col  lg:w-full lg:pt-[60px]">
                    <div className="lg:flex  lg:pb-5 lg:justify-between">
                        {/** tentar subir um pouco as tags para ficar alinhado com a descrição */}
                        <div className="lg:flex lg:pl-[55px] lg:flex-row lg:align-middle lg:items-end lg:w-auto lg:mr-[105px]">
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">HISTORIO DA MODA</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">NOVOS MATERIAIS</span>
                            <span className=" w-[22px] lg:transform: -rotate-90 text-nowrap">MODA URBANA</span>
                        </div>
                    <div className="lg:flex lg:flex-col lg:pr-[20%] lg:ml-[94px]">
                            <h1 className="lg:text-7xl lg:font-butler_ultra_light lg:my-14 lg:mb-[30px] lg:leading-[80px]  ">
                            Semana de Moda Indígena DIA 05

                            </h1>

                            <p className="lg:text-left lg:text-[20px] w-[100%] lg:font-montserrat_regular">
                            Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                            e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                            de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                            </p>
                    </div>

                    
                    </div>

                    <div className="lg:flex lg:w-full lg:justify-between lg:px-[20%]">
                        <div className="lg:flex lg:p-5 lg:gap-5 lg:items-center lg:justify-start">
                            <img src={telma} alt="" className="w-14 h-14 rounded-full flex items-center justify-center bg-black" />
                            <p className="lg:-ml-3 lg:text-[20px] lg:font-montserratMedium tracking-[0.05em]">Telma Barcellos</p>
                        </div>

                        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center text-zinc-800">
                                <p className="text-left lg:mr-2">4/04/2025</p>
                                <span>•</span>
                                <span className="lg:ml-2">  10 min de leitura</span>
                            
                            <div className="lg:grid lg:items-end">
                            </div>

                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <div className="w-[280px] h-[280px] border-[1px] border-[#f1ece8] absolute ">

                        </div>
                        <img src={banner} alt="" className="w-[300px] h-[300px] " />
                    </div>
                    
                </div>

                {/* mobile top page*/}
                <div className="lg:hidden">
                    <div className=" pt-28 pb-5 w-full px-5 grid gap-5">
                        <h1 className="text-3xl font-butler_ultra_light">
                            Estilismo pelo mundo Tokio
                            Outono Inverno 2024 2025
                        </h1>

                        <p className="text-left leading-[20px]">
                        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                        e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                        de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                        </p>
                    </div>

                    <div className="flex flex-col ">

                        {/* borda sera interna - com espaço de 10px entre a borda real da imagem e a desenhada
                            ajustar para a imagem do banner mesmo sendo retangular ficar com altura maxima e cortada
                            para o centro
                        */}
                        <div className="flex justify-center items-center">
                            <div className="w-[220px] h-[220px] border-[1px] border-[#f1ece8] absolute ">
                            </div>
                            <img src={banner} alt="" className="min-h-60 max-h-60 max-w-60
                                border-[1px] border-inherit border-white
                                object-cover
                            " />
                        </div>

                        <div className="flex p-5 gap-[10px] items-center">
                            <img src={telma} alt="" className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-black" />
                            <p className="text-[20px]">Telma Barcellos</p>
                        </div>

                        <div className="flex justify-between items-start align-top gap-10 px-5 mb-[20px] text-zinc-800">
                            <div className="flex flex-col font-montserrat_light_italic">
                                <span className="-mb-[5px]">Historia da Moda</span>
                                <span className="-mb-[5px]">Novos Materiais</span>
                                <span>Moda Urbana</span>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                                <p className="text-left -mb-[5px]">4/04/2025</p>
                                <span>10 min de leitura</span>
                            </div>

                        </div>

                    </div>
                    
                </div>

                <div className="lg:pt-12 lg:px-[20%] mb-[40px] mx-[20px]  ">
                    <p className="text-justify  lg:text-lg font-montserrat_regular">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et vestibulum lacus. Donec sed convallis ipsum. Praesent rhoncus mattis gravida. Aenean nec lacus et leo tristique pellentesque at ac metus. In vehicula lectus erat, congue ultrices mi pulvinar a. Nulla placerat, arcu vitae bibendum fringilla, ante nulla semper quam, eu blandit nunc dolor id lorem. Praesent euismod commodo urna. Nunc vehicula odio massa, volutpat feugiat mi interdum vitae. Nulla nec purus ultrices mauris dignissim feugiat quis et lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut in gravida urna. Nullam at auctor felis. Proin quis mi libero. Praesent porta tempor porttitor.

                    Curabitur facilisis tellus a sapien condimentum accumsan. Suspendisse id ultrices metus. <br /> <br /> Fusce massa nulla, suscipit vulputate nulla sit amet, ornare accumsan lorem. Nullam sed convallis tortor, eget efficitur mauris. Nam porta ex non massa vestibulum, convallis sodales urna pellentesque. In hac habitasse platea dictumst. Praesent at viverra velit. Fusce luctus consectetur sem quis dignissim.

                    Integer at arcu non eros porttitor consequat id eu ante. In sed leo et libero pharetra blandit et et ante. <br /><br />Nulla commodo a leo quis volutpat. Aliquam erat volutpat. Praesent efficitur, nunc id finibus tempor, elit enim convallis nibh, vel pharetra mi mauris et est. Mauris iaculis lacinia sem, ac aliquam risus pretium vitae. Vivamus lacus ante, scelerisque vitae pharetra ac, tristique nec ante. Nunc commodo quam vel nunc vestibulum, quis maximus massa molestie. Proin blandit malesuada nulla, ut luctus sapien condimentum ac. Sed eget erat et justo finibus molestie et porttitor nulla. 
                    <br /><br />
                    Nunc nulla lacus, scelerisque ut ipsum nec, ullamcorper sollicitudin ante. Curabitur finibus neque sit amet diam sollicitudin accumsan.

                    Pellentesque faucibus velit maximus erat condimentum vestibulum.

                    <div className="flex justify-center items-center">
                        <img src={banner} alt="" className="max-h-60 my-[20px]" />
                    </div>

                    Integer quis blandit metus. In id velit sit amet neque consectetur porta. Ut mattis lorem in commodo semper. Sed id arcu sit amet ipsum consequat viverra eget at libero. Donec pharetra, lorem aliquet imperdiet posuere, nunc purus dignissim nisl, sit amet semper urna est aliquam diam. Cras vel varius diam. Nam commodo scelerisque tristique. Vestibulum efficitur justo magna, ut vestibulum tortor consequat varius. Morbi fringilla sollicitudin lacus, vitae imperdiet nisl dapibus at.

                    Morbi a libero eget nisl venenatis pharetra. Aenean nec ante tristique, congue neque sed, luctus dolor. 
                    <br /><br />
                    Morbi dui tellus, vestibulum vitae tellus quis, gravida semper dolor. Duis bibendum, dui eu ultricies condimentum, nisi tortor gravida magna, nec molestie odio est sed orci. Phasellus luctus porttitor porttitor. Duis enim est, dignissim sit amet rhoncus vel, porttitor ac nibh. Ut suscipit magna vel nulla fringilla, eu rutrum nulla vestibulum. Fusce sit amet efficitur nisl, id ornare quam. Sed ac dolor ornare, dignissim sapien a, condimentum diam. Aenean elit nisi, malesuada quis ex in, consectetur facilisis nulla. Suspendisse rhoncus, ante vitae tristique egestas, diam justo lacinia nisi, quis ultricies justo ante ut erat. Donec gravida justo ac vehicula euismod.
                    </p>

                </div>
                <BlockText />
                <Footer />                
            </div>
        )
    }
    
}