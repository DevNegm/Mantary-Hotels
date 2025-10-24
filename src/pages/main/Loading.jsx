import { Loader } from '@mantine/core'

const Loading = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <Loader color="gray" size="xl" type="dots" />
    </section>
  )
}

export default Loading