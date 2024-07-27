import Image from "@/components/image"
import { ViewProps } from "@/hooks/use-post";

const ViewImageView = ({ state }: ViewProps) => {
  if (!state.image) return null;

  return (
    <section className="w-full h-full rounded-b-lg overflow-hidden shadow-lg">
      <Image src={URL.createObjectURL(state.image)} alt='Post image' className='w-full h-full' />
    </section>
  )
}

export default ViewImageView