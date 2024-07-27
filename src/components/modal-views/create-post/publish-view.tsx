import Avatar from "@/components/avatar";
import Image from "@/components/image"
import { ViewProps } from "@/hooks/use-post";
import { useUserStore } from "@/hooks/use-user-store";

const PublishView = ({ state, dispatch }: ViewProps) => {
  const { user } = useUserStore()
  const captionLength = 2000;

  if (!state.image) return null;

  const handleCaptionChange = (value: string) => {
    dispatch({ type: 'SET_CAPTION', payload: value });
  }

  return (
    <section className="h-full rounded-b-lg overflow-hidden shadow-lg flex w-[930px] gap-4">
      <Image src={URL.createObjectURL(state.image)} alt='Post image' className='w-full h-full' />
      <section className="w-[320px] flex flex-col gap-3">
        <header className="flex gap-2 h-10 items-center mt-2">
          <Avatar photoUrl={user?.photoUrl} className='h-8 w-8' />
          <p className='font-semibold'>{user?.username || ''}</p>
        </header>
        <textarea
          placeholder="Write a caption..."
          className="w-full h-[170px] border-none focus-visible:outline-none pl-4 scrollbar-gutter"
          maxLength={captionLength}
          value={state.caption}
          onChange={(e) => handleCaptionChange(e.target.value)}
        />
        <span className="text-end mr-4">{state.caption.length}/{captionLength}</span>
      </section>
    </section>
  )
}

export default PublishView