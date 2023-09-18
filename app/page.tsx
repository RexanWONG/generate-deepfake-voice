import MainSection from '@/components/MainSection'
import WordHeader from '@/components/WordHeader'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-16'>
        <WordHeader />
      </div>
      <div className='mt-20'>
        <MainSection />
      </div>
    </div>
  )
}

export default page