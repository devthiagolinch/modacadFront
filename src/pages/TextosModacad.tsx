import { Footer } from "../components/footer";
import { Header } from "../components/header";

import banner from "../assets/imgs/camila.jpg"

export function TextosModacad() {

    return(
        <div className="mx-auto">
            <Header />

            <div className=" pt-28 pb-5 w-full px-5">
                <h1 className="text-3xl font-serif">
                    Estilismo pelo mundo Tokio
                    Outono Inverno 2024 2025
                </h1>

                <p className="text-left">
                Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
                e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
                de tipos e os embaralhou para fazer um livro de modelos de tipos. 
                </p>
            </div>

            <div>
                <img src={banner} alt="" className="w-full h-auto" />
                <div className="flex p-5 gap-5">
                    <img src={banner} alt="" className="w-10 h-10 rounded-full flex items-center justify-center bg-black" />
                    <p>Telma Barcellos</p>
                </div>

                <div className="flex gap-10 bg-blue-400">
                    <div className="flex flex-col">
                        <span>tags</span>
                        <span>tags</span>
                        <span>tags</span>
                    </div>
                    <div className="flex-1 flex-col bg-red-400">
                        <p className="text-left">4/04/2025</p>
                        <span>10 min de leitura</span>
                    </div>

                </div>
            </div>

            <div>
                <p className="text-justify px-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et vestibulum lacus. Donec sed convallis ipsum. Praesent rhoncus mattis gravida. Aenean nec lacus et leo tristique pellentesque at ac metus. In vehicula lectus erat, congue ultrices mi pulvinar a. Nulla placerat, arcu vitae bibendum fringilla, ante nulla semper quam, eu blandit nunc dolor id lorem. Praesent euismod commodo urna. Nunc vehicula odio massa, volutpat feugiat mi interdum vitae. Nulla nec purus ultrices mauris dignissim feugiat quis et lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut in gravida urna. Nullam at auctor felis. Proin quis mi libero. Praesent porta tempor porttitor.

                Curabitur facilisis tellus a sapien condimentum accumsan. Suspendisse id ultrices metus. Fusce massa nulla, suscipit vulputate nulla sit amet, ornare accumsan lorem. Nullam sed convallis tortor, eget efficitur mauris. Nam porta ex non massa vestibulum, convallis sodales urna pellentesque. In hac habitasse platea dictumst. Praesent at viverra velit. Fusce luctus consectetur sem quis dignissim.

                Integer at arcu non eros porttitor consequat id eu ante. In sed leo et libero pharetra blandit et et ante. Nulla commodo a leo quis volutpat. Aliquam erat volutpat. Praesent efficitur, nunc id finibus tempor, elit enim convallis nibh, vel pharetra mi mauris et est. Mauris iaculis lacinia sem, ac aliquam risus pretium vitae. Vivamus lacus ante, scelerisque vitae pharetra ac, tristique nec ante. Nunc commodo quam vel nunc vestibulum, quis maximus massa molestie. Proin blandit malesuada nulla, ut luctus sapien condimentum ac. Sed eget erat et justo finibus molestie et porttitor nulla. Nunc nulla lacus, scelerisque ut ipsum nec, ullamcorper sollicitudin ante. Curabitur finibus neque sit amet diam sollicitudin accumsan.

                Pellentesque faucibus velit maximus erat condimentum vestibulum. Integer quis blandit metus. In id velit sit amet neque consectetur porta. Ut mattis lorem in commodo semper. Sed id arcu sit amet ipsum consequat viverra eget at libero. Donec pharetra, lorem aliquet imperdiet posuere, nunc purus dignissim nisl, sit amet semper urna est aliquam diam. Cras vel varius diam. Nam commodo scelerisque tristique. Vestibulum efficitur justo magna, ut vestibulum tortor consequat varius. Morbi fringilla sollicitudin lacus, vitae imperdiet nisl dapibus at.

                Morbi a libero eget nisl venenatis pharetra. Aenean nec ante tristique, congue neque sed, luctus dolor. Morbi dui tellus, vestibulum vitae tellus quis, gravida semper dolor. Duis bibendum, dui eu ultricies condimentum, nisi tortor gravida magna, nec molestie odio est sed orci. Phasellus luctus porttitor porttitor. Duis enim est, dignissim sit amet rhoncus vel, porttitor ac nibh. Ut suscipit magna vel nulla fringilla, eu rutrum nulla vestibulum. Fusce sit amet efficitur nisl, id ornare quam. Sed ac dolor ornare, dignissim sapien a, condimentum diam. Aenean elit nisi, malesuada quis ex in, consectetur facilisis nulla. Suspendisse rhoncus, ante vitae tristique egestas, diam justo lacinia nisi, quis ultricies justo ante ut erat. Donec gravida justo ac vehicula euismod.
                </p>

            </div>


            <Footer />
        </div>
    )
}