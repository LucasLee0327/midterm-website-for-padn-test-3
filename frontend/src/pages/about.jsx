import mypic from './pikachu-surprised.jpg'

function About() {
  return(
    <div class="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center">
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <img class="object-cover object-center rounded" alt="my selfie" src={mypic} />
      </div>
      <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <p class="text-2xl mb-4 text-gray-900">國立臺灣大學 醫學系</p>
        <p class="text-3xl hidden lg:inline-block">李承洋</p>
              
        <p class="my-8 leading-relaxed">
          我是李承洋，是醫學系大二的學生。
          <br/>
          你問我來修這個幹嘛?窩不知道。
          <br/>
          我只知道義大利麵要拌42號混凝土。
          <br/>
          欸嘿( 。ω。)b
        </p>
      </div>
    </div>
  )
  
}

export default About
