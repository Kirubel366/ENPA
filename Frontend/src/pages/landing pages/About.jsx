import React from 'react'
import image from "../../assets/home3 (1).jpg"
import hands from "../../assets/hands.png"
import mom from "../../assets/mother.png"
import kaleb from "../../assets/kaleb.jpg"
import HENOKALEMU from "../../assets/HENOK ALEMU.jpg"
import YITAGESUGETNET from "../../assets/YITAGESU GETNET.jpg"

const About = () => {
  return (
    <div className='relative mt-35 font-outfit'>
      <div className='relative w-full'>
        <img src={image} alt="" className='w-full h-50 object-cover'  />
        <div className="absolute flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-[#03045E]/70 shadow-lg shadow-[#0077B6]">
          <h3 className='relative z-10 text-3xl font-bold text-white'>About Us</h3>
        </div>
      </div>
      <div className='w-full h-auto py-20 px-10 sm:px-30 flex flex-col items-center justify-center gap-20 bg-[#03045E]'>
          <div className='relative flex flex-col items-center gap-10 py-20 px-3 text-center justify-center w-full sm:w-220 h-auto border-3 border-[#0077B6] rounded-4xl text-white bg-[#0077B6]/20'>
            <h3 className='text-3xl font-bold'>Who We Are</h3>
            <p className='w-full sm:w-140 text-xl'>Education for Needy People Association (ENPA) is a local charity founded in 2008 and registered in 2010 to support disadvantaged communities. ENPA helps vulnerable children affected by poverty, HIV/AIDS, or loss of family, giving them access to education, safety, and hope.</p>
            <p className='w-full sm:w-140 text-xl'>Based in Yeka Kifle Ketema, northeast of Addis Ababa, ENPA addresses the high cost of schooling and limited health services. We provide education, healthcare support, and help children with disabilities, while empowering single mothers through vocational training to improve their livelihoods.</p><p></p>
            <img src={hands} className='hidden md:block absolute object-cover size-25 top-10 left-10'/>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-15 sm:gap-40'>
            <div className='flex flex-col items-center justify-center gap-3'>
              <div className='size-25 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full'>
                <p className='text-6xl opacity-70'>🎓</p>
              </div>
              <h5 className='text-5xl font-bold text-[#90E0EF] text-shadow-lg text-shadow-[hsl(189,75%,50%)]'>2000+</h5>
              <p className='text-2xl text-white'>Students Taught</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
              <div className='size-25 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full'>
                <p className='text-6xl opacity-70'>⏳</p>
              </div>
              <h5 className='text-5xl font-bold text-[#90E0EF] text-shadow-lg text-shadow-[hsl(189,75%,50%)]'>17+</h5>
              <p className='text-2xl text-white'>Years of Service</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
              <div className='size-25 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full overflow-hidden'>
                <p className='opacity-70'><img src={mom} className='object-cover size-19' /></p>
              </div>
              <h5 className='text-5xl font-bold text-[#90E0EF] text-shadow-lg text-shadow-[hsl(189,75%,50%)]'>350+</h5>
              <p className='text-2xl text-white'>Mothers Supported</p>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-10'>
            <div className='relative bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-[#0077B6] hover:shadow-xl duration-500 transition-all'>
              <h3 className='h-20 w-full border-b-2 border-[#90E0EF] flex items-center justify-center text-2xl font-bold text-white'>OUR VISION</h3>
              <p className='text-lg text-[#90E0EF] text-center mx-10 my-10'>To improve the life of less income families in the Yeka (Sub City) District through providing basic education, care and support for the children, as well as capacity building for their guardians.</p>
            </div>
            <div className='relative bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-[#0077B6] hover:shadow-xl duration-500 transition-all'>
              <h3 className='h-20 w-full border-b-2 border-[#90E0EF] flex items-center justify-center text-2xl font-bold text-white'>OUR MISSION</h3>
              <p className='text-lg text-[#90E0EF] text-center mx-10 my-10'>To provide early childhood care, basic education, and social support for children in need, while empowering low-income families and women to help reduce poverty over time.</p>
            </div>
            <div className='relative bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-[#0077B6] hover:shadow-xl duration-500 transition-all'>
              <h3 className='h-20 w-full border-b-2 border-[#90E0EF] flex items-center justify-center text-2xl font-bold text-white'>OUR VALUES</h3>
              <p className='text-lg text-[#90E0EF] text-center mx-10 my-10'>Quality education for children and their families, social inclusion, health and nutrition, women empowerment and families’ job training, mental health and special needs support.</p>
            </div>
          </div>
          <div className='w-full h-auto text-white flex flex-col items-center justify-center gap-20 px-5 sm:px-30 py-10 bg-gradient-to-br from-green-500/60 to-[#03045E]/70'>
              <h3 className='text-3xl font-bold text-center'>ENPA’s Education and Community Support Programs</h3>
              <p className='text-xl '>ENPA School has become a center of learning and support for children and families, now serving over 200 children aged 3 to 7 in nursery and kindergarten levels, including children with disabilities. The school provides a safe, child-friendly environment, improves nutrition and health, and reduces the risks children face when left at home. Alongside pre-school education, ENPA runs a literacy program for parents, a canteen offering regular meals, and provides essential school kits—textbooks, uniforms, and materials—for students progressing to primary and secondary school.<br/><br/><br/>

                Beyond academics, ENPA emphasizes inclusion, extracurricular development, and family empowerment. Facilities like ramps and specialized support make the school accessible to disabled children, while art, music, and sports programs build teamwork and confidence, with ENPA’s football team even winning local championships. For parents, especially single mothers, ENPA offers vocational training in sewing, handicrafts, cooking, and small business management, with over 350 parents trained and many now financially independent. Future plans include expanding community-based schools, libraries, health and physiotherapy centers, promoting income-generating activities for sustainability, and engaging the wider community in environmental protection and social development.</p>
          </div>
      </div>
      <div className='w-full noise-bg h-auto py-25 px-30 flex flex-col items-center justify-center gap-20'>
        <h3 className='text-5xl text-shadow-lg text-shadow-[#0077B6] text-white font-bold'>Founders</h3>
        <div className='flex flex-wrap items-center justify-center gap-10'>
          <div className='relative z-20 bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-xl shadow-[#0077B6] hover:-translate-y-3 duration-400 transition-all'>
            <img src={kaleb} alt="" className='h-90 rounded-t-3xl w-full border-b-2 border-[#90E0EF] object-cover' />
            <h3 className='text-2xl font-bold text-[#90E0EF] text-center mt-10'>Kaleb Tsegaye</h3>
            <p className='text-lg text-white text-center mb-10'>Founder & General Manager</p>
          </div>
          <div className='relative z-20 bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-xl shadow-[#0077B6] hover:-translate-y-3 duration-400 transition-all'>
            <img src={HENOKALEMU} alt="" className='h-90 rounded-t-3xl w-full border-b-2 border-[#90E0EF] object-cover' />
            <h3 className='text-2xl font-bold text-[#90E0EF] text-center mt-10'>Henok Alemu</h3>
            <p className='text-lg text-white text-center mb-10'>Founder & Board Member</p>
          </div>
          <div className='relative z-20 bg-[#0077B6]/30 border-2 border-[#90E0EF] rounded-3xl w-90 h-auto shadow-xl shadow-[#0077B6] hover:-translate-y-3 duration-400 transition-all'>
            <img src={YITAGESUGETNET} alt="" className='h-90 rounded-t-3xl w-full border-b-2 border-[#90E0EF] object-cover' />
            <h3 className='text-2xl font-bold text-[#90E0EF] text-center mt-10'>Yitagesu Getnet</h3>
            <p className='text-lg text-white text-center mb-10'>Founder & General Manager</p>
          </div>
          <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
          <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
        </div>
      </div>
    </div>
  )
}

export default About